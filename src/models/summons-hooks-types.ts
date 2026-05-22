import type { HeaderActionConfig } from '@components/Header';

import type { CourtOption, JudicialAgencyOption } from './filters-summons';

export interface SummonsFilters {
	dataInicial?: string;
	dataFinal?: string;
	FlLido?: boolean;
	idOrgaoJudiciario?: number;
	idFonteXTipoPesquisa?: number;
	idFonteXTipoPesquisaSistema?: number;
	dataDe?: string;
	dataAte?: string;
	situacao?: 'all' | 'read' | 'unread';
	[key: string]: string | number | boolean | null | undefined;
}

export interface UseSummonsHeaderReturn {
	headerProps: {
		title: string;
		leftActions: HeaderActionConfig[];
		rightActions: HeaderActionConfig[];
	};
	filterModalVisible: boolean;
	setFilterModalVisible: (visible: boolean) => void;
	addModalVisible: boolean;
	setAddModalVisible: (visible: boolean) => void;
	filters: SummonsFilters;
	setFilters: (
		filters: SummonsFilters | ((previous: SummonsFilters) => SummonsFilters),
	) => void;
}

export interface UseCourtsReturn {
	courts: JudicialAgencyOption[];
	isLoadingCourts: boolean;
	loadCourts: () => Promise<JudicialAgencyOption[]>;

	systems: CourtOption[];
	isLoadingSystems: boolean;
	loadSystems: (idOrgaoJudiciario: number | null) => Promise<CourtOption[]>;
}
