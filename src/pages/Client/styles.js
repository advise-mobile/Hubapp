import styled from 'styled-components';
import { fonts, colors } from 'assets/styles';

const Content = styled.ScrollView`

`;

const ContentRow = styled.View`
  padding: 12px 24px;
  border-bottom-color: ${colors.grayLighter};
  border-bottom-width: 1px;
`;

const Heading = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

const Title = styled.Text`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.regular};
  color: ${colors.grayDarker};
`;

const Button = styled.TouchableOpacity`
  padding: 12px;
  padding-right: 0;
`;

const Description = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.fadedBlack};
  font-family: ${fonts.circularStdBook};
  line-height: ${fonts.big + 3};
  margin-bottom: 12px;
`;

const Option = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const OptionButton = styled.TouchableOpacity`
  padding-vertical: 12px;
`;

const OptionText = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBook};
  margin-left: 12px;
`;

const ModalContent = styled.View`
  top: ${props => props.device == 'ios' ? '80px' : 0};
  border-radius: 4px;
  background-color: ${colors.white};
`;

const Infos = styled.KeyboardAvoidingView`
  padding: 8px 24px 24px 24px;
`;

const ModalHeading = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const ModalTitle = styled.Text`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.big};
  color: ${colors.grayDarker};
`;

const ModalSubtitle = styled.Text`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.regular};
  color: ${colors.grayDarker};
  padding-vertical: 8px;
  margin-top: 8px;
`;

const ModalOptionButton = styled.TouchableOpacity`
  padding-vertical: 6px;
`;

const ModalOptionText = styled.Text`
  margin-left: 12px;
  color: ${colors.adviseDarker};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
`;

const Attendance = styled.View`
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: ${colors.grayLighter};
  padding: 16px 24px 24px 24px;
`;

const AttendanceTitle = styled.Text`
  color: ${colors.fadedBlack};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

const AttendanceText = styled.Text`
  color: ${colors.fadedBlack};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBook};
`;

const HelpContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const HelpText = styled.Text`
  flex: 1;
  padding-top: 12px;
  font-size: ${fonts.small};
  color: ${colors.fadedBlack};
  font-family: ${fonts.circularStdBook};
`;

const Row = styled.View`
  margin-horizontal: -24px;
  flex-wrap: wrap;
  flex-direction: column;
  border-bottom-width: 1px;
  display: ${props => props.disabled ? 'none' : 'flex'};
  border-bottom-color: ${props => props.error ? colors.redLight : colors.grayLighter};
`;

const Label = styled.Text`
  padding: 12px 24px;
  color: ${props => props.error ? colors.red : colors.primary};
  font-size: ${fonts.regular - 2};
  font-family: ${fonts.circularStdBold};
`;

const Input = styled.TextInput`
  padding-horizontal: 24px;
  padding-bottom: 12px;
  padding-top: 0;
  color: ${props => props.error ? colors.red : colors.grayLight};
  font-size: ${fonts.regular - 2};
  font-family: ${fonts.circularStdBook};
`;

const Submit = styled.TouchableOpacity`
  margin-top: 24px;
  padding: 8px;
  background: ${props => props.disabled ? colors.disabled : colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0);
`;

const SubmitText = styled.Text`
  color: ${props => props.sending ? colors.disabledText : colors.white};
  font-size: ${fonts.regular - 2};
  font-family: ${fonts.circularStdBold};
`;

const SuccessContent = styled.View`
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 170px;
  height: 170px;
  resize-mode: contain;
`;

const SuccessTitle = styled.Text`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.big + 2};
  color: ${colors.grayDarker};
  margin-bottom: 8px;
`;

const SuccessDescription = styled.Text`
  font-family: ${fonts.circularStdBook};
  font-size: ${fonts.regular};
  color: ${colors.fadedBlack};
  text-align: center;
`;

export {
  Content,
  ContentRow,
  Heading,
  Title,
  Button,
  Description,
  Option,
  OptionButton,
  OptionText,
  ModalContent,
  Infos,
  ModalHeading,
  ModalTitle,
  ModalSubtitle,
  ModalOptionText,
  ModalOptionButton,
  Attendance,
  AttendanceTitle,
  AttendanceText,
  HelpContainer,
  HelpText,
  Row,
  Label,
  Input,
  Submit,
  SubmitText,
  SuccessContent,
  Image,
  SuccessTitle,
  SuccessDescription
};
