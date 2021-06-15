import styled from 'styled-components';
import { metrics, fonts, colors } from 'assets/styles';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

const Warp = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 36px;
`;

const HeaderLogo = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 80px;
`;

const TextHeader = styled.Text`
  font-family: ${fonts.circularStdBold};
  font-size: 28px;
`;

const Logo = styled.Image`
  height: 15%;
  width: 60%;
`;

const Form = styled.KeyboardAvoidingView`
  align-self: stretch;
  margin-top: 20px;
`;

const InputGroup = styled.View``;

const InputGroupPrepend = styled.View`
  background-color: transparent;
  color: ${colors.primary};
  height: 49px;
  left: ${metrics.basePadding};
  padding: 5px;
  position: absolute;
  width: 50px;
`;

const InputGroupAppend = styled.TouchableOpacity`
  background-color: transparent;
  color: ${colors.primary};
  height: 49px;
  right: ${metrics.basePadding};
  padding: 5px;
  position: absolute;
  width: 50px;
`;

const Input = styled.TextInput`
  align-self: stretch;
  margin-horizontal: 20px;
  background-color: ${colors.niceBackground};
  border-radius: ${metrics.baseRadius};
  border-width: 0.5px;
  color: ${colors.primary};
  font-family: ${fonts.circularStdBook};
  font-size: ${fonts.regular};
  padding: 10px;
  height: 45px;
  margin-bottom: ${metrics.baseMargin + 5};
  margin-left: ${metrics.basePadding};
  padding-left: ${metrics.baseMargin * 5};
  padding-right: ${metrics.basePadding};
  z-index: -1;
`;

const InputHelpText = styled.Text`
  color: ${colors.red};
  font-size: ${fonts.smaller};
  margin-bottom: 15px;
  margin-horizontal: 20;
  margin-top: -15;
`;

const Button = styled.TouchableOpacity`
  align-self: stretch;
  background-color: ${colors.backgroundButton};
  border-radius: 4px;
  margin: 20px;
  margin-horizontal: 20px;
  padding: 12px;
  height: 48px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const ButtonText = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.big};
  text-align: center;
`;

const ForgotText = styled.Text`
  color: ${colors.primary};
  font-family: ${fonts.circularStdMedium};
  font-size: ${fonts.regular};
  margin-top: 10px;
  padding: 10px;
`;

const ForgotLink = styled.TouchableOpacity`
  background: transparent;
`;

const ForgotLinkText = styled.Text`
  font-family: ${fonts.circularStdMedium};
  font-size: ${fonts.regular};
  color: ${colors.forgetLink};
  font-weight: bold;
`;

const Badge = styled.TouchableOpacity`
  align-items: center;
  background-color: transparent;
  border-radius: 50px;
  height: 22px;
  justify-content: center;
  width: auto;
  padding: 0 16px;
`;

const BadgeText = styled.Text`
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.big};
  text-align: center;
`;

const BadgeRed = styled(Badge)`
  background-color: ${colors.red};
`;

const BadgeRedText = styled(BadgeText)`
  color: ${colors.white};
  font-size: ${fonts.tiny};
`;

const AnotherOption = styled.View`
  background-color: ${colors.disabled};
  height: 1px;
  margin: 24px 0 24px 0;
  width: 300px;
  align-items: center;
  justify-content: center;
`;

const AnotherOptionText = styled.Text`
  width: 75px;
  text-align: center;
  position: absolute;
  color: ${colors.fadedBlack};
  font-size: ${fonts.regular};
  background-color: ${colors.white};
  font-family: ${fonts.circularStdBold};
`;

export {
  Container,
  Warp,
  HeaderLogo,
  TextHeader,
  Logo,
  Form,
  InputGroup,
  InputGroupPrepend,
  InputGroupAppend,
  Input,
  InputHelpText,
  Button,
  ButtonText,
  ForgotText,
  ForgotLink,
  ForgotLinkText,
  BadgeRed,
  BadgeRedText,
  AnotherOption,
  AnotherOptionText
};
