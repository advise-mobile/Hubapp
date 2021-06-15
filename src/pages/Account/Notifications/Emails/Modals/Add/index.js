import React, { forwardRef, useState, useCallback, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';

import { getLoggedUser } from 'helpers/Permissions';

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
  Description,
  Content,
  Input,
} from './styles';

export default Add = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});

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

  useEffect(() => { getLoggedUser().then(user => setUserData(user)); }, []);

  const renderDescription = useCallback(() =>
    <Description>Ao cadastrar um email, o sistema notificará o destinatário sobre as novas movimentações da conta {userData.nome}. Todas as publicações e andamentos referentes às palavras-chaves e processos cadastrados serão notificados.</Description>,
    [userData]);

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
        {renderDescription()}
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
