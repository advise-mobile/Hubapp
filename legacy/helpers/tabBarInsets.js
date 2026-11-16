import { Platform } from 'react-native';

const TAB_BASE_HEIGHT_ANDROID = 64;
const TAB_PADDING_TOP_ANDROID = 8;
const TAB_PADDING_BOTTOM_ANDROID = 8;

const TAB_BASE_HEIGHT_IOS = 80;
const TAB_PADDING_TOP_IOS = 16;
const TAB_PADDING_BOTTOM_IOS = 20;

/**
 * Retorna as métricas exatas da tab bar para a plataforma atual.
 * Deve estar em sincronia com legacy/navigation/Routes.js.
 *
 * @param {number} insetsBottom - insets.bottom do useSafeAreaInsets()
 * @returns {{ height: number, paddingTop: number, paddingBottom: number }}
 */
export function getTabBarMetrics(insetsBottom) {
	if (Platform.OS === 'android') {
		return {
			height: TAB_BASE_HEIGHT_ANDROID + insetsBottom,
			paddingTop: TAB_PADDING_TOP_ANDROID,
			paddingBottom: TAB_PADDING_BOTTOM_ANDROID + insetsBottom,
		};
	}
	return {
		height: TAB_BASE_HEIGHT_IOS + insetsBottom,
		paddingTop: TAB_PADDING_TOP_IOS,
		paddingBottom: TAB_PADDING_BOTTOM_IOS + insetsBottom,
	};
}

/**
 * Offset `bottom` que posiciona o toast (ou qualquer overlay) acima
 * da área visível da tab bar, incluindo o paddingTop interno da barra
 * (onde ficam os ícones) e a margem extra desejada.
 *
 * Fórmula: extraMargin + height + paddingTop
 * - height já incorpora o inset inferior uma única vez
 * - paddingTop reserva a faixa de ícones do menu
 *
 * @param {number} insetsBottom - insets.bottom do useSafeAreaInsets()
 * @param {number} [extraMargin=10] - margem extra acima do menu
 * @returns {number}
 */
export function getToastBottomOffset(insetsBottom, extraMargin = 10) {
	const { height, paddingTop } = getTabBarMetrics(insetsBottom);
	return extraMargin + height + paddingTop;
}
