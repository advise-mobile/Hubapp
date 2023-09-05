import React, { forwardRef, useState, useCallback, useEffect } from 'react';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';

import { useSelector, useDispatch } from 'react-redux';

import DeadlinesActions from 'store/ducks/Deadlines';

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

  const [deadline, setDeadline] = useState(props.deadline);
  const remove = props.remove;

  const sending = useSelector(state => state.deadlines.sending);

  useEffect(() => setDeadline(props.deadline), [props]);

  const closeModal = useCallback(() => ref.current?.close(), []);

  const confirm = useCallback(() => {
    dispatch(DeadlinesActions.deadlinesMarkAsInactive(deadline.id));

    setTimeout(() => closeModal(), 250);

    if (remove) setTimeout(() => remove(deadline.id), 500);

  });

  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
      <Submit onPress={() => confirm()} disabled={sending}>
        {sending ? <Spinner transparent={true} color={colors.white} height='auto' /> : <SubmitText>Sim, quero excluir</SubmitText>}
      </Submit>
    </Footer>
  );

  return (
    <Modal ref={ref} title="Deseja excluir o prazo?" footer={footer()}>
      <Content>
        <Message>Ao excluir um prazo, você elimina todas as informações referentes a este prazo. A ação de excluir é definitiva e irreversível.</Message>
      </Content>
    </Modal>
  );
});
