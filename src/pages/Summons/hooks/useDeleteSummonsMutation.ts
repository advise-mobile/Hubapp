import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import type { DeleteSummonsInput } from '@models/summons-delete';
import { deleteSummons } from '@services/summons';

import { SUMMONS_LIST_QUERY_KEY } from './useSummonsInfiniteQuery';

export function useDeleteSummonsMutation() {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: DeleteSummonsInput) => deleteSummons(input),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [...SUMMONS_LIST_QUERY_KEY],
			});
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Intimação excluída com sucesso!',
					false,
				),
			);
		},
		onError: () => {
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Não foi possível excluir a intimação.',
					true,
				),
			);
		},
	});
}
