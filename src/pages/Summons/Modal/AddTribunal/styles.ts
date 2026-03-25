import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 24px;
  max-height: 70%;
`;

export const ModalTitle = styled.Text`
  font-size: ${fonts.bigger}px;
  font-family: ${fonts.circularStdBold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

export const Button = styled.TouchableOpacity`
  padding: 12px 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonSecondary = styled.TouchableOpacity`
  padding: 12px 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.grayLight};
`;

export const ButtonText = styled.Text`
  font-size: ${fonts.regular}px;
  font-family: ${fonts.circularStdMedium};
  color: ${({ theme }) => theme.colors.white};
`;

export const ButtonTextSecondary = styled.Text`
  font-size: ${fonts.regular}px;
  font-family: ${fonts.circularStdMedium};
  color: ${({ theme }) => theme.colors.primary};
`;
