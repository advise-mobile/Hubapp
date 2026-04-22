import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { HeaderActionConfig } from '@components/Header';
import { useTheme } from 'styled-components';

import {
	DEFAULT_COURTS_REGISTRATIONS_FILTERS,
	type CourtsRegistrationsAppliedFilters,
} from '@models/court-registrations-filters';
import type { UseCourtsHeaderReturn } from '@models/courts-hooks-types';

import type { SummonsStackParamList } from '../../../navigation/paramLists';

const DEFAULT_TITLE = 'Cadastros';

export function useCourtsHeader(): UseCourtsHeaderReturn {
	const navigation =
		useNavigation<StackNavigationProp<SummonsStackParamList>>();
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

	const [filterModalVisible, setFilterModalVisible] = useState(false);
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [filters, setFilters] = useState<CourtsRegistrationsAppliedFilters>(
		DEFAULT_COURTS_REGISTRATIONS_FILTERS,
	);

	const goBack = useCallback(() => {
		navigation.goBack();
	}, [navigation]);

	const openFilterModal = useCallback(() => setFilterModalVisible(true), []);
	const openAddModal = useCallback(() => setAddModalVisible(true), []);

	const leftActions: HeaderActionConfig[] = [
		{ icon: 'arrow-back', onPress: goBack },
	];

	// Direita: add (igual ao Summons) e, à direita dele, filtro (no Summons o filtro estava à esquerda)
	const rightActions: HeaderActionConfig[] = [
		{ icon: 'add-circle', colorIcon: colors.green200, onPress: openAddModal },
		{ icon: 'filter-list', onPress: openFilterModal },
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
