import styled from 'styled-components/native';
import { fonts, colors } from 'assets/styles';

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Cancel = styled.TouchableOpacity`
  flex: 1;
  padding: 7px;
  margin-right: 12px;
  background:  ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

const CancelText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

const Submit = styled.TouchableOpacity`
  flex: 1;
  padding: 8px;
  background: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

const SubmitText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

const Content = styled.View`
  margin: 0 -24px;
`;

const Input = styled.TextInput`
  flex: 1;
  color: ${props => props.error ? props.theme.colors.red : props.theme.colors.grayLight};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
  height: 20px;
  padding: 0;
`;

const TextArea = styled.TextInput`
  height: 80px;
  color: ${props => props.error ? props.theme.colors.red : props.theme.colors.grayLight};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
`;

const Row = styled.View`
  padding: 12px 24px;
  flex-wrap: wrap;
  flex-direction: row;
  border-bottom-width: 1px;
  display: ${props => props.disabled ? 'none' : 'flex'};
  border-bottom-color: ${props => props.error ? props.theme.colors.redLight : props.theme.colors.grayLighter};
`;

const Label = styled.Text`
  margin-right: 12;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBold};
`;

const Badges = styled.View`
  flex-direction: row;
  flex-grow: 0;
  flex-wrap: wrap;
`;

const Badge = styled.TouchableOpacity`
  background: ${props => props.error ? props.theme.colors.redLight : props.active ? props.theme.colors.grayDarker : props.theme.colors.gray};
  border-radius: 16;
  padding: 4px 8px;
  margin-right: 8px;
  margin-top: 24px;
`;

const BadgeText = styled.Text`
  font-family: ${fonts.circularStdBold};
  color: ${props => props.error ? props.theme.colors.red : props.active ? props.theme.colors.white : 'rgba(0, 0, 0, 0.38)'};
  font-size: ${fonts.smaller};
`;

const ReadBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const MarkAsRead = styled.TouchableOpacity``;

const MarkAsReadText = styled.Text`
  font-family: ${fonts.circularStdBook};
  color: ${({ theme }) => theme.colors.grayDarker};
  font-size: ${fonts.regular};
`;



const Hour = styled.TouchableOpacity``;

const HourText = styled.Text`
  color: ${({ theme }) => theme.colors.grayLight};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
`;

const Column = styled.View`
  flex: 1;
`;

export {
  Footer,
  Cancel,
  CancelText,
  Submit,
  SubmitText,
  Content,
  Input,
  Row,
  Label,
  Badges,
  Badge,
  BadgeText,
  ReadBox,
  MarkAsRead,
  MarkAsReadText,
  Hour,
  HourText,
  TextArea,
  Column,
}
