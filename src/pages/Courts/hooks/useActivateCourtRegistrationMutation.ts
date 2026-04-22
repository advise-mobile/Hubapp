import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import type { ActivateCourtRegistrationResponse } from '@models/court-register';
import { activateCourtRegistration } from '@services/courts';

import { COURTS_REGISTRATIONS_LIST_QUERY_KEY } from './useCourtsRegistrationsInfiniteQuery';

const SUMMONS_LIST_QUERY_KEY = ['summons', 'list-access'] as const;

function getSuccessMessage(data: ActivateCourtRegistrationResponse): string {
	const msg = data.mensagem;
	if (typeof msg === 'string' && msg.trim() !== '') {
		return msg.trim();
	}
	return 'Sucesso ao ativar Cadastro';
}

export function useActivateCourtRegistrationMutation() {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (summonsSearchId: number) =>
			activateCourtRegistration(summonsSearchId),
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
					'Não foi possível ativar o cadastro.',
					true,
				),
			);
		},
	});
}
