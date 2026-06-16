import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	ListRenderItem,
	Text,
	View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import { fonts } from '@lassets/styles';
import { SwipeRow, SwipeRowProvider } from '@components/SwipeRow';
import { PermissionsGroups, checkPermission } from '@lhelpers/Permissions';
import type { SummonsListItemViewModel } from '@models/summons-list';
import ToastNotifyActions from '@lstore/ducks/ToastNotify';

import { getSummonsSwipeActions } from '../../config/summonsSwipeActions';
import {
	useDeleteSummonsMutation,
	useSummonsPdfDownload,
	useSummonsPdfShare,
	useToggleSummonsReadMutation,
} from '../../hooks';
import { SummonsAddDeadlineModal } from '../../modals/add-deadline';
import { SummonsDeleteConfirmModal } from '../../modals/delete-confirm';
import { SummonsMarkAsReadConfirmModal } from '../../modals/mark-as-read-confirm';
import { SummonsSendEmailModal } from '../../modals/send-email';
import { SummonsDisclaimer } from '../summons-disclaimer';
import { SummonsListItemCard } from '../summons-list-item-card';

export interface SummonsListProps {
	items: SummonsListItemViewModel[];
	isFetchingNextPage: boolean;
	hasNextPage: boolean;
	onEndReached: () => void;
	onItemPress?: (item: SummonsListItemViewModel) => void;
	showEmptyMessage?: boolean;
}

function SummonsListRow({
	item,
	onItemPress,
	onToggleRead,
	onRegisterDeadline,
	onSendEmail,
	onDownload,
	onShare,
	onDelete,
	showRegisterDeadline,
}: {
	item: SummonsListItemViewModel;
	onItemPress?: (item: SummonsListItemViewModel) => void;
	onToggleRead: (item: SummonsListItemViewModel) => void;
	onRegisterDeadline: (item: SummonsListItemViewModel) => void;
	onSendEmail: (item: SummonsListItemViewModel) => void;
	onDownload: (item: SummonsListItemViewModel) => void;
	onShare: (item: SummonsListItemViewModel) => void;
	onDelete: (item: SummonsListItemViewModel) => void;
	showRegisterDeadline: boolean;
}) {
	const actions = useMemo(
		() =>
			getSummonsSwipeActions(
				item,
				{
					onToggleRead,
					onRegisterDeadline,
					onSendEmail,
					onDownload,
					onShare,
					onDelete,
				},
				{ showRegisterDeadline },
			),
		[
			item,
			onDelete,
			onDownload,
			onRegisterDeadline,
			onSendEmail,
			onShare,
			onToggleRead,
			showRegisterDeadline,
		],
	);

	return (
		<SwipeRow item={item} itemKey={item.id} rightActions={actions}>
			<SummonsListItemCard item={item} onPress={onItemPress} />
		</SwipeRow>
	);
}

