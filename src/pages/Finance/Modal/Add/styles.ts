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
  justify-content: space-between;
	flex-direction: row;
	align-items: center;
	border: ${({ theme }) => theme.colors.grayLighter};
	height: 60px;

`;

export const Row = styled.View`
  padding: 12px 24px;
  flex-wrap: wrap;
  flex-direction: row;
	justify-content: space-between;
	width: 300px;
`;

export const Label = styled.Text`
  margin-right: 12;
  color: ${({ theme }) => theme.colors.inactiveDetails};
  font-size: 14px;
`;

export const Icon = styled.View`
	padding: 16px;

	justify-content: space-between;
	width: 50px;
`;
