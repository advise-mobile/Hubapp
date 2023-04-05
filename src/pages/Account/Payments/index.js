import React from 'react';
import { Linking } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Container, Warp } from 'assets/styles/global';
import {
  Content,
  Title,
  Description,
  Icon,
  Info
} from './styles';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

export default Payments = () => {
  
  // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

  return(
  <Container>
    <Warp>
      <Content onPress={() => Linking.openURL('https://pagamentos.advise.com.br/')}>
        <Info>
          <Title>Central de Pagamentos</Title>
          <Description>
            Acesse para atualizar informações de pagamento, consultar dados de contrato e visualizar o histórico de cobrança em um ambiente seguro.
          </Description>
        </Info>
        <Icon>
          <MaterialIcons name="launch" size={24} color={colors.fadedBlack} />
        </Icon>
      </Content>
    </Warp>
  </Container>
)};
