import React, { useState, useCallback, useMemo, useEffect, createRef } from 'react';
import JurisprudenceActions from 'store/ducks/Jurisprudence';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, Appearance, Keyboard } from 'react-native';

import moment from 'moment';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HTML from "react-native-render-html";

import { FormatDateBR } from 'helpers/DateFunctions';

import Header from 'components/Header';
import Spinner from 'components/Spinner';

import { Container, Warp, HeaderAction } from 'assets/styles/general';
import { colors } from 'assets/styles';
import {
  SearchBar,
  SearchInput,
  SearchButton,
  RegistersBar,
  RegistersCounter,
  RegistersTotal,
  Jurisprudence,
  Tribunal,
  PublicationDate,
  Title,
  Description,
  Mark,
  NotFound,
  Image,
  NotFoundText,
  NotFoundDescription,
} from './styles';

import Filters from './Filters';

const colorScheme = Appearance.getColorScheme();

const notFound = (colorScheme == 'dark') ? require('assets/images/not_found_white.png') : require('assets/images/not_found.png');

export default function jurisprudenceList(props) {
  const filtersRef = createRef();

  const [filters, setFilters] = useState({});
  const [term, setTerm] = useState(props.route.params.term);
  const [searchedTerm, setSearchedTerm] = useState(props.route.params.term);
  const [page, setPage] = useState(1);
  const [trigger, setTrigger] = useState(false);

  const loading = useSelector(state => state.jurisprudence.loading);
  const jurisprudences = useSelector(state => state.jurisprudence.data);
  const endReached = useSelector(state => state.jurisprudence.endReached);
  const pagination = useSelector(state => state.jurisprudence.pagination);
  const refreshing = useSelector(state => state.jurisprudence.refreshing);
  const filtersData = useSelector(state => state.jurisprudence.filters);

  const renderers = {
    description: (htmlAttribs, children, convertedCSSStyles, passProps) => <Description key={Math.random()} numberOfLines={7}>{children}</Description>,
    mark: (htmlAttribs, children, convertedCSSStyles, passProps) => (<Mark key={Math.random()}>{children}</Mark>),
    title: (htmlAttribs, children, convertedCSSStyles, passProps) => (<Title key={Math.random()}>{children}</Title>),
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      JurisprudenceActions.jurisprudenceRequest({
        term: term,
        page: page,
        filters: filters,
      })
    )
  }, [props, searchedTerm, trigger, filters]);

  const capitalize = useCallback(s => s.replace(/(?:^|\s|["'([{])+\S/g, l => l.toUpperCase()), []);

  const handleSubmit = useCallback(data => {
    setPage(1);
    setFilters(data);
  }, [filters]);

  const searchTerm = useCallback(() => {
    if (term === searchedTerm) return;

    if (term.length < 3) {
      props.navigation.goBack();
      return;
    }

    Keyboard.dismiss();
    setFilters({});
    setSearchedTerm(term);
    setPage(1);
  }, [term, searchedTerm]);

  const onEndReached = useCallback(() => {
    if (endReached) return;

    setPage(page + 1);
    setTrigger(!trigger);
  });

  const refresh = useCallback(() => {
    setFilters({});
    setPage(1);
    setTrigger(!trigger);
  });

  const customActions = useCallback(() => (
    <HeaderAction key={1}>
      <MaterialIcons name="filter-list" size={20} color={colors.fadedBlack} onPress={() => filtersRef.current?.open()} />
    </HeaderAction>
  ));

  const renderItem = ({ item }) => (
    <Jurisprudence key={item.codEmenta} onPress={() => props.navigation.navigate('JurisprudenceDetail', { jurisprudence: item, term })}>
      <Tribunal>{item.nomeTribunal}</Tribunal>
      <PublicationDate>Data de publicação: {moment(item.dataPublicacao, 'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY')}</PublicationDate>
      <HTML source={{ html: `<title>${item.tituloMarcado || item.titulo}</title><description>${item.ementaMarcada?.join("").split('\u0000').join('') || item.ementa}</description>` }} renderers={renderers} ignoredTags={['strong']} />
    </Jurisprudence>
  );

  const renderHeader = useCallback(() =>
    <RegistersBar>
      <RegistersCounter>Exibindo {jurisprudences.length}</RegistersCounter>
      <RegistersTotal> de {pagination.registrosTotal || 0} jurisprudências</RegistersTotal>
    </RegistersBar>, [jurisprudences]);

  const renderFooter = useCallback(() => (!loading) ? null : <Spinner />, [loading]);

  const makeFiltersData = useCallback(() => {
    let filtersFormatted = {
      quotes: [
        { label: 'Todas parciais e íntegras', value: 0, type: null },
        { label: 'Com íntegra', value: true },
        { label: 'Sem íntegra', value: false },
      ],
      types: [{
        label: 'Todos os tribunais',
        value: 0,
      }],
      tribunals: [{
        label: 'Todos os tribunais',
        value: 0,
        type: null,
      }],
      years: [{
        label: 'Todos os anos',
        value: 0,
        type: null,
      }],
      groups: [{
        label: 'Todos as áreas',
        value: 0,
      }],
    };

    if (filtersData.listaTribunal) {
      let tribunalsTypes = [];

      let tribunalsList = [];

      const typesList = Object.keys(filtersData.listaTribunal);
      typesList.map(key => {
        const tribunals = filtersData.listaTribunal[key].map(tribunal => {
          tribunalsList.push({
            label: `${tribunal.nome.toUpperCase()}`,
            value: tribunal.nome,
            type: key.toLowerCase(),
          });

          return tribunal.nome;
        });

        tribunalsTypes.push({
          label: key.toUpperCase(),
          value: tribunals.join(","),
        });
      });

      filtersFormatted.types = [...filtersFormatted.types, ...tribunalsTypes];
      filtersFormatted.tribunals = [...filtersFormatted.tribunals, ...tribunalsList];
    }

    if (filtersData.listaAno) {
      const years = filtersData.listaAno.map(year => {
        return {
          label: `${year.nome}`,
          value: year.nome
        }
      });
      filtersFormatted.years = [...filtersFormatted.years, ...years];
    }

    if (filtersData.listaGrupo) {
      const groups = filtersData.listaGrupo.map(group => {
        return {
          label: group.nome != 'undefined' ? capitalize(group.nome) : 'Sem área definida',
          value: group.nome
        }
      });

      filtersFormatted.groups = [...filtersFormatted.groups, ...groups];
    }

    return filtersFormatted;
  }, [filtersData]);

  const renderFilters = useMemo(() => {
    const newFilters = makeFiltersData();
    return <Filters ref={filtersRef} filters={filters} data={newFilters} submit={data => handleSubmit(data)} />
  }, [jurisprudences, filtersData]);


  return (
    <Container>
      <Warp>
        <Header title="Jurisprudência" back={() => props.navigation.goBack()} customActions={customActions()} />
        <SearchBar>
          <SearchInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder='Buscar palavra-chave'
            placeholderTextColor={colors.grayLight}
            value={term}
            onChangeText={typedTerm => setTerm(typedTerm)}
            onSubmitEditing={searchTerm}
            returnKeyType='search'
            editable={!loading}
          />
          <SearchButton onPress={() => searchTerm()} disabled={loading}>
            <MaterialIcons size={20} name="search" color={colors.fadedBlack} />
          </SearchButton>
        </SearchBar>
        {(loading && page == 1) ? <Spinner /> :
          <>
            {jurisprudences.length > 0 ?
              <FlatList
                onRefresh={refresh}
                refreshing={refreshing}
                data={jurisprudences}
                renderItem={renderItem}
                keyExtractor={item => item.codEmenta}
                onEndReached={onEndReached}
                ListFooterComponent={renderFooter}
                ListHeaderComponent={renderHeader}
              /> :
              <NotFound>
                <Image source={notFound} />
                <NotFoundText>Não há resultados</NotFoundText>
                <NotFoundDescription>Tente uma busca diferente!</NotFoundDescription>
              </NotFound>
            }
          </>
        }
      </Warp>
      {renderFilters}
    </Container>
  );
}
