import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { KeyboardAvoidingView, Appearance, Platform, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FolderKeywordsActions from '@lstore/ducks/FolderKeywords';
import FolderProcessesActions from '@lstore/ducks/FolderProcesses';
import ScrollableTabView from '@components/ScrollableTabView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  PermissionsGroups,
  checkPermission,
  getLoggedUser,
} from '@lhelpers/Permissions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SHOW_PROMOTION } from '@lhelpers/StorageKeys';

import Header from '@lcomponents/Header';
import Spinner from '@lcomponents/Spinner';
import CustomTabs from '@lcomponents/CustomTabs';
import HasNotPermission from '@lcomponents/HasNotPermission';

import Blocked from '@lpages/Blocked';

import Promotion from '@pages/Promotion';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

import { MaskCnj } from '@lhelpers/Mask';

import { Container, Warp } from '@lassets/styles/global';

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

// Componente estável para o header de keywords (fora do componente principal)
const KeywordsHeaderComponent = React.memo(
  ({
    searched,
    onSearch,
    onClear,
    colors,
    totalKeywordsNotRead,
    inputKey,
    searchValue,
  }) => {
    // Inicializa com searchValue se disponível, caso contrário usa string vazia
    const [inputValue, setInputValue] = React.useState(() => searchValue || '');

    // Sincroniza o inputValue com o searchValue quando ele muda (preserva o texto da busca)
    // IMPORTANTE: Sempre sincroniza quando searchValue muda para manter consistência
    React.useEffect(() => {
      // Atualiza sempre que searchValue mudar, garantindo que o valor seja preservado
      setInputValue(searchValue || '');
    }, [searchValue]);

    // Limpa o input apenas quando inputKey muda para 0 (ao limpar a busca explicitamente)
    // IMPORTANTE: Não limpa se searchValue ainda tem valor (preserva a busca)
    React.useEffect(() => {
      if (inputKey === 0 && !searchValue) {
        setInputValue('');
      }
    }, [inputKey, searchValue]);

    const handleSearch = () => {
      if (searched) {
        if (onClear && typeof onClear === 'function') {
          onClear();
        }
      } else {
        // Pega o valor digitado e faz a busca
        if (onSearch && typeof onSearch === 'function') {
          onSearch(inputValue);
        }
      }
    };

    return (
      <>
        <Card underlayColor={colors.white} activeOpacity={1}>
          <CardInfos>
            <CardCounter>{totalKeywordsNotRead}</CardCounter>
            <CardContainer>
              <CardDescription>Publicações em diários</CardDescription>
              <CardSubtitle>não lidas</CardSubtitle>
            </CardContainer>
          </CardInfos>
        </Card>
        <Heading>Selecione a palavra-chave desejada</Heading>
        <SearchBar>
          <SearchInput
            key={`keyword-search-input-${inputKey}`}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Buscar palavra-chave"
            placeholderTextColor={colors.grayLight}
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <SearchButton onPress={handleSearch} platform={Platform.OS}>
            <MaterialIcons
              size={20}
              name={searched ? 'close' : 'search'}
              color={colors.fadedBlack}
            />
          </SearchButton>
        </SearchBar>
      </>
    );
  },
  (prevProps, nextProps) => {
    // IMPORTANTE: Sempre re-renderiza se searchValue mudou para garantir sincronização
    // Isso é crítico para manter o valor da busca após hot reload ou mudanças
    if (prevProps.searchValue !== nextProps.searchValue) {
      return false; // Re-renderiza
    }
    // Re-renderiza se outras props importantes mudaram
    if (
      prevProps.searched !== nextProps.searched ||
      prevProps.totalKeywordsNotRead !== nextProps.totalKeywordsNotRead ||
      prevProps.colors !== nextProps.colors ||
      prevProps.onSearch !== nextProps.onSearch ||
      prevProps.onClear !== nextProps.onClear ||
      prevProps.inputKey !== nextProps.inputKey
    ) {
      return false; // Re-renderiza
    }
    return true; // Não re-renderiza
  },
);

