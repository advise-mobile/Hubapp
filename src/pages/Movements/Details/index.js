import React, { useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import MovementsActions from 'store/ducks/Movements';
import MovementActions from 'store/ducks/Movement';
import ProcessActions from 'store/ducks/Process';

import { colors } from 'assets/styles';
import Header from 'components/Header';
import Spinner from 'components/Spinner';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

  const dispatch = useDispatch();

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

  const customActions = useCallback(() => null, []);
  // (
  //   <HeaderAction key={1}>
  //     <MaterialIcons name="event" size={20} color={colors.fadedBlack} onPress={() => console.log('custom')} />
  //   </HeaderAction>
  // ));

  return (
    <Container>
      <Warp>
        {movement.movimento.idTipoMovProcesso == -1 ? loading ? <Spinner /> : ([
          <Header title={details.orgaoJudiciario} back={() => props.navigation.goBack()} customActions={customActions()} key={1} />,
          renderProcesses()
        ]) : ([
          <Header title={movement.movimento.publicacao.descricaoDiario} back={() => props.navigation.goBack()} customActions={customActions()} key={0} />,
          renderPublication()
        ])}
      </Warp>
    </Container>
  );
}
