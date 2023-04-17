import styled from 'styled-components';
import { fonts } from 'assets/styles';

const Logo = styled.Image`
  width: 200px;
  height: 45px;
  position: absolute;
  top: 32px;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

const BlockedContainer = styled.View`
  max-width: 320px;
  padding: 24px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 170px;
  height: 170px;
  resize-mode: contain;
`;

const Title = styled.Text`
  text-align: center;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.grayDarker};
  font-size: ${fonts.big + 2};
  font-family: ${fonts.circularStdBold};
`;

const Description = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.fadedBlack};
  font-size: ${fonts.regular};
  line-height: ${fonts.bigger};
  font-family: ${fonts.circularStdBook};
`;

const PaymentContainer = styled.View`
  align-items: center;
  max-width: 350px;
  padding: 30px 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.trueGray};
`;

const PaymentImage = styled.Image`
  width: 250px;
  resize-mode: contain;
`;

const PaymentDescription = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.fadedBlack};
  font-size: ${fonts.regular};
  line-height: ${fonts.bigger};
  font-family: ${fonts.circularStdBook};
  margin-bottom: 24px;
`;


const PaymentButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 12px 20px;
  border-radius: 4px;
`;

const PaymentButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBold};
`;

export {
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
};
