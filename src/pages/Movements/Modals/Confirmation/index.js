import React, { forwardRef, useState, useCallback, useEffect } from 'react';

import Api from 'services/Api';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';

import { useSelector, useDispatch } from 'react-redux';

import MovementsActions from 'store/ducks/Movements';

import {
  Footer,
  Cancel,
  CancelText,
  Submit,
  SubmitText,
  Content,
  Message
} from './styles';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

export default Confirmation = forwardRef((props, ref) => {

     	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

  const userData = useSelector(state => state.user);
  

  const dispatch = useDispatch();

  const [movement, setMovement] = useState(props.movement);
  const remove = props.remove;
  const daysDeleteMovTrash = props.daysDeleteMovTrash;

  const deleting = useSelector(state => state.movements.deleting);

  useEffect(() => setMovement(props.movement), [props]);

 

  const closeModal = useCallback(() => ref.current?.close(), []);

  const  confirm = useCallback( async () => {

    const { idMovProcessoCliente } = movement;

    dispatch(MovementsActions.deleteLogicalMovement({
       idMovimentoProcessoCliente: idMovProcessoCliente,
    }));


    
    // dispatch(MovementsActions.deleteMovement({
    //   idMovimentoProcessoCliente: idMovProcessoCliente,
    //   idPastaUsuarioCliente
    // }));

    setTimeout(() => closeModal(), 250);

    if (remove) setTimeout(() => remove(movement.id), 500);

  });

  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
      <Submit onPress={() => confirm()} disabled={deleting}>
        {deleting ? <Spinner transparent={true} color={colors.white} height='auto' /> : <SubmitText>Sim, quero enviar</SubmitText>}
      </Submit>
    </Footer>
  );

  return (
    <Modal ref={ref} title={movement?.idTipoMovProcesso === -1 ? "Deseja enviar para a Lixeira?" : "Deseja enviar para lixeira?"} footer={footer()}>
      <Content>
        {movement?.idTipoMovProcesso === -1 ?
          <Message>Ao enviá-lo para a Lixeira, você elimina as informações referentes a essa movimentação. No ambiente da Lixeira, você pode restaurar o documento em um período de {daysDeleteMovTrash} dias, depois deste período o sistema exclui permanentemente.</Message>
          :
          <Message>Ao enviá-la para a Lixeira, você elimina as informações referentes a essa movimentação. No ambiente da Lixeira, você pode restaurar o documento em um período de {daysDeleteMovTrash} dias, depois deste período o sistema exclui permanentemente.</Message>
        }
      </Content>
    </Modal>
  );
});
