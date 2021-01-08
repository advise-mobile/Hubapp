import styled from 'styled-components/native';
import { fonts, colors } from 'assets/styles';

const Submit = styled.TouchableOpacity`
  padding: 8px;
  background: ${colors.white};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${colors.primary};

`;

const SubmitText = styled.Text`
  color: ${colors.primary};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

const Content = styled.View`
  margin: 0 -24px;
`;

const Option = styled.TouchableOpacity`
  padding: 12px 24px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grayLighter};
`;

const OptionText = styled.Text`
  font-family: ${fonts.circularStdBook};
  color: ${colors.fadedBlack};
  font-size: ${fonts.small};
  margin-left: 12px;
`;

export {
  Submit,
  SubmitText,
  Content,
  OptionText,
  Option
}
