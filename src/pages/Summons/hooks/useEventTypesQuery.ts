import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import { fetchEventTypes } from '@services/deadlines';

export const EVENT_TYPES_QUERY_KEY = ['deadlines', 'event-types'] as const;

export function useEventTypesQuery(enabled: boolean) {
	const dispatch = useDispatch();

	const query = useQuery({
		queryKey: [...EVENT_TYPES_QUERY_KEY],
		queryFn: fetchEventTypes,
		enabled,
	});

	useEffect(() => {
		if (!query.isError || query.error == null) {
			return;
		}

		dispatch(
			ToastNotifyActions.toastNotifyShow(
				'Não foi possível buscar os tipos de prazos.',
				true,
			),
		);
	}, [query.isError, query.error, dispatch]);

	return query;
}
