import React, { forwardRef, useState, useCallback, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Modal from 'components/Modal';
import { Share } from 'components/Share';

import { useDispatch } from 'react-redux';

import { FormatDateInFull } from 'helpers/DateFunctions';


import { colors } from 'assets/styles';
import {
  Footer,
  Cancel,
  CancelText,
  Content,
  Item,
  ItemText,
} from './styles';

export default Menu = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const [movement, setMovement] = useState(props.movement);

  useEffect(() => setMovement(props.movement), [props]);

  // const markAsRead = useCallback(() => {
  //   const { concluido, id, idAgenda } = deadline;

  //   dispatch(
  //     DeadlinesActions.deadlinesMarkAsConcluded({
  //       concluido: !concluido,
  //       id,
  //       idAgenda,
  //     })
  //   );

  //   setTimeout(() => closeModal(), 500);
  // }, [props]);

  // const markAsImportant = useCallback(() => {
  //   const { importante, id, idAgenda } = deadline;

  //   dispatch(
  //     DeadlinesActions.deadlinesMarkAsImportant({
  //       importante: !importante,
  //       id,
  //       idAgenda,
  //     })
  //   );

  //   setTimeout(() => closeModal(), 500);
  // }, []);


  const share = useCallback(() => {
    const { movimento } = movement;

    if (movimento.idTipoMovProcesso == -1) {
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


  // const openEdit = useCallback(() => {
  //   closeModal();

  //   setTimeout(() => props.openEdit(), 200);
  // })

  // const openConfirmation = useCallback(() => {
  //   closeModal();

  //   setTimeout(() => props.openConfirmation(), 200);
  // })

  const openEmail = useCallback(() => {
    closeModal();

    setTimeout(() => props.openEmail(), 200);
  });

  const closeModal = useCallback(() => ref.current?.close(), []);

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
        <Item onPress={() => openEmail()}>
          <MaterialIcons name={'mail'} size={22} color={colors.fadedBlack} />
          <ItemText>Enviar por email</ItemText>
        </Item>
        <Item onPress={() => share()}>
          <MaterialIcons name={'share'} size={22} color={colors.fadedBlack} />
          <ItemText>Compartilhar</ItemText>
        </Item>
        {/* <Item onPress={() => openConfirmation()}>
          <MaterialIcons name={'delete'} size={22} color={colors.fadedBlack} />
          <ItemText>Excluir</ItemText>
        </Item> */}
      </Content>
    </Modal>
  );
});
