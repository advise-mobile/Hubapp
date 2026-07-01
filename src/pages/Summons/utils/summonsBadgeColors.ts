import type { DefaultTheme } from 'styled-components';

export function resolveSummonsListBadgeBackgrounds(
	theme: DefaultTheme,
	isRead: boolean,
) {
	const { colors, name } = theme;
	const metaBg =
		name === 'dark' ? colors.backgroundButton : colors.gray;

	if (isRead) {
		return {
			tag1Bg: metaBg,
			tag2Bg: metaBg,
			metaTagBg: metaBg,
		};
	}

	return {
		tag1Bg: colors.amber,
		tag2Bg: colors.orange200,
		metaTagBg: metaBg,
	};
}
