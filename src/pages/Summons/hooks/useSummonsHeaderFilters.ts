import { useCallback, useMemo, useState } from 'react';

import type {
	SummonsFilters,
	UseSummonsHeaderFiltersReturn,
} from '@models/summons-hooks-types';
import { countActiveSummonsFilters } from '@models/summons-filters';

export function useSummonsHeaderFilters(): UseSummonsHeaderFiltersReturn {
	const [filterModalVisible, setFilterModalVisible] = useState(false);
	const [filters, setFilters] = useState<SummonsFilters>({});

	const openFilterModal = useCallback(() => setFilterModalVisible(true), []);
	const closeFilterModal = useCallback(() => setFilterModalVisible(false), []);

	const applyFilters = useCallback((nextFilters: SummonsFilters) => {
		setFilters(nextFilters);
		setFilterModalVisible(false);
	}, []);

	const activeFiltersCount = useMemo(
		() => countActiveSummonsFilters(filters),
		[filters],
	);

	return {
		filters,
		applyFilters,
		closeFilterModal,
		filterModalVisible,
		openFilterModal,
		activeFiltersCount,
	};
}
