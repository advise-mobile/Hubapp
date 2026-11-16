import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import type { CreateLinkedDeadlineInput } from '@models/summons-deadline';
import { createLinkedDeadline } from '@services/deadlines';

import { SUMMONS_DETAIL_QUERY_KEY } from './useSummonsDetailQuery';
import { SUMMONS_LIST_QUERY_KEY } from './useSummonsInfiniteQuery';

export function useCreateSummonsDeadlineMutation() {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateLinkedDeadlineInput) =>
			createLinkedDeadline(input),
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: [...SUMMONS_DETAIL_QUERY_KEY],
				}),
				queryClient.invalidateQueries({
					queryKey: [...SUMMONS_LIST_QUERY_KEY],
				}),
			]);

			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Prazo adicionado com sucesso!',
					false,
				),
			);
		},
		onError: () => {
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Não foi possível cadastrar o prazo',
					true,
				),
			);
		},
	});
}
