import React, { forwardRef, useState, useCallback, useEffect } from 'react';

import useDebouncedEffect from 'use-debounced-effect';

import Modal from 'components/Modal';

import { useSelector, useDispatch } from 'react-redux';

import MovementsActions from 'store/ducks/Movements';

import {
  Footer,
  Cancel,
  CancelText,
  Submit,
  SubmitText,
  Content,
  Email,
} from './styles';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

export default EmailModal = forwardRef((props, ref) => {

   	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [movement, setMovement] = useState(props.movement);
  const [emailErr, setError] = useState(false);

  const sending = useSelector(state => state.movements.sending);

  useEffect(() => { setMovement(props.movement); }, [props]);

  useDebouncedEffect(() => setError(!validate(email) || email.length < 1), 200, [email]);

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
        idsMovimentos: movement.idMovProcessoCliente || null,
      })
    );

    setTimeout(() => closeModal(), 500);

    setTimeout(() => props.onConfirm(), 500);
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
        <SubmitText sending={sending}>{sending ? 'Enviando' : 'Enviar'}</SubmitText>
      </Submit>
    </Footer>
  );

  return (
    <Modal ref={ref} title="Enviar por email" footer={footer()} onClose={() => setEmail('')}>
      <Content>
        <Email
          error={emailErr}
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='Informe um email'
          placeholderTextColor={colors.grayLight}
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={sendEmail}
          keyboardType='email-address'
          returnKeyType='send'
        />
      </Content>
    </Modal>
  );
});
