import styled from 'styled-components/native';
import { fonts, colors } from 'assets/styles';

const Title = styled.Text`
  font-size: ${fonts.big};
  color: ${colors.primary};
  font-family: ${fonts.circularStdBold};
  margin-bottom: 8px;
`;

const Row = styled.View`
  padding: 12px 0;
  display: ${props => props.disabled ? 'none' : 'flex'};
`;

const Submit = styled.TouchableOpacity`
  padding: 8px;
  background: ${colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const SubmitText = styled.Text`
  color: ${colors.white};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBold};
`;

export {
  Title,
  Row,
  Submit,
  SubmitText,
};
