import React, { useState, useRef, useCallback, useEffect, createRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Appearance } from 'react-native';

import MovementsActions from 'store/ducks/Movements';
import MovementActions from 'store/ducks/Movement';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import CheckBox from '@react-native-community/checkbox';
import { SwipeListView } from 'react-native-swipe-list-view';

import Header from 'components/Header';
import Spinner from 'components/Spinner';
import { Share } from 'components/Share';

import Filters from './Filters';
import Email from './Email';

import { FormatDateInFull, FormatDateBR } from 'helpers/DateFunctions';

import { colors } from 'assets/styles';
import { Container, Warp, Actions, ActionButton } from 'assets/styles/general';
import {
  Heading,
  FolderTitle,
  FolderSelected,
  FolderSelectedTitle,
  FolderSelectedTitleHighlight,
  FolderSelectedActions,
  FolderSelectedActionButton,
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

import { MaskCnj } from 'helpers/Mask';

const colorScheme = Appearance.getColorScheme();

const notFound = (colorScheme == 'dark') ? require('assets/images/not_found/movements_white.png') : require('assets/images/not_found/movements.png');

export default Movements = props => {
  const listRef = useRef(null);
  const emailRef = useRef(null);
  const filtersRef = useRef(null);

  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const movements = useSelector(state => state.movements.data);
  const endReached = useSelector(state => state.movements.endReached);
  const loading = useSelector(state => state.movements.loading);
  const loadingMore = useSelector(state => state.movements.loadingMore);
  const diaries = useSelector(state => state.movements.diaries);
  const tribunals = useSelector(state => state.movements.tribunals);
  const refreshing = useSelector(state => state.movements.refreshing);

  const [folder] = useState(props.route.params.item);

  const [selecteds, setSelecteds] = useState(0);
  const [selectAll, setSelectedAll] = useState(selecteds > 0 ? true : false);
  const [trigger, setTrigger] = useState(false);

  const [currentMove, setCurrentMove] = useState(movements[0]);

  const [formattedData, setFormattedData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      MovementsActions.movementsRequest({
        filters,
        page: currentPage,
        perPage: 20,
        folderId: folder.id
      })
    );

    if (folder.idTipoPasta == -2)
      dispatch(
        MovementsActions.diariesRequest({
          idPalavraChave: folder.idPalavraChave
        })
      );
    else
      dispatch(
        MovementsActions.tribunalsRequest({
          processNumber: folder.numeroProcesso
        })
      );
  }, [])

  useEffect(() => {
    if (loadingMore) return;

    dispatch(
      MovementsActions.movementsRequest({
        filters,
        page: currentPage, perPage: 20,
        folderId: folder.id
      })
    );

    // if (currentPage > 1) return;

    // if (folder.idTipoPasta == -2)
    //   dispatch(
    //     MovementsActions.diariesRequest({
    //       idPalavraChave: folder.idPalavraChave
    //     })
    //   );
    // else
    //   dispatch(
    //     MovementsActions.tribunalsRequest({
    //       processNumber: folder.numeroProcesso
    //     })
    //   );

  }, [trigger, filters]);

  useEffect(() => {
    const custom = (folder.idTipoPasta == -2) ? { title: 'Diários', name: 'diario', data: diaries } : { title: 'Tribunais', name: 'IdsOrgaosJudiciarios', data: tribunals.map(tribunal => { return { nome: tribunal.nomeOrgaoJudiciario, id: tribunal.idOrgaoJudiciario } }) };
    setFormattedData(custom);
  }, [props, tribunals, folder]);


  const refresh = useCallback(() => {
    dispatch(
      MovementsActions.movementsRefresh({
        filters,
        page: 1,
        perPage: 20,
        folderId: folder.id,
        refreshing: true,
      })
    );
  }, [filters, folder]);

  const toggleCheck = useCallback((item, checked) => {
    item.checked = checked;

    const selectedItems = checked ? selecteds + 1 : selecteds - 1;

    setSelecteds(selectedItems);
  });

  const toggleCheckAll = useCallback(check => {
    setSelectedAll(check);

    dispatch(MovementsActions.toggleMovements(check));

    setSelecteds(check ? movements.length : 0);
  });


  const onEndReached = useCallback(() => {
    if (endReached || loadingMore) return;

    setCurrentPage(currentPage + 1);

    setTrigger(!trigger);
  }, [currentPage, loadingMore, trigger]);

  const toggleAsRead = useCallback(({ item }) => {
    dispatch(
      MovementActions.movementReadRequest({
        id: item.id,
        idMovProcessoCliente: item.idMovProcessoCliente,
        movementType: item.lido ? 'desmarcar' : 'marcar',
      })
    );

    dispatch(
      MovementsActions.toggleAsRead({
        movementId: item.id,
        read: !item.lido
      })
    );

    closeOpenedRow(item.id);
  });

  const share = useCallback(({ item }) => {
    const { movimento } = item;

    if (item.movimento.idTipoMovProcesso == -1) {
      const { andamentoProcesso } = movimento;

      const messageShare = `${andamentoProcesso.siglaOrgaoJudiriario}, ${FormatDateInFull(andamentoProcesso.dataHoraAndamentoProcesso)} \n\n${andamentoProcesso.descricaoAndamento}`;

      const infoShare = `\n\n\nFonte: ${andamentoProcesso.nomeFontePesquisa}\nIdentificador: ${andamentoProcesso.identificadorClasseFonteProcesso}`;

      Share({
        message: messageShare + infoShare,
        title: 'Processo',
      });
    } else {
      const { publicacao } = movimento;

      const messageShare = `${publicacao.descricaoDiario}, ${FormatDateInFull(publicacao.dataPublicacaoDiarioEdicao)} \n\n${publicacao.conteudo} \n\n${publicacao.despacho}`;

      const infoShare = `\n\n\nCaderno: ${publicacao.descricaoCadernoDiario}\nVara: ${publicacao.varaDescricao}\nComarca: ${publicacao.cidadeComarcaDescricao}\nPágina: ${publicacao.paginaInicial} e ${publicacao.paginaFinal}`;

      Share({
        message: messageShare + infoShare,
        title: 'Publicação',
      });
    }

  });

  const openRow = useCallback(key => !listRef.current._rows[key].isOpen ? listRef.current._rows[key].manuallySwipeRow(-150) : closeOpenedRow(key), [listRef]);

  const closeOpenedRow = useCallback(key => listRef.current._rows[key].closeRow());

  const handleSubmit = useCallback(data => {
    setCurrentPage(1);
    setFilters(data);
  }, []);

  const renderFilters = useMemo(() => <Filters ref={filtersRef} customField={formattedData} submit={data => handleSubmit(data)} filters={filters} />, [formattedData]);

  const renderEmail = useMemo(() => <Email ref={emailRef} movement={currentMove} />, [currentMove]);

  const openFilters = () => filtersRef.current?.open();

  const handleEmail = useCallback(({ item }) => {
    setCurrentMove(item);

    emailRef.current?.open();
  });

  const renderMovementTitle = useCallback(movement => {
    let title = FormatDateBR(movement.dataHoraMovimento);

    let { andamentoProcesso } = movement;

    if (movement.idTipoMovProcesso == -1) {
      title += ' - ' + andamentoProcesso.siglaOrgaoJudiriario;
      if (andamentoProcesso.nomeFontePesquisa) title += ' - ' + andamentoProcesso.nomeFontePesquisa;
    } else
      title += ' - ' + movement.publicacao.descricaoCadernoDiario;

    return title;
  });

  const renderHiddenItem = useCallback(data => (
    <Actions>
      <ActionButton onPress={() => toggleAsRead(data)}>
        <MaterialIcons name={data.item.lido ? "visibility-off" : "visibility"} size={24} color={colors.fadedBlack} />
      </ActionButton>
      <ActionButton onPress={() => handleEmail(data)}>
        <MaterialIcons name="mail" size={24} color={colors.fadedBlack} />
      </ActionButton>
      {/* <ActionButton onPress={() => console.log('clicked')}>
        <MaterialIcons name="get-app" size={24} color={colors.fadedBlack} />
      </ActionButton>
      <ActionButton onPress={() => console.log('clicked')}>
        <MaterialIcons name="delete" size={24} color={colors.fadedBlack} />
      </ActionButton> */}
      <ActionButton onPress={() => share(data)}>
        <MaterialIcons name="share" size={24} color={colors.fadedBlack} />
      </ActionButton>
    </Actions>
  ));

  const renderItem = ({ item }) => (
    <Movement>
      <MovementHeader>
        {/* <CheckBox
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
        /> */}
        <MovementHeading numberOfLines={1} onPress={() => props.navigation.navigate('MovementDetail', { movement: item })} underlayColor={colors.white} activeOpacity={1} read={item.lido}>{renderMovementTitle(item.movimento)}</MovementHeading>
        <MovementAction onPress={() => openRow(item.id)}>
          <MaterialIcons name="more-horiz" size={25} color={colors.fadedBlack} />
        </MovementAction>
      </MovementHeader>
      {item.movimento.andamentoProcesso && (
        <MovementResume numberOfLines={2} onPress={() => props.navigation.navigate('MovementDetail', { movement: item })} underlayColor={colors.white} activeOpacity={1}>{item.movimento.andamentoProcesso.resumo}</MovementResume>
      )}
      {item.movimento.publicacao?.resumo && (
        <MovementResume numberOfLines={2} onPress={() => props.navigation.navigate('MovementDetail', { movement: item })} underlayColor={colors.white} activeOpacity={1}>{item.movimento.publicacao?.resumo}</MovementResume>
      )}
      <MovementTags onPress={() => props.navigation.navigate('MovementDetail', { movement: item })} underlayColor={colors.white} activeOpacity={1}>
        {item.movimento.idTipoMovProcesso === -1 &&
          <>
            <Tag background={item.lido ? colors.gray : colors.amber}>
              <TagText>Andamento</TagText>
            </Tag>
            {item.movimento.andamentoProcesso &&
              <Tag background={colors.gray}>
                <TagText>
                  Proc.: {MaskCnj(item.movimento.andamentoProcesso.numeroProcesso)}
                </TagText>
              </Tag>}
          </>
        }

        {item.movimento.idTipoMovProcesso === -2 &&
          <>
            <Tag background={item.lido ? colors.gray : colors.amber}>
              <TagText>Publicado em: {FormatDateBR(item.movimento.publicacao.dataPublicacaoDiarioEdicao)}</TagText>
            </Tag>

            {item.movimento.publicacao.palavrasChaves.map(keyword =>
              keyword.idPalavraChavePrincipal === undefined &&
              <Tag background={keyword.palavraChave == folder.nome ? colors.green : colors.gray} key={keyword.id}>
                <TagText>{keyword.palavraChave}</TagText>
              </Tag>
            )}
            {item.movimento.publicacao.processosPublicacoes.length === 0 ?
              <Tag background={colors.gray}>
                <TagText>Proc.: Não identificado</TagText>
              </Tag>
              :
              <Tag background={colors.gray}>
                <TagText>
                  Proc.: {MaskCnj(item.movimento.publicacao.processosPublicacoes[0].numeroProcesso)}
                </TagText>
              </Tag>
            }
          </>
        }
      </MovementTags>
    </Movement>
  );

  const renderFooter = useCallback(() => {
    if (!loading) return null;

    return <Spinner />;
  });

  return (
    <Container>
      <Warp>
        {/* <Header title='Movimentações' add={() => { }} edit={() => { }} filter={() => openFilters()} /> */}
        <Header title='Movimentações' filter={() => openFilters()} />
        {selecteds == 0 ? (
          <Heading>
            <BackButton onPress={() => props.navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={20} color={colors.fadedBlack} />
            </BackButton>
            <FolderTitle>{MaskCnj(folder.nome)}</FolderTitle>
          </Heading>
        ) : (
          <Heading>
            <FolderSelected>
              {/* <CheckBox
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
                /> */}
              <FolderSelectedTitle>
                <FolderSelectedTitleHighlight>Selecionado {selecteds}</FolderSelectedTitleHighlight> de {movements.length} publicações
              </FolderSelectedTitle>
              <FolderSelectedActions>
                {/* <FolderSelectedActionButton onPress={() => console.log('clicked')}>
                    <MaterialIcons name="preview" size={22} color={colors.fadedBlack} />
                  </FolderSelectedActionButton> */}
                <FolderSelectedActionButton onPress={() => console.log('clicked')}>
                  <MaterialIcons name="mail" size={22} color={colors.fadedBlack} />
                </FolderSelectedActionButton>
                <FolderSelectedActionButton onPress={() => console.log('clicked')}>
                  <MaterialIcons name="delete" size={22} color={colors.fadedBlack} />
                </FolderSelectedActionButton>
              </FolderSelectedActions>
            </FolderSelected>
          </Heading>
        )}
        {loading && currentPage == 1 ? <Spinner /> :
          <>
            {movements.length > 0 ?
              <SwipeListView
                onRefresh={refresh}
                refreshing={refreshing}
                ref={listRef}
                data={movements}
                disableRightSwipe
                previewRowKey={'2'}
                rightOpenValue={-150}
                stopRightSwipe={-150}
                closeOnRowOpen={false}
                renderItem={renderItem}
                previewOpenValue={-150}
                previewOpenDelay={2000}
                // rightOpenValue={-260}
                onEndReached={onEndReached}
                ListFooterComponent={renderFooter}
                renderHiddenItem={renderHiddenItem}
                keyExtractor={(item, _) => item.id.toString()}
              /> :
              <NotFound>
                <Image source={notFound} />
                <NotFoundText>Não há resultados</NotFoundText>
                <NotFoundDescription>Tente uma busca diferente!</NotFoundDescription>
              </NotFound>
            }
          </>
        }
        {renderFilters}
        {renderEmail}
      </Warp>
    </Container>
  );
}
