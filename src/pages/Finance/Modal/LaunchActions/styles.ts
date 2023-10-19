import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Cancel = styled.TouchableOpacity`
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

export const CancelText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

export const Content = styled.TouchableOpacity`
  margin: 0 -27px;
	flex-direction: row;
	align-items: center;
	border: ${({ theme }) => theme.colors.grayLighter};
	height: 48px;
`;

export const Row = styled.View`
	margin-left: 10px;
  flex-wrap: wrap;
  flex-direction: row;
	width: 300px;
`;

export const Label = styled.Text`
  margin-right: 12;
  color: ${({ theme }) => theme.colors.grayDarker};
  font-size: 14px;
`;

export const Icon = styled.View`
	width: 24px;
	height: 24px;
  align-items: center;
	margin-left: 20px;
`;
