import type { HeaderActionConfig } from '@components/Header';

import type { CourtOption, JudicialAgencyOption } from './filters-summons';

export interface SummonsFilters {
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
	/** `null` clears without request. */
	loadSystems: (idOrgaoJudiciario: number | null) => Promise<CourtOption[]>;
}
