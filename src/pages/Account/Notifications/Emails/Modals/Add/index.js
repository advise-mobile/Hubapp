import React, { forwardRef, useState, useCallback } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from 'store/ducks/ToastNotify';

import Api from 'services/Api';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';

import { colors } from 'assets/styles';
import {
  Footer,
  Cancel,
  CancelText,
  Submit,
  SubmitText,
  Content,
  Input,
} from './styles';

export default Add = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  //Data
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  // Errors
  const [emailErr, setEmailError] = useState(false);

  const closeModal = useCallback(() => ref.current?.close(), []);

  const onSubmit = () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setEmailError(!valid);

    if (!valid) return;

    Api.post(`/core/v1/emails-usuario-cliente`, {
      itens: [{ email: email }]
    })
      .then(({ data }) => {
        dispatch(ToastNotifyActions.toastNotifyShow('Email cadastrado com sucesso!', false));

        const { itens } = data;

        props.onRecordEmail(itens[0]);
      })
      .finally(() => {
        setTimeout(() => {
          closeModal()

          setEmail(null);
        }, 500);

      });

  };


  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
      <Submit onPress={() => onSubmit()} disabled={loading} >
        {loading
          ? <Spinner transparent={true} color={colors.white} height='auto' />
          : <SubmitText>Salvar</SubmitText>
        }
      </Submit>
    </Footer>
  );

  return (
    <Modal ref={ref} title="Cadastrar email" footer={footer()}>
      <Content>
        <KeyboardAvoidingView>
          <Input
            value={email}
            error={emailErr}
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Email'
            placeholderTextColor={colors.grayLight}
            returnKeyType='next'
            onChangeText={text => {
              setEmail(text);
              setEmailError(email.length < 2);
            }}
          />
        </KeyboardAvoidingView>
      </Content>
    </Modal >
  );
});
