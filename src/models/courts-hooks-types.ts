import type { HeaderActionConfig } from '@components/Header';

import type { CourtsRegistrationsAppliedFilters } from './court-registrations-filters';

export interface UseCourtsHeaderReturn {
	headerProps: {
		title: string;
		leftActions: HeaderActionConfig[];
		rightActions: HeaderActionConfig[];
	};
	filterModalVisible: boolean;
	setFilterModalVisible: (visible: boolean) => void;
	addModalVisible: boolean;
	setAddModalVisible: (visible: boolean) => void;
	filters: CourtsRegistrationsAppliedFilters;
	setFilters: (
		filters:
			| CourtsRegistrationsAppliedFilters
			| ((
					previous: CourtsRegistrationsAppliedFilters,
			  ) => CourtsRegistrationsAppliedFilters),
	) => void;
}
