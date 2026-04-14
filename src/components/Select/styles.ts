import { useMemo } from 'react';
import { Platform, StyleSheet, type TextStyle } from 'react-native';
import type { PickerStyle } from 'react-native-picker-select';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';
import { fonts } from '@lassets/styles';

/* react-native-picker-select exige PickerStyle/StyleSheet; o resto é styled. */

type PickerThemeSlice = {
	grayDarker: string;
	grayLight: string;
};

function wrapMinHeight($compact?: boolean, $formRowAlign?: boolean): number {
	if ($formRowAlign) return 48;
	if ($compact) return 36;
	return 40;
}

export const LoadingWrap = styled.View<{
	$compact?: boolean;
	$formRowAlign?: boolean;
}>`
	min-height: ${({ $compact, $formRowAlign }) =>
		$formRowAlign ? 48 : $compact ? 32 : 36}px;
	justify-content: center;
	align-items: flex-start;
	padding: ${({ $compact, $formRowAlign }) =>
		$formRowAlign
			? '0 2px 0 0'
			: $compact
			? '4px 2px 4px 0'
			: '10px 2px 8px 0'};
`;

export const SelectWrap = styled.View<{
	$compact?: boolean;
	$formRowAlign?: boolean;
}>`
	position: relative;
	min-height: ${({ $compact, $formRowAlign }) =>
		wrapMinHeight($compact, $formRowAlign)}px;
	justify-content: center;
	align-self: stretch;
`;

/* iOS + sheet: overlay chama togglePicker via ref. */
export const SelectTouchOverlay = styled.TouchableOpacity.attrs({
	activeOpacity: 0.85,
})`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 1;
`;

function createRNPickerSelectStyles(
	theme: PickerThemeSlice,
	compact: boolean,
	formRowAlign: boolean,
): PickerStyle {
	const book = String(fonts.circularStdBook);
	const size = formRowAlign
		? Number(fonts.regular)
		: compact
		? Number(fonts.small)
		: Number(fonts.regular);
	const rowH = formRowAlign ? 48 : compact ? 36 : 40;
	const padV = formRowAlign ? 13 : compact ? 4 : 8;

	const inputIOS: TextStyle = {
		fontSize: size,
		color: theme.grayDarker,
		fontFamily: book,
		paddingVertical: padV,
		paddingRight: 4,
		...(formRowAlign ? { lineHeight: Math.round(size * 1.25) } : {}),
	};

	const inputAndroid: TextStyle = {
		height: rowH,
		paddingVertical: formRowAlign ? 0 : padV,
		paddingHorizontal: 0,
		fontSize: size,
		color: theme.grayDarker,
		fontFamily: book,
		textAlignVertical: 'center',
		includeFontPadding: false,
	};

	const shared = {
		inputIOS,
		inputAndroid,
		inputAndroidContainer: {
			minHeight: rowH,
		},
		iconContainer: {
			top: formRowAlign ? 15 : compact ? 8 : 10,
		},
		placeholder: {
			color: theme.grayLight,
		},
	};

	if (Platform.OS === 'android') {
		return StyleSheet.create({
			...shared,
			viewContainer: { alignItems: 'center' as const },
			chevronContainer: { display: 'none' as const },
			chevron: { display: 'none' as const },
			headlessAndroidContainer: {
				minHeight: rowH,
				alignSelf: 'stretch' as const,
			},
		}) as unknown as PickerStyle;
	}

	return StyleSheet.create({
		...shared,
		inputIOSContainer: {
			minHeight: rowH,
		},
	}) as unknown as PickerStyle;
}

export function useRNPickerSelectStyles(
	compact = false,
	formRowAlign = false,
): PickerStyle {
	const { colors } = useTheme();
	return useMemo(
		() =>
			createRNPickerSelectStyles(
				{
					grayDarker: colors.grayDarker,
					grayLight: colors.grayLight,
				},
				compact,
				formRowAlign,
			),
		[colors.grayDarker, colors.grayLight, compact, formRowAlign],
	);
}
