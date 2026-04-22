import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import type { DeleteCourtRegistrationResponse } from '@models/court-register';
import { deleteCourtRegistration } from '@services/courts';

import { COURTS_REGISTRATIONS_LIST_QUERY_KEY } from './useCourtsRegistrationsInfiniteQuery';

const SUMMONS_LIST_QUERY_KEY = ['summons', 'list-access'] as const;

function getSuccessMessage(data: DeleteCourtRegistrationResponse): string {
	const msg = data.mensagem;
	if (typeof msg === 'string' && msg.trim() !== '') {
		return msg.trim();
	}
	return 'Cadastro excluído com sucesso.';
}

export function useDeleteCourtRegistrationMutation() {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (summonsSearchId: number) =>
			deleteCourtRegistration(summonsSearchId),
		onSuccess: async data => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: [...SUMMONS_LIST_QUERY_KEY],
				}),
				queryClient.invalidateQueries({
					queryKey: [...COURTS_REGISTRATIONS_LIST_QUERY_KEY],
				}),
			]);
			dispatch(
				ToastNotifyActions.toastNotifyShow(getSuccessMessage(data), false),
			);
		},
		onError: () => {
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Não foi possível excluir o cadastro.',
					true,
				),
			);
		},
	});
}
