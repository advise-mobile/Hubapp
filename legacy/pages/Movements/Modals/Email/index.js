import React, {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import useDebouncedEffect from 'use-debounced-effect';

import Modal from '@lcomponents/Modal';

import { useSelector, useDispatch } from 'react-redux';

import MovementsActions from '@lstore/ducks/Movements';

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

const EmailModal = forwardRef((props, ref) => {
  // Variavel para usar o hook
  const colorUseTheme = useTheme();
  const { colors } = colorUseTheme;

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [movement, setMovement] = useState(props.movement);
  const [emailErr, setError] = useState(false);

  const sending = useSelector(state => state.movements.sending);
  const wasSending = useRef(false);

  useEffect(() => {
    setMovement(props.movement);
  }, [props]);

  // Monitora quando o envio termina (sucesso ou erro) para fechar o modal
  useEffect(() => {
    // Se estava enviando e agora não está mais, significa que terminou
    if (wasSending.current && !sending) {
      // O toast já foi disparado pela saga, apenas fechar o modal
      setTimeout(() => {
        setEmail('');
        wasSending.current = false;
        ref.current?.close();
        if (props.onConfirm) {
          props.onConfirm();
        }
      }, 300);
    }
    wasSending.current = sending;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sending]);

  const validate = emailValue => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

  useDebouncedEffect(
    () => setError(!validate(email) || email.length < 1),
    200,
    [email],
  );

  const closeModal = useCallback(() => {
    setEmail('');
    wasSending.current = false;
    ref.current?.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendEmail = useCallback(() => {
    setError(!validate(email) || email.length < 1);
    if (emailErr) return;

    if (!movement) {
      closeModal();
      return;
    }

    // Dispara a ação de envio
    dispatch(
      MovementsActions.movementsEmailRequest({
        destinatarios: email.split(';'),
        idsMovimentos: movement.idMovProcessoCliente || null,
      }),
    );
    // O modal será fechado automaticamente quando sending voltar para false
    // O toast será mostrado pela saga
  }, [email, emailErr, movement, dispatch, closeModal]);

  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
      <Submit onPress={() => sendEmail()} disabled={sending}>
        <SubmitText sending={sending}>
          {sending ? 'Enviando' : 'Enviar'}
        </SubmitText>
      </Submit>
    </Footer>
  );

  return (
    <Modal
      ref={ref}
      title="Enviar por email"
      footer={footer()}
      maxHeight={230}
      onClose={() => setEmail('')}
    >
      <Content>
        <Email
          error={emailErr}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Informe um email"
          placeholderTextColor={colors.grayLight}
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={sendEmail}
          keyboardType="email-address"
          returnKeyType="send"
        />
      </Content>
    </Modal>
  );
});

export default EmailModal;
