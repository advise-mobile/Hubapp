import styled from 'styled-components';
import { fonts } from 'assets/styles';

const Content = styled.ScrollView`
  padding: 12px 24px;
`;

const Label = styled.Text`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.regular};
  color: ${({ theme }) => theme.colors.grayDarker};
  padding: 12px 0;
`;

const Value = styled.Text`
  font-family: ${fonts.circularStdBook};
  font-size: ${fonts.regular};
  color: ${({ theme }) => theme.colors.grayLight};
  padding: 12px 0;
`;

const Movement = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
`;

const MovementTitle = styled.Text`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.bigger};
  color: ${({ theme }) => theme.colors.grayDarker};
  padding-vertical: 12px;
`;

export {
  Content,
  Label,
  Value,
  Movement,
  MovementTitle,
}
