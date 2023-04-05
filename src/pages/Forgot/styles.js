import styled from 'styled-components';
import { fonts, colors } from 'assets/styles';

const Content = styled.SafeAreaView`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  marginHorizontal: 40px;
  justify-content: center;
`;

const Logo = styled.Image`
  height: 15%;
  width: 60%;
`;

const Icon = styled.Image`
  width: 168px;
  height: 152px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.grayDarker};
  font-family: ${fonts.circularStdBold};
  fontSize: ${fonts.big + 4};
  line-height: 24px;
  text-align: center;
  max-width: 220px;
  margin-top: 18px;
`;

const Description = styled.Text`
  color: ${({ theme }) => theme.colors.fadedBlack};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
  margin-top: 12px;
  margin-bottom: 16px;
  text-align: center;
  line-height: 24px;
`;

const Form = styled.View`
  align-items: center;
  align-self: stretch;
  justify-content: center;
`;

const InputGroup = styled.View`
  align-self: stretch;
`;

const Label = styled.Text`
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBold};
  color: ${({ theme }) => theme.colors.grayDarker};
  line-height: 24px;
  margin-bottom: 4px;
`;

const Input = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4;
  border-width: 0.5;
  border-color: ${props => props.error ? props.theme.colors.red : props.theme.colors.grayLight};
  color:  ${({ theme }) => theme.colors.grayDarker};
  font-family: ${fonts.circularStdMedium};
  font-size: 16;
  padding: 10px;
`;

const InputHelpText = styled.Text`
  color:  ${({ theme }) => theme.colors.red};
  font-size: ${fonts.smaller}
  margin-bottom: 15;
  align-self: flex-start;
`;

const Button = styled.TouchableOpacity`
  align-self: stretch;
  background-color:  ${({ theme }) => theme.colors.primary};
  border-radius: 4;
  marginVertical: 24px;
  padding: 12px;
`;

const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.regular};
  textAlign: center;
`;

const LogintLink = styled.TouchableOpacity``;

const LoginLinkText = styled.Text`
  color: ${({ theme }) => theme.colors.forgetLink};
  font-family: ${fonts.circularStdBold};
  fontSize: ${fonts.regular};
`;

export {
  Logo,
  Icon,
  Content,
  Title,
  Description,
  Form,
  InputGroup,
  Label,
  Input,
  InputHelpText,
  Button,
  ButtonText,
  LogintLink,
  LoginLinkText,
};
