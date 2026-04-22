import React from 'react';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components';

import Spinner from '@lcomponents/Spinner';

import { Root, Label } from './styles';

export type ButtonVariant = 'filled' | 'outlined';

export interface ButtonProps {
	text: string;
	variant: ButtonVariant;
	onPress?: (event: GestureResponderEvent) => void;
	disabled?: boolean;
	loading?: boolean;
	activeOpacity?: number;
	fill?: boolean;
	style?: StyleProp<ViewStyle>;
	testID?: string;
}

export function Button({
	text,
	variant,
	onPress,
	disabled = false,
	loading = false,
	activeOpacity = 0.8,
	fill = false,
	style,
	testID,
}: ButtonProps) {
	const { colors } = useTheme();
	const isBusy = loading;
	const isDisabled = disabled || isBusy;

	const spinnerColor =
		variant === 'filled' ? colors.realWhite ?? '#FFFFFF' : colors.primary;

	return (
		<Root
			$variant={variant}
			$fill={fill}
			$disabled={isDisabled}
			onPress={onPress}
			disabled={isDisabled}
			activeOpacity={activeOpacity}
			accessibilityRole="button"
			accessibilityLabel={text}
			accessibilityState={{ busy: isBusy }}
			style={style}
			testID={testID}
		>
			{isBusy ? (
				<Spinner transparent color={spinnerColor} height="14" />
			) : (
				<Label $variant={variant}>{text}</Label>
			)}
		</Root>
	);
}
