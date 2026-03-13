import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const Handle = styled.View`
  align-items: center;
  padding-top: 8px;
  padding-bottom: 4px;
`;

export const HandleBar = styled.View`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.grayDarker};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 24px 16px;
  position: relative;
`;

export const Title = styled.Text`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.big}px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

export const ClearFilters = styled.TouchableOpacity`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-10px);
`;

export const ClearText = styled.Text`
  font-size: ${fonts.smaller}px;
  font-family: ${fonts.circularStdBold};
  color: ${({ theme }) => theme.colors.grayLight};
`;

export const SheetWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  max-height: 100%;
`;

export const Content = styled.View`
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 16px;
`;

export const Footer = styled.View`
  padding: 16px 24px 24px;
  padding-bottom: 24px;
`;

export const PrimaryButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.grayDarker};
  padding: 14px 24px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const PrimaryButtonText = styled.Text`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.small}px;
  color: ${({ theme }) => theme.colors.white};
`;
