import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	ListRenderItem,
	Text,
} from 'react-native';
import { useTheme } from 'styled-components';

import { Container, Warp } from '@lassets/styles/global';
import ConfirmModal from '@components/ConfirmModal';
import { Header } from '@components/Header';
import { fonts } from '@lassets/styles';
import type { CourtsRegistrationsAppliedFilters } from '@models/court-registrations-filters';
import type { CourtRegisterListItem } from '@models/court-register';
import {
	useCourtsAccessCreditQuery,
	useCourtsHeader,
	useCourtsRegistrationsInfiniteQuery,
	useActivateCourtRegistrationMutation,
	useDeleteCourtRegistrationMutation,
	useInactivateCourtRegistrationMutation,
} from './hooks';

import { CardAccessAvailable } from './components/CardAccessAvailable';
import { CardRegisterData } from './components/CardRegisterData';
import { Content } from './styles';
import { AddCourtsModal } from './Modal/AddCourts';
import { CourtsFilterModal } from './Modal/Filter';

export default function Courts() {
	const { colors } = useTheme();
	const {
		headerProps,
		addModalVisible,
		setAddModalVisible,
		filterModalVisible,
		setFilterModalVisible,
		filters: registrationsFilters,
		setFilters: setRegistrationsFilters,
	} = useCourtsHeader();

	const {
		contractedCountDisplayText,
		usedCountDisplayText,
		isAwaitingFirstResult: isCreditLoading,
	} = useCourtsAccessCreditQuery(true);

	const {
		items: registrationItems,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isPending: isRegistrationsPending,
	} = useCourtsRegistrationsInfiniteQuery(true, registrationsFilters);

	const { mutate: inactivateRegistration, isPending: isInactivating, variables: inactivatingId } =
		useInactivateCourtRegistrationMutation();
	const { mutate: activateRegistration, isPending: isActivating, variables: activatingId } =
		useActivateCourtRegistrationMutation();
	const {
		mutate: deleteRegistration,
		isPending: isDeletingRegistration,
		variables: deletingRegistrationId,
	} = useDeleteCourtRegistrationMutation();

	const deleteConfirmModalRef = useRef<{ open: () => void; close: () => void } | null>(
		null,
	);
	const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

	const handleCloseAdd = useCallback(
		() => setAddModalVisible(false),
		[setAddModalVisible],
	);

	const handleCloseFilter = useCallback(
		() => setFilterModalVisible(false),
		[setFilterModalVisible],
	);

	const handleApplyRegistrationsFilters = useCallback(
		(next: CourtsRegistrationsAppliedFilters) => {
			setRegistrationsFilters(next);
		},
		[setRegistrationsFilters],
	);

	const handleDeleteModalCancel = useCallback(() => {
		deleteConfirmModalRef.current?.close();
		setPendingDeleteId(null);
	}, []);

	const handleDeletePress = useCallback((idPesqIntimacao: number | undefined) => {
		if (idPesqIntimacao == null) return;
		setPendingDeleteId(idPesqIntimacao);
		deleteConfirmModalRef.current?.open();
	}, []);

	const handleDeleteModalSubmit = useCallback(() => {
		if (pendingDeleteId == null) return;
		deleteRegistration(pendingDeleteId, {
			onSuccess: () => {
				deleteConfirmModalRef.current?.close();
				setPendingDeleteId(null);
			},
		});
	}, [pendingDeleteId, deleteRegistration]);

	const listHeader = useMemo(
		() => (
			<CardAccessAvailable
				contractedCountDisplayText={contractedCountDisplayText}
				usedCountDisplayText={usedCountDisplayText}
				isValuesLoading={isCreditLoading}
			/>
		),
		[contractedCountDisplayText, usedCountDisplayText, isCreditLoading],
	);

	const renderItem: ListRenderItem<CourtRegisterListItem> = useCallback(
		({ item }) => (
			<CardRegisterData
				responsible={item.responsible}
				courtAbbreviation={item.courtAbbreviation}
				system={item.system}
				accessLogin={item.accessLogin}
				situationMessage={item.situationMessage}
				situationTextColor={item.situationTextColor}
				isActive={item.isActive}
				idPesqIntimacao={item.idPesqIntimacao}
				isInactivating={
					isInactivating && inactivatingId === item.idPesqIntimacao
				}
				isActivating={
					isActivating && activatingId === item.idPesqIntimacao
				}
				onActiveChange={next => {
					if (item.idPesqIntimacao == null) return;
					if (item.isActive && !next) {
						inactivateRegistration(item.idPesqIntimacao);
						return;
					}
					if (!item.isActive && next) {
						activateRegistration(item.idPesqIntimacao);
					}
				}}
				isDeleting={
					isDeletingRegistration &&
					deletingRegistrationId === item.idPesqIntimacao
				}
				onDeletePress={() => handleDeletePress(item.idPesqIntimacao)}
			/>
		),
		[
			activateRegistration,
			activatingId,
			deletingRegistrationId,
			handleDeletePress,
			inactivateRegistration,
			inactivatingId,
			isActivating,
			isDeletingRegistration,
			isInactivating,
		],
	);

	const deleteConfirmationModal = useMemo(
		() => (
			<ConfirmModal
				ref={deleteConfirmModalRef}
				onCancel={handleDeleteModalCancel}
				onSubmit={handleDeleteModalSubmit}
				cancelText="Cancelar"
				submitText="Sim, quero excluir"
				title="Deseja excluir?"
				description="Ao excluir este cadastro, você remove o acesso configurado para o tribunal. A ação de excluir é definitiva e irreversível."
				loading={isDeletingRegistration}
				maxHeight={250}
			/>
		),
		[
			handleDeleteModalCancel,
			handleDeleteModalSubmit,
			isDeletingRegistration,
		],
	);

	const keyExtractor = useCallback(
		(item: CourtRegisterListItem, index: number) =>
			item.registerId != null
				? `registration-${item.registerId}`
				: `registration-${item.accessLogin}-${item.courtAbbreviation}-${index}`,
		[],
	);

	const handleEndReached = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	const listFooter = useMemo(
		() =>
			isFetchingNextPage ? (
				<ActivityIndicator
					style={{ paddingVertical: 20 }}
					color={colors.primary}
				/>
			) : null,
		[isFetchingNextPage, colors.primary],
	);

	const listEmpty = useMemo(() => {
		if (isRegistrationsPending) {
			return (
				<ActivityIndicator
					style={{ marginTop: 32 }}
					color={colors.primary}
				/>
			);
		}
		return (
			<Text
				style={{
					marginTop: 32,
					textAlign: 'center',
					fontFamily: String(fonts.circularStdBook),
					fontSize: Number(fonts.small),
					color: colors.grayLight,
				}}
			>
				Nenhum cadastro encontrado.
			</Text>
		);
	}, [colors.grayLight, colors.primary, isRegistrationsPending]);

	return (
		<Container>
			<Warp>
				<Header
					title={headerProps.title}
					leftActions={headerProps.leftActions}
					rightActions={headerProps.rightActions}
				/>
				<Content>
					<FlatList
						data={registrationItems}
						keyExtractor={keyExtractor}
						renderItem={renderItem}
						ListHeaderComponent={listHeader}
						ListFooterComponent={listFooter}
						ListEmptyComponent={listEmpty}
						onEndReached={handleEndReached}
						onEndReachedThreshold={0.35}
						contentContainerStyle={{
							paddingTop: 8,
							paddingBottom: 32,
							flexGrow: 1,
						}}
						showsVerticalScrollIndicator={false}
					/>
				</Content>
				<AddCourtsModal visible={addModalVisible} onClose={handleCloseAdd} />
				<CourtsFilterModal
					visible={filterModalVisible}
					onClose={handleCloseFilter}
					initialFilters={registrationsFilters}
					onApply={handleApplyRegistrationsFilters}
				/>
				{deleteConfirmationModal}
			</Warp>
		</Container>
	);
}
