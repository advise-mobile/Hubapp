import React, { useCallback, useMemo } from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

import { BottomSheet } from '@components/BottomSheet';
import { Button } from '@components/Button';
import type { SummonsDetailActionsModalProps } from '@models/summons-components';
import { SUMMONS_ACTION_ICONS } from '@pages/Summons/config/summonsActionIcons';

import {
	ActionItem,
	ActionItemText,
	ActionsList,
	ButtonsFooter,
} from './styles';

type ActionConfig = {
	id: string;
	icon: string;
	label: string;
	onPress?: () => void;
};

export function SummonsDetailActionsModal({
	visible,
	onClose,
	onModalHide,
	showRegisterDeadline = true,
	onRegisterDeadline,
	onSendEmail,
	onDownload,
	onShare,
	onDelete,
}: SummonsDetailActionsModalProps) {
	const { colors } = useTheme();

	const actions = useMemo<ActionConfig[]>(() => {
		const items: ActionConfig[] = [];

		if (showRegisterDeadline) {
			items.push({
				id: 'register-deadline',
				icon: 'event',
				label: 'Cadastrar prazo',
				onPress: onRegisterDeadline,
			});
		}

		items.push(
			{
				id: 'send-email',
				icon: SUMMONS_ACTION_ICONS.sendEmail,
				label: 'Enviar por email',
				onPress: onSendEmail,
			},
			{
				id: 'download',
				icon: 'file-download',
				label: 'Baixar intimação',
				onPress: onDownload,
			},
			{
				id: 'share',
				icon: 'share',
				label: 'Compartilhar',
				onPress: onShare,
			},
			{
				id: 'delete',
				icon: SUMMONS_ACTION_ICONS.delete,
				label: 'Excluir',
				onPress: onDelete,
			},
		);

		return items;
	}, [
		showRegisterDeadline,
		onRegisterDeadline,
		onSendEmail,
		onDownload,
		onShare,
		onDelete,
	]);

	const CHAINED_ACTION_IDS = new Set(['register-deadline', 'send-email', 'delete']);

	const handleActionPress = useCallback(
		(action: ActionConfig) => {
			if (CHAINED_ACTION_IDS.has(action.id)) {
				action.onPress?.();
				return;
			}

			onClose();
			action.onPress?.();
		},
		[onClose],
	);

	const footer = useMemo(
		() => (
			<ButtonsFooter>
				<Button fill variant="outlined" text="Cancelar" onPress={onClose} />
			</ButtonsFooter>
		),
		[onClose],
	);

	return (
		<BottomSheet
			visible={visible}
			onClose={onClose}
			onModalHide={onModalHide}
			title="O que deseja?"
			maxHeightRatio={0.55}
			footer={footer}
		>
			<ActionsList>
				{actions.map(action => (
					<ActionItem
						key={action.id}
						onPress={() => handleActionPress(action)}
						activeOpacity={0.7}
					>
						<MaterialIcons
							name={action.icon}
							size={22}
							color={colors.fadedBlack}
						/>
						<ActionItemText>{action.label}</ActionItemText>
					</ActionItem>
				))}
			</ActionsList>
		</BottomSheet>
	);
}
