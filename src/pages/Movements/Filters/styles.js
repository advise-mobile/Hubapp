import styled from 'styled-components/native';
import { fonts, colors } from 'assets/styles';
import { StyleSheet } from 'react-native';

const Title = styled.Text`
  font-size: ${fonts.big};
  color: ${colors.primary};
  font-family: ${fonts.circularStdBold};
`;

const Label = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.primary};
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

const RBRow = styled.View`
  flex-direction: row-reverse;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

const RBLabel = StyleSheet.create({
  label: {
    'color': colors.grayDarker,
    'fontFamily': fonts.circularStdBook,
    'fontSize': fonts.regular,
  }
});

export {
  Title,
  Label,
  Row,
  Column,
  Submit,
  SubmitText,
  RBRow,
  RBLabel
};
