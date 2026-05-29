import type { HeaderActionConfig } from '@components/Header';

import type { CourtsRegistrationsAppliedFilters } from './court-registrations-filters';

export interface UseCourtsHeaderReturn {
	headerProps: {
		title: string;
		leftActions: HeaderActionConfig[];
		rightActions: HeaderActionConfig[];
	};
	addModalVisible: boolean;
	setAddModalVisible: (visible: boolean) => void;
}

export interface UseCourtsHeaderFiltersReturn {
	filters: CourtsRegistrationsAppliedFilters;
	applyFilters: (filters: CourtsRegistrationsAppliedFilters) => void;
	closeFilterModal: () => void;
	filterModalVisible: boolean;
	filterRightActions: HeaderActionConfig[];
	activeFiltersCount: number;
}

/** @deprecated Use UseCourtsHeaderReturn + UseCourtsHeaderFiltersReturn */
export interface UseCourtsHeaderLegacyReturn
	extends UseCourtsHeaderReturn,
		UseCourtsHeaderFiltersReturn {
	headerProps: {
		title: string;
		leftActions: HeaderActionConfig[];
		rightActions: HeaderActionConfig[];
	};
	setFilterModalVisible: (visible: boolean) => void;
	setFilters: (
		filters:
			| CourtsRegistrationsAppliedFilters
			| ((
					previous: CourtsRegistrationsAppliedFilters,
			  ) => CourtsRegistrationsAppliedFilters),
	) => void;
}
