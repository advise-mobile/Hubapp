import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import { fetchUserAgendaId } from '@services/deadlines';

export const USER_AGENDA_QUERY_KEY = ['deadlines', 'user-agenda'] as const;

export function useUserAgendaQuery(enabled: boolean) {
	const dispatch = useDispatch();

	const query = useQuery({
		queryKey: [...USER_AGENDA_QUERY_KEY],
		queryFn: fetchUserAgendaId,
		enabled,
	});

	useEffect(() => {
		if (!query.isError || query.error == null) {
			return;
		}

		dispatch(
			ToastNotifyActions.toastNotifyShow(
				'Não foi possível carregar a agenda.',
				true,
			),
		);
	}, [query.isError, query.error, dispatch]);

	return query;
}
