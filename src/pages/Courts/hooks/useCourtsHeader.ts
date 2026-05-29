import { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { HeaderActionConfig } from '@components/Header';
import { useTheme } from 'styled-components';

import type { UseCourtsHeaderReturn } from '@models/courts-hooks-types';

import type { SummonsStackParamList } from '../../../navigation/paramLists';

const DEFAULT_TITLE = 'Cadastros';

export function useCourtsHeader(): UseCourtsHeaderReturn {
	const navigation =
		useNavigation<StackNavigationProp<SummonsStackParamList>>();
	const { colors } = useTheme();

	const [addModalVisible, setAddModalVisible] = useState(false);

	const goBack = useCallback(() => {
		navigation.goBack();
	}, [navigation]);

	const openAddModal = useCallback(() => setAddModalVisible(true), []);

	const leftActions: HeaderActionConfig[] = useMemo(
		() => [{ icon: 'arrow-back', onPress: goBack }],
		[goBack],
	);

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
			leftActions,
			rightActions,
		},
		addModalVisible,
		setAddModalVisible,
	};
}
