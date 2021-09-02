import React, { forwardRef, useState, useCallback, useEffect } from 'react';

import Modal from 'components/Modal';

import { useDispatch } from 'react-redux';

import MovementsActions from 'store/ducks/Movements';
import MovementActions from 'store/ducks/Movement';

import {
  Footer,
  Cancel,
  CancelText,
  Submit,
  SubmitText,
  Content
} from './styles';

export default MarkAsRead = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const [movement, setMovement] = useState(props.movement);

  const onConfirm = props.onConfirm;

  useEffect(() => setMovement(props.movement), [props]);

  const closeModal = useCallback(() => {
    ref.current?.close();

    onConfirm(movement.id);
  }, [movement]);

  const confirm = useCallback(() => {
    const { id, idMovProcessoCliente, lido } = movement;

    dispatch(
      MovementActions.movementReadRequest({
        id: id,
        idMovProcessoCliente: idMovProcessoCliente,
        movementType: 'marcar',
      })
    );

    dispatch(
      MovementsActions.toggleAsRead({
        movementId: id,
        read: !lido
      })
    );
    setTimeout(() => closeModal(), 250);

    onConfirm(id);
  }, [movement]);

  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Não</CancelText>
      </Cancel>
      <Submit onPress={() => confirm()}>
        <SubmitText>Sim</SubmitText>
      </Submit>
    </Footer>
  );

  return (
    <Modal ref={ref} title={movement?.idTipoMovProcesso === -1 ? "Deseja marcar o andamento como lido?" : "Deseja marcar a publicação como lida?"} footer={footer()}>
      <Content>

      </Content>
    </Modal>
  );
});
