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
  background: ${colors.white};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${colors.primary};
`;

const CancelText = styled.Text`
  color: ${colors.primary};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

const Submit = styled.TouchableOpacity`
  flex: 1;
  padding: 8px;
  background: ${colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${colors.primary};
`;

const SubmitText = styled.Text`
  color: ${colors.white};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

const Content = styled.View`
  margin: 0 -24px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
  padding-horizontal: 24px;
  padding-bottom: 4px;
  border-bottom-width: 1px;
  display: ${props => props.disabled ? 'none' : 'flex'};
  color: ${props => props.error ? colors.red : colors.grayLight};
  border-bottom-color: ${props => props.error ? colors.redLight : colors.grayLighter};
`;

const Description = styled.Text`
  color: ${colors.grayLight};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
  text-align: center;
  padding-horizontal: 16px;
  padding-bottom: 16px;
  margin-bottom: 12px;
`;

export {
  Footer,
  Cancel,
  CancelText,
  Submit,
  SubmitText,
  Content,
  Input,
  Description,
}
