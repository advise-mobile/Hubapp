import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const FormBlock = styled.View`
	margin: 0 -24px 8px;
`;

export const ButtonsFooter = styled.View`
	align-self: stretch;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
`;

export const FieldRow = styled.View<{ $error?: boolean; $hideBorder?: boolean }>`
	padding: 12px 24px;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;
	border-bottom-width: ${({ $hideBorder }) => ($hideBorder ? 0 : 1)}px;
	border-bottom-color: ${({ theme, $error }) =>
		$error ? theme.colors.redLight : theme.colors.grayLighter};
`;

export const FieldLabel = styled.Text`
	margin-right: 12px;
	color: ${({ theme }) => theme.colors.primary};
	font-size: ${fonts.regular}px;
	font-family: ${fonts.circularStdBold};
`;

export const FieldInput = styled.TextInput<{ $error?: boolean }>`
	flex: 1;
	min-width: 120px;
	color: ${({ theme, $error }) =>
		$error ? theme.colors.red : theme.colors.grayLight};
	font-size: ${fonts.regular}px;
	font-family: ${fonts.circularStdBook};
	height: 20px;
	padding: 0;
`;

export const FieldErrorText = styled.Text`
	width: 100%;
	padding: 0 24px 8px;
	margin-top: -4px;
	font-size: ${fonts.smaller}px;
	font-family: ${fonts.circularStdBook};
	color: ${({ theme }) => theme.colors.red};
`;

export const TypesBadges = styled.View`
	flex: 1;
	flex-direction: row;
	flex-wrap: wrap;
	min-width: 0;
`;

export const TypeBadge = styled.TouchableOpacity<{
	$active: boolean;
	$error?: boolean;
}>`
	background-color: ${({ theme, $active, $error }) =>
		$error
			? theme.colors.redLight
			: $active
				? theme.colors.grayDarker
				: theme.colors.gray};
	border-radius: 16px;
	padding: 4px 8px;
	margin-right: 8px;
	margin-top: 4px;
`;

export const TypeBadgeText = styled.Text<{
	$active: boolean;
	$error?: boolean;
}>`
	font-family: ${fonts.circularStdBold};
	font-size: ${fonts.smaller}px;
	color: ${({ theme, $active, $error }) =>
		$error
			? theme.colors.red
			: $active
				? theme.colors.white
				: 'rgba(0, 0, 0, 0.38)'};
`;

export const AllDayBox = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	min-width: 100%;
`;

export const AllDayLabel = styled.Text`
	font-family: ${fonts.circularStdBook};
	color: ${({ theme }) => theme.colors.grayDarker};
	font-size: ${fonts.regular}px;
	flex: 1;
`;

export const DateFieldWrap = styled.View`
	flex: 1;
	min-width: 120px;
	align-items: flex-start;
	justify-content: center;
`;

export const HourButton = styled.TouchableOpacity`
	flex: 1;
	min-width: 120px;
	justify-content: center;
`;

export const HourText = styled.Text<{ $error?: boolean }>`
	color: ${({ theme, $error }) =>
		$error ? theme.colors.red : theme.colors.grayLight};
	font-size: ${fonts.regular}px;
	font-family: ${fonts.circularStdBook};
`;

export const ObservationsColumn = styled.View`
	flex: 1;
	min-width: 100%;
`;

export const ObservationsInput = styled.TextInput`
	height: 80px;
	margin-top: 8px;
	padding: 0;
	color: ${({ theme }) => theme.colors.grayLight};
	font-size: ${fonts.regular}px;
	font-family: ${fonts.circularStdBook};
	text-align-vertical: top;
`;

export const TypesLoadingWrap = styled.View`
	flex: 1;
	min-height: 32px;
	justify-content: center;
`;
