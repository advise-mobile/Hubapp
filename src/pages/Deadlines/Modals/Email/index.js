import React, { forwardRef, useState, useCallback, useEffect } from 'react';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';

import { useSelector, useDispatch } from 'react-redux';

import DeadlinesActions from 'store/ducks/Deadlines';

import { colors } from 'assets/styles';
import {
  Footer,
  Cancel,
  CancelText,
  Submit,
  SubmitText,
  Content,
  Email,
} from './styles';

export default EmailModal = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [deadline, setDeadline] = useState(props.deadline);
  const [emailErr, setError] = useState(false);

  const sending = useSelector(state => state.deadlines.sending);

  useEffect(() => {
    setDeadline(props.deadline);
  }, [props]);

  const sendEmail = useCallback(() => {
    setError(!validate(email) || email.length < 1);
    if (emailErr) return;

    if (!deadline) {
      closeModal();
      return;
    }

    let customParam = {};

    if (deadline.idsMovimentosProcesso.length > 0) {
      const key = (deadline.idsMovimentosProcesso[0].idTipoMovProcesso == -2) ? 'idPublicacao' : 'idAndamento';

      customParam[key] = deadline.idsMovimentosProcesso[0].idMovimentosProcesso;
    }

    dispatch(
      DeadlinesActions.deadlinesEmailRequest({
        destinatarios: email.split(";"),
        idEventoAgenda: deadline.id,
        ...customParam
      })
    );

    setTimeout(() => closeModal(), 1000);
  }, [email, emailErr, deadline]);

  const closeModal = useCallback(() => {
    setEmail('');

    ref.current?.close();
  }, []);

  const validate = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
      <Submit onPress={() => sendEmail()} disabled={sending}>
        <SubmitText sending={sending}>{sending ? 'Enviando' : 'Enviar'}</SubmitText>
      </Submit>
    </Footer>
  );

  return (
    <Modal ref={ref} title="Enviar por email" footer={footer()}>
      <Content>
        <Email
          error={emailErr}
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='Informe um email'
          placeholderTextColor={colors.grayLight}
          value={email}
          onChangeText={typedEmail => {
            setEmail(typedEmail);
            setError(!validate(email) || email.length < 1);
          }}
          onSubmitEditing={sendEmail}
          returnKeyType='send'
        />
      </Content>
    </Modal>
  );
});
