import React from 'react';
import { Linking, Appearance } from 'react-native';
import { useSelector } from 'react-redux';

import {
  Logo,
  Container,
  BlockedContainer,
  Image,
  Title,
  Description,
  PaymentContainer,
  PaymentImage,
  PaymentDescription,
  PaymentButton,
  PaymentButtonText
} from './styles';

const colorScheme = Appearance.getColorScheme();

const blockedImage = (colorScheme == 'dark') ? require('assets/images/blocked_white.png') : require('assets/images/blocked.png');
const paymentImage = (colorScheme == 'dark') ? require('assets/images/pagamentos_white.png') : require('assets/images/pagamentos.png');
// const logoImage = (colorScheme == 'dark') ? require('assets/images/logo_hub_branca.png') : require('assets/images/logo_hub.png');

const Blocked = props => {
  const convenio = useSelector(state => state.auth.convenio);

  return (
    <Container>
      {/* <Logo source={logoImage} resizeMode="contain" /> */}
      <BlockedContainer>
        <Image source={blockedImage} />
        <Title>Seu acesso está bloqueado</Title>

        {convenio ?
          <Description>Para retomar seu acesso ao sistema, entre em contato com a sua seccional da OAB e atualize suas informações.</Description> :
          <Description>Para evitar que sua conta seja inativada, acesse a nossa Central de Pagamentos para atualizar e corrigir as informações necessárias.</Description>
        }
      </BlockedContainer>
      {!convenio &&
        <PaymentContainer>
          <PaymentImage source={paymentImage} />
          <PaymentDescription>Acesse a Central de Pagamentos e atualize suas informações agora mesmo</PaymentDescription>
          <PaymentButton onPress={() => Linking.openURL('https://pagamentos.advise.com.br/')}>
            <PaymentButtonText>Abrir Central de Pagamentos</PaymentButtonText>
          </PaymentButton>
        </PaymentContainer>
      }
    </Container>
  );
};

export default Blocked;
