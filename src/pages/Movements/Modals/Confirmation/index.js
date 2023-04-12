import React, { forwardRef, useState, useCallback, useEffect } from 'react';

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

  const dispatch = useDispatch();

  const [movement, setMovement] = useState(props.movement);
  const remove = props.remove;

  const deleting = useSelector(state => state.movements.deleting);

  useEffect(() => setMovement(props.movement), [props]);

  const closeModal = useCallback(() => ref.current?.close(), []);

  const confirm = useCallback(() => {
    const { idMovProcessoCliente, idPastaUsuarioCliente } = movement;

    dispatch(MovementsActions.deleteMovement({
      idMovimentoProcessoCliente: idMovProcessoCliente,
      idPastaUsuarioCliente
    }));

    setTimeout(() => closeModal(), 250);

    if (remove) setTimeout(() => remove(movement.id), 500);

  });

  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
      <Submit onPress={() => confirm()} disabled={deleting}>
        {deleting ? <Spinner transparent={true} color={colors.white} height='auto' /> : <SubmitText>Sim, quero excluir</SubmitText>}
      </Submit>
    </Footer>
  );

  return (
    <Modal ref={ref} title={movement?.idTipoMovProcesso === -1 ? "Deseja excluir o andamento?" : "Deseja excluir a publicação?"} footer={footer()}>
      <Content>
        {movement?.idTipoMovProcesso === -1 ?
          <Message>Ao excluir um andamento, você elimina todas as informações referentes a este documento. A ação de excluir é definitiva e irreversível.</Message>
          :
          <Message>Ao excluir uma publicação, você elimina todas as informações referentes a este documento. A ação de excluir é definitiva e irreversível.</Message>
        }
      </Content>
    </Modal>
  );
});
