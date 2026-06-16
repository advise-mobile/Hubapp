import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import { Header, type HeaderActionConfig } from '@components/Header';
import { LoadingView } from '@components/LoadingView';
import { Container, Warp } from '@lassets/styles/global';
import { PermissionsGroups, checkPermission } from '@lhelpers/Permissions';
import type { SummonsStackParamList } from '@navigation/paramLists';
import ToastNotifyActions from '@lstore/ducks/ToastNotify';

import { useSummonsDetailQuery, useSummonsPdfDownload } from '../hooks';
import { SummonsAddDeadlineModal } from '../modals/add-deadline';
import { SummonsDetailActionsModal } from '../modals/actions';
import { SummonsSendEmailModal } from '../modals/send-email';
import { SummonsDetailUI } from './ui';

type SummonsDetailRouteProp = RouteProp<SummonsStackParamList, 'SummonsDetail'>;

export default function SummonsDetail() {
	const navigation =
		useNavigation<StackNavigationProp<SummonsStackParamList>>();
	const route = useRoute<SummonsDetailRouteProp>();
	const params = route.params;
	const dispatch = useDispatch();

	const { detail, isLoading } = useSummonsDetailQuery(params);
	const { downloadPdf, isDownloading } = useSummonsPdfDownload();

	const [actionsModalVisible, setActionsModalVisible] = useState(false);
	const [addDeadlineVisible, setAddDeadlineVisible] = useState(false);
	const [sendEmailVisible, setSendEmailVisible] = useState(false);
	const [hasSchedulePermission, setHasSchedulePermission] = useState(false);
	const pendingAddDeadlineRef = useRef(false);
	const pendingSendEmailRef = useRef(false);

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

	const openActionsModal = useCallback(() => {
		setActionsModalVisible(true);
	}, []);

	const closeActionsModal = useCallback(() => {
		setActionsModalVisible(false);
	}, []);

	const closeAddDeadlineModal = useCallback(() => {
		setAddDeadlineVisible(false);
	}, []);

	const closeSendEmailModal = useCallback(() => {
		setSendEmailVisible(false);
	}, []);

	const handleRegisterDeadline = useCallback(() => {
		if (params?.idMovProcessoCliente == null) {
			closeActionsModal();
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Não foi possível identificar a intimação para cadastrar o prazo.',
					true,
				),
			);
			return;
		}

		pendingAddDeadlineRef.current = true;
		closeActionsModal();
	}, [closeActionsModal, dispatch, params?.idMovProcessoCliente]);

	const handleSendEmail = useCallback(() => {
		if (params?.idMovProcessoCliente == null) {
			closeActionsModal();
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Não foi possível identificar a intimação para enviar por email.',
					true,
				),
			);
			return;
		}

		pendingSendEmailRef.current = true;
		closeActionsModal();
	}, [closeActionsModal, dispatch, params?.idMovProcessoCliente]);

	const handleDownload = useCallback(() => {
		if (params?.idMovProcessoCliente == null) {
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Não foi possível identificar a intimação para download.',
					true,
				),
			);
			return;
		}

		if (isDownloading) {
			return;
		}

		downloadPdf(params.idMovProcessoCliente);
	}, [dispatch, downloadPdf, isDownloading, params?.idMovProcessoCliente]);

	const handleActionsModalHide = useCallback(() => {
		if (pendingAddDeadlineRef.current) {
			pendingAddDeadlineRef.current = false;
			setAddDeadlineVisible(true);
			return;
		}

		if (pendingSendEmailRef.current) {
			pendingSendEmailRef.current = false;
			setSendEmailVisible(true);
		}
	}, []);

	const goBack = useCallback(() => {
		navigation.goBack();
	}, [navigation]);

	useEffect(() => {
		if (params?.idMovProcUsuarioCliente == null) {
			goBack();
		}
	}, [goBack, params?.idMovProcUsuarioCliente]);

	const headerTitle = useMemo(
		() => detail?.title ?? 'Intimação',
		[detail?.title],
	);

	const leftActions: HeaderActionConfig[] = useMemo(
		() => [{ icon: 'arrow-back', onPress: goBack }],
		[goBack],
	);

	const rightActions: HeaderActionConfig[] = useMemo(
		() => [{ icon: 'more-vert', onPress: openActionsModal }],
		[openActionsModal],
	);

	if (params?.idMovProcUsuarioCliente == null) {
		return null;
	}

	const idMovProcessoCliente = params.idMovProcessoCliente ?? 0;

	return (
		<Container>
			<Warp>
				<Header
					title={headerTitle}
					leftActions={leftActions}
					rightActions={rightActions}
				/>
				{isLoading ? (
					<LoadingView height="50" />
				) : detail ? (
					<SummonsDetailUI viewModel={detail} />
				) : null}
				<SummonsDetailActionsModal
					visible={actionsModalVisible}
					onClose={closeActionsModal}
					onModalHide={handleActionsModalHide}
					showRegisterDeadline={hasSchedulePermission}
					onRegisterDeadline={handleRegisterDeadline}
					onSendEmail={handleSendEmail}
					onDownload={handleDownload}
				/>
				<SummonsAddDeadlineModal
					visible={addDeadlineVisible}
					onClose={closeAddDeadlineModal}
					idMovProcessoCliente={idMovProcessoCliente}
				/>
				<SummonsSendEmailModal
					visible={sendEmailVisible}
					onClose={closeSendEmailModal}
					idMovProcessoCliente={idMovProcessoCliente}
				/>
			</Warp>
		</Container>
	);
}
