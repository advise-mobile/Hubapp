import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import MovementsActions from 'store/ducks/Movements';
import MovementActions from 'store/ducks/Movement';
import FolderKeywordsActions from 'store/ducks/FolderKeywords';
import FolderProcessesActions from 'store/ducks/FolderProcesses';

import Menu from './Menu';
import Email from '../Email';

import Header from 'components/Header';
import Spinner from 'components/Spinner';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Api from 'services/Api';

import { colors } from 'assets/styles';
import {
  Container,
  Warp,
  HeaderAction,
} from 'assets/styles/general';

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

import { FormatDateBR } from 'helpers/DateFunctions';
import { MaskCnj } from 'helpers/Mask';

export default MovementDetail = props => {
  const [idMovProcessoCliente] = useState(props.route.params.idMovProc);
  const [movementType] = useState(props.route.params.movementType);
  const [movement, setMovement] = useState(props.route.params.movement);
  const [loadingDetails, setLoading] = useState(true);

  const loading = useSelector(state => state.process.loading);

  const menuRef = useRef(null);
  const emailRef = useRef(null);

  const dispatch = useDispatch();

  const customActions = useMemo(() => (
    <HeaderAction>
      <MaterialIcons name={'more-vert'} size={20} color={colors.fadedBlack} onPress={() => menuRef.current?.open()} />
    </HeaderAction>
  ), []);

  const renderMenu = useMemo(() =>
    <Menu
      ref={menuRef}
      movement={movement}
      type={movementType}
      openEmail={() => emailRef.current?.open()}
    />, [movement, movementType]);

  useEffect(() => {
    const endpoint = (movementType === -1) ? 'andamentos' : 'publicacoes';

    Api.get(`/core/v1/detalhes-movimentacoes/${endpoint}?IDs=${movement.idMovProcessoCliente}&campos=*&registrosPorPagina=-1`).then(({ data }) => {
      const move = data.itens[0];

      if (!movement.lido) {
        dispatch(
          MovementActions.movementReadRequest({
            id: movement.id,
            idMovProcessoCliente: movement.idMovProcessoCliente,
            movementType: 'marcar',
          })
        );

        dispatch(
          MovementsActions.toggleAsRead({
            movementId: movement.id,
            read: true
          })
        );

        if (movementType === -1) {
          dispatch(
            FolderProcessesActions.folderProcessesRequest({
              filters: {},
              page: 1,
              perPage: 20,
            })
          );
        } else {
          dispatch(
            FolderKeywordsActions.folderKeywordsRequest({
              filters: {},
              page: 1,
              perPage: 20,
            })
          );
        }
      }

      setMovement(move);
    }).finally(() => {
      setLoading(false);
    });

    return;
  }, []);

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
            <TagText>{movement.fonte}</TagText>
          </Tag>
        )}
        {movement.identificador && (
          <Tag background={colors.gray}>
            <TagText>{movement.identificador}</TagText>
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

  const renderPublication = useCallback(() => {
    console.log(movement);

    return (
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

          {(movement.paginaInicial > 0 && movement.paginaFinal > 0) && (
            <Tag background={colors.gray}>
              <TagText>Páginas: {movement.paginaInicial || 0} a {movement.paginaFinal || 0}</TagText>
            </Tag>
          )}

        </MovementTags>

        {movement.processoPublicacao ?
          <>
            {(movement.processoPublicacao.length > 0) ?
              <ProcessNumber>
                <ProcessNumberText>Proc.: {MaskCnj(movement.processoPublicacao[0].numeroProcesso)}</ProcessNumberText>
              </ProcessNumber>
              : <ProcessNumber>
                <ProcessNumberText color={colors.red}>Proc.: Não identificado</ProcessNumberText>
                <MaterialIcons name="add-circle-outline" size={20} color={colors.red} />
              </ProcessNumber>}
          </> :
          <ProcessNumber>
            <ProcessNumberText color={colors.red}>Proc.: Não identificado</ProcessNumberText>
            <MaterialIcons name="add-circle-outline" size={20} color={colors.red} />
          </ProcessNumber>
        }

        <MovementContent>{movement.conteudo}</MovementContent>
        <MovementDispatch>{movement.despacho}</MovementDispatch>
      </Movement>
    );
  });

  return (
    <Container>
      <Warp>
        {loadingDetails ? <Spinner /> :
          movementType === -1 ? ([
            <Header title={movement.orgaoJudiciario} back={() => props.navigation.goBack()} customActions={customActions} key={1} />,
            renderProcesses()
          ]) : ([
            <Header title={movement.diarioDescricao} back={() => props.navigation.goBack()} customActions={customActions} key={0} />,
            renderPublication()
          ])
        }
      </Warp>
      {renderMenu}
      <Email ref={emailRef} movement={movement} idMovProc={idMovProcessoCliente} />
    </Container>
  );
}
