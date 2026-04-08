import React, { useCallback, useEffect, useState } from 'react';

import { PermissionsGroups, checkPermission } from '@lhelpers/Permissions';
import HasNotPermission from '@lcomponents/HasNotPermission';
import Spinner from '@lcomponents/Spinner';
import { useSummonsListAccessQuery } from '@services/hooks/Summons/useSummonsListAccessQuery';
import { useTheme } from 'styled-components';
import { Container, Warp } from '@lassets/styles/global';
import { Header } from '@components/Header';
import {
	useSummonsHeader,
	type SummonsFilters,
} from './hooks/useSummonsHeader';
import { SummonsFilterModal } from './Modal/Filter';
import { AddCourtsModal } from '../Courts/Modal/AddCourts';
import { Content, ListPlaceholderText } from './styles';
import { SummonsUI } from './ui';

type PermissionState = 'loading' | 'allowed' | 'denied';

export default function Summons() {
	const colorUseTheme = useTheme();
	const imagePermissionDenied =
		colorUseTheme.name === 'dark'
			? require('assets/images/permissions/summons_black.png')
			: require('assets/images/permissions/summons_white.png');

	const imageNotFound =
		colorUseTheme.name === 'dark'
			? require('assets/images/not_found_white.png')
			: require('assets/images/not_found.png');

	const [permissionState, setPermissionState] =
		useState<PermissionState>('loading');

	const {
		headerProps,
		filterModalVisible,
		setFilterModalVisible,
		addModalVisible,
		setAddModalVisible,
		filters,
		setFilters,
	} = useSummonsHeader();

	const listAccessEnabled = permissionState === 'allowed';
	const {
		isAwaitingFirstResult,
		isError: isListAccessError,
		items: summonsListItems,
	} = useSummonsListAccessQuery(listAccessEnabled);

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

	const handleCloseFilter = useCallback(
		() => setFilterModalVisible(false),
		[setFilterModalVisible],
	);
	const handleApplyFilter = useCallback(
		(newFilters: SummonsFilters) => {
			setFilters(newFilters);
			setFilterModalVisible(false);
		},
		[setFilters, setFilterModalVisible],
	);

	const handleCloseAdd = useCallback(
		() => setAddModalVisible(false),
		[setAddModalVisible],
	);
	if (permissionState === 'loading') {
		return (
			<Container>
				<Spinner height="auto" />
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

	const showEmptyOnboarding =
		isListAccessError || summonsListItems.length === 0;

	return (
		<Container>
			<Warp>
				<Header
					title={headerProps.title}
					leftActions={headerProps.leftActions}
					rightActions={headerProps.rightActions}
				/>
				{isAwaitingFirstResult ? (
					<Container style={{ alignItems: 'center', justifyContent: 'center' }}>
						<Spinner height="50" />
					</Container>
				) : showEmptyOnboarding ? (
					<SummonsUI
						imageNotFound={imageNotFound}
						onPress={() => setAddModalVisible(true)}
					/>
				) : (
					<Content>
						<ListPlaceholderText>Tem intimações.</ListPlaceholderText>
					</Content>
				)}
				<SummonsFilterModal
					visible={filterModalVisible}
					onClose={handleCloseFilter}
					onApply={handleApplyFilter}
					initialFilters={filters}
				/>
				<AddCourtsModal visible={addModalVisible} onClose={handleCloseAdd} />
			</Warp>
		</Container>
	);
}
