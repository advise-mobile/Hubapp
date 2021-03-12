import styled from 'styled-components';
import { fonts, colors } from 'assets/styles';

const SearchBar = styled.View`
  margin-top: 16px;
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: ${colors.grayLighter};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grayLighter};
`;

const SearchInput = styled.TextInput`
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdMedium};
  padding: 8px 24px;
  flex: 1;
  color: ${colors.grayLight};
`;

const SearchButton = styled.TouchableOpacity`
  padding: 12px 24px;
  align-items: center;
`;

const RegistersBar = styled.View`
  padding: 12px 24px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grayLighter};
`;

const RegistersCounter = styled.Text`
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
  color: ${colors.grayDarker};
`;

const RegistersTotal = styled.Text`
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
  color: ${colors.grayLight};
`;

const Jurisprudence = styled.TouchableOpacity`
  padding: 24px;
  background-color: ${colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grayLighter};
`;

const Tribunal = styled.Text`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.regular};
  text-transform: capitalize;
  color: ${colors.grayDarker};
  margin-bottom: 5;
`;

const PublicationDate = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.grayLight};
  font-family: ${fonts.circularStdMedium};
  margin-bottom: 12;

`;

const Title = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBook};
  line-height: 24px;
  text-transform: uppercase;
`;

const Description = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBook};
  line-height: 24px;
`;

const Mark = styled.Text`
  font-size: ${fonts.small};
  color: rgba(0, 0, 0, .8);
  font-family: ${fonts.circularStdBook};
  background-color: ${colors.yellowLight};
`;

const NotFound = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 170px;
  height: 170px;
  resize-mode: contain;
  margin-bottom: 24px;
`;

const NotFoundText = styled.Text`
font-size: ${fonts.big};
color: ${colors.grayDarker};
font-family: ${fonts.circularStdBold};
`;

const NotFoundDescription = styled.Text`
color: ${colors.grayLight};
font-size: ${fonts.regular};
font-family: ${fonts.circularStdBook};
`;


export {
  SearchBar,
  SearchInput,
  SearchButton,
  RegistersBar,
  RegistersCounter,
  RegistersTotal,
  Jurisprudence,
  Tribunal,
  PublicationDate,
  Title,
  Description,
  Mark,
  NotFound,
  Image,
  NotFoundText,
  NotFoundDescription
};
