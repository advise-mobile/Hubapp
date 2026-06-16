import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const ButtonsFooter = styled.View`
	align-self: stretch;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
`;

export const FieldRow = styled.View<{ $error?: boolean }>`
	padding: 12px 0;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	border-bottom-width: 1px;
	border-bottom-color: ${({ theme, $error }) =>
		$error ? theme.colors.redLight : theme.colors.grayLighter};
`;

export const FieldInput = styled.TextInput<{ $error?: boolean }>`
	flex: 1;
	min-width: 120px;
	color: ${({ theme, $error }) =>
		$error ? theme.colors.red : theme.colors.grayLight};
	font-size: ${fonts.regular}px;
	font-family: ${fonts.circularStdBook};
`;

export const HintText = styled.Text`
	margin-top: 8px;
	color: ${({ theme }) => theme.colors.grayLight};
	font-size: ${fonts.small}px;
	font-family: ${fonts.circularStdBook};
`;
