export interface HeaderActionConfig {
	icon: string;
	colorIcon?: string;
	/** Fundo circular atrás do ícone (ex.: + verde com símbolo branco). */
	iconBackgroundColor?: string;
	onPress?: () => void;
	disabled?: boolean;
}

export interface HeaderProps {
	title: string;
	lower?: boolean;
	leftActions?: HeaderActionConfig[];
	rightActions?: HeaderActionConfig[];
}
