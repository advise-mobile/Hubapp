export interface HeaderActionConfig {
	icon: string;
	colorIcon?: string;
	onPress?: () => void;
	disabled?: boolean;
}

export interface HeaderProps {
	title: string;
	lower?: boolean;
	leftActions?: HeaderActionConfig[];
	rightActions?: HeaderActionConfig[];
}
