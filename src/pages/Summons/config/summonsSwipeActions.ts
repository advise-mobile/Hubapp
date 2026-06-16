import { Alert } from 'react-native';

import type { SwipeRowAction } from '@components/SwipeRow';
import type { SummonsListItemViewModel } from '@models/summons-list';

const NEUTRAL_VARIANT = 'neutral' as const;

function showActionAlert(title: string) {
	Alert.alert(title, `${title}. Esta ação será implementada em breve.`);
}

export type SummonsSwipeActionHandlers = {
	onToggleRead: (item: SummonsListItemViewModel) => void;
};

export function getSummonsSwipeActions(
	item: SummonsListItemViewModel,
	handlers: SummonsSwipeActionHandlers,
): SwipeRowAction<SummonsListItemViewModel>[] {
	const markReadLabel = item.isRead
		? 'Marcar como não lido'
		: 'Marcar como lido';

	return [
		{
			id: 'toggle-read',
			icon: item.isRead ? 'visibility-off' : 'visibility',
			label: markReadLabel,
			variant: NEUTRAL_VARIANT,
			onPress: () => handlers.onToggleRead(item),
		},
		{
			id: 'register-deadline',
			icon: 'event',
			label: 'Cadastrar prazo',
			variant: NEUTRAL_VARIANT,
			onPress: () => showActionAlert('Cadastrar prazo'),
		},
		{
			id: 'send-email',
			icon: 'mail-outline',
			label: 'Enviar por e-mail',
			variant: NEUTRAL_VARIANT,
			onPress: () => showActionAlert('Enviar por e-mail'),
		},
		{
			id: 'download',
			icon: 'file-download',
			label: 'Baixar intimação',
			variant: NEUTRAL_VARIANT,
			onPress: () => showActionAlert('Baixar intimação'),
		},
		{
			id: 'share',
			icon: 'share',
			label: 'Compartilhar',
			variant: NEUTRAL_VARIANT,
			onPress: () => showActionAlert('Compartilhar'),
		},
		{
			id: 'delete',
			icon: 'delete-outline',
			label: 'Excluir',
			variant: NEUTRAL_VARIANT,
			onPress: () => showActionAlert('Excluir'),
		},
	];
}
