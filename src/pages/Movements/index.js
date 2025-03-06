import React, {useState, useRef, useCallback, useEffect, createRef, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Appearance, Animated, Platform, PermissionsAndroid} from 'react-native';

import RNShareFile from 'react-native-share-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MovementsActions from 'store/ducks/Movements';
import MovementActions from 'store/ducks/Movement';
import ToastNotifyActions from 'store/ducks/ToastNotify';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SwipeListView} from 'react-native-swipe-list-view';
// import CheckBox from '@react-native-community/checkbox';

import {TOKEN} from 'helpers/StorageKeys';

import {BASE_URL, getLogin} from 'services/Api';

import Header from 'components/Header';
import Spinner from 'components/Spinner';
import {Share} from 'components/Share';

import Filters from './Modals/Filters';
import Email from './Modals/Email';
import Confirmation from './Modals/Confirmation';
import AddDeadline from './Modals/AddDeadline';
import MarkAsRead from './Modals/MarkAsRead';

import {Container, Warp, Actions, ActionButton} from 'assets/styles/global';

import {
	Heading,
	FolderTitle,
	BackButton,
	Movement,
	MovementHeader,
	MovementHeading,
	MovementResume,
	MovementAction,
	MovementTags,
	Tag,
	TagText,
	NotFound,
	Image,
	NotFoundText,
	NotFoundDescription,
} from './styles';

// FolderSelected,
// FolderSelectedTitle,
// FolderSelectedTitleHighlight,
// FolderSelectedActions,
// FolderSelectedActionButton,

import {MaskCnj} from 'helpers/Mask';

// Add Hook UseTheme para pegar o tema global addicionado
import {useTheme} from 'styled-components';

const movementsRef = {};

const dirs = RNFetchBlob.fs.dirs;

// Hook para buscar os dias de delete da lixeira
import {useMovementsGetDeleteTrash} from '@services/hooks/Movements/useMovements';