export function SummonsList({
	items,
	isFetchingNextPage,
	hasNextPage,
	onEndReached,
	onItemPress,
	showEmptyMessage = false,
}: SummonsListProps) {
	const { colors } = useTheme();
	const dispatch = useDispatch();
	const { mutate: toggleRead, isPending: isTogglingRead } =
		useToggleSummonsReadMutation();
	const { mutate: deleteSummons, isPending: isDeleting } =
		useDeleteSummonsMutation();
	const markAsReadConfirmModalRef = useRef<{
		open: () => void;
		close: () => void;
	} | null>(null);
	const deleteConfirmModalRef = useRef<{
		open: () => void;
		close: () => void;
	} | null>(null);
	const downloadItemRef = useRef<SummonsListItemViewModel | null>(null);
	const shareItemRef = useRef<SummonsListItemViewModel | null>(null);

	const [hasSchedulePermission, setHasSchedulePermission] = useState(false);
	const [addDeadlineVisible, setAddDeadlineVisible] = useState(false);
	const [deadlineIdMovProcessoCliente, setDeadlineIdMovProcessoCliente] =
		useState(0);
	const [sendEmailVisible, setSendEmailVisible] = useState(false);
	const [emailIdMovProcessoCliente, setEmailIdMovProcessoCliente] =
		useState(0);
	const [emailItem, setEmailItem] = useState<SummonsListItemViewModel | null>(
		null,
	);
	const [markAsReadItem, setMarkAsReadItem] =
		useState<SummonsListItemViewModel | null>(null);
	const [deleteItem, setDeleteItem] = useState<SummonsListItemViewModel | null>(
		null,
	);

	const promptMarkAsReadIfUnread = useCallback(
		(item: SummonsListItemViewModel | null) => {
			if (item != null && !item.isRead) {
				setMarkAsReadItem(item);
				markAsReadConfirmModalRef.current?.open();
			}
		},
		[],
	);

	const handleDownloadMarkAsReadPrompt = useCallback(() => {
		promptMarkAsReadIfUnread(downloadItemRef.current);
		downloadItemRef.current = null;
	}, [promptMarkAsReadIfUnread]);

	const handleShareMarkAsReadPrompt = useCallback(() => {
		promptMarkAsReadIfUnread(shareItemRef.current);
		shareItemRef.current = null;
	}, [promptMarkAsReadIfUnread]);

	const { downloadPdf, isDownloading } = useSummonsPdfDownload({
		promptMarkAsReadIfUnread: true,
		onMarkAsReadPrompt: handleDownloadMarkAsReadPrompt,
	});

	const { sharePdf, isSharing } = useSummonsPdfShare({
		promptMarkAsReadIfUnread: true,
		onMarkAsReadPrompt: handleShareMarkAsReadPrompt,
	});

	useEffect(() => {
		let mounted = true;

		checkPermission(PermissionsGroups.SCHEDULE)
			.then(hasPermission => {
				if (mounted) {
					setHasSchedulePermission(hasPermission);
				}
			})
			.catch(() => {
				if (mounted) {
					setHasSchedulePermission(false);
				}
			});

		return () => {
			mounted = false;
		};
	}, []);

	const handleToggleRead = useCallback(
		(item: SummonsListItemViewModel) => {
			toggleRead(item);
		},
		[toggleRead],
	);

	const handleRegisterDeadline = useCallback(
		(item: SummonsListItemViewModel) => {
			if (item.idMovProcessoCliente == null) {
				dispatch(
					ToastNotifyActions.toastNotifyShow(
						'Não foi possível identificar a intimação para cadastrar o prazo.',
						true,
					),
				);
				return;
			}

			setDeadlineIdMovProcessoCliente(item.idMovProcessoCliente);
			setAddDeadlineVisible(true);
		},
		[dispatch],
	);

	const closeAddDeadlineModal = useCallback(() => {
		setAddDeadlineVisible(false);
	}, []);

	const handleSendEmail = useCallback(
		(item: SummonsListItemViewModel) => {
			if (item.idMovProcessoCliente == null) {
				dispatch(
					ToastNotifyActions.toastNotifyShow(
						'Não foi possível identificar a intimação para enviar por email.',
						true,
					),
				);
				return;
			}

			setEmailItem(item);
			setEmailIdMovProcessoCliente(item.idMovProcessoCliente);
			setSendEmailVisible(true);
		},
		[dispatch],
	);

	const closeSendEmailModal = useCallback(() => {
		setSendEmailVisible(false);
		setEmailItem(null);
	}, []);

	const handleSendEmailSuccess = useCallback(() => {
		promptMarkAsReadIfUnread(emailItem);
		setEmailItem(null);
	}, [emailItem, promptMarkAsReadIfUnread]);

	const handleDownload = useCallback(
		(item: SummonsListItemViewModel) => {
			if (item.idMovProcessoCliente == null) {
				dispatch(
					ToastNotifyActions.toastNotifyShow(
						'Não foi possível identificar a intimação para download.',
						true,
					),
				);
				return;
			}

			if (isDownloading || isSharing) {
				return;
			}

			downloadItemRef.current = item;
			downloadPdf(item.idMovProcessoCliente, {
				onError: () => {
					downloadItemRef.current = null;
				},
			});
		},
		[dispatch, downloadPdf, isDownloading, isSharing],
	);

	const handleShare = useCallback(
		(item: SummonsListItemViewModel) => {
			if (item.idMovProcessoCliente == null) {
				dispatch(
					ToastNotifyActions.toastNotifyShow(
						'Não foi possível identificar a intimação para compartilhar.',
						true,
					),
				);
				return;
			}

			if (isSharing || isDownloading) {
				return;
			}

			shareItemRef.current = item;
			sharePdf(item.idMovProcessoCliente, {
				onError: () => {
					shareItemRef.current = null;
				},
			});
		},
		[dispatch, isDownloading, isSharing, sharePdf],
	);

	const handleDelete = useCallback(
		(item: SummonsListItemViewModel) => {
			if (
				item.idPastaUsuarioCliente == null ||
				item.idMovProcessoCliente == null
			) {
				dispatch(
					ToastNotifyActions.toastNotifyShow(
						'Não foi possível identificar a intimação para excluir.',
						true,
					),
				);
				return;
			}

			setDeleteItem(item);
			deleteConfirmModalRef.current?.open();
		},
		[dispatch],
	);

	const handleDeleteCancel = useCallback(() => {
		deleteConfirmModalRef.current?.close();
		setDeleteItem(null);
	}, []);

	const handleDeleteConfirm = useCallback(() => {
		if (
			deleteItem?.idPastaUsuarioCliente == null ||
			deleteItem?.idMovProcessoCliente == null
		) {
			return;
		}

		deleteSummons(
			{
				idPastaUsuarioCliente: deleteItem.idPastaUsuarioCliente,
				idMovimentoProcessoCliente: deleteItem.idMovProcessoCliente,
			},
			{
				onSuccess: () => {
					deleteConfirmModalRef.current?.close();
					setDeleteItem(null);
				},
			},
		);
	}, [deleteItem, deleteSummons]);

	const handleMarkAsReadCancel = useCallback(() => {
		markAsReadConfirmModalRef.current?.close();
		setMarkAsReadItem(null);
	}, []);

	const handleMarkAsReadConfirm = useCallback(() => {
		if (markAsReadItem == null) {
			return;
		}

		toggleRead(markAsReadItem, {
			onSuccess: () => {
				markAsReadConfirmModalRef.current?.close();
				setMarkAsReadItem(null);
			},
		});
	}, [markAsReadItem, toggleRead]);

	const keyExtractor = useCallback(
		(item: SummonsListItemViewModel) => item.id,
		[],
	);

	const renderItem: ListRenderItem<SummonsListItemViewModel> = useCallback(
		({ item }) => (
			<SummonsListRow
				item={item}
				onItemPress={onItemPress}
				onToggleRead={handleToggleRead}
				onRegisterDeadline={handleRegisterDeadline}
				onSendEmail={handleSendEmail}
				onDownload={handleDownload}
				onShare={handleShare}
				onDelete={handleDelete}
				showRegisterDeadline={hasSchedulePermission}
			/>
		),
		[
			handleDelete,
			handleDownload,
			handleRegisterDeadline,
			handleSendEmail,
			handleShare,
			handleToggleRead,
			hasSchedulePermission,
			onItemPress,
		],
	);

	const listHeader = useMemo(() => <SummonsDisclaimer />, []);

	const itemSeparator = useMemo(
		() => (
			<View
				style={{
					height: 1,
					width: '100%',
					backgroundColor: colors.borderLight,
				}}
			/>
		),
		[colors.borderLight],
	);

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

	const handleEndReached = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage) {
			onEndReached();
		}
	}, [hasNextPage, isFetchingNextPage, onEndReached]);

	const listEmpty = useMemo(
		() =>
			showEmptyMessage ? (
				<View
					style={{
						flex: 1,
						paddingVertical: 48,
						paddingHorizontal: 24,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text
						style={{
							fontFamily: String(fonts.circularStdBook),
							fontSize: Number(fonts.regular),
							color: colors.grayLight,
							textAlign: 'center',
						}}
					>
						Nenhuma intimação encontrada.
					</Text>
				</View>
			) : null,
		[colors.grayLight, showEmptyMessage],
	);

	return (
		<SwipeRowProvider>
			<FlatList
				data={items}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				ListHeaderComponent={listHeader}
				ItemSeparatorComponent={itemSeparator}
				ListFooterComponent={listFooter}
				ListEmptyComponent={listEmpty}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.35}
				contentContainerStyle={{
					paddingBottom: 32,
					flexGrow: 1,
				}}
				showsVerticalScrollIndicator={false}
			/>
			<SummonsAddDeadlineModal
				visible={addDeadlineVisible}
				onClose={closeAddDeadlineModal}
				idMovProcessoCliente={deadlineIdMovProcessoCliente}
			/>
			<SummonsSendEmailModal
				visible={sendEmailVisible}
				onClose={closeSendEmailModal}
				idMovProcessoCliente={emailIdMovProcessoCliente}
				onSuccess={handleSendEmailSuccess}
			/>
			<SummonsMarkAsReadConfirmModal
				ref={markAsReadConfirmModalRef}
				loading={isTogglingRead}
				onCancel={handleMarkAsReadCancel}
				onSubmit={handleMarkAsReadConfirm}
			/>
			<SummonsDeleteConfirmModal
				ref={deleteConfirmModalRef}
				loading={isDeleting}
				onCancel={handleDeleteCancel}
				onSubmit={handleDeleteConfirm}
			/>
		</SwipeRowProvider>
	);
}
