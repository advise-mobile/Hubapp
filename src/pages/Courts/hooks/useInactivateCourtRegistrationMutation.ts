import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import type { InactivateCourtRegistrationResponse } from '@models/court-register';
import { inactivateCourtRegistration } from '@services/courts';

import { COURTS_REGISTRATIONS_LIST_QUERY_KEY } from './useCourtsRegistrationsInfiniteQuery';

const SUMMONS_LIST_QUERY_KEY = ['summons', 'list-access'] as const;

function getSuccessMessage(data: InactivateCourtRegistrationResponse): string {
	const msg = data.mensagem;
	if (typeof msg === 'string' && msg.trim() !== '') {
		return msg.trim();
	}
	return 'Sucesso ao inativar Cadastro';
}

export function useInactivateCourtRegistrationMutation() {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (summonsSearchId: number) =>
			inactivateCourtRegistration(summonsSearchId),
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
					'Não foi possível inativar o cadastro.',
					true,
				),
			);
		},
	});
}
