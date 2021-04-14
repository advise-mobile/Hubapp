import React, { forwardRef, useState, useCallback } from 'react';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';

import { useSelector, useDispatch } from 'react-redux';

import JurisprudenceActions from 'store/ducks/Jurisprudence';

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

export default Options = forwardRef((props, ref) => {
  const [email, setEmail] = useState('');
  const [term] = useState(props.term);
  const [jurisprudence] = useState(props.jurisprudence);
  const sending = useSelector(state => state.jurisprudence.sending);
  const [emailErr, setError] = useState(false);
  const dispatch = useDispatch();

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

  const sendEmail = useCallback(() => {
    setError(!validate(email) || email.length < 1);

    if (emailErr) return;

    dispatch(
      JurisprudenceActions.jurisprudenceEmailRequest({
        destinatarios: email.split(";"),
        numeroRecursos: jurisprudence.numeroRecNForm,
        codEmenta: jurisprudence.codEmenta,
        term: term,
      })
    );

    setTimeout(() => closeModal(), 1000);
  }, [email, emailErr]);

  const closeModal = useCallback(() => {
    setEmail('');

    ref.current?.close();
  }, []);


  const validate = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
          returnKeyType='search'
        />
      </Content>
    </Modal>
  );
});
