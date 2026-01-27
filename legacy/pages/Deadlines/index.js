import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Animated, Platform, ScrollView } from 'react-native';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import DeadlinesActions from '@lstore/ducks/Deadlines';
import {
  PermissionsGroups,
  checkPermission,
  getLoggedUser,
} from '@lhelpers/Permissions';
import Api from '@lservices/Api';

import { FormatDateBR } from '@lhelpers/DateFunctions';

import {
  ExpandableCalendar,
  Calendar,
  CalendarProvider,
  LocaleConfig,
} from 'react-native-calendars';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SwipeListView } from 'react-native-swipe-list-view';

import Header from '@lcomponents/Header';
import Spinner from '@lcomponents/Spinner';
import { Share } from '@lcomponents/Share';
import HasNotPermission from '@lcomponents/HasNotPermission';

import Add from './Modals/Add';
import Email from './Modals/Email';
import Edit from './Modals/Edit';
import CustomFilters from './Modals/CustomFilters';
import Confirmation from './Modals/Confirmation';

import Blocked from '@lpages/Blocked';

import {
  Badge,
  BadgeText,
  Filters,
  FiltersButton,
  FiltersText,
  FiltersActive,
  Agenda,
  ListItem,
  ListGrid,
  ListContainer,
  ListTitle,
  ListSchedule,
  ListHeader,
  ListAction,
  ReadButton,
  NotFound,
  Image,
  NotFoundText,
  NotFoundDescription,
  Content,
  CreateNew,
  CreateNewText,
  ImportantFlag,
} from './styles';

import { fonts } from '@lassets/styles';
import { Container, Warp, Actions, ActionButton } from '@lassets/styles/global';

