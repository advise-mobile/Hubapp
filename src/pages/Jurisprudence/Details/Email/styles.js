import styled from 'styled-components/native';
import { fonts, colors } from 'assets/styles';

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Cancel = styled.TouchableOpacity`
  flex: 1;
  padding: 8px;
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
  background: ${props => props.disabled ? colors.disabled : colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0);
`;

const SubmitText = styled.Text`
  color: ${props => props.sending ? colors.disabledText : colors.white};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

const Content = styled.View`
  margin: 0 -24px;
`;

const Email = styled.TextInput`
  flex: 1;
  padding: 12px 24px;
  color: ${props => props.error ? colors.red : colors.grayLight};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdMedium};
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.error ? colors.redLight : colors.grayLighter};
`;

export {
  Footer,
  Cancel,
  CancelText,
  Submit,
  SubmitText,
  Content,
  Email,
}
