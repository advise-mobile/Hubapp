import styled from 'styled-components';
import { fonts, colors } from '@lassets/styles';

const Content = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  padding: 0 36px;
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
  fontsize: ${fonts.big + 4};
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
  margin-bottom: 20px;
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
  border-radius: 4px;
  border-width: 0.5;
  border-color: ${props =>
    props.error ? props.theme.colors.red : props.theme.colors.grayLight};
  color: ${({ theme }) => theme.colors.grayDarker};
  font-family: ${fonts.circularStdMedium};
  font-size: 16;
  padding: 10px;
`;

const InputHelpText = styled.Text`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${fonts.smaller};
  margin-bottom: 15px;
  margin-top: 4px;
  align-self: flex-start;
`;

const Button = styled.TouchableOpacity`
  align-self: stretch;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: 24px;
  margin-bottom: 16px;
  padding: 12px;
  height: 48px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.regular};
  text-align: center;
`;

const LogintLink = styled.TouchableOpacity`
  margin-top: 8px;
`;

const LoginLinkText = styled.Text`
  color: ${({ theme }) => theme.colors.forgetLink};
  font-family: ${fonts.circularStdBold};
  fontsize: ${fonts.regular};
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
