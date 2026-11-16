import type { SwipeRowAction } from '@components/SwipeRow';
import type { SummonsListItemViewModel } from '@models/summons-list';

import { SUMMONS_ACTION_ICONS } from './summonsActionIcons';

const NEUTRAL_VARIANT = 'neutral' as const;

export type SummonsSwipeActionHandlers = {
	onToggleRead: (item: SummonsListItemViewModel) => void;
	onRegisterDeadline: (item: SummonsListItemViewModel) => void;
	onSendEmail: (item: SummonsListItemViewModel) => void;
	onDownload: (item: SummonsListItemViewModel) => void;
	onShare: (item: SummonsListItemViewModel) => void;
	onDelete: (item: SummonsListItemViewModel) => void;
};

export type SummonsSwipeActionsOptions = {
	showRegisterDeadline?: boolean;
};

export function getSummonsSwipeActions(
	item: SummonsListItemViewModel,
	handlers: SummonsSwipeActionHandlers,
	options?: SummonsSwipeActionsOptions,
): SwipeRowAction<SummonsListItemViewModel>[] {
	const markReadLabel = item.isRead
		? 'Marcar como não lido'
		: 'Marcar como lido';

	const showRegisterDeadline = options?.showRegisterDeadline !== false;

	const actions: SwipeRowAction<SummonsListItemViewModel>[] = [
		{
			id: 'toggle-read',
			icon: item.isRead ? 'visibility-off' : 'visibility',
			label: markReadLabel,
			variant: NEUTRAL_VARIANT,
			onPress: () => handlers.onToggleRead(item),
		},
	];

	if (showRegisterDeadline) {
		actions.push({
			id: 'register-deadline',
			icon: 'event',
			label: 'Cadastrar prazo',
			variant: NEUTRAL_VARIANT,
			onPress: () => handlers.onRegisterDeadline(item),
		});
	}

	actions.push(
		{
			id: 'send-email',
			icon: SUMMONS_ACTION_ICONS.sendEmail,
			label: 'Enviar por e-mail',
			variant: NEUTRAL_VARIANT,
			onPress: () => handlers.onSendEmail(item),
		},
		{
			id: 'download',
			icon: 'file-download',
			label: 'Baixar intimação',
			variant: NEUTRAL_VARIANT,
			onPress: () => handlers.onDownload(item),
		},
		{
			id: 'share',
			icon: 'share',
			label: 'Compartilhar',
			variant: NEUTRAL_VARIANT,
			onPress: () => handlers.onShare(item),
		},
		{
			id: 'delete',
			icon: SUMMONS_ACTION_ICONS.delete,
			label: 'Excluir',
			variant: NEUTRAL_VARIANT,
			onPress: () => handlers.onDelete(item),
		},
	);

	return actions;
}
