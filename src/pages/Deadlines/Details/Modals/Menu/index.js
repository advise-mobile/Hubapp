import React, { forwardRef, useState, useCallback, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Modal from 'components/Modal';

import { Share } from 'components/Share';

import { getLoggedUser } from 'helpers/Permissions';

import { FormatDateBR } from 'helpers/DateFunctions';

import { useSelector, useDispatch } from 'react-redux';

import DeadlinesActions from 'store/ducks/Deadlines';

import {
  Footer,
  Cancel,
  CancelText,
  Content,
  Item,
  ItemText,
} from './styles';


// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

export default Menu = forwardRef((props, ref) => {

    // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

  const dispatch = useDispatch();

  const [deadline, setDeadline] = useState(props.deadline);

  useEffect(() => setDeadline(props.deadline), [props]);

  const markAsRead = useCallback(() => {
    const { concluido, id, idAgenda } = deadline;

    dispatch(
      DeadlinesActions.deadlinesMarkAsConcluded({
        concluido: !concluido,
        id,
        idAgenda,
      })
    );

    setTimeout(() => closeModal(), 500);
  }, [props]);

  const markAsImportant = useCallback(() => {
    const { importante, id, idAgenda } = deadline;

    dispatch(
      DeadlinesActions.deadlinesMarkAsImportant({
        importante: !importante,
        id,
        idAgenda,
      })
    );

    setTimeout(() => closeModal(), 500);
  }, []);

  const share = useCallback(async () => {
    const movement = props.movement;

    const user = await getLoggedUser();

    let message = `Olá\n${user.nome} acabou de compartilhar com você!\n`;

    message += `\n${deadline.importante ? '[Importante] ' : ''}${deadline.titulo}\n\n`;
    message += `Data e hora: ${deadline.dataFormatada} - ${deadline.diaInteiro ? 'Dia todo' : deadline.horaFormatada}\n`;
    message += `Tipo: ${deadline.tipoEventoAgenda}\n`;
    message += `Lembrete: ${deadline.opcaoLembreteAgenda}\n`;
    message += `Repetir: ${deadline.tipoRepeticao}\n`;
    message += `Localização.: ${deadline.localizacao || '-'}\n`;
    message += `Observações: ${deadline.observacao || '-'}\n`;

    if (movement != null) {
      if (deadline.idsMovimentosProcesso[0].idTipoMovProcesso == -1) {
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

    setTimeout(() => closeModal(), 500);
  }, [props]);

  const closeModal = useCallback(() => ref.current?.close(), []);

  const openEdit = useCallback(() => {
    closeModal();

    setTimeout(() => props.openEdit(), 200);
  })

  const openConfirmation = useCallback(() => {
    closeModal();

    setTimeout(() => props.openConfirmation(), 200);
  })

  const openEmail = useCallback(() => {
    closeModal();

    setTimeout(() => props.openEmail(), 200);
  })

  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
    </Footer>
  );

  return (
    <Modal ref={ref} title="O que deseja?" footer={footer()}>
      <Content>
        <Item onPress={() => markAsRead()}>
          <MaterialIcons name={'check'} size={22} color={colors.fadedBlack} />
          <ItemText>{deadline.concluido ? 'Desmarcar' : 'Marcar'} como concluído</ItemText>
        </Item>
        <Item onPress={() => openEdit()}>
          <MaterialIcons name={'edit'} size={22} color={colors.fadedBlack} />
          <ItemText>Editar</ItemText>
        </Item>
        <Item onPress={() => openEmail()}>
          <MaterialIcons name={'mail'} size={22} color={colors.fadedBlack} />
          <ItemText>Enviar por email</ItemText>
        </Item>
        <Item onPress={() => markAsImportant()}>
          <MaterialIcons name={'flag'} size={22} color={colors.fadedBlack} />
          <ItemText>Marcar como importante</ItemText>
        </Item>
        <Item onPress={() => share()}>
          <MaterialIcons name={'share'} size={22} color={colors.fadedBlack} />
          <ItemText>Compartilhar</ItemText>
        </Item>
        <Item onPress={() => openConfirmation()}>
          <MaterialIcons name={'delete'} size={22} color={colors.fadedBlack} />
          <ItemText>Excluir</ItemText>
        </Item>
      </Content>
    </Modal>
  );
});
