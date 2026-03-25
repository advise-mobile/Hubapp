import React, { useCallback, useEffect, useState } from 'react';

import { PermissionsGroups, checkPermission } from '@lhelpers/Permissions';
import HasNotPermission from '@lcomponents/HasNotPermission';
import Spinner from '@lcomponents/Spinner';
import { useTheme } from 'styled-components';

import { Container, Warp } from '@lassets/styles/global';
import { Header } from '@components/Header';

import {
	useSummonsHeader,
	type SummonsFilters,
} from './hooks/useSummonsHeader';
import { SummonsFilterModal } from './Modal/Filter';
import { AddTribunalModal } from './Modal/AddTribunal';
import { SummonsUI } from './ui';

type PermissionState = 'loading' | 'allowed' | 'denied';

export default function Summons() {
	const colorUseTheme = useTheme();
	const image =
		colorUseTheme.name === 'dark'
			? require('assets/images/permissions/summons_black.png')
			: require('assets/images/permissions/summons_white.png');

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
	const handleSaveTribunal = useCallback(
		(_data: Record<string, unknown>) => {
			// TODO: integrar com API / estado da lista
			setAddModalVisible(false);
		},
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
					image={image}
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
					leftActions={headerProps.leftActions}
					rightActions={headerProps.rightActions}
				/>
				<SummonsUI title="Intimações" />
				<SummonsFilterModal
					visible={filterModalVisible}
					onClose={handleCloseFilter}
					onApply={handleApplyFilter}
					initialFilters={filters}
				/>
				<AddTribunalModal
					visible={addModalVisible}
					onClose={handleCloseAdd}
					onSave={handleSaveTribunal}
				/>
			</Warp>
		</Container>
	);
}
