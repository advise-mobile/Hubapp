import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Cancel = styled.TouchableOpacity`
  flex: 1;
  padding: 7px;
  margin-right: 12px;
  background: ${({ theme }) => theme.colors.white};
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
  background:  ${({ theme }) => theme.colors.red};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.red};
`;

const SubmitText = styled.Text`
  color:  ${({ theme }) => theme.colors.white};;
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

const Content = styled.View`
  margin: 0 -8px;
`;

const Message = styled.Text`
  color:  ${({ theme }) => theme.colors.grayLight};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
  text-align: center;
  line-height: 24px;
`;

export {
  Footer,
  Cancel,
  CancelText,
  Submit,
  SubmitText,
  Content,
  Message,
}
