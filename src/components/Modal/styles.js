import styled from 'styled-components/native';
import { fonts, colors } from 'assets/styles';

const Container = styled.View`
  padding: 0 24px;
  background-color: ${colors.white};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 40px 24px 12px 24px;
`;

const Title = styled.Text`
  font-family: ${fonts.circularStdBold};
  text-align: center;
  font-size: ${fonts.big};
  color: ${colors.primary};
`;

const Footer = styled.View`
  background-color: ${colors.white};
  padding: 24px 0;
`;

const ClearFilters = styled.TouchableOpacity`
  position: absolute;
  bottom: 8px;
  right: 16px;
  height: 20;
  margin: auto;
`;

const ClearText = styled.Text`
  font-size: ${fonts.smaller};
  color: ${colors.grayLight};
  font-family: ${fonts.circularStdBold};
`;

export {
  Container,
  Header,
  Title,
  Footer,
  ClearFilters,
  ClearText,
};
