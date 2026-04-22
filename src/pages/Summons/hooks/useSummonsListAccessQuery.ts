import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import { fetchSummonsList } from '@services/summons';

const QUERY_KEY = ['summons', 'list-access'] as const;

export function useSummonsListAccessQuery(enabled: boolean) {
	const dispatch = useDispatch();

	const query = useQuery({
		queryKey: [...QUERY_KEY],
		queryFn: fetchSummonsList,
		enabled,
	});

	useEffect(() => {
		if (!query.isError || query.error == null) {
			return;
		}
		dispatch(
			ToastNotifyActions.toastNotifyShow(
				'Não foi possível verificar os cadastros de intimações.',
				true,
			),
		);
	}, [query.isError, query.error, dispatch]);

	const items = query.data ?? [];
	const hasRegisteredCredentials =
		!query.isError && !query.isPending && items.length > 0;

	const isAwaitingFirstResult = enabled && !query.isFetched;

	return {
		...query,
		items,
		hasRegisteredCredentials,
		isAwaitingFirstResult,
	};
}