// Componente estável para o header de processes (fora do componente principal)
const ProcessesHeaderComponent = React.memo(
  ({
    searchedProcess,
    onSearch,
    onClear,
    colors,
    totalProcessesNotRead,
    inputKey,
    searchValue,
  }) => {
    // Inicializa com searchValue se disponível, caso contrário usa string vazia
    const [inputValue, setInputValue] = React.useState(() => searchValue || '');

    // Sincroniza o inputValue com o searchValue quando ele muda (preserva o texto da busca)
    // IMPORTANTE: Sempre sincroniza quando searchValue muda para manter consistência
    React.useEffect(() => {
      // Atualiza sempre que searchValue mudar, garantindo que o valor seja preservado
      setInputValue(searchValue || '');
    }, [searchValue]);

    // Limpa o input apenas quando inputKey muda para 0 (ao limpar a busca explicitamente)
    // IMPORTANTE: Não limpa se searchValue ainda tem valor (preserva a busca)
    React.useEffect(() => {
      if (inputKey === 0 && !searchValue) {
        setInputValue('');
      }
    }, [inputKey, searchValue]);

    const handleSearch = () => {
      if (searchedProcess) {
        onClear();
      } else {
        // Pega o valor digitado e faz a busca
        onSearch(inputValue);
      }
    };

    return (
      <>
        <Card underlayColor={colors.white} activeOpacity={1}>
          <CardInfos>
            <CardCounter>{totalProcessesNotRead}</CardCounter>
            <CardContainer>
              <CardDescription>Andamentos processuais</CardDescription>
              <CardSubtitle>não lidos</CardSubtitle>
            </CardContainer>
          </CardInfos>
        </Card>
        <Heading>Selecione o processo desejado</Heading>
        <SearchBar>
          <SearchInput
            key={`process-search-input-${inputKey}`}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Buscar processo"
            placeholderTextColor={colors.grayLight}
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <SearchButton onPress={handleSearch}>
            <MaterialIcons
              size={20}
              name={searchedProcess ? 'close' : 'search'}
              color={colors.fadedBlack}
            />
          </SearchButton>
        </SearchBar>
      </>
    );
  },
  (prevProps, nextProps) => {
    // Re-renderiza se props importantes mudarem ou se inputKey mudar (ao limpar)
    // IMPORTANTE: Sempre re-renderiza se searchValue mudou para garantir sincronização
    if (prevProps.searchValue !== nextProps.searchValue) {
      return false;
    }
    return (
      prevProps.searchedProcess === nextProps.searchedProcess &&
      prevProps.totalProcessesNotRead === nextProps.totalProcessesNotRead &&
      prevProps.colors === nextProps.colors &&
      prevProps.onSearch === nextProps.onSearch &&
      prevProps.onClear === nextProps.onClear &&
      prevProps.inputKey === nextProps.inputKey
    );
  },
);

