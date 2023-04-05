import React, { forwardRef, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';

import Api from 'services/Api';

import ToastNotifyActions from 'store/ducks/ToastNotify';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

import {
  Footer,
  Cancel,
  CancelText,
  Submit,
  SubmitText,
  Content,
  Message
} from './styles';

export default Confirmation = forwardRef((props, ref) => {

   	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState(props.email);

  useEffect(() => setEmail(props.email), [props]);

  const closeModal = useCallback(() => ref.current?.close(), []);

  const confirm = useCallback(() => {
    setLoading(true);

    Api.put(`/core/v1/emails-usuario-cliente/inativar`, {
      iDs: [email?.id]
    })
      .then(() => {
        dispatch(ToastNotifyActions.toastNotifyShow('Email excluído!', false));

        props.onRemoveEmail(email?.id);
      })
      .finally(() => {
        setTimeout(() => closeModal(), 500);

        setLoading(false);
      });
  });

  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
      <Submit onPress={() => confirm()} disabled={loading}>
        {loading ? <Spinner transparent={true} color={colors.white} height='auto' /> : <SubmitText>Sim, quero excluir</SubmitText>}
      </Submit>
    </Footer>
  );

  return (
    <Modal ref={ref} title="Deseja excluir esse email?" footer={footer()}>
      <Content>
        <Message>Ao excluir um email você opta por deixar de enviar para o destinatário notificações de novas publicações e andamentos de sua conta.</Message>
      </Content>
    </Modal>
  );
});
