import styled from 'styled-components/native';
import { metrics, fonts, colors } from 'assets/styles';
import {Appearance} from 'react-native';

const colorScheme = Appearance.getColorScheme();

const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ContentWrapper = styled.View`
  flex: 1;
  background-color: ${props => props.scheme === 'dark' ? '#2D2D2D' : '#FFF'};
  margin-top: ${metrics.baseMargin * 3.6};
  margin-bottom: ${metrics.baseMargin * 3.6};
  margin-right: ${metrics.baseMargin * 1.6};
  margin-left: ${metrics.baseMargin * 1.6};
  border-radius: ${metrics.baseRadius};
`;

const TitleTerm = styled.Text`
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.bigger};
  margin-top: ${metrics.baseMargin * 1.6};
	text-align: left;
  margin-left: 16px;
  margin-bottom: 22px;
`;


const Title = styled.Text`
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.bigger};
  margin-top: ${metrics.baseMargin * 1.6};
	text-align: center;
`;

export const Subtitle = styled.Text`
	font-family: ${fonts.circularStdBook};
	margin-bottom: ${metrics.baseMargin * 1.6};
	text-align: left;
  margin-left: 16px;
  margin-bottom: 8px;
  font-size: 16px;
  color:  ${colorScheme === 'dark' ? colors.mainWhite : colors.darkGray};
`

const TextWrapper = styled.ScrollView`
  padding-top: ${metrics.basePadding / 2.5};
  padding-bottom: ${metrics.basePadding / 2.5};
  padding-left: ${metrics.basePadding / 2.5};
  padding-right: ${metrics.basePadding / 2.5};
  margin-left: ${metrics.baseMargin * 1.6};
  margin-right: ${metrics.baseMargin * 1.6};
  border-radius: ${metrics.baseRadius};
  background-color: ${colors.realWhite};
  border-width: ${1};
  border-color: ${colors.darkGray};
 	flex: 1;
`;

const TermsText = styled.Text`
  font-family: ${fonts.circularStdBook};
  color: ${colors.primary};
  font-size: ${fonts.regular};
	text-align: justify;
  margin-left: 8px;
`;

const TermsTextBold = styled.Text`
  font-family: ${fonts.circularStdBold};
  color: ${colors.primary};
  font-size: ${fonts.regular};
  margin-top: 16px;
`;

const TermsTextUnderline = styled.Text`
  font-family: ${fonts.circularStdBook};
  font-size: ${fonts.regular};
  color: ${colors.primary};
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  margin: 8px 0;
`;

const AcceptTermsWrapper = styled.View`
  height: 48px;
  margin-top: ${metrics.baseMargin * 1.6};
  background-color: ${props => props.scheme === 'dark' ? colors.grayLight : colors.yellowLight};
  padding-top: ${metrics.baseMargin * 1.2};
  padding-bottom: ${metrics.baseMargin * 1.2};
  padding-left: ${metrics.baseMargin * 2.4};
  padding-right: ${metrics.baseMargin * 2.4};
  flex-direction: row;
  align-items: center;
`;

const AcceptText = styled.Text`

`;

const AcceptButton = styled.TouchableOpacity`
  background-color: ${({ disabled }) => disabled ? colors.disabled : colors.backgroundButton};
  margin-top: ${metrics.baseMargin * 2.4};
  margin-bottom: ${metrics.baseMargin * 2.4};
  margin-left: ${metrics.baseMargin * 2.4};
  margin-right: ${metrics.baseMargin * 2.4};
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: ${metrics.baseRadius};
`;

const AcceptButtonText = styled.Text`
  color: ${colors.white};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

export {
  Container,
  ContentWrapper,
  Title,
  TitleTerm,
  TextWrapper,
  TermsText,
  TermsTextBold,
  TermsTextUnderline,
  AcceptTermsWrapper,
  AcceptText,
  AcceptButton,
  AcceptButtonText
};
