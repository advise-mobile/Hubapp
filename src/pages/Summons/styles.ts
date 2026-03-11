import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Title = styled.Text`
  font-size: ${fonts.bigger};
  font-family: ${fonts.circularStdBold};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;
