import type { GestureResponderEvent } from 'react-native';

export type ButtonIconPosition = 'start' | 'end';

export interface ButtonIconProps {
	iconPosition: ButtonIconPosition;
	title: string;
	backgroundColor: string;
	titleColor: string;
	icon: string;
	iconColor: string;
	onPress?: (event: GestureResponderEvent) => void;
	iconSize?: number;
	disabled?: boolean;
	activeOpacity?: number;
}
