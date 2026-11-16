import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const SHEET_H_PADDING = 24;

export const RowOuter = styled.View<{ $hideBottomBorder?: boolean }>`
	border-bottom-width: ${({ $hideBottomBorder }) => ($hideBottomBorder ? 0 : 1)}px;
	border-bottom-color: ${({ theme }) => theme.colors.grayLighter};
	padding-horizontal: ${SHEET_H_PADDING}px;
`;

export const RowInner = styled.View`
	flex-direction: row;
	align-items: stretch;
	min-height: 48px;
`;

export const LabelShell = styled.View<{
	$long?: boolean;
	$labelMinWidth?: number;
}>`
	flex-shrink: ${({ $long }) => ($long ? 1 : 0)};
	${({ $long }) => ($long ? 'min-width: 0px;' : '')}
	${({ $long, $labelMinWidth }) =>
		!$long && $labelMinWidth != null
			? `min-width: ${$labelMinWidth}px;`
			: ''}
	margin-right: 10px;
	min-height: 48px;
	justify-content: center;
`;

export const LabelText = styled.Text`
	font-family: ${fonts.circularStdBlack};
	font-size: ${fonts.regular}px;
	line-height: ${Math.round(Number(fonts.regular) * 1.25)}px;
	color: ${({ theme }) => theme.colors.primary};
`;

export const Control = styled.View`
	flex: 1;
	min-width: 0;
	min-height: 48px;
	justify-content: center;
	align-items: flex-end;
`;

export const RowError = styled.Text`
	font-size: ${fonts.smaller}px;
	font-family: ${fonts.circularStdBook};
	color: ${({ theme }) => theme.colors.red};
	margin-top: 0px;
	margin-bottom: 8px;
	align-self: flex-start;
`;
