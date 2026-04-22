import { useCallback, useState } from 'react';

import type { HeaderActionConfig } from '@components/Header';
import type {
	SummonsFilters,
	UseSummonsHeaderReturn,
} from '@models/summons-hooks-types';
import { useTheme } from 'styled-components';

const DEFAULT_TITLE = 'Intimações';

/**
 * @param filterInteractive - RF 3.1.1: sem cadastro de acesso, o filtro fica desabilitado
 * (header usa placeholder). Com cadastro (RF 3.2.1), passar `true`.
 */
export function useSummonsHeader(filterInteractive = true): UseSummonsHeaderReturn {
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

	const [filterModalVisible, setFilterModalVisible] = useState(false);
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [filters, setFilters] = useState<SummonsFilters>({});

	const openFilterModal = useCallback(() => setFilterModalVisible(true), []);
	const openAddModal = useCallback(() => setAddModalVisible(true), []);

	const leftActions: HeaderActionConfig[] = filterInteractive
		? [{ icon: 'filter-list', onPress: openFilterModal }]
		: [];

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
