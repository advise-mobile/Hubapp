import styled from 'styled-components/native';
import { fonts, colors } from 'assets/styles';

const Container = styled.View`
  padding: 0 24px;
  background-color: ${colors.white};
`;

const Header = styled.View`
  justify-content: center;
  padding: 40px 24px 12px 24px;
`;

const Title = styled.Text`
  font-family: ${fonts.circularStdBold};
  text-align: center;
  font-size: ${fonts.big};
`;

const Footer = styled.View`
  background-color: ${colors.white};
  padding: 24px;
`;

export {
  Container,
  Header,
  Title,
  Footer
};
