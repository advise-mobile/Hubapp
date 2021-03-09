import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Animated, Appearance } from 'react-native';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import DeadlinesActions from 'store/ducks/Deadlines';
import { PermissionsGroups, checkPermission, getLoggedUser } from 'helpers/Permissions';
import Api from 'services/Api';

import { FormatDateBR } from 'helpers/DateFunctions';


import { ExpandableCalendar, CalendarProvider, LocaleConfig } from 'react-native-calendars';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SwipeListView } from 'react-native-swipe-list-view';

import Header from 'components/Header';
import Spinner from 'components/Spinner';
import { Share } from 'components/Share';
import HasNotPermission from 'components/HasNotPermission';

import Add from './Modals/Add';
import Email from './Modals/Email';
import Edit from './Modals/Edit';
import CustomFilters from './Modals/CustomFilters';
import Confirmation from './Modals/Confirmation';

import {
  theme,
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
} from './styles';

import { colors } from 'assets/styles';
import { Container, Warp, Actions, ActionButton } from 'assets/styles/general';

LocaleConfig.locales['br'] = {
  formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'br';

const rowTranslateAnimatedValues = {};

const colorScheme = Appearance.getColorScheme();

const notFound = (colorScheme == 'dark') ? require('assets/images/not_found/deadlines_white.png') : require('assets/images/not_found/deadlines.png');

const image = (colorScheme == 'dark') ? require('assets/images/permissions/deadlines_white.png') : require('assets/images/permissions/deadlines.png');

const filters = [{
  id: 'a-vencer',
  name: 'A vencer',
  params: {
    concluido: false,
    dataInicial: moment().format('YYYY-MM-DD') + 'T03:00:00.000Z',
  }
},
{
  id: 'vencidos',
  name: 'Vencidos',
  params: {
    concluido: false,
    dataFinal: new Date().toJSON()
  }
},
{
  id: 'importantes',
  name: 'Importantes',
  params: {
    importante: true,
    concluido: false
  }
},
{
  id: 'concluidos',
  name: 'Concluídos',
  params: {
    concluido: true,
  }
}];

export default function Deadlines(props) {
  const addRef = useRef(null);
  const listRef = useRef(null);
  const editRef = useRef(null);
  const emailRef = useRef(null);
  const filtersRef = useRef(null);
  const confirmationRef = useRef(null);

  const dispatch = useDispatch();

  const endReached = useSelector(state => state.deadlines.endReached);
  const loading = useSelector(state => state.deadlines.loading);
  const updating = useSelector(state => state.deadlines.updating);
  const deleting = useSelector(state => state.deadlines.deleting);
  const data = useSelector(state => state.deadlines.data.map(prazo => {
    rowTranslateAnimatedValues[prazo.id] = new Animated.Value(1);

    return prazo;
  }));

  const [customFilters, setCustomFilters] = useState({});
  const [currentDeadline, setCurrentDeadline] = useState(data[0]);
  const [currentFilter, setCurrentFilter] = useState('a-vencer');
  const [sharing, setSharing] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [page, setPage] = useState(1);
  const [havePermission, setPermission] = useState(false);

  const [idAgenda, setIdAgenda] = useState(0);


  useEffect(() => { checkPermission(PermissionsGroups.SCHEDULE).then(permission => setPermission(permission)) }, [props]);

  useEffect(() => {
    getLoggedUser().then(user =>
      Api.get(`/core/v1/agendas?campos=*&idUsuarioCliente=${user.idUsuarioCliente}`).then(({ data }) => setIdAgenda(data.itens[0]?.id || 0))
    )
  }, []);

  useEffect(() => {
    const removeIndex = props.navigation.getParam('removeIndex');

    if (!removeIndex) return;

    removeFromList(removeIndex);
  }, [props]);

  useEffect(() => {
    data.map((_, i) => rowTranslateAnimatedValues[i] = new Animated.Value(1));
  }, [data]);

  useEffect(() => {
    const { params } = filters.find(item => item.id == currentFilter);

    dispatch(
      DeadlinesActions.deadlinesRequest({
        filters: { ...params, ...customFilters },
        page: page,
        perPage: 20,
      })
    );

    dispatch(DeadlinesActions.deadlinesTypesRequest());

  }, [currentFilter, page, trigger, customFilters]);

  const clearCustomFilters = useCallback(() => setCustomFilters({}), []);

  const openRow = useCallback(key => !listRef.current._rows[key].isOpen ? listRef.current._rows[key].manuallySwipeRow(-260) : closeOpenedRow(key));

  const closeOpenedRow = useCallback(key => listRef.current._rows[key].closeRow());

  // const onDateChanged = (date, updateSource) => console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);

  // const onMonthChange = (month, updateSource) => console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);

  const callbackAdd = useCallback(() => setPage(1), []);

  const renderAdd = useCallback(() => <Add ref={addRef} idAgenda={idAgenda} onAdd={() => callbackAdd()} />, [idAgenda]);

  const renderEmail = useCallback(() => <Email ref={emailRef} deadline={currentDeadline} />, [currentDeadline]);

  const renderEdit = useCallback(() => <Edit ref={editRef} deadline={currentDeadline} />, [currentDeadline]);

  const renderCustomFilters = useCallback(() => <CustomFilters ref={filtersRef} filters={customFilters} setFilters={filters => handleCustomFilters(filters)} clear={clearCustomFilters} />, [customFilters]);

  const renderConfirmation = useCallback(() => <Confirmation ref={confirmationRef} deadline={currentDeadline} remove={id => removeFromList(id)} />, [currentDeadline]);

  const renderFooter = useCallback(() => (!loading) ? null : <Spinner />, [loading]);

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
        movementType: (item.idsMovimentosProcesso[0].idTipoMovProcesso == -2) ? 'publicacoes' : 'andamentos',
        movementId: item.idsMovimentosProcesso[0].idMovimentosProcesso
      };

      const { data } = await Api.get(`/core/v1/detalhes-movimentacoes/${param.movementType}?campos=*&Ids=${param.movementId}`);

      movement = data.itens[0];
    }

    const user = await getLoggedUser();

    let message = `Olá\n${user.nome} acabou de compartilhar com você!\n`;

    message += `\n${item.importante ? '[Importante] ' : ''}${item.titulo}\n\n`;
    message += `Data e hora: ${item.dataFormatada} - ${item.diaInteiro ? 'Dia todo' : item.horaFormatada}\n`;
    message += `Tipo: ${item.tipoEventoAgenda}\n`;
    message += `Lembrete: ${item.opcaoLembreteAgenda}\n`;
    message += `Repetir: ${item.tipoRepeticao}\n`;
    message += `Localização.: ${item.localizacao || '-'}\n`;
    message += `Observações: ${item.observacao || '-'}\n`;

    if (movement) {
      if (item.idsMovimentosProcesso[0].idTipoMovProcesso == -1) {
        message += `\n${movement.orgaoJudiciario}\n\n`;
        message += `Data Disponibilização: ${FormatDateBR(movement.dataDisponibilizacao)}\n`;
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
          message += `Palavras-chave: ${movement.palavrasChave.map(palavra => palavra.palavraChave).join(', ')}\n`;

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

  const handleFilter = useCallback(id => {
    setPage(1);
    setCurrentFilter(id);
  }, []);

  const handleCustomFilters = useCallback(filters => {
    setTrigger(!trigger);

    setCustomFilters(filters);

    setPage(1);
  }, [trigger]);

  const onEndReached = useCallback(() => {
    if (endReached || loading) return;

    setPage(page + 1);
  });

  const removeFromList = (id) => {
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
        })
      );
    };

    removeFromList(deadline.id, mark);
    // if (currentFilter != 'vencidos' && currentFilter != 'importantes') {
    // } else {
    //   mark();
    // }
  }, []);

  const markAsImportant = useCallback(deadline => {
    const { importante, id, idAgenda } = deadline;

    dispatch(
      DeadlinesActions.deadlinesMarkAsImportant({
        importante: !importante,
        id,
        idAgenda,
      })
    );

    setTimeout(() => closeOpenedRow(deadline.id), 500);
  }, []);

  const renderFilters = useCallback(({ item }) => (
    <FiltersButton onPress={() => handleFilter(item.id)}>
      <FiltersText active={currentFilter == item.id}>
        {item.name}
      </FiltersText>
      <FiltersActive active={currentFilter == item.id} />
    </FiltersButton>
  ), [currentFilter]);


  const renderHiddenItem = useCallback(({ item }) => (
    <Actions as={Animated.View} style={{
      overflow: 'hidden',
      maxHeight: rowTranslateAnimatedValues[item.id].interpolate({
        inputRange: [0, 1],
        outputRange: [0, 500],
      })
    }}>
      <ActionButton onPress={() => handleEdit(item)}>
        <MaterialIcons name="edit" size={24} color={colors.fadedBlack} />
      </ActionButton>
      <ActionButton onPress={() => handleEmail(item)}>
        <MaterialIcons name="mail" size={24} color={colors.fadedBlack} />
      </ActionButton>
      <ActionButton onPress={() => !updating && markAsImportant(item)}>
        {updating ? <Spinner height='auto' /> : <MaterialIcons name="flag" size={24} color={item.importante ? colors.blueImportant : colors.fadedBlack} />}
      </ActionButton>
      <ActionButton onPress={() => !sharing && share(item)}>
        {sharing ? <Spinner height='auto' /> : <MaterialIcons name="share" size={24} color={colors.fadedBlack} />}
      </ActionButton>
      <ActionButton onPress={() => handleConfirmation(item)}>
        {deleting ? <Spinner height='auto' /> : <MaterialIcons name="delete" size={24} color={colors.fadedBlack} />}
      </ActionButton>
    </Actions>
  ));

  const renderItem = useCallback(({ item }) => (
    <Animated.View style={{
      overflow: 'hidden',
      maxHeight: rowTranslateAnimatedValues[item.id].interpolate({
        inputRange: [0, 1],
        outputRange: [0, 500]
      })
    }}>
      <ListItem onPress={() => props.navigation.navigate('DeadlinesDetails', { deadline: item })} underlayColor={colors.white} activeOpacity={1}>
        <ListGrid>
          <ReadButton onPress={() => markAsRead(item)}></ReadButton>
          <ListContainer>
            <ListHeader>
              <ListSchedule>{moment(item.dataHoraInicio).format('DD/MM/YYYY')} • {moment(item.dataHoraInicio).format('HH:mm')}</ListSchedule>
              <ListAction onPress={() => openRow(item.id)}>
                <MaterialIcons name="more-horiz" size={25} color={colors.fadedBlack} />
              </ListAction>
            </ListHeader>
            <ListTitle>{item.titulo}</ListTitle>
            <Badge type={item.idPadraoTipoEventoAgenda}>
              <BadgeText>{item.tipoEventoAgenda}</BadgeText>
            </Badge>
          </ListContainer>
        </ListGrid>
      </ListItem>
    </Animated.View>
  ), [data]);

  return (
    <Container>
      {havePermission ?
        <Warp>
          <Header title="Prazos" filter={data.length > 0 || Object.keys(customFilters).length > 0 ? () => filtersRef.current?.open() : null} add={() => addRef.current?.open()} />
          {/* <Header title="Prazos" filter={data.length > 0 || Object.keys(customFilters).length > 0 ? () => filtersRef.current?.open() : null} /> */}
          <Filters
            contentContainerStyle={{ alignItems: 'center' }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={filters}
            scrollEnabled
            renderItem={renderFilters}
            keyExtractor={(item, _) => item.id.toString()}
          />
          <Content>
            {loading && page == 1 ? <Spinner height={'auto'} /> :
              <>
                {data.length > 0 ?
                  <>
                    <CalendarProvider
                      date={moment().format(`YYYY-MM-DD`)}
                      // onDateChanged={onDateChanged}
                      // onMonthChange={onMonthChange}
                      disabledOpacity={0.6}
                      displayLoadingIndicator={loading}
                      style={{ overflow: 'hidden', flex: 1, backgroundColor: colors.white }}
                      theme={{ todayButtonTextColor: colors.primary, backgroundColor: colors.white }}
                    >
                      <ExpandableCalendar

                        initialPosition={ExpandableCalendar.positions.OPEN}
                        style={{ shadowOpacity: 0, borderBottomWidth: 1, borderBottomColor: colors.grayLighter, backgroundColor: colors.white }}
                        theme={theme}
                        markingType={'custom'}
                        markedDates={getMarkedDates()}
                      />
                      <Agenda>
                        <SwipeListView
                          data={data}
                          ref={listRef}
                          closeOnRowOpen
                          disableRightSwipe
                          previewRowKey={'0'}
                          rightOpenValue={-260}
                          useNativeDriver={false}
                          previewOpenValue={-260}
                          previewOpenDelay={2000}
                          renderItem={renderItem}
                          onEndReached={onEndReached}
                          ListFooterComponent={renderFooter}
                          renderHiddenItem={renderHiddenItem}
                          keyExtractor={(item) => item.id}
                        />
                      </Agenda>
                    </CalendarProvider>
                  </>
                  :
                  <NotFound>
                    <Image source={notFound} />
                    <NotFoundText>Não há prazos</NotFoundText>
                    <NotFoundDescription>A sua lista está vazia</NotFoundDescription>
                    <CreateNew onPress={() => addRef.current?.open()}>
                      <CreateNewText>Cadastrar</CreateNewText>
                    </CreateNew>
                  </NotFound>
                }
              </>
            }
          </Content>
          {renderCustomFilters()}
          {renderAdd()}
          {renderEdit()}
          {renderEmail()}
          {renderConfirmation()}
        </Warp>
        :
        <HasNotPermission
          image={image}
          title="A sua rotina totalmente organizada!"
          body="Tenha a facilidade de cadastrar um prazo judicial, uma audiência ou uma reunião diretamente na sua ferramenta de monitoramento de informações jurídicas"
        />}
    </Container>
  );
};
