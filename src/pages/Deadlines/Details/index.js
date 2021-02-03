import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeadlinesActions from 'store/ducks/Deadlines';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Api from 'services/Api';

import { Menu, Edit } from './Modals';
import Email from '../Modals/Email';
import Confirmation from '../Modals/Confirmation';

import Header from 'components/Header';
import Spinner from 'components/Spinner';

import { MaskCnj } from 'helpers/Mask';
import { FormatDateInFull } from 'helpers/DateFunctions';

import {
  MovementTags,
  Tag,
  TagText,
  ProcessNumber,
  ProcessNumberText,
  MovementContent,
  MovementDispatch,
} from 'pages/Movements/Details/styles';

import { colors } from 'assets/styles';
import { Container, Warp, HeaderAction } from 'assets/styles/general';
import {
  Content,
  Label,
  Value,
  Movement,
  MovementTitle,
} from './styles';

export default function DeadlinesDetails(props) {
  const menuRef = useRef(null);
  const editRef = useRef(null);
  const emailRef = useRef(null);
  const confirmationRef = useRef(null);

  const dispatch = useDispatch();

  const [deadline, setDeadline] = useState(props.navigation.getParam('deadline'));

  const customActions = useMemo(() => (
    <HeaderAction>
      <MaterialIcons name={'more-vert'} size={20} color={colors.fadedBlack} onPress={() => menuRef.current?.open()} />
    </HeaderAction>
  ), []);

  const [movementData, setMovementData] = useState(null);
  const [movement, setMovement] = useState(null);

  useEffect(() => {
    const renderMovement = async () => {
      let element = null;

      if (deadline.idsMovimentosProcesso.length > 0) {
        const param = {
          movementType: (deadline.idsMovimentosProcesso[0].idTipoMovProcesso == -2) ? 'publicacoes' : 'andamentos',
          movementId: deadline.idsMovimentosProcesso[0].idMovimentosProcesso
        };

        const { data } = await Api.get(`/core/v1/detalhes-movimentacoes/${param.movementType}?campos=*&Ids=${param.movementId}`);

        const movement = data.itens[0];

        setMovementData(movement);

        if (param.movementType == 'publicacoes') element = renderPublication(movement);
        else element = renderProcesses(movement);
      }

      setMovement(element);
    };

    renderMovement();

    dispatch(DeadlinesActions.deadlinesTypesRequest());

  }, [deadline]);

  const renderMenu = useMemo(() =>
    <Menu
      ref={menuRef}
      deadline={deadline}
      openEdit={() => editRef.current?.open()}
      openEmail={() => emailRef.current?.open()}
      openConfirmation={() => confirmationRef.current?.open()}
      share={() => share()}
      movement={movementData}
    />, [movementData]);

  const renderProcesses = useCallback(movement => (
    <Movement>
      <MovementTitle>Andamento do {movement.orgaoJudiciario} de {movement.dataFormatada}</MovementTitle>
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
          <ProcessNumberText>Proc.: {MaskCnj(movement.numeroProcesso)}</ProcessNumberText>
        </ProcessNumber>
      )}
      <MovementContent>{movement.descricaoAndamento}</MovementContent>

    </Movement>
  ));

  const renderPublication = useCallback(publicacao => (
    <Movement>
      <MovementTitle>Publicação do {publicacao.diarioDescricao} de {FormatDateInFull(publicacao.dataPublicacao)}</MovementTitle>
      <MovementTags>
        {publicacao.dataDivulgacaoDiarioEdicao && (
          <Tag background={colors.gray} key={1}>
            <TagText>Disponibilização em: {FormatDateBR(publicacao.dataDivulgacaoDiarioEdicao)}</TagText>
          </Tag>
        )}

        {publicacao.dataPublicacaoDiarioEdicao && (
          <Tag background={colors.gray} key={2}>
            <TagText>Publicação em: {FormatDateBR(publicacao.dataPublicacaoDiarioEdicao)}</TagText>
          </Tag>
        )}

        {publicacao.varaDescricao && (
          <Tag background={colors.gray} key={3}>
            <TagText>{publicacao.varaDescricao}</TagText>
          </Tag>
        )}

        {publicacao.cidadeComarcaDescricao && (
          <Tag background={colors.gray} key={4}>
            <TagText>{publicacao.cidadeComarcaDescricao}</TagText>
          </Tag>
        )}

        {publicacao.cadernoDescricao && (
          <Tag background={colors.gray} key={5}>
            <TagText>{publicacao.cadernoDescricao}</TagText>
          </Tag>
        )}

        {publicacao.descricaoCadernoDiario && (
          <Tag background={colors.gray} key={6}>
            <TagText>{publicacao.descricaoCadernoDiario}</TagText>
          </Tag>
        )}

        {publicacao.paginaInicial && (
          <Tag background={colors.gray} key={7}>
            <TagText>{publicacao.paginaInicial} a {publicacao.paginaFinal}</TagText>
          </Tag>
        )}

      </MovementTags>
      {publicacao.processoPublicacao && (
        <ProcessNumber>
          <ProcessNumberText>Proc.: {MaskCnj(publicacao.processoPublicacao[0].numeroProcesso)}</ProcessNumberText>
        </ProcessNumber>
      )}

      {!publicacao.processoPublicacao && (
        <ProcessNumber>
          <ProcessNumberText color={colors.red}>Proc.: Não identificado</ProcessNumberText>
          {/* <MaterialIcons name="add-circle-outline" size={20} color={colors.red} onPress={() => console.log('teste')} /> */}
        </ProcessNumber>
      )}
      <MovementContent>{publicacao.conteudo}</MovementContent>
      <MovementDispatch>{publicacao.despacho}</MovementDispatch>
    </Movement>
  ), []);

  return (
    <Container>
      <Warp>
        <Header title={deadline.titulo} back={() => props.navigation.goBack()} customActions={customActions} />
        <Content>
          <Label>Data e hora</Label>
          <Value>{deadline.dataFormatada} {deadline.diaInteiro ? '- Dia todo' : 'às ' + deadline.horaFormatada}</Value>
          <Label>Tipo</Label>
          <Value>{deadline.tipoEventoAgenda}</Value>
          <Label>Localização</Label>
          <Value>{deadline.localizacao || '-'}</Value>
          <Label>Observações</Label>
          <Value>{deadline.observacao || '-'}</Value>
          {movement}
        </Content>
        {renderMenu}
        <Edit ref={editRef} deadline={deadline} onFishEdit={deadline => setDeadline(deadline)} />
        <Email ref={emailRef} deadline={deadline} />
        <Confirmation ref={confirmationRef} deadline={deadline} remove={() => props.navigation.navigate('Deadlines', { removeIndex: deadline.id })} />
      </Warp>
    </Container>
  );
};
