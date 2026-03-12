import { useCallback, useState } from 'react';
import type { HeaderActionConfig } from '@components/Header';

import { useTheme } from 'styled-components';

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
	setFilterModalVisible: (v: boolean) => void;
	addModalVisible: boolean;
	setAddModalVisible: (v: boolean) => void;
	filters: SummonsFilters;
	setFilters: (
		f: SummonsFilters | ((prev: SummonsFilters) => SummonsFilters),
	) => void;
}

const DEFAULT_TITLE = 'Intimações';

export function useSummonsHeader(): UseSummonsHeaderReturn {
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

	const [filterModalVisible, setFilterModalVisible] = useState(false);
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [filters, setFilters] = useState<SummonsFilters>({});

	const openFilterModal = useCallback(() => setFilterModalVisible(true), []);
	const openAddModal = useCallback(() => setAddModalVisible(true), []);

	const leftActions: HeaderActionConfig[] = [
		{ icon: 'filter-list', onPress: openFilterModal },
	];

	const rightActions: HeaderActionConfig[] = [
		{ icon: 'add-circle', colorIcon: colors.green200, onPress: openAddModal },
	];

	return {
		headerProps: {
			title: DEFAULT_TITLE,
			leftActions,
			rightActions,
		},
		filterModalVisible,
		setFilterModalVisible,
		addModalVisible,
		setAddModalVisible,
		filters,
		setFilters,
	};
}
