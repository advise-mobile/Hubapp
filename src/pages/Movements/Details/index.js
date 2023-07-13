import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Platform, PermissionsAndroid} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {TOKEN} from 'helpers/StorageKeys';

import Api, {BASE_URL, getLogin} from 'services/Api';

import MovementsActions from 'store/ducks/Movements';
import MovementActions from 'store/ducks/Movement';
import FolderKeywordsActions from 'store/ducks/FolderKeywords';
import FolderProcessesActions from 'store/ducks/FolderProcesses';
import ToastNotifyActions from 'store/ducks/ToastNotify';

import Menu from './Menu';
import Email from '../Modals/Email';
import Confirmation from '../Modals/Confirmation';

import Header from 'components/Header';
import Spinner from 'components/Spinner';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Container, Warp, HeaderAction} from 'assets/styles/global';

import {
	Movement,
	MovementTags,
	Tag,
	TagText,
	ProcessNumber,
	ProcessNumberText,
	MovementContent,
	MovementDispatch,
} from './styles';

import {MaskCnj} from 'helpers/Mask';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

// Hook para buscar os dias de delete da lixeira
import { useMovementsGetDeleteTrash } from '@services/hooks/Movements/useMovements'

export default MovementDetail = props => {

	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;


	const [movementType] = useState(props.route.params.movementType);
	const [movement, setMovement] = useState(props.route.params.movement);
	const [moveReference, setMoveReference] = useState(null);
	const [loadingDetails, setLoading] = useState(true);
	const [downloading, setDownloading] = useState(false);

	const {loadingDeleteTrash, currentDayDeleteMovTrash} = useMovementsGetDeleteTrash();
	const [daysDeleteMovTrash, setDaysDeleteMovTrash] = useState(30);

	const menuRef = useRef(null);
	const emailRef = useRef(null);
	const deadlineRef = useRef(null);
	const confirmationRef = useRef(null);

	const dispatch = useDispatch();

	const dirs = RNFetchBlob.fs.dirs;

	useEffect(() => {
		setMoveReference(movement);

		const endpoint = movementType === -1 ? 'andamentos' : 'publicacoes';

		const {idMovProcessoCliente} = movement;

		Api.get(
			`/core/v1/detalhes-movimentacoes/${endpoint}?IDs=${movement.idMovProcessoCliente}&campos=*&registrosPorPagina=-1`,
		)
			.then(({data}) => {
				const move = data.itens[0];

				if (!movement.lido) {
					dispatch(
						MovementActions.movementReadRequest({
							id: movement.id,
							idMovProcessoCliente,
							movementType: 'marcar',
						}),
					);

					dispatch(
						MovementsActions.toggleAsRead({
							movementId: movement.id,
							read: true,
						}),
					);

					if (movementType === -1) {
						dispatch(
							FolderProcessesActions.folderProcessesRequest({
								filters: {},
								page: 1,
								perPage: 20,
							}),
						);
					} else {
						dispatch(
							FolderKeywordsActions.folderKeywordsRequest({
								filters: {},
								page: 1,
								perPage: 20,
							}),
						);
					}
				}

				setMovement({...move, idMovProcessoCliente});
			})
			.finally(() => setLoading(false));

		return;
	}, []);

	useEffect(() => {		
		setDaysDeleteMovTrash(currentDayDeleteMovTrash);
	}, [currentDayDeleteMovTrash]);


	const requestPermission = useCallback(async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
			);

			return granted === PermissionsAndroid.RESULTS.GRANTED;
		} catch (err) {
			console.warn(err);
		}

		return false;
	});

	const downloadMovement = useCallback(
		async (item, sharing = false) => {
			const downloadPromise = new Promise(async (resolve, reject) => {
				const havePermission = Platform.OS == 'ios' || (await requestPermission());

				if (!havePermission) setDownloading(false);

				await getLogin();

				const token = await AsyncStorage.getItem(TOKEN);

				if (!sharing) {
					setDownloading(true);

					Toast.show(
						`Download ${
							item.idTipoMovProcesso === -1 ? 'do andamento' : 'da publicação'
						} iniciado, por favor, aguarde.`,
					);
				}

				const filename = `${Date.now()}.pdf`;

				const path =
					Platform.OS == 'ios' ? dirs.DocumentDir + `/${filename}` : dirs.DCIMDir + `/${filename}`;

				RNFetchBlob.config({
					fileCache: true,
					path: path,
					addAndroidDownloads: {
						useDownloadManager: true,
						notification: true,
						mediaScannable: true,
						description: `${
							item.idTipoMovProcesso === -1
								? 'Andamento disponibilizado'
								: 'Publicação disponibilizada'
						} via Advise Hub App`,
						path: dirs.DCIMDir + `/${filename}`,
					},
				})
					.fetch(
						'GET',
						`${BASE_URL}/core/v1/movimentos-download?ids=${item.idMovProcessoCliente}&tipoArquivo=pdf`,
						{
							Authorization: `Bearer ${token}`,
						},
					)
					.then(res => {
						if (!sharing) {
							dispatch(
								ToastNotifyActions.toastNotifyShow(
									`${
										item.idTipoMovProcesso === -1 ? 'Andamento baixado' : 'Publicação baixada'
									} com sucesso!`,
									false,
								),
							);
						}

						if (Platform.OS === 'ios' && !sharing) {
							RNFetchBlob.fs.writeFile(path, res.data, 'base64');
							RNFetchBlob.ios.openDocument(path);
						}

						if (sharing) {
							RNFetchBlob.fs.readFile(res.data, 'base64').then(file => {
								resolve({
									file,
									fileName: filename,
								});
							});
						}
					})
					.catch(err => {
						dispatch(
							ToastNotifyActions.toastNotifyShow(
								`Erro ao baixar ${
									item.idTipoMovProcesso === -1 ? 'o andamento' : 'a publicação'
								}, tente novamente mais tarde.`,
								true,
							),
						);

						reject();
					})
					.finally(() => setDownloading(false));
			});

			return downloadPromise;
		},
		[moveReference],
	);

	const customActions = useMemo(
		() => (
			<HeaderAction>
				<MaterialIcons
					name={'more-vert'}
					size={20}
					color={colors.fadedBlack}
					onPress={() => menuRef.current?.open()}
				/>
			</HeaderAction>
		),
		[colors],
	);

	const renderMenu = useMemo(
		() => (
			<Menu
				ref={menuRef}
				movement={movement}
				type={movementType}
				openEmail={() => emailRef.current?.open()}
				openConfirmation={() => confirmationRef.current?.open()}
				openDeadline={() => deadlineRef.current?.open()}
				download={(move, sharing) => downloadMovement(move, sharing)}
				isDownloading={downloading}
			/>
		),
		[movement, movementType, downloading],
	);

	const renderEmail = useMemo(
		() => (
			<Email
				ref={emailRef}
				movement={{...movement, idMovProcessoCliente: movement.idMovProcessoCliente}}
			/>
		),
		[movement],
	);

	const renderConfirmation = useMemo(
		() => (
			<Confirmation
				ref={confirmationRef}
				movement={moveReference}
				remove={id => removeFromList(id)}
				daysDeleteMovTrash = {daysDeleteMovTrash}
			/>
		),
		[moveReference,daysDeleteMovTrash],
	);

	const renderAddDeadline = useMemo(
		() => <AddDeadline ref={deadlineRef} movement={moveReference} />,
		[moveReference,colors],
	);

	const removeFromList = useCallback(() => {
		const move = props.route.params.movement;

		dispatch(MovementsActions.deleteMovementFromList({id: move.id}));

		props.navigation.goBack();
	}, [props]);

	const renderProcesses = useCallback(() => (
		<Movement key={3}>
			<MovementTags>
				{movement.dataDisponibilizacaoSemHora && (
					<Tag background={colors.gray}>
						<TagText>Andamento realizado em: {movement.dataDisponibilizacaoSemHora}</TagText>
					</Tag>
				)}
				{movement.fonte && (
					<Tag background={colors.gray}>
						<TagText>Fonte: {movement.fonte}</TagText>
					</Tag>
				)}
				{movement.identificador && (
					<Tag background={colors.gray}>
						<TagText>Identificador: {movement.identificador}</TagText>
					</Tag>
				)}
			</MovementTags>
			{movement.pasta && (
				<ProcessNumber>
					<ProcessNumberText>Proc.: {movement.pasta}</ProcessNumberText>
				</ProcessNumber>
			)}
			<MovementContent>{movement.descricaoAndamento}</MovementContent>
		</Movement>
	));

	const renderPublication = useCallback(() => (
		<Movement>
			<MovementTags>
				{movement.dataDivulgacaoFormatada && (
					<Tag background={colors.gray}>
						<TagText>Disponibilização em: {movement.dataDivulgacaoFormatada}</TagText>
					</Tag>
				)}

				{movement.dataPublicacaoFormatada && (
					<Tag background={colors.gray}>
						<TagText>Publicação em: {movement.dataPublicacaoFormatada}</TagText>
					</Tag>
				)}

				{movement.varaDescricao && (
					<Tag background={colors.gray}>
						<TagText>Vara: {movement.varaDescricao}</TagText>
					</Tag>
				)}

				{movement.cidadeComarcaDescricao && (
					<Tag background={colors.gray}>
						<TagText>Comarca: {movement.cidadeComarcaDescricao}</TagText>
					</Tag>
				)}

				{movement.cadernoDescricao && (
					<Tag background={colors.gray}>
						<TagText>Caderno: {movement.cadernoDescricao}</TagText>
					</Tag>
				)}

				{movement.edicaoDiario > 0 && (
					<Tag background={colors.gray}>
						<TagText>Edição do diário: {movement.edicaoDiario || 0}</TagText>
					</Tag>
				)}

				{movement.paginaInicial > 0 && movement.paginaFinal > 0 && (
					<Tag background={colors.gray}>
						<TagText>
							Páginas: {movement.paginaInicial || 0} a {movement.paginaFinal || 0}
						</TagText>
					</Tag>
				)}
			</MovementTags>

			{movement.processoPublicacao ? (
				<>
					{movement.processoPublicacao.length > 0 ? (
						<ProcessNumber>
							<ProcessNumberText>
								Proc.: {MaskCnj(movement.processoPublicacao[0].numeroProcesso)}
							</ProcessNumberText>
						</ProcessNumber>
					) : (
						<ProcessNumber>
							<ProcessNumberText color={colors.red}>Proc.: Não identificado</ProcessNumberText>
							<MaterialIcons name="add-circle-outline" size={20} color={colors.red} />
						</ProcessNumber>
					)}
				</>
			) : (
				<ProcessNumber>
					<ProcessNumberText color={colors.red}>Proc.: Não identificado</ProcessNumberText>
					<MaterialIcons name="add-circle-outline" size={20} color={colors.red} />
				</ProcessNumber>
			)}

			<MovementContent>{movement.despacho}</MovementContent>
			<MovementDispatch>{movement.conteudo}</MovementDispatch>
		</Movement>
	));

	return (
		<Container>
			<Warp>
				{loadingDetails ? (
					<Spinner />
				) : movementType === -1 ? (
					[
						<Header
							title={movement.orgaoJudiciario}
							back={() => props.navigation.goBack()}
							customActions={customActions}
							key={1}
						/>,
						renderProcesses(),
					]
				) : (
					[
						<Header
							title={movement.diarioDescricao}
							back={() => props.navigation.goBack()}
							customActions={customActions}
							key={0}
						/>,
						renderPublication(),
					]
				)}
			</Warp>
			{renderMenu}
			{renderEmail}
			{renderConfirmation}
			{renderAddDeadline}
		</Container>
	);
};
