import React, { forwardRef, useState, useCallback, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Modal from 'components/Modal';
import { Share } from 'components/Share';

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
  const [movement, setMovement] = useState(props.movement);
  const [type, setType] = useState(props.type);

  useEffect(() => {
    setMovement(props.movement);
    setType(props.type)
  }, [props]);

  const share = useCallback(() => {
    if (type == -1) {
      const messageShare = `${movement.orgaoJudiciario}, ${movement.dataDisponibilizacaoSemHora || ''} \n\n${movement.descricaoAndamento}`;

      const infoShare = `\n\n\nFonte: ${movement.fonte}\nIdentificador: ${movement.identificadorClasseFonteProcesso || 'Não informado'}`;

      Share({
        message: messageShare + infoShare,
        title: 'Processo',
      });
    } else {
      const messageShare = `${movement.diarioDescricao}, ${movement.dataPublicacaoFormatada} \n\n${movement.conteudo} \n\n${movement.despacho}`;

      const infoShare = `\n\n\nCaderno: ${movement.cadernoDescricao}\nVara: ${movement.varaDescricao}\nComarca: ${movement.cidadeComarcaDescricao}\nPágina: ${movement.paginaInicial} a ${movement.paginaFinal}`;

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
