import React from 'react';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

import { Root, Label } from './styles';

export type ButtonVariant = 'filled' | 'outlined';

export interface ButtonProps {
	text: string;
	variant: ButtonVariant;
	onPress?: (event: GestureResponderEvent) => void;
	disabled?: boolean;
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
	activeOpacity = 0.8,
	fill = false,
	style,
	testID,
}: ButtonProps) {
	return (
		<Root
			$variant={variant}
			$fill={fill}
			$disabled={disabled}
			onPress={onPress}
			disabled={disabled}
			activeOpacity={activeOpacity}
			accessibilityRole="button"
			accessibilityLabel={text}
			style={style}
			testID={testID}
		>
			<Label $variant={variant}>{text}</Label>
		</Root>
	);
}
