import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import type { CreateCourtCredentialInput } from '@models/courts-credentials';
import { createCourts } from '@services/courts';

import { SUMMONS_LIST_QUERY_KEY } from '@pages/Summons/hooks/useSummonsInfiniteQuery';

import { COURTS_ACCESS_CREDIT_QUERY_KEY } from './useCourtsAccessCreditQuery';
import { COURTS_REGISTRATIONS_LIST_QUERY_KEY } from './useCourtsRegistrationsInfiniteQuery';

const SUMMONS_LIST_ACCESS_QUERY_KEY = ['summons', 'list-access'] as const;

export function useRegisterCourtCredentialMutation() {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateCourtCredentialInput) => createCourts(input),
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: [...SUMMONS_LIST_ACCESS_QUERY_KEY],
				}),
				queryClient.invalidateQueries({
					queryKey: [...SUMMONS_LIST_QUERY_KEY],
				}),
				queryClient.invalidateQueries({
					queryKey: [...COURTS_REGISTRATIONS_LIST_QUERY_KEY],
				}),
				queryClient.invalidateQueries({
					queryKey: [...COURTS_ACCESS_CREDIT_QUERY_KEY],
				}),
			]);
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Acesso ao tribunal cadastrado com sucesso.',
					false,
				),
			);
		},
		onError: () => {
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Não foi possível cadastrar o acesso ao tribunal.',
					true,
				),
			);
		},
	});
}
