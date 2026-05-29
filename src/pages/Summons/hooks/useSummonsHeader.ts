import { useCallback, useMemo, useState } from 'react';

import type { HeaderActionConfig } from '@components/Header';
import type { UseSummonsHeaderReturn } from '@models/summons-hooks-types';
import { useTheme } from 'styled-components';

const DEFAULT_TITLE = 'Intimações';

export function useSummonsHeader(): UseSummonsHeaderReturn {
	const { colors } = useTheme();

	const [addModalVisible, setAddModalVisible] = useState(false);

	const openAddModal = useCallback(() => setAddModalVisible(true), []);

	const rightActions: HeaderActionConfig[] = useMemo(
		() => [
			{
				icon: 'add-circle',
				colorIcon: colors.green200,
				onPress: openAddModal,
			},
		],
		[colors.green200, openAddModal],
	);

	return {
		headerProps: {
			title: DEFAULT_TITLE,
			rightActions,
		},
		addModalVisible,
		setAddModalVisible,
	};
}
