import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Appearance
} from 'react-native';

// import jwtDecode from 'jwt-decode';

import { StackActions } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AuthAction from 'store/ducks/Auth';
import UserActions from 'store/ducks/User';

import Spinner from 'components/Spinner';

// import { changeAmbient } from 'services/Api';
import { registerNotification } from 'helpers/Pushs';
import { AVATAR, TOKEN, REFRESH_TOKEN } from 'helpers/StorageKeys';

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
  const [disabled, setDisabled] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [passwordView, setPasswordView] = useState(false);
  // const [countAmbient, setCountAmbient] = useState(0);
  // const [ambient, setAmbient] = useState('TESTE');

  // const [authorization, setAuthorization] = useState(false);

  const passwordRef = useRef();

  const [loadingIndicator, setLoadingIndicator] = useState(false);

  const login = useSelector((state) => state.auth.data);
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  const colorScheme = Appearance.getColorScheme();

  const logoImage = (colorScheme == 'dark') ? require('assets/images/logo_hub_branca.png') : require('assets/images/logo_hub.png');

  useEffect(() => {
    props.navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      return;
    })
  }, []);

  useEffect(() => {
    passwordRef.current?.setNativeProps({
      style: { fontFamily: 'CircularStd-Book' }
    })
  }, []);

  // useEffect(() => {
  //   if (__DEV__) {
  //     setEmail('sia@emailna.co')
  //     setPassword('senha');
  //   }
  // }, []);

  useEffect(() => {
    checkLogin();
  }, [isAuthorized]);

  useEffect(() => {
    setEmptyEmail(email.length > 0 && email.length < 2);
    setEmptyPassword(password.length > 0 && password.length < 2);
  }, [email, password])

  const handleLoginPress = useCallback(() => {
    setDisabled(true);
    Keyboard.dismiss();

    setEmptyEmail(email.length == 0);
    setEmptyPassword(password.length == 0);

    if (email.length && password.length)
      dispatch(AuthAction.loginRequest(email.trim(), password.trim()));

    setDisabled(false);
  }, [email, password]);

  const handleForgotPress = useCallback(() => {
    props.navigation.navigate('Forgot');
  }, []);

  const checkLogin = useCallback(async () => {
    if (!isAuthorized) return;

    if (login.foto !== undefined && login.foto !== null) {
      await AsyncStorage.setItem(AVATAR, login.foto);
    } else {
      await AsyncStorage.removeItem(AVATAR);
    }

    dispatch(UserActions.updatePicture());

    if (login.access_token !== null) {
      registerNotification();

      props.navigation.dispatch(StackActions.push('App'))
    }
  }, [isAuthorized, login]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
      <Container behavior="padding">
        {loadingIndicator ? <Spinner /> : (
          <Warp>
            <Logo source={logoImage} resizeMode="contain" />
            {/* {__DEV__ && (
              <BadgeRed>
                <BadgeRedText>VERSÃO DE {ambient}</BadgeRedText>
              </BadgeRed>
            )} */}
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
                  onChangeText={text => setEmail(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  returnKeyType='next'
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
                  ref={passwordRef}
                  placeholder="Senha"
                  placeholderTextColor={colors.grayDarker}
                  value={password}
                  onChangeText={text => setPassword(text)}
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
                  <Spinner size="small" height={22} color={colors.white} transparent={true} />
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
            <Button onPress={() => props.navigation.navigate('Client')}>
              <ButtonText>Ainda não sou cliente</ButtonText>
            </Button>
          </Warp>
        )}
      </Container>
    </KeyboardAvoidingView>
  );
}




  // function incrementChangeAmbient() {
  //   let counter = countAmbient + 1;

  //   if (counter >= 5) {
  //     changeAmbient().then(environment => setAmbient(environment));
  //     setCountAmbient(0);

  //     return;
  //   }

  //   setCountAmbient(counter);
  // }



  // useEffect(() => {
  //   async function checkLogin() {
  //     const token = await AsyncStorage.getItem(TOKEN);

  //     if (token !== null) {
  //       const user = jwtDecode(token);
  //       OneSignal.init(env.oneSignalId, { kOSSettingsKeyAutoPrompt: true, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });
  //       props.navigation.navigate('App', { user });
  //     }
  //   }

  //   checkLogin();

  //   if (__DEV__) {
  //     setEmail('sia@emailna.co');
  //     setPassword('senha');
  //   }
  // }, [props]);

  // useEffect(() => {
  //   async function checkUpdateLogin() {
  //     if (!isAuthorized) return false;

  //     await AsyncStorage.multiSet([
  //       [REFRESH_TOKEN, login.refresh_token || null],
  //       [TOKEN, login.access_token || null]
  //     ]);

  //     if (login.foto !== undefined) {
  //       await AsyncStorage.setItem(AVATAR, login.foto || null);
  //     }

  //     OneSignal.init(env.oneSignalId, { kOSSettingsKeyAutoPrompt: true, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });

  //     return true;
  //   }

  //   checkUpdateLogin().then(authorized => {
  //     setLoadingIndicator(false);

  //     setAuthorization(authorized);
  //   });
  // }, [isAuthorized, login, props]);
