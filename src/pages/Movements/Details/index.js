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
import {useTheme} from 'styled-components';

// Hook para buscar os dias de delete da lixeira
import {useMovementsGetDeleteTrash} from '@services/hooks/Movements/useMovements';

import RNShareFile from 'react-native-share-pdf';

export default MovementDetail = props => {
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const [movementType] = useState(props.route.params.movementType);
	const [movement, setMovement] = useState(props.route.params.movement);
	const [moveReference, setMoveReference] = useState(null);
	const [loadingDetails, setLoading] = useState(true);
	const [downloading, setDownloading] = useState(false);
	const [sharing, setSharing] = useState(false);

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

		const buscarDados = async () => {
			try {
				const {data} = await Api.get(
					`/core/v1/detalhes-movimentacoes/${endpoint}?IDs=${movement.idMovProcessoCliente}&campos=*&registrosPorPagina=-1`,
				);

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
			} catch (erro) {
				console.error('Erro ao buscar detalhes do movimento:', erro);
			} finally {
				setLoading(false);
			}
		};

		buscarDados();

		// Função de limpeza simplificada
		return () => {
			// Fecha os modais ao desmontar o componente
			if (menuRef.current?.close) menuRef.current.close();
			if (emailRef.current?.close) emailRef.current.close();
			if (deadlineRef.current?.close) deadlineRef.current.close();
			if (confirmationRef.current?.close) confirmationRef.current.close();
		};
	}, []);

	useEffect(() => {
		setDaysDeleteMovTrash(currentDayDeleteMovTrash);
	}, [currentDayDeleteMovTrash]);

	const requestPermission = async () => {
		try {
			if (Platform.OS === 'android') {
				// Para Android 13 (API 33) e superior, não precisamos de permissão para downloads
				if (Platform.Version >= 33) {
					return true;
				}

				// Para Android 12 e inferior, precisamos da permissão de armazenamento
				const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

				const status = await PermissionsAndroid.request(permission, {
					title: 'Permissão necessária',
					message: 'O app precisa de acesso ao armazenamento para baixar e compartilhar arquivos.',
					buttonPositive: 'OK',
				});

				return status === PermissionsAndroid.RESULTS.GRANTED;
			}
			return true;
		} catch (err) {
			console.error('=== PERMISSIONS DEBUG: Error:', err);
			return false;
		}
	};

	const downloadMovement = useCallback(
		async (item, sharing = false) => {
			const downloadPromise = new Promise(async (resolve, reject) => {
				const havePermission = Platform.OS === 'ios' || (await requestPermission());

				if (!havePermission) {
					setDownloading(false);
					return;
				}

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
					Platform.OS == 'ios'
						? dirs.DocumentDir + `/${filename}`
						: dirs.DownloadDir + `/${filename}`;

				RNFetchBlob.config({
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
						path: dirs.DownloadDir + `/${filename}`,
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
					.catch(() => {
						if (!sharing) {
							dispatch(
								ToastNotifyActions.toastNotifyShow(
									`Erro ao baixar ${
										item.idTipoMovProcesso === -1 ? 'o andamento' : 'a publicação'
									}, tente novamente mais tarde.`,
									true,
								),
							);
						} else {
							dispatch(
								ToastNotifyActions.toastNotifyShow(
									`Erro ao compartilhar ${
										item.idTipoMovProcesso === -1 ? 'o andamento' : 'a publicação'
									}, tente novamente mais tarde.`,
									true,
								),
							);
						}

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

	const share = useCallback(async () => {
		try {
			setSharing(true);
			const havePermission = Platform.OS === 'ios' || (await requestPermission());

			if (havePermission) {
				const {file, fileName} = await downloadMovement(movement, true);
				await RNShareFile(file, fileName);

				if (!movement.lido) {
					handleMarkAsRead(movement);
				}
			}
		} catch (error) {
			console.error('Erro detalhado:', error);
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					`Erro ao compartilhar ${
						movement.idTipoMovProcesso === -1 ? 'o andamento' : 'a publicação'
					}, tente novamente mais tarde.`,
					true,
				),
			);
		} finally {
			setSharing(false);
		}
	}, [movement]);

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
				share={share}
				isDownloading={downloading}
			/>
		),
		[movement, movementType, downloading, share],
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
				daysDeleteMovTrash={daysDeleteMovTrash}
			/>
		),
		[moveReference, daysDeleteMovTrash],
	);

	const renderAddDeadline = useMemo(
		() => <AddDeadline ref={deadlineRef} movement={moveReference} />,
		[moveReference, colors],
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
