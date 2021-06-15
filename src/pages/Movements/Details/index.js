import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import MovementsActions from 'store/ducks/Movements';
import MovementActions from 'store/ducks/Movement';
import ProcessActions from 'store/ducks/Process';
import FolderKeywordsActions from 'store/ducks/FolderKeywords';
import FolderProcessesActions from 'store/ducks/FolderProcesses';

import Menu from './Menu';
import Email from '../Email';

import Header from 'components/Header';
import Spinner from 'components/Spinner';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  const [movement] = useState(props.route.params.movement);

  const details = useSelector(state => state.process.data);
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
      openEmail={() => emailRef.current?.open()}
    />, [movement]);

  useEffect(() => {
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

      if (movement.movimento.idTipoMovProcesso == -1) {
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

    if (movement.movimento.idTipoMovProcesso == -1) {
      dispatch(
        ProcessActions.processRequest({
          movementId: movement.movimento.id
        })
      );
    }
  }, []);

  const renderProcesses = useCallback(() => (
    <Movement key={3}>
      <MovementTags>
        {details.dataDisponibilizacaoSemHora && (
          <Tag background={colors.gray}>
            <TagText>Andamento realizado em: {details.dataDisponibilizacaoSemHora}</TagText>
          </Tag>
        )}
        {details.fonte && (
          <Tag background={colors.gray}>
            <TagText>{details.fonte}</TagText>
          </Tag>
        )}
        {details.identificador && (
          <Tag background={colors.gray}>
            <TagText>{details.identificador}</TagText>
          </Tag>
        )}

      </MovementTags>
      {details.pasta && (
        <ProcessNumber>
          <ProcessNumberText>Proc.: {details.pasta}</ProcessNumberText>
        </ProcessNumber>
      )}
      <MovementContent>{details.descricaoAndamento}</MovementContent>

    </Movement>
  ));

  const renderPublication = useCallback(() => {
    const { publicacao } = movement.movimento;

    return (
      <Movement>
        <MovementTags>
          {publicacao.dataDivulgacaoDiarioEdicao && (
            <Tag background={colors.gray}>
              <TagText>Disponibilização em: {FormatDateBR(publicacao.dataDivulgacaoDiarioEdicao)}</TagText>
            </Tag>
          )}

          {publicacao.dataPublicacaoDiarioEdicao && (
            <Tag background={colors.gray}>
              <TagText>Publicação em: {FormatDateBR(publicacao.dataPublicacaoDiarioEdicao)}</TagText>
            </Tag>
          )}

          {publicacao.varaDescricao && (
            <Tag background={colors.gray}>
              <TagText>{publicacao.varaDescricao}</TagText>
            </Tag>
          )}

          {publicacao.cidadeComarcaDescricao && (
            <Tag background={colors.gray}>
              <TagText>{publicacao.cidadeComarcaDescricao}</TagText>
            </Tag>
          )}

          {publicacao.cadernoDescricao && (
            <Tag background={colors.gray}>
              <TagText>{publicacao.cadernoDescricao}</TagText>
            </Tag>
          )}

          {publicacao.descricaoCadernoDiario && (
            <Tag background={colors.gray}>
              <TagText>{publicacao.descricaoCadernoDiario}</TagText>
            </Tag>
          )}

          {(publicacao.paginaInicial > 0 && publicacao.paginaFinal > 0) && (
            <Tag background={colors.gray}>
              <TagText>{publicacao.paginaInicial || 0} a {publicacao.paginaFinal || 0}</TagText>
            </Tag>
          )}

        </MovementTags>

        {publicacao.processosPublicacoes ?
          <>
            {(publicacao.processosPublicacoes.length > 0) ?
              <ProcessNumber>
                <ProcessNumberText>Proc.: {MaskCnj(publicacao.processosPublicacoes[0].numeroProcesso)}</ProcessNumberText>
              </ProcessNumber>
              : <ProcessNumber>
                <ProcessNumberText color={colors.red}>Proc.: Não identificado</ProcessNumberText>
                <MaterialIcons name="add-circle-outline" size={20} color={colors.red} onPress={() => console.log('teste')} />
              </ProcessNumber>}
          </> :
          <ProcessNumber>
            <ProcessNumberText color={colors.red}>Proc.: Não identificado</ProcessNumberText>
            <MaterialIcons name="add-circle-outline" size={20} color={colors.red} onPress={() => console.log('teste')} />
          </ProcessNumber>
        }

        <MovementContent>{publicacao.conteudo}</MovementContent>
        <MovementDispatch>{publicacao.despacho}</MovementDispatch>
      </Movement>
    )
  });

  return (
    <Container>
      <Warp>
        {movement.movimento.idTipoMovProcesso == -1 ? loading ? <Spinner /> : ([
          <Header title={details.orgaoJudiciario} back={() => props.navigation.goBack()} customActions={customActions} key={1} />,
          renderProcesses()
        ]) : ([
          <Header title={movement.movimento.publicacao.descricaoDiario} back={() => props.navigation.goBack()} customActions={customActions} key={0} />,
          renderPublication()
        ])}
      </Warp>
      {renderMenu}
      <Email ref={emailRef} movement={movement} />
    </Container>
  );
}
