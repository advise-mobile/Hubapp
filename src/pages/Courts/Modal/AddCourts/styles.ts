import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';
import { SHEET_H_PADDING } from '@components/FormSheetRow';

export const FormBlock = styled.View`
	margin-bottom: 8px;
	margin-left: -${SHEET_H_PADDING}px;
	margin-right: -${SHEET_H_PADDING}px;
`;

export const ResponsibleRow = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	padding-vertical: 14px;
	padding-horizontal: ${SHEET_H_PADDING}px;
	background-color: ${({ theme }) => theme.colors.grayLighter};
	border-bottom-width: 1px;
	border-bottom-color: ${({ theme }) => theme.colors.grayLighter};
`;

export const ResponsibleLabel = styled.Text`
	font-family: ${fonts.circularStdBlack};
	font-size: ${fonts.regular}px;
	color: ${({ theme }) => theme.colors.darkGray};
	margin-right: 6px;
`;

export const ResponsibleName = styled.Text`
	font-family: ${fonts.circularStdBook};
	font-size: ${fonts.regular}px;
	color: ${({ theme }) => theme.colors.disabled};
	flex-shrink: 1;
	font-weight: normal;
`;

export const ButtonsFooter = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
	margin-top: 20px;
	padding-bottom: 8px;
	padding-horizontal: ${SHEET_H_PADDING}px;
`;
