import React, {useState, useEffect, useCallback} from 'react';
import {KeyboardAvoidingView, Appearance, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FolderKeywordsActions from 'store/ducks/FolderKeywords';
import FolderProcessesActions from 'store/ducks/FolderProcesses';
import ScrollableTabView from 'components/ScrollableTabView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {PermissionsGroups, checkPermission, getLoggedUser} from 'helpers/Permissions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {SHOW_PROMOTION} from 'helpers/StorageKeys';

import Header from 'components/Header';
import Spinner from 'components/Spinner';
import CustomTabs from 'components/CustomTabs';
import HasNotPermission from 'components/HasNotPermission';

import Blocked from 'pages/Blocked';

import Promotion from '../Promotion';

// Add Hook UseTheme para pegar o tema global addicionado
import {useTheme} from 'styled-components';

import {MaskCnj} from 'helpers/Mask';

import {Container, Warp} from 'assets/styles/global';

import {
	Card,
	CardCounter,
	CardContainer,
	CardDescription,
	CardSubtitle,
	CardInfos,
	Heading,
	List,
	ListItem,
	ListItemText,
	ListItemCounterContainer,
	ListItemCounterText,
	SearchBar,
	SearchInput,
	SearchButton,
	NotFound,
	Image,
	NotFoundText,
	NotFoundDescription,
} from './styles';

import moment from 'moment';

export default function Folders(props) {
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	// - still to create a correct rule to show or not the promotions
	const keepShowLimit = moment().isBefore('2024-11-30', 'second');

	const [seenPromotion, setSeenPromotion] = useState();
	const [filters, setFilters] = useState();
	const [processFilters, setProcessFilters] = useState();
	const [keywordSearch, setKeywordSearch] = useState('');
	const [processSearch, setProcessSearch] = useState('');
	const [currentKeywordsPage, setCurrentKeywordsPage] = useState(1);
	const [triggerKeywordRequest, setTriggerKeywordRequest] = useState(false);
	const [currentProcessesPage, setCurrentProcessesPage] = useState(1);
	const [triggerProcessesRequest, setTriggerProcessesRequest] = useState(false);
	const [publicationsPermission, setPublicationsPermission] = useState(false);
	const [processesPermission, setProcessesPermission] = useState(false);

	const [searched, setSearched] = useState(false);
	const [searchedProcess, setSearchedProcess] = useState(false);

	const folderKeywords = useSelector(state => state.folderKeywords.data);
	const loadingKeywords = useSelector(state => state.folderKeywords.loading);
	const endKeywordsReached = useSelector(state => state.folderKeywords.endReached);

	const totalKeywordsNotRead = useSelector(state => state.folderKeywords.totalNotRead);

	const folderProcesses = useSelector(state => state.folderProcesses.data);
	const endProcessesReached = useSelector(state => state.folderProcesses.endReached);
	const loadingProcesses = useSelector(state => state.folderProcesses.loading);
	const totalProcessesNotRead = useSelector(state => state.folderProcesses.totalNotRead);

	const active = useSelector(state => state.auth.active);

	const image =
		colorUseTheme.name == 'dark'
			? require('assets/images/permissions/folders_white.png')
			: require('assets/images/permissions/folders.png');

	const notFound =
		colorUseTheme.name == 'dark'
			? require('assets/images/not_found/movements_white.png')
			: require('assets/images/not_found/movements.png');

	const dispatch = useDispatch();
	const threshold = 0.5;

	// 👤 Dados do usuário para debug OneSignal
	const userData = useSelector(state => state.user);
	const authData = useSelector(state => state.auth);

	console.log('👤 DADOS DO USUÁRIO (Redux):', userData);
	console.log('🔐 DADOS DE AUTH:', authData);

	useEffect(() => {
		props.navigation.addListener('beforeRemove', e => {
			e.preventDefault();

			return;
		});
	}, []);

	useEffect(() => {
		checkPermission(PermissionsGroups.PUBLICATIONS).then(permission =>
			setPublicationsPermission(permission),
		);
		checkPermission(PermissionsGroups.PROCESSES).then(permission =>
			setProcessesPermission(permission),
		);

		// 👤 Debug dados do usuário do Token JWT
		getLoggedUser().then(user => {
			console.log('👤 DADOS DO USUÁRIO (Token JWT):', user);
		});
	}, [props]);

	useEffect(() => {
		dispatch(
			FolderKeywordsActions.folderKeywordsRequest({
				filters,
				page: currentKeywordsPage,
				perPage: 20,
			}),
		);
	}, [filters, triggerKeywordRequest]);

	useEffect(() => {
		dispatch(
			FolderProcessesActions.folderProcessesRequest({
				filters: processFilters,
				page: currentProcessesPage,
				perPage: 20,
			}),
		);
	}, [processFilters, triggerProcessesRequest]);

	useEffect(async () => {
		const promotion = await AsyncStorage.getItem(SHOW_PROMOTION);
		setSeenPromotion(JSON.parse(promotion) === null ? true : JSON.parse(promotion));
	}, []);

	// Dentro do useEffect existente ou criar um novo:
	useEffect(() => {
		getLoggedUser().then(user => {
			console.log('👤 DADOS DO USUÁRIO (Token JWT):', user);
		});
	}, []);

	const onKeywordsEndReached = useCallback(() => {
		if (endKeywordsReached || loadingKeywords) return;

		setCurrentKeywordsPage(prev => prev + 1);

		setTriggerKeywordRequest(prev => !prev);
	}, [endKeywordsReached, loadingKeywords]);

	const onProcessesEndReached = useCallback(() => {
		if (endProcessesReached || loadingProcesses) return;

		setCurrentProcessesPage(prev => prev + 1);

		setTriggerProcessesRequest(prev => !prev);
	}, [endProcessesReached, loadingProcesses]);

	const renderKeywordsNotFound = useCallback(
		() => (
			<>
				{!loadingKeywords && (
					<NotFound>
						<Image source={notFound} />
						<NotFoundText>Não há resultados</NotFoundText>
						<NotFoundDescription>Tente uma busca diferente!</NotFoundDescription>
					</NotFound>
				)}
			</>
		),
		[loadingKeywords, notFound],
	);

	const renderProcessesNotFound = useCallback(
		() => (
			<>
				{!loadingProcesses && (
					<NotFound>
						<Image source={notFound} />
						<NotFoundText>Não há resultados</NotFoundText>
						<NotFoundDescription>Tente uma busca diferente!</NotFoundDescription>
					</NotFound>
				)}
			</>
		),
		[loadingProcesses, notFound],
	);

	const renderKeywordsHeader = () => (
		<>
			<Card underlayColor={colors.white} activeOpacity={1}>
				<CardInfos>
					<CardCounter>{totalKeywordsNotRead}</CardCounter>
					<CardContainer>
						<CardDescription>Publicações em diários</CardDescription>
						<CardSubtitle>não lidas</CardSubtitle>
					</CardContainer>
					{/* <MaterialIcons size={20} name="arrow-forward" color={colors.fadedBlack} /> */}
				</CardInfos>
			</Card>
			<Heading>Selecione a palavra-chave desejada</Heading>
			<SearchBar>
				<SearchInput
					autoCorrect={false}
					autoCapitalize="none"
					placeholder="Buscar palavra-chave"
					placeholderTextColor={colors.grayLight}
					value={keywordSearch}
					onChangeText={typedSearch => setKeywordSearch(typedSearch)}
					onSubmitEditing={searchKeyword}
					returnKeyType="search"
				/>
				<SearchButton
					onPress={() => (searched ? clearSearchKeyword() : searchKeyword())}
					platform={Platform.OS}>
					<MaterialIcons size={20} name={searched ? 'close' : 'search'} color={colors.fadedBlack} />
				</SearchButton>
			</SearchBar>
		</>
	);

	const renderKeywordsFooter = useCallback(() => {
		if (!loadingKeywords) return null;

		return <Spinner />;
	}, [loadingKeywords]);

	const renderProcessesHeader = () => (
		<>
			<Card underlayColor={colors.white} activeOpacity={1}>
				<CardInfos>
					<CardCounter>{totalProcessesNotRead}</CardCounter>
					<CardContainer>
						<CardDescription>Andamentos processuais</CardDescription>
						<CardSubtitle>não lidos</CardSubtitle>
					</CardContainer>
					{/* <MaterialIcons size={20} name="arrow-forward" color={colors.fadedBlack} /> */}
				</CardInfos>
			</Card>
			<Heading>Selecione o processo desejado</Heading>
			<SearchBar>
				<SearchInput
					autoCorrect={false}
					autoCapitalize="none"
					placeholder="Buscar processo"
					placeholderTextColor={colors.grayLight}
					value={processSearch}
					onChangeText={typedSearch => setProcessSearch(typedSearch)}
					onSubmitEditing={searchProcess}
					returnKeyType="search"
				/>
				<SearchButton onPress={() => (searchedProcess ? clearSearchProcess() : searchProcess())}>
					<MaterialIcons
						size={20}
						name={searchedProcess ? 'close' : 'search'}
						color={colors.fadedBlack}
					/>
				</SearchButton>
			</SearchBar>
		</>
	);

	const renderProcessesFooter = useCallback(() => {
		if (!loadingProcesses) return null;

		return <Spinner />;
	}, [loadingProcesses]);

	const clearSearchKeyword = useCallback(() => {
		setCurrentKeywordsPage(1);
		setKeywordSearch('');
		setFilters({});

		setSearched(false);
	}, []);

	const clearSearchProcess = useCallback(() => {
		setCurrentProcessesPage(1);
		setProcessSearch('');
		setProcessFilters({});

		setSearchedProcess(false);
	}, []);

	const searchKeyword = useCallback(() => {
		setCurrentKeywordsPage(1);
		setFilters({nome: keywordSearch});

		setSearched(keywordSearch.length > 0);
	}, [keywordSearch]);

	const searchProcess = useCallback(() => {
		setCurrentProcessesPage(1);
		setProcessFilters({nome: processSearch});

		setSearchedProcess(processSearch.length > 0);
	}, [processSearch]);

	const Publicacoes = () => (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : null}
			style={{flex: 1}}
			tabLabel="Publicações">
			{publicationsPermission ? (
				<List
					onRefresh={clearSearchKeyword}
					refreshing={false}
					data={folderKeywords}
					renderItem={renderList}
					keyExtractor={(_, index) => index.toString()}
					onEndReached={onKeywordsEndReached}
					onEndReachedThreshold={threshold}
					ListHeaderComponent={renderKeywordsHeader()}
					ListFooterComponent={renderKeywordsFooter}
					ListEmptyComponent={renderKeywordsNotFound}
				/>
			) : (
				<HasNotPermission
					image={image}
					title="Informações detalhadas sobre suas publicações e processos!"
					body="Monitore e receba de forma unificada as informações referentes às suas publicações e processos. Escolha o tribunal, órgão oficial ou diários de forma simples e segura."
				/>
			)}
		</KeyboardAvoidingView>
	);

	const Processos = () => (
		<Container tabLabel="Processos">
			{processesPermission ? (
				<List
					onRefresh={clearSearchProcess}
					refreshing={false}
					data={folderProcesses}
					renderItem={renderList}
					keyExtractor={(_, index) => index.toString()}
					onEndReached={onProcessesEndReached}
					onEndReachedThreshold={threshold}
					ListHeaderComponent={renderProcessesHeader()}
					ListFooterComponent={renderProcessesFooter}
					ListEmptyComponent={renderProcessesNotFound}
				/>
			) : (
				<HasNotPermission
					image={image}
					title="Informações detalhadas sobre suas publicações e processos!"
					body="Monitore e receba de forma unificada as informações referentes às suas publicações e processos. Escolha o tribunal, órgão oficial ou diários de forma simples e segura."
				/>
			)}
		</Container>
	);

	const renderList = folder => (
		<>
			{loadingKeywords && currentKeywordsPage == 1 ? (
				<Spinner />
			) : (
				<ListItem onPress={() => props.navigation.push('Movements', folder)}>
					<ListItemText>{MaskCnj(folder.item.nome)}</ListItemText>
					<ListItemCounterContainer>
						<ListItemCounterText>{folder.item.totalNaoLidas}</ListItemCounterText>
					</ListItemCounterContainer>
					<MaterialIcons size={20} name="arrow-forward" color={colors.fadedBlack} />
				</ListItem>
			)}
		</>
	);

	const navigateToTrash = () => {
		props.navigation.push('MovementsTrash');
	};

	return (
		<Container>
			{active ? (
				<Warp>
					{seenPromotion && keepShowLimit && <Promotion />}
					<Header title="Movimentações" menu={() => navigateToTrash()} />

					<ScrollableTabView
						renderTabBar={props => <CustomTabs {...props} tabs={['Publicações', 'Processos']} />}
						initialPage={0}
						onChangeTab={({i}) => {
							// Aqui você pode adicionar lógica adicional quando a tab mudar
						}}>
						<Publicacoes />
						<Processos />
					</ScrollableTabView>
				</Warp>
			) : (
				<Blocked />
			)}
		</Container>
	);
}
