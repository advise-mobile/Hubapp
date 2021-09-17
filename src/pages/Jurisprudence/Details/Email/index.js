import React, { forwardRef, useState, useCallback, useMemo } from 'react';

import Modal from 'components/Modal';

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
    if (!validate) return;

    dispatch(
      JurisprudenceActions.jurisprudenceEmailRequest({
        destinatarios: email.split(";"),
        numeroRecursos: jurisprudence.numeroRecNForm,
        codEmenta: jurisprudence.codEmenta,
        term: term,
      })
    );

    setTimeout(() => closeModal(), 1000);
  }, [email]);

  const closeModal = useCallback(() => {
    setEmail('');

    ref.current?.close();
  }, []);

  const validate = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);

  return (
    <Modal ref={ref} title="Enviar por email" footer={footer()}>
      <Content>
        <Email
          error={!validate || email.length < 1}
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='Informe um email'
          placeholderTextColor={colors.grayLight}
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={sendEmail}
          returnKeyType='search'
        />
      </Content>
    </Modal>
  );
});