export default function Folders(props) {
  // Variavel para usar o hook
  const colorUseTheme = useTheme();
  const { colors } = colorUseTheme;

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
  const [publicationsTabAccessed, setPublicationsTabAccessed] = useState(false);
  const [processesTabAccessed, setProcessesTabAccessed] = useState(false);

  const [searched, setSearched] = useState(false);
  const [searchedProcess, setSearchedProcess] = useState(false);

  const folderKeywords = useSelector(state => state.folderKeywords.data);
  const loadingKeywords = useSelector(state => state.folderKeywords.loading);
  const endKeywordsReached = useSelector(
    state => state.folderKeywords.endReached,
  );

  const totalKeywordsNotRead = useSelector(
    state => state.folderKeywords.totalNotRead,
  );

  const folderProcesses = useSelector(state => state.folderProcesses.data);
  const endProcessesReached = useSelector(
    state => state.folderProcesses.endReached,
  );
  const loadingProcesses = useSelector(state => state.folderProcesses.loading);
  const totalProcessesNotRead = useSelector(
    state => state.folderProcesses.totalNotRead,
  );

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

  // 👤 Dados do usuário para debug OneSignal (logs removidos para performance)
  // const userData = useSelector(state => state.user);
  // const authData = useSelector(state => state.auth);

  // console.log('👤 DADOS DO USUÁRIO (Redux):', userData);
  // console.log('🔐 DADOS DE AUTH:', authData);

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

    // Marca a aba de Publicações como acessada já que é a aba inicial (initialPage={0})
    setPublicationsTabAccessed(true);

    // 👤 Debug dados do usuário do Token JWT (log removido para performance)
    // getLoggedUser().then(user => {
    //   console.log('👤 DADOS DO USUÁRIO (Token JWT):', user);
    // });
  }, [props]);

  useEffect(() => {
    // Só faz a requisição de Publicações se a aba já foi acessada
    if (publicationsTabAccessed) {
      dispatch(
        FolderKeywordsActions.folderKeywordsRequest({
          filters,
          page: currentKeywordsPage,
          perPage: 20,
        }),
      );
    }
  }, [
    filters,
    triggerKeywordRequest,
    currentKeywordsPage,
    publicationsTabAccessed,
    dispatch,
  ]);

  useEffect(() => {
    // Só faz a requisição de Processos se a aba já foi acessada
    if (processesTabAccessed) {
      dispatch(
        FolderProcessesActions.folderProcessesRequest({
          filters: processFilters,
          page: currentProcessesPage,
          perPage: 20,
        }),
      );
    }
  }, [
    processFilters,
    triggerProcessesRequest,
    processesTabAccessed,
    currentProcessesPage,
    dispatch,
  ]);

  useEffect(() => {
    const fetchPromotion = async () => {
      const promotion = await AsyncStorage.getItem(SHOW_PROMOTION);
      setSeenPromotion(
        JSON.parse(promotion) === null ? true : JSON.parse(promotion),
      );
    };
    fetchPromotion();
  }, []);

  // Dentro do useEffect existente ou criar um novo:
  // useEffect removido - log desnecessário

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

  const renderKeywordsNotFound = useCallback(() => {
    // Se estiver carregando, mostra o spinner
    if (loadingKeywords) {
      return <Spinner />;
    }

    // Se não estiver carregando e a lista estiver vazia, mostra a mensagem de não encontrado
    return (
      <NotFound>
        <Image source={notFound} />
        <NotFoundText>Não há resultados</NotFoundText>
        <NotFoundDescription>Tente uma busca diferente!</NotFoundDescription>
      </NotFound>
    );
  }, [loadingKeywords, notFound]);

  const renderProcessesNotFound = useCallback(() => {
    // Se estiver carregando, mostra o spinner
    if (loadingProcesses) {
      return <Spinner />;
    }

    // Se não estiver carregando e a lista estiver vazia, mostra a mensagem de não encontrado
    return (
      <NotFound>
        <Image source={notFound} />
        <NotFoundText>Não há resultados</NotFoundText>
        <NotFoundDescription>Tente uma busca diferente!</NotFoundDescription>
      </NotFound>
    );
  }, [loadingProcesses, notFound]);

  const [keywordInputKey, setKeywordInputKey] = useState(0);

  const clearSearchKeyword = useCallback(() => {
    setCurrentKeywordsPage(1);
    setKeywordSearch('');
    setFilters({});
    setSearched(false);
    // Força recriação do input ao limpar
    setKeywordInputKey(prev => prev + 1);
  }, []);

  const handleKeywordSearch = useCallback(searchValue => {
    setKeywordSearch(searchValue);
    setCurrentKeywordsPage(1);
    setFilters({ nome: searchValue });
    setSearched(searchValue.length > 0);
  }, []);

  const renderKeywordsHeader = useMemo(
    () => (
      <KeywordsHeaderComponent
        searched={searched}
        onSearch={handleKeywordSearch}
        onClear={clearSearchKeyword}
        colors={colors}
        totalKeywordsNotRead={totalKeywordsNotRead}
        inputKey={keywordInputKey}
        searchValue={keywordSearch}
      />
    ),
    [
      searched,
      handleKeywordSearch,
      clearSearchKeyword,
      colors,
      totalKeywordsNotRead,
      keywordInputKey,
      keywordSearch,
    ],
  );

  const renderKeywordsFooter = useCallback(() => {
    if (!loadingKeywords) return null;

    return <Spinner />;
  }, [loadingKeywords]);

  const [processInputKey, setProcessInputKey] = useState(0);

  const clearSearchProcess = useCallback(() => {
    setCurrentProcessesPage(1);
    setProcessSearch('');
    setProcessFilters({});
    setSearchedProcess(false);
    // Força recriação do input ao limpar
    setProcessInputKey(prev => prev + 1);
  }, []);

  const handleProcessSearch = useCallback(searchValue => {
    setProcessSearch(searchValue);
    setCurrentProcessesPage(1);
    setProcessFilters({ nome: searchValue });
    setSearchedProcess(searchValue.length > 0);
  }, []);

  const renderProcessesHeader = useMemo(
    () => (
      <ProcessesHeaderComponent
        searchedProcess={searchedProcess}
        onSearch={handleProcessSearch}
        onClear={clearSearchProcess}
        colors={colors}
        totalProcessesNotRead={totalProcessesNotRead}
        inputKey={processInputKey}
        searchValue={processSearch}
      />
    ),
    [
      searchedProcess,
      handleProcessSearch,
      clearSearchProcess,
      colors,
      totalProcessesNotRead,
      processInputKey,
      processSearch,
    ],
  );

  const renderProcessesFooter = useCallback(() => {
    if (!loadingProcesses) return null;

    return <Spinner />;
  }, [loadingProcesses]);

  const Publicacoes = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
      tabLabel="Publicações"
    >
      {publicationsPermission ? (
        <>
          {renderKeywordsHeader}
          {loadingKeywords && folderKeywords.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Spinner />
            </View>
          ) : (
            <List
              onRefresh={() => {
                // Recarrega os dados sem limpar a busca
                setCurrentKeywordsPage(1);
                setTriggerKeywordRequest(prev => !prev);
              }}
              refreshing={false}
              data={folderKeywords}
              renderItem={renderList}
              keyExtractor={(_, index) => index.toString()}
              onEndReached={onKeywordsEndReached}
              onEndReachedThreshold={threshold}
              ListFooterComponent={renderKeywordsFooter}
              ListEmptyComponent={renderKeywordsNotFound}
            />
          )}
        </>
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
      tabLabel="Processos"
    >
      {processesPermission ? (
        <>
          {renderProcessesHeader}
          {loadingProcesses && folderProcesses.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Spinner />
            </View>
          ) : (
            <List
              onRefresh={() => {
                // Recarrega os dados sem limpar a busca
                setCurrentProcessesPage(1);
                setTriggerProcessesRequest(prev => !prev);
              }}
              refreshing={false}
              data={folderProcesses}
              renderItem={renderList}
              keyExtractor={(_, index) => index.toString()}
              onEndReached={onProcessesEndReached}
              onEndReachedThreshold={threshold}
              ListFooterComponent={renderProcessesFooter}
              ListEmptyComponent={renderProcessesNotFound}
            />
          )}
        </>
      ) : (
        <HasNotPermission
          image={image}
          title="Informações detalhadas sobre suas publicações e processos!"
          body="Monitore e receba de forma unificada as informações referentes às suas publicações e processos. Escolha o tribunal, órgão oficial ou diários de forma simples e segura."
        />
      )}
    </KeyboardAvoidingView>
  );

  const renderList = folder => (
    <>
      {loadingKeywords && currentKeywordsPage == 1 ? (
        <Spinner />
      ) : (
        <ListItem onPress={() => props.navigation.push('Movements', folder)}>
          <ListItemText>{MaskCnj(folder.item.nome)}</ListItemText>
          <ListItemCounterContainer>
            <ListItemCounterText>
              {folder.item.totalNaoLidas}
            </ListItemCounterText>
          </ListItemCounterContainer>
          <MaterialIcons
            size={20}
            name="arrow-forward"
            color={colors.fadedBlack}
          />
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
            renderTabBar={props => (
              <CustomTabs {...props} tabs={['Publicações', 'Processos']} />
            )}
            initialPage={0}
            onChangeTab={({ i }) => {
              // Quando a aba de Publicações (índice 0) é acessada pela primeira vez
              if (i === 0 && !publicationsTabAccessed) {
                setPublicationsTabAccessed(true);
              }
              // Quando a aba de Processos (índice 1) é acessada pela primeira vez
              if (i === 1 && !processesTabAccessed) {
                setProcessesTabAccessed(true);
              }
            }}
          >
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
