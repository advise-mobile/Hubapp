import React, { forwardRef, useState, useCallback, useEffect } from 'react';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';

import { useSelector, useDispatch } from 'react-redux';

import MovementsActions from 'store/ducks/Movements';

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
  const [movement, setMovement] = useState(props.movement);
  const [emailErr, setError] = useState(false);

  const sending = useSelector(state => state.movements.sending);

  useEffect(() => { setMovement(props.movement); }, [props]);

  const sendEmail = useCallback(() => {
    setError(!validate(email) || email.length < 1);
    if (emailErr) return;

    if (!movement) {
      closeModal();
      return;
    }
    dispatch(
      MovementsActions.movementsEmailRequest({
        destinatarios: email.split(";"),
        idsMovimentos: movement.idMovProcessoCliente,
      })
    );

    setTimeout(() => closeModal(), 1000);
  }, [email, emailErr, movement]);

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
        {sending ? <Spinner transparent={true} color={colors.white} height='auto' /> : <SubmitText>Enviar</SubmitText>}
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
