import type { SummonsDetailNavParams } from '@models/summons-detail';

/**
 * Tipos das stacks em TypeScript (legacy/Routes.js continua em JS).
 * Alinha useNavigation().navigate(...) com os nomes reais das screens.
 */
export type SummonsStackParamList = {
	Summons: undefined;
	CourtsList: undefined;
	SummonsDetail: SummonsDetailNavParams;
};