export default Movements = props => {
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const notFound =
		colorUseTheme.name === 'dark'
			? require('assets/images/not_found/movements_white.png')
			: require('assets/images/not_found/movements.png');

	const listRef = useRef(null);
	const emailRef = useRef(null);
	const filtersRef = useRef(null);
	const confirmationRef = useRef(null);
	const deadlineRef = useRef(null);
	const markasreadRef = useRef(null);

	const [filters, setFilters] = useState({});
	const [currentPage, setCurrentPage] = useState(1);

	const {loadingDeleteTrash, currentDayDeleteMovTrash} = useMovementsGetDeleteTrash();
	const [daysDeleteMovTrash, setDaysDeleteMovTrash] = useState(30);

	const movements = useSelector(state =>
		state.movements.data.map(movement => {
			if (!movementsRef[movement.id]) movementsRef[movement.id] = new Animated.Value(1);

			return movement;
		}),
	);

	const endReached = useSelector(state => state.movements.endReached);
	const loading = useSelector(state => state.movements.loading);
	const loadingMore = useSelector(state => state.movements.loadingMore);
	const diaries = useSelector(state => state.movements.diaries);
	const tribunals = useSelector(state => state.movements.tribunals);
	const refreshing = useSelector(state => state.movements.refreshing);

	const [folder] = useState(props.route.params.item);

	const [downloading, setDownloading] = useState(false);
	const [trigger, setTrigger] = useState(false);
	const [currentMove, setCurrentMove] = useState(movements[0]);
	const [formattedData, setFormattedData] = useState({});
	// const [selecteds, setSelecteds] = useState(0);
	// const [selectAll, setSelectedAll] = useState(selecteds > 0 ? true : false);

	const [sharing, setSharing] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (loadingMore || loading) return;
		dispatch(
			MovementsActions.movementsRequest({
				filters,
				page: currentPage,
				perPage: 50,
				folderId: folder.id,
			}),
		);

		if (folder.idTipoPasta == -2)
			dispatch(
				MovementsActions.diariesRequest({
					idPalavraChave: folder.idPalavraChave,
				}),
			);
		else
			dispatch(
				MovementsActions.tribunalsRequest({
					processNumber: folder.numeroProcesso,
				}),
			);
	}, [trigger, filters]);

	// useEffect(() => {
	//   if (loadingMore || loading) return;
	//   console.error(`xablau`);

	//   dispatch(
	//     MovementsActions.movementsRequest({
	//       filters,
	//       page: currentPage,
	//       perPage: 50,
	//       folderId: folder.id
	//     })
	//   );
	// }, [trigger, filters]);

	useEffect(() => {
		const custom =
			folder.idTipoPasta == -2
				? {
						title: 'Diários',
						name: 'IdsDiarios',
						data: diaries.map(diarie => {
							return {nome: diarie.nomeDiario, id: diarie.idDiario};
						}),
				  }
				: {
						title: 'Tribunais',
						name: 'IdsOrgaosJudiciarios',
						data: tribunals.map(tribunal => {
							return {nome: tribunal.nomeOrgaoJudiciario, id: tribunal.idOrgaoJudiciario};
						}),
				  };
		setFormattedData(custom);
	}, [props, tribunals, folder, diaries]);

	useEffect(
		() =>
			movements.forEach((move, i) => {
				if (!movementsRef[move.id]) movementsRef[move.id] = new Animated.Value(1);
			}),
		[movements],
	);

	useEffect(() => {
		setDaysDeleteMovTrash(currentDayDeleteMovTrash);
	}, [currentDayDeleteMovTrash]);

	/** LIST */
	const refresh = useCallback(() => {
		dispatch(
			MovementsActions.movementsRefresh({
				filters,
				page: 1,
				perPage: 50,
				folderId: folder.id,
				refreshing: true,
			}),
		);
	}, [filters, folder]);

	const onEndReached = useCallback(() => {
		if (endReached || loadingMore) return;

		setCurrentPage(currentPage + 1);

		setTrigger(!trigger);
	}, [currentPage, loadingMore, trigger]);

	/** Actions */
	/** MARCAR COMO LIDA */
	const toggleAsRead = useCallback(({item}) => {
		dispatch(
			MovementActions.movementReadRequest({
				id: item.id,
				idMovProcessoCliente: item.idMovProcessoCliente,
				movementType: item.lido ? 'desmarcar' : 'marcar',
			}),
		);

		dispatch(
			MovementsActions.toggleAsRead({
				movementId: item.id,
				read: !item.lido,
			}),
		);

		closeOpenedRow(item.id);
	});

	/** COMPARTILHAR */
	const share = useCallback(async data => {
		try {
			setSharing(true);
			const havePermission = Platform.OS === 'ios' || (await requestPermission());

			if (havePermission) {
				const {file, fileName} = await downloadMovement(data, true);
				const error = await RNShareFile(file, fileName);

				if (error) {
					console.error('Erro ao compartilhar:', error);
					throw error;
				}

				handleMarkAsRead(data.item);
			}
		} catch (error) {
			console.error('Erro detalhado:', error);
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					`Erro ao compartilhar ${
						data.item.idTipoMovProcesso === -1 ? 'o andamento' : 'a publicação'
					}, tente novamente mais tarde.`,
					true,
				),
			);
		} finally {
			setSharing(false);
		}
	});

	/** CRIAR PRAZO */
	const handleDeadline = useCallback(({item}) => {
		setCurrentMove(item);

		deadlineRef.current?.open();
	}, []);

	/** EMAIL */
	const handleEmail = useCallback(({item}) => {
		setCurrentMove(item);

		emailRef.current?.open();
	});

	/** MARCAR COMO LIDA */
	const handleMarkAsRead = useCallback(move => {
		if (!move.lido) markasreadRef.current?.open();
	}, []);

	/** DOWNLOAD */
	const requestPermission = useCallback(async () => {
		try {
			const permissions = await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
			]);

			const granted = Object.values(permissions).every(
				value => value === PermissionsAndroid.RESULTS.GRANTED,
			);

			return granted;
		} catch (err) {
			console.warn(err);
		}

		return false;
	});

	const downloadMovement = useCallback(async ({item}, sharing = false) => {
		const downloadPromise = new Promise(async (resolve, reject) => {
			const havePermission = Platform.OS === 'ios' || (await requestPermission());

			if (!havePermission) {
				setDownloading(false);
			}

			await getLogin();

			const token = await AsyncStorage.getItem(TOKEN);

			setCurrentMove(item);

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

					setCurrentMove(item);

					handleMarkAsRead(item);

					if ((Platform.OS === 'ios') & !sharing) {
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
	}, []);

	/** DELEÇÃO */
	const handleDelete = useCallback(({item}) => {
		setCurrentMove(item);

		confirmationRef.current?.open();
	});

	const removeFromList = useCallback(
		id => {
			if (movementsRef[id]) {
				Animated.timing(movementsRef[id], {
					toValue: 0,
					duration: 300,
					useNativeDriver: false,
				}).start();
			}
		},
		[movementsRef],
	);

	const openRow = useCallback(
		key =>
			!listRef.current._rows[key].isOpen
				? listRef.current._rows[key].manuallySwipeRow(-300)
				: closeOpenedRow(key),
		[listRef],
	);

	const closeOpenedRow = useCallback(key => listRef.current._rows[key].closeRow());

	/** FILTERS */
	const openFilters = () => filtersRef.current?.open();

	const handleSubmit = useCallback(data => {
		setCurrentPage(1);
		setFilters(data);
	}, []);

	/** RENDER MODALS */
	const renderFilters = useMemo(
		() => (
			<Filters
				ref={filtersRef}
				customField={formattedData}
				submit={data => handleSubmit(data)}
				filters={filters}
			/>
		),
		[formattedData],
	);

	const renderEmail = useMemo(
		() => (
			<Email
				ref={emailRef}
				movement={currentMove}
				onConfirm={() => handleMarkAsRead(currentMove)}
			/>
		),
		[currentMove],
	);

	const renderConfirmation = useMemo(
		() => (
			<Confirmation
				ref={confirmationRef}
				movement={currentMove}
				remove={id => removeFromList(id)}
				daysDeleteMovTrash={daysDeleteMovTrash}
			/>
		),
		[currentMove],
	);

	const renderAddDeadline = useMemo(
		() => <AddDeadline ref={deadlineRef} movement={currentMove} />,
		[currentMove],
	);

	const renderMarkAsRead = useMemo(
		() => <MarkAsRead ref={markasreadRef} movement={currentMove} onConfirm={closeOpenedRow} />,
		[currentMove],
	);

	/** RENDERS */
	const renderHiddenItem = useCallback(data => (
		<Actions
			as={Animated.View}
			style={{
				overflow: 'hidden',
				maxHeight: movementsRef[data.item.id].interpolate({
					inputRange: [0, 1],
					outputRange: [0, 500],
				}),
			}}>
			<ActionButton onPress={() => toggleAsRead(data)}>
				<MaterialIcons
					name={data.item.lido ? 'visibility-off' : 'visibility'}
					size={24}
					color={colors.fadedBlack}
				/>
			</ActionButton>
			<ActionButton onPress={() => handleDeadline(data)}>
				<MaterialIcons name="event" size={24} color={colors.fadedBlack} />
			</ActionButton>
			<ActionButton onPress={() => handleEmail(data)}>
				<MaterialIcons name="mail" size={24} color={colors.fadedBlack} />
			</ActionButton>
			<ActionButton onPress={() => !downloading && downloadMovement(data)}>
				{downloading ? (
					<Spinner height={24} />
				) : (
					<MaterialIcons name="file-download" size={24} color={colors.fadedBlack} />
				)}
			</ActionButton>
			<ActionButton onPress={() => !sharing && share(data)}>
				{sharing ? (
					<Spinner height={24} />
				) : (
					<MaterialIcons name="share" size={24} color={colors.fadedBlack} />
				)}
			</ActionButton>
			<ActionButton onPress={() => handleDelete(data)}>
				<MaterialIcons name="delete" size={24} color={colors.fadedBlack} />
			</ActionButton>
		</Actions>
	));

	const renderItem = useCallback(
		({item}) => (
			<Animated.View
				style={{
					overflow: 'hidden',
					maxHeight: movementsRef[item.id].interpolate({
						inputRange: [0, 1],
						outputRange: [0, 500],
					}),
				}}>
				<Movement>
					<MovementHeader>
						<MovementHeading
							numberOfLines={1}
							onPress={() =>
								props.navigation.navigate('MovementDetail', {
									movement: item,
									movementType: item.idTipoMovProcesso,
								})
							}
							underlayColor={colors.white}
							activeOpacity={1}
							read={item.lido}>
							{item.title}
						</MovementHeading>
						<MovementAction onPress={() => openRow(item.id)}>
							<MaterialIcons name="more-horiz" size={25} color={colors.fadedBlack} />
						</MovementAction>
					</MovementHeader>
					<MovementResume
						numberOfLines={2}
						onPress={() =>
							props.navigation.navigate('MovementDetail', {
								movement: item,
								movementType: item.idTipoMovProcesso,
							})
						}
						underlayColor={colors.white}
						activeOpacity={1}>
						{item.resumo}
					</MovementResume>

					<MovementTags
						onPress={() =>
							props.navigation.navigate('MovementDetail', {
								movement: item,
								movementType: item.idTipoMovProcesso,
							})
						}
						underlayColor={colors.white}
						activeOpacity={1}>
						{!item.lido && (
							<Tag background={colors.blue200}>
								<TagText>{item.idTipoMovProcesso === -1 ? 'Não lido' : 'Não lida'}</TagText>
							</Tag>
						)}
						{item.idTipoMovProcesso === -1 && (
							<>
								<Tag background={item.lido ? colors.gray : colors.orange200}>
									<TagText>Andamento</TagText>
								</Tag>
								{item.numeroProcesso && (
									<Tag background={colors.gray}>
										<TagText>Proc.: {item.numeroProcesso}</TagText>
									</Tag>
								)}
							</>
						)}

						{item.idTipoMovProcesso === -2 && (
							<>
								<Tag background={item.lido ? colors.gray : colors.amber}>
									<TagText>Publicado em: {item.dataPublicacao}</TagText>
								</Tag>

								{item.palavrasChaves.map(
									keyword =>
										keyword.idPalavraChavePrincipal === undefined && (
											<Tag
												background={
													keyword.palavraChave == folder.nome && !item.lido
														? colors.green
														: colors.gray
												}
												key={keyword.id}>
												<TagText>{keyword.palavraChave}</TagText>
											</Tag>
										),
								)}
								{item.numeroProcesso ? (
									<Tag background={colors.gray}>
										<TagText>Proc.: {MaskCnj(item.numeroProcesso)}</TagText>
									</Tag>
								) : (
									<Tag background={colors.gray}>
										<TagText>Proc.: Não identificado</TagText>
									</Tag>
								)}
							</>
						)}
					</MovementTags>
				</Movement>
			</Animated.View>
		),
		[movements],
	);

	const renderFooter = useCallback(() => loading && <Spinner />);

	return (
		<Container>
			<Warp>
				<Header title="Movimentações" filter={() => openFilters()} />
				<Heading>
					<BackButton
						onPress={() => {
							setCurrentPage(1);
							props.navigation.goBack();
						}}>
						<MaterialIcons name="arrow-back" size={20} color={colors.fadedBlack} />
					</BackButton>
					<FolderTitle>{MaskCnj(folder.nome)}</FolderTitle>
				</Heading>

				{loading && currentPage == 1 ? (
					<Spinner />
				) : (
					<>
						{movements.length > 0 ? (
							<SwipeListView
								onRefresh={refresh}
								refreshing={refreshing}
								ref={listRef}
								data={movements}
								disableRightSwipe
								previewRowKey={'2'}
								rightOpenValue={-300}
								stopRightSwipe={-300}
								closeOnRowOpen={false}
								renderItem={renderItem}
								previewOpenValue={-300}
								previewOpenDelay={2000}
								useNativeDriver={false}
								onEndReached={onEndReached}
								ListFooterComponent={renderFooter}
								renderHiddenItem={renderHiddenItem}
								keyExtractor={(item, _) => item.id.toString()}
								removeClippedSubviews={true}
								maxToRenderPerBatch={5}
								updateCellsBatchingPeriod={100}
								initialNumToRender={20}
							/>
						) : (
							<NotFound>
								<Image source={notFound} />
								<NotFoundText>Não há resultados</NotFoundText>
								<NotFoundDescription>Tente uma busca diferente!</NotFoundDescription>
							</NotFound>
						)}
					</>
				)}
				{renderFilters}
				{renderEmail}
				{renderConfirmation}
				{renderAddDeadline}
				{renderMarkAsRead}
			</Warp>
		</Container>
	);
};

// {selecteds == 0 ? (
//   <Heading>
//     <BackButton onPress={() => props.navigation.goBack()}>
//       <MaterialIcons name="arrow-back" size={20} color={colors.fadedBlack} />
//     </BackButton>
//     <FolderTitle>{MaskCnj(folder.nome)}</FolderTitle>
//   </Heading>
// ) : (
//   <Heading>
//     <FolderSelected>
//       <FolderSelectedTitle>
//         <FolderSelectedTitleHighlight>Selecionado {selecteds}</FolderSelectedTitleHighlight> de {movements.length} publicações
//       </FolderSelectedTitle>
//       <FolderSelectedActions>
//         {/* <FolderSelectedActionButton onPress={() => console.log('clicked')}>
//             <MaterialIcons name="preview" size={22} color={colors.fadedBlack} />
//           </FolderSelectedActionButton> */}
//         <FolderSelectedActionButton onPress={() => console.log('clicked')}>
//           <MaterialIcons name="mail" size={22} color={colors.fadedBlack} />
//         </FolderSelectedActionButton>
//         <FolderSelectedActionButton onPress={() => console.log('clicked')}>
//           <MaterialIcons name="delete" size={22} color={colors.fadedBlack} />
//         </FolderSelectedActionButton>
//       </FolderSelectedActions>
//     </FolderSelected>
//   </Heading>
// )}
/* <CheckBox
                  lineWidth={1.5}
                  boxType={'square'}
                  value={selectAll}
                  onValueChange={newValue => toggleCheckAll(newValue)}
                  animationDuration={0.2}
                  tintColors={{ true: colors.primary }}
                  tintColor={colors.primary}
                  onCheckColor={colors.white}
                  onFillColor={colors.primary}
                  onTintColor={colors.primary}
                  style={{ width: 18, height: 18, marginRight: 12, marginVertical: 1 }}
                /> */
/* <ActionButton onPress={() => console.log('clicked')}>
        <MaterialIcons name="get-app" size={24} color={colors.fadedBlack} />
      </ActionButton>
      <ActionButton onPress={() => console.log('clicked')}>
        <MaterialIcons name="delete" size={24} color={colors.fadedBlack} />
      </ActionButton> */

/* {<CheckBox
          lineWidth={1.5}
          boxType={'square'}
          value={item.checked}
          onValueChange={newValue => toggleCheck(item, newValue)}
          animationDuration={0.2}
          tintColor={colors.primary}
          tintColors={{ true: colors.primary }}
          onCheckColor={colors.white}
          onFillColor={colors.primary}
          onTintColor={colors.primary}
          style={{ width: 18, height: 18, marginRight: 12 }}
        />} */

// const toggleCheck = useCallback((item, checked) => {
//   item.checked = checked;

//   const selectedItems = checked ? selecteds + 1 : selecteds - 1;

//   setSelecteds(selectedItems);
// });

// const toggleCheckAll = useCallback(check => {
//   setSelectedAll(check);

//   dispatch(MovementsActions.toggleMovements(check));

//   setSelecteds(check ? movements.length : 0);
// });

// const renderMovementTitle = useCallback(movement => {
//   let title = FormatDateBR(movement.dataHoraMovimento);

//   let { andamentoProcesso } = movement;

//   if (movement.idTipoMovProcesso == -1) {
//     title += ' - ' + movimento.siglaOrgaoJudiriario;
//     if (movimento.nomeFontePesquisa) title += ' - ' + movimento.nomeFontePesquisa;
//   } else
//     title += ' - ' + movement.publicacao.descricaoCadernoDiario;

//   return title;
// });
