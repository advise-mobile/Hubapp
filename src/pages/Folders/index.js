import React, { useState, useEffect, useCallback } from 'react';
import { KeyboardAvoidingView, Appearance } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FolderKeywordsActions from 'store/ducks/FolderKeywords';
import FolderProcessesActions from 'store/ducks/FolderProcesses';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { PermissionsGroups, checkPermission } from 'helpers/Permissions';

import Header from 'components/Header';
import Spinner from 'components/Spinner';
import CustomTabs from 'components/CustomTabs';
import HasNotPermission from 'components/HasNotPermission';

import { colors } from 'assets/styles';

import { MaskCnj } from 'helpers/Mask';

import {
  Container,
  Warp,
} from 'assets/styles/general';

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

export default function Folders(props) {
  // const add = () => { console.log("add") };
  // const edit = () => { console.log("edit") };

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
  const endKeywordsReached = useSelector(state => state.folderKeywords.endReached);
  const loadingKeywords = useSelector(state => state.folderKeywords.loading);
  const totalKeywordsNotRead = useSelector(state => state.folderKeywords.totalNotRead);

  const folderProcesses = useSelector(state => state.folderProcesses.data);
  const endProcessesReached = useSelector(state => state.folderProcesses.endReached);
  const loadingProcesses = useSelector(state => state.folderProcesses.loading);
  const totalProcessesNotRead = useSelector(state => state.folderProcesses.totalNotRead);

  const colorScheme = Appearance.getColorScheme();

  const image = (colorScheme == 'dark') ? require('assets/images/permissions/folders_white.png') : require('assets/images/permissions/folders.png');

  const notFound = (colorScheme == 'dark') ? require('assets/images/not_found/movements_white.png') : require('assets/images/not_found/movements.png');

  const dispatch = useDispatch();
  const threshold = 0;

  useEffect(() => {
    props.navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      return;
    })
  }, []);

  useEffect(() => {
    checkPermission(PermissionsGroups.PUBLICATIONS).then(permission => setPublicationsPermission(permission));
    checkPermission(PermissionsGroups.PROCESSES).then(permission => setProcessesPermission(permission));
  }, [props]);

  useEffect(() => {
    dispatch(
      FolderKeywordsActions.folderKeywordsRequest({
        filters,
        page: currentKeywordsPage,
        perPage: 20,
      })
    );
  }, [filters, triggerKeywordRequest]);

  useEffect(() => {
    dispatch(
      FolderProcessesActions.folderProcessesRequest({
        filters: processFilters,
        page: currentProcessesPage,
        perPage: 20,
      })
    )
  }, [processFilters, triggerProcessesRequest]);

  const onKeywordsEndReached = useCallback(() => {
    if (endKeywordsReached) return;

    setCurrentKeywordsPage(currentKeywordsPage + 1);

    setTriggerKeywordRequest(!triggerKeywordRequest);
  }, []);

  const onProcessesEndReached = useCallback(() => {
    if (endProcessesReached) return;

    setCurrentProcessesPage(currentProcessesPage + 1);

    setTriggerProcessesRequest(!triggerProcessesRequest);
  }, []);

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
          placeholder='Buscar palavra-chave'
          placeholderTextColor={colors.grayLight}
          value={keywordSearch}
          onChangeText={typedSearch => setKeywordSearch(typedSearch)}
          onSubmitEditing={searchKeyword}
          returnKeyType='search'
        />
        <SearchButton onPress={() => searched ? clearSearchKeyword() : searchKeyword()}>
          <MaterialIcons size={20} name={searched ? "close" : "search"} color={colors.fadedBlack} />
        </SearchButton>
      </SearchBar>
    </>
  );

  const renderKeywordsNotFound = useCallback(() => (
    <>
      {!loadingKeywords &&
        <NotFound>
          <Image source={notFound} />
          <NotFoundText>Não há resultados</NotFoundText>
          <NotFoundDescription>Tente uma busca diferente!</NotFoundDescription>
        </NotFound>
      }
    </>
  ), [loadingKeywords]);

  const renderProcessesNotFound = useCallback(() => (
    <>
      {!loadingProcesses &&
        <NotFound>
          <Image source={notFound} />
          <NotFoundText>Não há resultados</NotFoundText>
          <NotFoundDescription>Tente uma busca diferente!</NotFoundDescription>
        </NotFound>
      }
    </>
  ), [loadingProcesses]);

  const renderKeywordsFooter = useCallback(() => {
    if (!loadingKeywords) return null;

    return <Spinner />
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
          placeholder='Buscar processo'
          placeholderTextColor={colors.grayLight}
          value={processSearch}
          onChangeText={typedSearch => setProcessSearch(typedSearch)}
          onSubmitEditing={searchProcess}
          returnKeyType='search'
        />
        <SearchButton onPress={() => searchedProcess ? clearSearchProcess() : searchProcess()}>
          <MaterialIcons size={20} name={searchedProcess ? "close" : "search"} color={colors.fadedBlack} />
        </SearchButton>
      </SearchBar>
    </>
  );

  const renderProcessesFooter = useCallback(() => {
    if (!loadingProcesses) return null;

    return <Spinner />
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
    setFilters({ nome: keywordSearch });

    setSearched(keywordSearch.length > 0);
  }, [keywordSearch]);


  const searchProcess = useCallback(() => {
    setCurrentProcessesPage(1);
    setProcessFilters({ nome: processSearch });

    setSearchedProcess(processSearch.length > 0);
  }, [processSearch]);

  const Publicacoes = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
      tabLabel="Publicações"
    >
      {publicationsPermission ?
        <List
          data={folderKeywords}
          renderItem={renderList}
          keyExtractor={(_, index) => index.toString()}
          onEndReached={onKeywordsEndReached}
          onEndReachedThreshold={threshold}
          ListHeaderComponent={renderKeywordsHeader()}
          ListFooterComponent={renderKeywordsFooter}
          ListEmptyComponent={renderKeywordsNotFound}
        />
        :
        <HasNotPermission
          image={image}
          title="Informações detalhadas sobre suas publicações e processos!"
          body="Monitore e receba de forma unificada as informações referentes às suas publicações e processos. Escolha o tribunal, órgão oficial ou diários de forma simples e segura."
        />
      }
    </KeyboardAvoidingView>
  );

  const Processos = () => (
    <Container
      tabLabel="Processos"
    >
      {processesPermission ?
        <List
          data={folderProcesses}
          renderItem={renderList}
          keyExtractor={(_, index) => index.toString()}
          onEndReached={onProcessesEndReached}
          onEndReachedThreshold={threshold}
          ListHeaderComponent={renderProcessesHeader()}
          ListFooterComponent={renderProcessesFooter}
          ListEmptyComponent={renderProcessesNotFound}
        />
        :
        <HasNotPermission
          image={image}
          title="InfoInformações detalhadas sobre suas publicações e processos!"
          body="Monitore e receba de forma unificada as informações referentes às suas publicações e processos. Escolha o tribunal, órgão oficial ou diários de forma simples e segura."
        />
      }
    </Container>
  );

  const renderList = folder => (
    <>
      { loadingKeywords && currentKeywordsPage == 1 ? <Spinner /> :
        <ListItem onPress={() => props.navigation.push('Movements', folder)}>
          <ListItemText>{MaskCnj(folder.item.nome)}</ListItemText>
          <ListItemCounterContainer>
            <ListItemCounterText>{folder.item.totalNaoLidas}</ListItemCounterText>
          </ListItemCounterContainer>
          <MaterialIcons size={20} name="arrow-forward" color={colors.fadedBlack} />
        </ListItem>
      }
    </>
  );

  const renderTabBar = () => <CustomTabs />;

  return (
    <Container>
      <Warp>
        {/* <Header title='Movimentações' add={add} edit={edit} /> */}
        <Header title='Movimentações' />
        <ScrollableTabView renderTabBar={renderTabBar}>
          {Publicacoes()}
          {Processos()}
        </ScrollableTabView>
      </Warp>
    </Container>
  );
}