LocaleConfig.locales.br = {
  formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul.',
    'Ago',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'br';

const rowTranslateAnimatedValues = {};

const filters = [
  {
    id: 'a-vencer',
    name: 'A vencer',
    params: {
      concluido: false,
      dataInicial:
        moment().format('YYYY-MM-DD') +
        'T' +
        moment().format('HH:mm:ss') +
        '.000Z',
    },
  },
  {
    id: 'vencidos',
    name: 'Vencidos',
    params: {
      concluido: false,
      dataFinal: new Date().toJSON(),
    },
  },
  {
    id: 'importantes',
    name: 'Importantes',
    params: {
      importante: true,
      concluido: false,
    },
  },
  {
    id: 'concluidos',
    name: 'Concluídos',
    params: {
      concluido: true,
    },
  },
];

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

export default function Deadlines(props) {
  // Variavel para usar o hook
  const colorUseTheme = useTheme();
  const { colors } = colorUseTheme;

  const theme = {
    backgroundColor: colors.white,
    calendarBackground: colors.white,
    // arrows
    arrowColor: colors.grayDarker,
    arrowStyle: { padding: 0 },
    // month
    monthTextColor: colors.grayDarker,
    textMonthFontSize: fonts.big,
    textMonthFontFamily: fonts.circularStdBold,
    // day names
    textSectionTitleColor: colors.grayDarker,
    textDayHeaderFontSize: fonts.small,
    textDayHeaderFontFamily: fonts.circularStdBook,
    // dates
    dayTextColor: colors.grayDarker,
    textDayFontSize: fonts.big,
    textDayFontFamily: fonts.circularStdMedium,
    textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
    // selected date
    selectedDayBackgroundColor: colors.grayDarker,
    selectedDayTextColor: colors.white,
    // disabled date
    textDisabledColor: colors.grayLighter,
    // dot (marked date)
    dotColor: colors.grayDarker,
    selectedDotColor: colors.white,
    disabledDotColor: colors.grayLighter,
    dotStyle: { marginTop: -1 },
    todayTextColor: colors.advise,
    'stylesheet.day.basic': {
      selected: {
        borderRadius: 0,
        backgroundColor: colors.primary,
      },
      base: {
        width: 32,
        height: 32,
        alignItems: 'center',
        // borderWidth: 1,
        // padding: 8,
      },
    },
  };

  const notFound =
    colorUseTheme.name == 'dark'
      ? require('assets/images/not_found/deadlines_white.png')
      : require('assets/images/not_found/deadlines.png');

  const image =
    colorUseTheme.name == 'dark'
      ? require('assets/images/permissions/deadlines_white.png')
      : require('assets/images/permissions/deadlines.png');

  const addRef = useRef(null);
  const listRef = useRef(null);
  const editRef = useRef(null);
  const emailRef = useRef(null);
  const filtersRef = useRef(null);
  const headerFiltersRef = useRef(null);
  const confirmationRef = useRef(null);

  const dispatch = useDispatch();
  const triggerChange = useSelector(state => state.deadlines.triggerChange);
  const endReached = useSelector(state => state.deadlines.endReached);
  const loading = useSelector(state => state.deadlines.loading);
  const updating = useSelector(state => state.deadlines.updating);
  const deleting = useSelector(state => state.deadlines.deleting);

  const dataAll = useSelector(state =>
    state.deadlines.data.map(prazo => {
      rowTranslateAnimatedValues[prazo.id] = new Animated.Value(1);

      return prazo;
    }),
  );

  let data = [];

  const [currentFilter, setCurrentFilter] = useState('a-vencer');

  if (currentFilter !== 'concluidos') {
    data = [...dataAll].sort((a, b) =>
      a.dataHoraInicio < b.dataHoraInicio && a.diaInteiro === true ? -1 : 1,
    );
  } else {
    data = [...dataAll].sort((a, b) =>
      a.dataHoraUltAlteracao < b.dataHoraUltAlteracao && a.diaInteiro === true
        ? -1
        : 1,
    );
  }

  const [currentIdUpdate, setCurrentIdUpdate] = useState(null);
  const [customFilters, setCustomFilters] = useState(() => ({}));
  const [currentDeadline, setCurrentDeadline] = useState(data[0]);
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format('YYYY-MM'),
  );

  const [sharing, setSharing] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [page, setPage] = useState(1);
  const [havePermission, setPermission] = useState(false);

  const active = useSelector(state => state.auth.active);

  const [idAgenda, setIdAgenda] = useState(0);

  // useEffect temporariamente comentado para debug
  /*
  useEffect(() => {
    const isFocused = props.navigation.isFocused();

    if (!triggerChange || !isFocused) return;

    setPage(1);
    setTrigger(!trigger);
  }, [triggerChange, props.navigation.isFocused()]);
  */

  useEffect(() => {
    props.navigation.addListener('beforeRemove', e => {
      e.preventDefault();

      return;
    });
  }, []);

  useEffect(() => {
    checkPermission(PermissionsGroups.SCHEDULE).then(permission =>
      setPermission(permission),
    );
  }, [props]);

  useEffect(() => {
    getLoggedUser().then(user =>
      Api.get(
        `/core/v1/agendas?campos=*&idUsuarioCliente=${user.idUsuarioCliente}`,
      ).then(({ data }) => setIdAgenda(data.itens[0]?.id || 0)),
    );
  }, []);

  // useEffect temporariamente comentado para debug
  /*
  useEffect(() => {
    const removeIndex = props.route.params?.removeIndex || false;

    if (!removeIndex) return;

    removeFromList(removeIndex);
  }, [props]);
  */

  // useEffect temporariamente comentado para debug
  /*
  useEffect(() => {
    data.map((_, i) => (rowTranslateAnimatedValues[i] = new Animated.Value(1)));
  }, [data]);
  */

  // useEffect simplificado para carregar dados apenas uma vez
  useEffect(() => {
    if (havePermission) {
      dispatch(DeadlinesActions.deadlinesTypesRequest());
    }
  }, [havePermission]);

  // useEffect para carregar dados quando mudar o filtro ou customFilters
  useEffect(() => {
    if (havePermission) {
      const { params } = filters.find(item => item.id == currentFilter);

      // Mescla os filtros padrão com os filtros customizados
      // customFilters tem prioridade sobre params
      const mergedFilters =
        Object.keys(customFilters).length > 0
          ? { ...params, ...customFilters }
          : { ...params };

      dispatch(
        DeadlinesActions.deadlinesRequest({
          filters: mergedFilters,
          page: 1,
          perPage: 20,
        }),
      );
    }
  }, [currentFilter, customFilters, havePermission]);

  const clearCustomFilters = useCallback(() => setCustomFilters({}), []);

  const openRow = useCallback(key =>
    !listRef.current?._rows[key].isOpen
      ? listRef.current._rows[key].manuallySwipeRow(-250)
      : closeOpenedRow(key),
  );

  const closeOpenedRow = useCallback(key =>
    listRef.current?._rows[key].closeRow(),
  );

  const callbackAdd = useCallback(() => {
    // Recarrega a lista após cadastrar um novo prazo
    if (havePermission) {
      setPage(1);
      const { params } = filters.find(item => item.id == currentFilter);

      const mergedFilters =
        Object.keys(customFilters).length > 0
          ? { ...params, ...customFilters }
          : { ...params };

      dispatch(
        DeadlinesActions.deadlinesRequest({
          filters: mergedFilters,
          page: 1,
          perPage: 20,
        }),
      );
    }
  }, [currentFilter, customFilters, havePermission, dispatch]);

  const renderAdd = useCallback(
    () => <Add ref={addRef} idAgenda={idAgenda} onAdd={() => callbackAdd()} />,
    [idAgenda],
  );

  const renderEmail = useCallback(
    () => <Email ref={emailRef} deadline={currentDeadline} />,
    [currentDeadline],
  );

  const callbackEdit = useCallback(() => {
    // Recarrega a lista após editar um prazo
    if (havePermission) {
      setPage(1);
      const { params } = filters.find(item => item.id == currentFilter);

      const mergedFilters =
        Object.keys(customFilters).length > 0
          ? { ...params, ...customFilters }
          : { ...params };

      dispatch(
        DeadlinesActions.deadlinesRequest({
          filters: mergedFilters,
          page: 1,
          perPage: 20,
        }),
      );
    }
  }, [currentFilter, customFilters, havePermission, dispatch]);

  const renderEdit = useCallback(
    () => (
      <Edit
        ref={editRef}
        deadline={currentDeadline}
        onEditSuccess={callbackEdit}
      />
    ),
    [currentDeadline, callbackEdit],
  );

  const renderCustomFilters = useCallback(() => {
    try {
      return (
        <CustomFilters
          ref={filtersRef}
          filters={customFilters}
          setFilters={filters => handleCustomFilters(filters)}
          clear={clearCustomFilters}
        />
      );
    } catch (error) {
      return null;
    }
  }, [customFilters]);

  const renderConfirmation = useCallback(
    () => (
      <Confirmation
        ref={confirmationRef}
        deadline={currentDeadline}
        remove={id => removeFromList(id)}
      />
    ),
    [currentDeadline],
  );

  const renderFooter = useCallback(
    () => (!loading ? null : <Spinner />),
    [loading],
  );

  const handleMonthChange = useCallback(
    month => {
      // Quando o mês é alterado no calendário, filtra os prazos para o mês selecionado
      let monthDate;

      // Tenta extrair a data de diferentes formatos que o Calendar pode retornar
      if (month.dateString) {
        monthDate = moment(month.dateString);
      } else if (month.month !== undefined && month.year !== undefined) {
        // Formato { month: 10, year: 2024 }
        monthDate = moment({
          year: month.year,
          month: month.month - 1,
          day: 1,
        });
      } else if (typeof month === 'string') {
        monthDate = moment(month);
      } else {
        monthDate = moment(month);
      }

      const monthStart = monthDate.clone().startOf('month');
      const monthEnd = monthDate.clone().endOf('month');
      const monthString = monthDate.format('YYYY-MM');

      // Marca que o mês foi alterado pelo calendário
      monthChangedByCalendar.current = true;

      // Atualiza o mês selecionado primeiro
      setSelectedMonth(monthString);

      // Atualiza os filtros customizados com o período do mês selecionado
      const newFilters = {
        dataInicial: monthStart.format('YYYY-MM-DD') + 'T00:00:00.000Z',
        dataFinal: monthEnd.format('YYYY-MM-DD') + 'T23:59:59.000Z',
      };

      handleCustomFilters(newFilters);
    },
    [handleCustomFilters],
  );

  // Sincroniza o mês selecionado com os filtros customizados (apenas quando os filtros vêm de outra fonte, não do calendário)
  // Usa um ref para evitar atualizar quando o mês foi alterado pelo próprio calendário
  const monthChangedByCalendar = useRef(false);
  const prevCustomFiltersRef = useRef(JSON.stringify(customFilters));

  useEffect(() => {
    // Se o mês foi alterado pelo calendário, não sincroniza
    if (monthChangedByCalendar.current) {
      monthChangedByCalendar.current = false;
      prevCustomFiltersRef.current = JSON.stringify(customFilters);
      return;
    }

    // Só sincroniza se os filtros realmente mudaram (não foi apenas um re-render)
    const filtersChanged =
      prevCustomFiltersRef.current !== JSON.stringify(customFilters);

    if (filtersChanged && customFilters.dataInicial) {
      const filterMonth = moment(customFilters.dataInicial).format('YYYY-MM');
      // Atualiza o mês do calendário para o mês do filtro
      if (filterMonth !== selectedMonth) {
        setSelectedMonth(filterMonth);
      }
      prevCustomFiltersRef.current = JSON.stringify(customFilters);
    } else if (
      filtersChanged &&
      Object.keys(customFilters).length === 0 &&
      selectedMonth !== moment().format('YYYY-MM')
    ) {
      // Se não há filtros, volta para o mês atual (apenas se já não estiver no mês atual)
      setSelectedMonth(moment().format('YYYY-MM'));
      prevCustomFiltersRef.current = JSON.stringify(customFilters);
    }
  }, [customFilters, selectedMonth]);

  const renderCalendar = useCallback(() => {
    // Formata a data corretamente para o Calendar (YYYY-MM-DD)
    const currentDate = selectedMonth
      ? selectedMonth + '-01'
      : moment().format('YYYY-MM-DD');

    return (
      <Calendar
        style={{
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.grayLighter,
          backgroundColor: colors.white,
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
        theme={theme}
        markingType={'custom'}
        markedDates={getMarkedDates()}
        current={currentDate} // Define o mês atual do calendário
        onMonthChange={handleMonthChange}
        onVisibleMonthsChange={months => {
          // Não usar onVisibleMonthsChange para evitar conflito
          // O onMonthChange já é suficiente
        }}
      />
    );
  }, [data, handleMonthChange, selectedMonth, theme]);

  const getMarkedDates = useCallback(() => {
    let datas = {};

    data.map(prazo => {
      const key = moment(prazo.dataHoraInicio).format('YYYY-MM-DD');

      datas[key] = { marked: true };
    });

    return datas;
  }, [data]);

  const share = useCallback(async item => {
    setSharing(true);

    let movement = false;

    if (item.idsMovimentosProcesso.length > 0) {
      const param = {
        movementType:
          item.idsMovimentosProcesso[0].idTipoMovProcesso == -2
            ? 'publicacoes'
            : 'andamentos',
        movementId: item.idsMovimentosProcesso[0].idMovimentosProcesso,
      };

      const { data } = await Api.get(
        `/core/v1/detalhes-movimentacoes/${param.movementType}?campos=*&Ids=${param.movementId}`,
      );

      movement = data.itens[0];
    }

    const user = await getLoggedUser();

    let message = `Olá\n${user.nome} acabou de compartilhar com você!\n`;

    message += `\n${item.importante ? '[Importante] ' : ''}${item.titulo}\n\n`;
    message += `Data e hora: ${item.dataFormatada} - ${
      item.diaInteiro ? 'Dia todo' : item.horaFormatada
    }\n`;
    message += `Tipo: ${item.tipoEventoAgenda}\n`;
    message += `Lembrete: ${item.opcaoLembreteAgenda}\n`;
    message += `Repetir: ${item.tipoRepeticao}\n`;
    message += `Localização.: ${item.localizacao || '-'}\n`;
    message += `Observações: ${item.observacao || '-'}\n`;

    if (movement) {
      if (item.idsMovimentosProcesso[0].idTipoMovProcesso == -1) {
        message += `\n${movement.orgaoJudiciario}\n\n`;
        message += `Data Disponibilização: ${FormatDateBR(
          movement.dataDisponibilizacao,
        )}\n`;
        message += `Processo: ${movement.numeroProcesso}\n`;
        message += `Fonte de pesquisa: ${movement.fonte}\n`;
        message += `Sujeitos: ${movement.sujeitos}\n`;
        message += `Descrição: ${movement.descricaoAndamento}\n`;
      } else {
        message += `\n${movement.diarioDescricao}\n\n`;
        message += `Processo: ${movement.numero}\n`;
        message += `Publicação em: ${FormatDateBR(movement.dataPublicacao)}\n`;
        message += `Comarca:   ${movement.cidadeComarcaDescricao}\n`;
        message += `Vara: ${movement.varaDescricao}\n`;
        message += `Divulgação em: ${FormatDateBR(movement.dataDivulgacao)}\n`;

        if (movement.palavrasChave)
          message += `Palavras-chave: ${movement.palavrasChave
            .map(palavra => palavra.palavraChave)
            .join(', ')}\n`;

        message += `Caderno: ${movement.caderno}\n`;
        message += `Edição: ${movement.edicaoDiario}\n`;
        message += `Página inicial: ${movement.paginaInicial}\n`;
        message += `Página final: ${movement.paginaFinal}\n`;
        message += `\n${movement.despacho}\n`;
        message += `\n${movement.conteudo}\n`;
      }
    }

    Share({
      message,
      title: 'Você tem novo(s) prazo(s) compartilhado(s)!',
    });

    setTimeout(() => {
      setSharing(false);
    }, 1000);
  });

  const handleEmail = useCallback(deadline => {
    setCurrentDeadline(deadline);

    emailRef.current?.open();
  });

  const handleEdit = useCallback(deadline => {
    setCurrentDeadline(deadline);

    editRef.current?.open();
  });

  const handleConfirmation = useCallback(deadline => {
    setCurrentDeadline(deadline);

    confirmationRef.current?.open();
  }, []);

  const handleFilter = useCallback((id, index) => {
    headerFiltersRef.current?.scrollToIndex({ animated: true, index: index });

    setPage(1);
    setCurrentFilter(id);
  }, []);

  const handleCustomFilters = useCallback(filters => {
    setTrigger(prev => !prev);
    setCustomFilters(filters);
    setPage(1);
  }, []);

  const onEndReached = useCallback(() => {
    if (endReached || loading) return;

    setPage(page + 1);
  });

  const removeFromList = id => {
    if (rowTranslateAnimatedValues[id]) {
      Animated.timing(rowTranslateAnimatedValues[id], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const markAsRead = useCallback(deadline => {
    const mark = () => {
      let { concluido, id, idAgenda } = deadline;

      dispatch(
        DeadlinesActions.deadlinesMarkAsConcluded({
          concluido: !concluido,
          id,
          idAgenda,
        }),
      );
    };

    removeFromList(deadline.id);

    setTimeout(() => mark(), 500);
  }, []);

  const markAsImportant = useCallback(deadline => {
    const { importante, id, idAgenda } = deadline;
    setCurrentIdUpdate(id);

    dispatch(
      DeadlinesActions.deadlinesMarkAsImportant({
        importante: !importante,
        id,
        idAgenda,
      }),
    );

    setTimeout(() => closeOpenedRow(deadline.id), 500);

    if (importante && currentFilter === 'importantes') {
      setTimeout(() => {
        setPage(1);
        setTrigger(!trigger);
      }, 2000);
    }
  }, []);

  const renderFilters = useCallback(
    ({ item, index }) => (
      <FiltersButton onPress={() => handleFilter(item.id, index)}>
        <FiltersText active={currentFilter == item.id}>{item.name}</FiltersText>
        <FiltersActive active={currentFilter == item.id} />
      </FiltersButton>
    ),
    [currentFilter],
  );

  const renderHiddenItem = useCallback(({ item }) => (
    <Actions
      as={Animated.View}
      style={{
        overflow: 'hidden',
        maxHeight: rowTranslateAnimatedValues[item.id].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 500],
        }),
      }}
    >
      <ActionButton onPress={() => handleEdit(item)}>
        <MaterialIcons name="edit" size={24} color={colors.fadedBlack} />
      </ActionButton>
      <ActionButton onPress={() => handleEmail(item)}>
        <MaterialIcons name="mail" size={24} color={colors.fadedBlack} />
      </ActionButton>
      {!item.importante && (
        <ActionButton onPress={() => !updating && markAsImportant(item)}>
          {updating && item.id === currentIdUpdate ? (
            <Spinner height="auto" />
          ) : (
            <MaterialIcons name="flag" size={24} color={colors.fadedBlack} />
          )}
        </ActionButton>
      )}
      <ActionButton onPress={() => !sharing && share(item)}>
        {sharing ? (
          <Spinner height="auto" />
        ) : (
          <MaterialIcons name="share" size={24} color={colors.fadedBlack} />
        )}
      </ActionButton>
      <ActionButton onPress={() => handleConfirmation(item)}>
        {deleting ? (
          <Spinner height="auto" />
        ) : (
          <MaterialIcons name="delete" size={24} color={colors.fadedBlack} />
        )}
      </ActionButton>
    </Actions>
  ));

  const renderItem = useCallback(
    ({ item }) => (
      <Animated.View
        style={{
          overflow: 'hidden',
          maxHeight: rowTranslateAnimatedValues[item.id].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 500],
          }),
        }}
      >
        <ListItem
          onPress={() =>
            props.navigation.navigate('DeadlinesDetails', { deadline: item })
          }
          underlayColor={colors.white}
          activeOpacity={1}
        >
          <ListGrid>
            <ReadButton
              concluded={item.concluido}
              onPress={() => markAsRead(item)}
            />
            <ListContainer>
              <ListHeader>
                <ListSchedule expired={currentFilter == 'vencidos'}>
                  {moment(item.dataHoraInicio).format('DD/MM/YYYY')} •{' '}
                  {item.diaInteiro
                    ? 'Dia todo'
                    : moment(item.dataHoraInicio).format('HH:mm')}
                </ListSchedule>
                <ListAction onPress={() => openRow(item.id)}>
                  <MaterialIcons
                    name="more-horiz"
                    size={25}
                    color={colors.fadedBlack}
                  />
                </ListAction>
              </ListHeader>
              <ListTitle expired={currentFilter == 'vencidos'}>
                {item.titulo}
              </ListTitle>
              <Badge
                type={
                  currentFilter == 'vencidos'
                    ? 0
                    : item.idPadraoTipoEventoAgenda
                }
              >
                <BadgeText expired={currentFilter == 'vencidos'}>
                  {item.tipoEventoAgenda}
                </BadgeText>
              </Badge>

              {item.importante && (
                <ImportantFlag
                  onPress={() => !updating && markAsImportant(item)}
                >
                  {updating && item.id === currentIdUpdate ? (
                    <Spinner height="auto" />
                  ) : (
                    <MaterialIcons
                      name="flag"
                      size={24}
                      color={colors.blueImportant}
                    />
                  )}
                </ImportantFlag>
              )}
            </ListContainer>
          </ListGrid>
        </ListItem>
      </Animated.View>
    ),
    [data],
  );

  return (
    <Container>
      {active ? (
        <>
          {havePermission ? (
            <Warp>
              <Header
                title="Prazos"
                filter={
                  data.length > 0 || Object.keys(customFilters).length > 0
                    ? () => filtersRef.current?.open()
                    : null
                }
                add={() => addRef.current?.open()}
              />
              {/* <Header title="Prazos" filter={data.length > 0 || Object.keys(customFilters).length > 0 ? () => filtersRef.current?.open() : null} /> */}
              <Filters
                ref={headerFiltersRef}
                contentContainerStyle={{
                  alignItems: 'center',
                  paddingRight: 16,
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={filters}
                scrollEnabled
                renderItem={renderFilters}
                keyExtractor={(item, _) => item.id.toString()}
              />
              {/* Calendário fixo - não recarrega quando os dados mudam */}
              {renderCalendar()}
              <Content>
                {loading && page == 1 ? (
                  <Spinner height={'auto'} />
                ) : (
                  <>
                    {data.length > 0 ? (
                      <SwipeListView
                        data={data}
                        ref={listRef}
                        closeOnRowOpen
                        disableRightSwipe
                        previewRowKey={'0'}
                        rightOpenValue={-250}
                        stopRightSwipe={-250}
                        useNativeDriver={false}
                        previewOpenValue={-250}
                        previewOpenDelay={2000}
                        renderItem={renderItem}
                        onEndReached={onEndReached}
                        ListFooterComponent={renderFooter}
                        // style={{ overflow: 'hidden', flex: 1, backgroundColor: colors.white }}
                        renderHiddenItem={renderHiddenItem}
                        keyExtractor={item => item.id}
                      />
                    ) : (
                      <ScrollView
                        contentContainerStyle={{
                          flexGrow: 1,
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          paddingTop: 40,
                          paddingBottom: 20,
                        }}
                        showsVerticalScrollIndicator={false}
                      >
                        <NotFound>
                          <Image source={notFound} />
                          <NotFoundText>Não há prazos</NotFoundText>
                          <NotFoundDescription>
                            A sua lista está vazia
                          </NotFoundDescription>
                          <CreateNew onPress={() => addRef.current?.open()}>
                            <CreateNewText>Cadastrar</CreateNewText>
                          </CreateNew>
                        </NotFound>
                      </ScrollView>
                    )}
                  </>
                )}
              </Content>
              {renderCustomFilters()}
              {renderAdd()}
              {renderEdit()}
              {renderEmail()}
              {renderConfirmation()}
            </Warp>
          ) : (
            <HasNotPermission
              image={image}
              title="A sua rotina totalmente organizada!"
              body="Tenha a facilidade de cadastrar um prazo judicial, uma audiência ou uma reunião diretamente na sua ferramenta de monitoramento de informações jurídicas"
            />
          )}
        </>
      ) : (
        <Blocked />
      )}
    </Container>
  );
}
