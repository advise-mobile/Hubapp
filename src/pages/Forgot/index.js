import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ActivityIndicator, Appearance } from 'react-native';

import AuthAction from 'store/ducks/Auth';

import { colors } from 'assets/styles';

import { Container, Warp } from 'assets/styles/general';

import {
  Content,
  Logo,
  Icon,
  Title,
  Description,
  Form,
  Label,
  InputGroup,
  Input,
  InputHelpText,
  Button,
  ButtonText,
  LogintLink,
  LoginLinkText,
} from './styles';

const Forgot = props => {
  const loading = useSelector(state => state.auth.loading);
  const sended = useSelector(state => state.auth.sended);

  const [email, setEmail] = useState('');
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // const [sended, setSended] = useState(false);
  const colorScheme = Appearance.getColorScheme();
  // const logoImage = require('assets/images/logo.png');
  const logoImage = (colorScheme == 'dark') ? require('assets/images/logo_hub_branca.png') : require('assets/images/logo_hub.png');
  const sendedIcon = (colorScheme == 'dark') ? require('assets/images/icons/email_white.png') : require('assets/images/icons/email.png');

  const [emailError, setEmailError] = useState(false);

  const dispatch = useDispatch();

  const handleEmailChange = useCallback((email) => {
    setEmail(email);
    setEmailError(email.length < 3 || !validate(email));
  }, []);

  const handleForgotPress = useCallback(() => {
    const validEmail = validate(email);

    setEmailError(email.length < 3 || !validEmail);

    if (email.length < 3 || !validEmail) return;

    setDisabled(true);

    dispatch(AuthAction.forgotRequest(email.trim()));

    setDisabled(false);
    // setSended(true);
  }, [email]);

  const backToLogin = useCallback(() => {
    dispatch(AuthAction.forgotReset());

    props.navigation.navigate('Login');
    // setSended(false);
  }, []);

  const validate = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <Container>
      <Warp>
        {!sended ?
          <Content>
            <Logo source={logoImage} resizeMode="contain" />
            <Title>Esqueceu sua senha de acesso?</Title>
            <Description>Informe seu email de cadastro para receber informações de como redefinir a sua senha.</Description>
            <Form>
              <InputGroup>
                <Label>Email</Label>
                <Input
                  placeholder="Email de acesso"
                  placeholderTextColor={colors.grayLight}
                  onChangeText={email => handleEmailChange(email)}
                  onSubmitEditing={handleForgotPress}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="send"
                  error={emailError}
                />
              </InputGroup>
              {emailError && <InputHelpText>{email.length < 3 ? `Este campo é obrigatório` : `Email inválido`}</InputHelpText>}
              <Button onPress={handleForgotPress} disabled={disabled}>
                {loading ? <ActivityIndicator size="small" color="#FFF" /> : <ButtonText>Enviar informações</ButtonText>}
              </Button>
              <LogintLink onPress={backToLogin}>
                <LoginLinkText>Voltar para acessar conta</LoginLinkText>
              </LogintLink>
            </Form>
          </Content>
          :
          <Content>
            <Logo source={logoImage} resizeMode="contain" />
            <Icon source={sendedIcon} resizeMode="contain" />
            <Title>Enviamos um email para você</Title>
            <Description>Assim que abrir o email, clique em redefinir senha para criar uma nova senha.</Description>
            <LogintLink onPress={backToLogin}>
              <LoginLinkText>Voltar para acessar conta</LoginLinkText>
            </LogintLink>
          </Content>
        }
      </Warp>
    </Container>
  );
}

export default Forgot;
