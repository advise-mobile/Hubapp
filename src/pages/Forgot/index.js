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

  const [email, setEmail] = useState('');
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [sended, setSended] = useState(false);
  const colorScheme = Appearance.getColorScheme();
  // const logoImage = require('assets/images/logo.png');
  const logoImage = (colorScheme == 'dark') ? require('assets/images/logo_branca.png') : require('assets/images/logo.png');
  const sendedIcon = require('assets/images/icons/email.png');

  const dispatch = useDispatch();

  const handleEmailChange = useCallback((email) => {
    setEmail(email);
    setEmptyEmail(false);
  }, []);

  const handleForgotPress = useCallback(() => {
    setDisabled(true);

    if (email.length < 1) {
      setEmptyEmail(true);
      setDisabled(false);
      return;
    }

    dispatch(AuthAction.forgotRequest(email.trim()));

    setDisabled(false);
  }, [email]);

  const backToLogin = useCallback(() => props.navigation.navigate('Login'), []);

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
                  keyboardType="default"
                  autoCapitalize="none"
                  returnKeyType="send"
                  error={emptyEmail}
                />
              </InputGroup>
              {!!emptyEmail && <InputHelpText>Este campo é obrigatório</InputHelpText>}
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
