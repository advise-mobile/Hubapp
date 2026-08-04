import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import type { SummonsListItemViewModel } from '@models/summons-list';

import { Header, type HeaderActionConfig } from '@components/Header';
import { LoadingView } from '@components/LoadingView';
import { Container, Warp } from '@lassets/styles/global';
import HasNotPermission from '@lcomponents/HasNotPermission';
import { PermissionsGroups, checkPermission } from '@lhelpers/Permissions';
import type { SummonsStackParamList } from '@navigation/paramLists';

import { AddCourtsModal } from '../Courts/modals/add-courts';
import { SummonsList } from './components/summons-list';
import {
	useSummonsHeader,
	useSummonsHeaderFilters,
	useSummonsInfiniteQuery,
} from './hooks';
import { SummonsFilterModal } from './modals/filter';
import { Content } from './styles';
import { SummonsUI } from './ui';

type PermissionState = 'loading' | 'allowed' | 'denied';

export default function Summons() {
	const navigation =
		useNavigation<StackNavigationProp<SummonsStackParamList>>();
	const route = useRoute();
	const theme = useTheme();
	const { colors } = theme;

	const imagePermissionDenied = useMemo(
		() =>
			theme.name === 'dark'
				? require('assets/images/permissions/summons_black.png')
				: require('assets/images/permissions/summons_white.png'),
		[theme.name],
	);

	const imageEmptyOnboarding = useMemo(
		() =>
			theme.name === 'dark'
				? require('assets/images/not_found_white.png')
				: require('assets/images/not_found.png'),
		[theme.name],
	);

	const imageEmptyFiltered = useMemo(
		() =>
			theme.name === 'dark'
				? require('assets/images/not_found/movements_white.png')
				: require('assets/images/not_found/movements.png'),
		[theme.name],
	);

	const [permissionState, setPermissionState] =
		useState<PermissionState>('loading');

	const listEnabled = permissionState === 'allowed';

	const {
		filters,
		applyFilters,
		closeFilterModal,
		filterModalVisible,
		openFilterModal,
		activeFiltersCount,
	} = useSummonsHeaderFilters();

	const {
		items: summonsListItems,
		isAwaitingFirstResult,
		isError: isListError,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useSummonsInfiniteQuery(listEnabled, filters);

	const filterInteractive = !isAwaitingFirstResult && !isListError;

	const filterLeftActions: HeaderActionConfig[] = useMemo(
		() =>
			filterInteractive
				? [{ icon: 'filter-list', onPress: openFilterModal }]
				: [],
		[filterInteractive, openFilterModal],
	);

	const { headerProps, addModalVisible, setAddModalVisible } = useSummonsHeader();

	useEffect(() => {
		let mounted = true;

		const runPermissionCheck = async () => {
			try {
				const hasPermission = await checkPermission(PermissionsGroups.SUMMONS);
				if (mounted) {
					setPermissionState(hasPermission ? 'allowed' : 'denied');
				}
			} catch {
				if (mounted) {
					setPermissionState('denied');
				}
			}
		};

		runPermissionCheck();

		return () => {
			mounted = false;
		};
	}, []);

	const handleCloseAdd = useCallback(
		() => setAddModalVisible(false),
		[setAddModalVisible],
	);

	const handleEndReached = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	const navigateCourtsList = useCallback(() => {
		navigation.navigate('CourtsList');
	}, [navigation]);

	const handleItemPress = useCallback(
		(item: SummonsListItemViewModel) => {
			if (item.idMovProcUsuarioCliente == null) {
				return;
			}

			navigation.navigate('SummonsDetail', {
				idMovProcUsuarioCliente: item.idMovProcUsuarioCliente,
				flLido: item.isRead,
				markAsReadId: item.markAsReadId,
				idMovProcessoCliente: item.idMovProcessoCliente,
				idPastaUsuarioCliente: item.idPastaUsuarioCliente,
			});
		},
		[navigation],
	);

	const rightActions: HeaderActionConfig[] = useMemo(
		() => [
			...headerProps.rightActions,
			...(summonsListItems.length > 0 || activeFiltersCount > 0
				? [
						{
							icon: 'assignment',
							colorIcon: colors.black,
							onPress: navigateCourtsList,
						},
				  ]
				: []),
		],
		[
			activeFiltersCount,
			colors.black,
			headerProps.rightActions,
			navigateCourtsList,
			summonsListItems.length,
		],
	);

	const showEmptyOnboarding = useMemo(
		() =>
			isListError ||
			(!isAwaitingFirstResult &&
				summonsListItems.length === 0 &&
				activeFiltersCount === 0),
		[
			activeFiltersCount,
			isAwaitingFirstResult,
			isListError,
			summonsListItems.length,
		],
	);

	if (route.name !== 'Summons') {
		return null;
	}

	if (permissionState === 'loading') {
		return (
			<Container>
				<LoadingView height="auto" />
			</Container>
		);
	}

	if (permissionState === 'denied') {
		return (
			<Container>
				<HasNotPermission
					image={imagePermissionDenied}
					title="Receba intimações oficiais com rapidez e segurança!"
					body="Acompanhe prazos, evite perdas de comunicação oficial e tenha mais controle sobre suas obrigações processuais."
				/>
			</Container>
		);
	}

	return (
		<Container>
			<Warp>
				<Header
					title={headerProps.title}
					leftActions={filterInteractive ? filterLeftActions : []}
					rightActions={rightActions}
				/>
				{isAwaitingFirstResult ? (
					<LoadingView height="50" />
				) : showEmptyOnboarding ? (
					<SummonsUI
						imageNotFound={imageEmptyOnboarding}
						onPress={() => setAddModalVisible(true)}
					/>
				) : (
					<Content>
						<SummonsList
							items={summonsListItems}
							isFetchingNextPage={isFetchingNextPage}
							hasNextPage={hasNextPage ?? false}
							onEndReached={handleEndReached}
							onItemPress={handleItemPress}
							showEmptyMessage={summonsListItems.length === 0}
							emptyStateImage={imageEmptyFiltered}
						/>
					</Content>
				)}
				<SummonsFilterModal
					visible={filterModalVisible}
					onClose={closeFilterModal}
					onApply={applyFilters}
					initialFilters={filters}
				/>
				<AddCourtsModal visible={addModalVisible} onClose={handleCloseAdd} />
			</Warp>
		</Container>
	);
}
