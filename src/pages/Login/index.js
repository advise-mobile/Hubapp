import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Appearance
} from 'react-native';

import jwtDecode from 'jwt-decode';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OneSignal from 'react-native-onesignal';

import AuthAction from 'store/ducks/Auth';

import Spinner from 'components/Spinner';

import { changeAmbient } from 'services/Api';
import env from 'services/env';

import { colors } from 'assets/styles';
import {
  Container,
  Warp,
  Form,
  InputGroup,
  InputGroupPrepend,
  InputGroupAppend,
  Input,
  InputHelpText,
  Button,
  ButtonText,
  ForgotLink,
  ForgotLinkText,
  Logo,
  BadgeRed,
  BadgeRedText,
  AnotherOptionText,
  AnotherOption
} from './styles';

const style = StyleSheet.create({
  hasIcon: {
    color: colors.fadedBlack,
    paddingTop: 7,
    textAlign: 'center',
    zIndex: 100,
  },

  hasIconError: {
    color: colors.red,
    paddingTop: 7,
    textAlign: 'center',
    zIndex: 100,
  },

  hasError: {
    borderColor: colors.red,
  },

  hasSuccess: {
    borderColor: colors.backgroundButton,
  },
});

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [countAmbient, setCountAmbient] = useState(0);
  const [ambient, setAmbient] = useState('TESTE');

  const [passwordView, setPasswordView] = useState(false);

  const [loadingIndicator, setLoadingIndicator] = useState(true);

  const login = useSelector((state) => state.auth.data);
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  const colorScheme = Appearance.getColorScheme();

  // const logoImage = require('assets/images/logo.png');
  const logoImage = (colorScheme == 'dark') ? require('assets/images/logo_branca.png') : require('assets/images/logo.png');

  useEffect(() => {
    props.navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      return;
    })
  }, []);

  useEffect(() => {
    async function checkLogin() {
      const token = await AsyncStorage.getItem('@Advise:token');

      if (token !== null) {
        const user = jwtDecode(token);
        OneSignal.init(env.oneSignalId, { kOSSettingsKeyAutoPrompt: true, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });
        props.navigation.navigate('App', { user });
      }
    }

    checkLogin();

    if (__DEV__) {
      setEmail('testehubv1@emailna.co');
      setPassword('senha');
    }
  }, [props]);

  useEffect(() => {
    async function checkUpdateLogin() {
      if (!isAuthorized) return false;

      await AsyncStorage.multiSet([
        ['@Advise:refreshToken', login.refresh_token],
        ['@Advise:token', login.access_token]
      ]);

      if (login.foto !== undefined) {
        await AsyncStorage.setItem('@Advise:avatar', login.foto);
      }

      OneSignal.init(env.oneSignalId, { kOSSettingsKeyAutoPrompt: true, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });

      return true;
    }

    checkUpdateLogin().then(authorized => {
      setLoadingIndicator(false);

      if (!authorized) return;

      props.navigation.navigate('App', { user: jwtDecode(login.access_token) });
    });
  }, [isAuthorized, login, props]);

  function handleEmailChange(typedEmail) {
    setEmail(typedEmail);
    setEmptyEmail(false);
  }

  function handlePasswordChange(typedPassword) {
    setPassword(typedPassword);
    setEmptyPassword(false);
  }

  function handleLoginPress() {
    setDisabled(true);

    Keyboard.dismiss();

    if (!email.length && !password.length) {
      setEmptyEmail(true);
      setEmptyPassword(true);
      setDisabled(false);
      return;
    }

    if (!email.length) {
      setEmptyEmail(true);
      setDisabled(false);
      return;
    }

    if (!password.length) {
      setEmptyEmail(true);
      setDisabled(false);
      return;
    }

    dispatch(AuthAction.loginRequest(email, password));

    setDisabled(false);
  }

  function handleForgotPress() {
    props.navigation.navigate('Forgot');
  }

  function incrementChangeAmbient() {
    let counter = countAmbient + 1;

    if (counter >= 5) {
      changeAmbient().then(environment => setAmbient(environment));
      setCountAmbient(0);

      return;
    }

    setCountAmbient(counter);
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
    >
      <Container behavior="padding">
        {loadingIndicator ? (
          <Spinner />
        ) : (
          <Warp>
            <Logo source={logoImage} resizeMode="contain" />
            {__DEV__ && (
              <BadgeRed onPress={__DEV__ && incrementChangeAmbient}>
                <BadgeRedText>VERSÃO DE {ambient}</BadgeRedText>
              </BadgeRed>
            )}
            <Form>
              <InputGroup>
                <InputGroupPrepend>
                  <Icon
                    name="mail"
                    size={23}
                    style={emptyEmail === true ? style.hasIconError : style.hasIcon}
                  />
                </InputGroupPrepend>
                <Input
                  placeholder="E-mail"
                  placeholderTextColor={colors.grayDarker}
                  value={email}
                  onChangeText={handleEmailChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={emptyEmail === true ? style.hasError : style.hasSuccess}
                />
                {!!emptyEmail && (
                  <InputHelpText>Este campo é obrigatório.</InputHelpText>
                )}
              </InputGroup>
              <InputGroup>
                <InputGroupPrepend>
                  <Icon
                    name="lock"
                    size={23}
                    style={emptyPassword === true ? style.hasIconError : style.hasIcon}
                  />
                </InputGroupPrepend>
                <Input
                  placeholder="Senha"
                  placeholderTextColor={colors.grayDarker}
                  value={password}
                  onChangeText={handlePasswordChange}
                  onSubmitEditing={handleLoginPress}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="send"
                  secureTextEntry={!passwordView}
                  style={emptyPassword === true ? style.hasError : style.hasSuccess}
                />
                <InputGroupAppend
                  onPress={() => setPasswordView(!passwordView)}
                >
                  <Icon
                    name={passwordView ? "visibility-off" : "visibility"}
                    size={23}
                    style={emptyEmail === true ? style.hasIconError : style.hasIcon}
                  />
                </InputGroupAppend>
                {!!emptyPassword && (
                  <InputHelpText>Este campo é obrigatório.</InputHelpText>
                )}
              </InputGroup>
              <Button onPress={handleLoginPress} disabled={disabled}>
                {loading ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <ButtonText>Acessar conta</ButtonText>
                )}
              </Button>
            </Form>
            <ForgotLink onPress={handleForgotPress}>
              <ForgotLinkText>Esqueceu sua senha de acesso?</ForgotLinkText>
            </ForgotLink>
            <AnotherOption>
              <AnotherOptionText>ou</AnotherOptionText>
            </AnotherOption>
            <Button>
              <ButtonText>Ainda não sou cliente</ButtonText>
            </Button>
          </Warp>
        )}
      </Container>
    </KeyboardAvoidingView>
  );
}
