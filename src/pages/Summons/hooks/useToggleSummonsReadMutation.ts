import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import type { SummonsListItemViewModel } from '@models/summons-list';
import { markSummonsAsRead, unmarkSummonsAsRead } from '@services/summons';

import { SUMMONS_LIST_QUERY_KEY } from './useSummonsInfiniteQuery';

function validateToggleReadInput(item: SummonsListItemViewModel): {
	id: number;
	idMovProcessoCliente: number;
} | null {
	if (item.markAsReadId == null || item.idMovProcessoCliente == null) {
		return null;
	}

	return {
		id: item.markAsReadId,
		idMovProcessoCliente: item.idMovProcessoCliente,
	};
}

export function useToggleSummonsReadMutation() {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (item: SummonsListItemViewModel) => {
			const payload = validateToggleReadInput(item);

			if (payload == null) {
				throw new Error('Missing ids for toggle read status.');
			}

			if (item.isRead) {
				await unmarkSummonsAsRead(payload);
				return { action: 'unmark' as const };
			}

			await markSummonsAsRead(payload);
			return { action: 'mark' as const };
		},
		onSuccess: async data => {
			await queryClient.invalidateQueries({
				queryKey: [...SUMMONS_LIST_QUERY_KEY],
			});

			const message =
				data.action === 'mark'
					? 'Intimação marcada como lida!'
					: 'Intimação marcada como não lida!';

			dispatch(ToastNotifyActions.toastNotifyShow(message, false));
		},
		onError: error => {
			if (
				error instanceof Error &&
				error.message === 'Missing ids for toggle read status.'
			) {
				dispatch(
					ToastNotifyActions.toastNotifyShow(
						'Não foi possível identificar a intimação para alterar a leitura.',
						true,
					),
				);
				return;
			}

			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Não foi possível alterar a situação de leitura da intimação.',
					true,
				),
			);
		},
	});
}
