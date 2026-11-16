import { useCallback, useMemo, useState } from 'react';

import type { HeaderActionConfig } from '@components/Header';

import {
	countActiveCourtRegistrationsFilters,
	DEFAULT_COURTS_REGISTRATIONS_FILTERS,
	type CourtsRegistrationsAppliedFilters,
} from '@models/court-registrations-filters';
import type { UseCourtsHeaderFiltersReturn } from '@models/courts-hooks-types';

export function useCourtsHeaderFilters(): UseCourtsHeaderFiltersReturn {
	const [filterModalVisible, setFilterModalVisible] = useState(false);
	const [filters, setFilters] = useState<CourtsRegistrationsAppliedFilters>(
		DEFAULT_COURTS_REGISTRATIONS_FILTERS,
	);

	const openFilterModal = useCallback(() => setFilterModalVisible(true), []);
	const closeFilterModal = useCallback(() => setFilterModalVisible(false), []);

	const applyFilters = useCallback(
		(nextFilters: CourtsRegistrationsAppliedFilters) => {
			setFilters(nextFilters);
			setFilterModalVisible(false);
		},
		[],
	);

	const filterRightActions: HeaderActionConfig[] = useMemo(
		() => [{ icon: 'filter-list', onPress: openFilterModal }],
		[openFilterModal],
	);

	const activeFiltersCount = useMemo(
		() => countActiveCourtRegistrationsFilters(filters),
		[filters],
	);

	return {
		filters,
		applyFilters,
		closeFilterModal,
		filterModalVisible,
		filterRightActions,
		activeFiltersCount,
	};
}
