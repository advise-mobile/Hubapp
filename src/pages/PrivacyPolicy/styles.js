import styled from 'styled-components/native';
import { metrics, fonts } from 'assets/styles';

const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ContentWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.niceBackground};
  margin-top: ${metrics.baseMargin * 3.6};
  margin-bottom: ${metrics.baseMargin * 3.6};
  margin-right: ${metrics.baseMargin * 1.6};
  margin-left: ${metrics.baseMargin * 1.6};
  border-radius: ${metrics.baseRadius};
`;

const TitleTerm = styled.Text`
  color: ${({ theme }) => theme.colors.grayDarker};
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.bigger};
  margin-top: ${metrics.baseMargin * 1.6};
	text-align: left;
  margin-left: 16px;
  margin-bottom: 22px;
`;


const Title = styled.Text`
  color: ${({ theme }) => theme.colors.grayDarker};
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
  color: ${({ theme }) => theme.name === 'dark' ? theme.colors.mainWhite : theme.colors.darkGray};
`

const TextWrapper = styled.ScrollView`
  padding-top: ${metrics.basePadding / 2.5};
  padding-bottom: ${metrics.basePadding / 2.5};
  padding-left: ${metrics.basePadding / 2.5};
  padding-right: ${metrics.basePadding / 2.5};
  margin-left: ${metrics.baseMargin * 1.6};
  margin-right: ${metrics.baseMargin * 1.6};
  border-radius: ${metrics.baseRadius};
  background-color: ${({ theme }) => theme.colors.realWhite};
  border-width: ${1};
  border-color: ${({ theme }) => theme.colors.grayDarker};
 	flex: 1;
`;

const TermsText = styled.Text`
  font-family: ${fonts.circularStdBook};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${fonts.regular};
	text-align: justify;
  margin-left: 8px;
`;

const TermsTextBold = styled.Text`
  font-family: ${fonts.circularStdBold};
  color:  ${({ theme }) => theme.colors.primary}; 
  font-size: ${fonts.regular};
  margin-top: 16px;
`;

const TermsTextUnderline = styled.Text`
  font-family: ${fonts.circularStdBook};
  font-size: ${fonts.regular};
  color: ${({ theme }) => theme.colors.primary}; 
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.primary}; 
  margin: 8px 0;
`;

const AcceptTermsWrapper = styled.View`
  height: 48px;
  margin-top: ${metrics.baseMargin * 1.6};
  background-color: ${({ theme }) => theme.name === 'dark' ? theme.colors.grayLight  : theme.colors.yellowLight};
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
  background-color: ${({ disabled,theme }) => disabled ? theme.colors.disabled : theme.colors.backgroundButton};
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
  color: ${({ theme }) => theme.colors.white}; 
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
