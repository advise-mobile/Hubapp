import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import type { CreateCourtCredentialInput } from '@models/courts-credentials';
import { createCourts } from '@services/courts';

const SUMMONS_LIST_QUERY_KEY = ['summons', 'list-access'] as const;

export function useRegisterCourtCredentialMutation() {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateCourtCredentialInput) => createCourts(input),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [...SUMMONS_LIST_QUERY_KEY] });
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
