import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

const Title = styled.Text`
  font-size: ${fonts.big};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${fonts.circularStdBold};
`;

const Label = styled.Text`
  font-size: ${fonts.small};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${fonts.circularStdBold};
  padding-bottom: 4px;
`;

const Row = styled.View`
  padding: 12px 0;
  flex-direction: row;
`;

const Column = styled.View`
  flex: 1;
`;

const Submit = styled.TouchableOpacity`
  padding: 8px;
  background: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const SubmitText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBold};
`;

const RBRow = styled.View`
  flex-direction: row-reverse;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

export {
  Title,
  Label,
  Row,
  Column,
  Submit,
  SubmitText,
  RBRow
};
