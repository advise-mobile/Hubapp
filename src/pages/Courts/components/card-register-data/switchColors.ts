import type { DefaultTheme } from 'styled-components';

export function getCourtRegisterSwitchColors(
	theme: DefaultTheme,
	isActive: boolean,
) {
	const { colors, name } = theme;

	const trackOn = colors.greenLight;
	const thumbOn = colors.green200;
	const thumbOff =
		colors.realWhite === '#000000'
			? '#FFFFFF'
			: colors.realWhite ?? '#FFFFFF';

	const trackOff =
		name === 'dark'
			? 'rgba(255, 255, 255, 0.24)'
			: colors.bordercolor ?? '#BDBDBD';

	return {
		trackColor: { false: trackOff, true: trackOn },
		thumbColor: isActive ? thumbOn : thumbOff,
		ios_backgroundColor: trackOff,
	};
}
