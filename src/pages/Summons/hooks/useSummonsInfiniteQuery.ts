import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import type { SummonsFilters } from '@models/summons-hooks-types';
import type { SummonsListItemViewModel } from '@models/summons-list';
import {
	fetchSummonsListPage,
	SUMMONS_LIST_PAGE_SIZE,
} from '@services/summons';
import { useTheme } from 'styled-components';

import { mapSummonsApiItemToViewModel } from '../utils/summonsListMapper';

export const SUMMONS_LIST_QUERY_KEY = ['summons', 'list'] as const;

export function useSummonsInfiniteQuery(
	enabled: boolean,
	filters: SummonsFilters = {},
) {
	const dispatch = useDispatch();
	const theme = useTheme();

	const query = useInfiniteQuery({
		queryKey: [...SUMMONS_LIST_QUERY_KEY, filters],
		initialPageParam: 1,
		queryFn: ({ pageParam }) =>
			fetchSummonsListPage(pageParam as number, filters),
		getNextPageParam: (lastPage, allPages) => {
			const itens = lastPage.itens ?? [];
			if (itens.length === 0) {
				return undefined;
			}

			const pagination = lastPage.paginacao;
			if (pagination?.registrosTotal != null) {
				const loaded = allPages.reduce(
					(acc, page) => acc + (page.itens?.length ?? 0),
					0,
				);
				if (loaded >= pagination.registrosTotal) {
					return undefined;
				}
			}

			if (itens.length < SUMMONS_LIST_PAGE_SIZE) {
				return undefined;
			}

			const currentPage = pagination?.paginaAtual ?? allPages.length;
			return currentPage + 1;
		},
		enabled,
	});

	useEffect(() => {
		if (!query.isError || query.error == null) {
			return;
		}
		dispatch(
			ToastNotifyActions.toastNotifyShow(
				'Não foi possível carregar as intimações.',
				true,
			),
		);
	}, [query.isError, query.error, dispatch]);

	const items: SummonsListItemViewModel[] = useMemo(() => {
		let globalIndex = 0;
		return (
			query.data?.pages.flatMap(page =>
				(page.itens ?? []).map(raw => {
					const mapped = mapSummonsApiItemToViewModel(
						raw,
						globalIndex,
						theme,
					);
					globalIndex += 1;
					return mapped;
				}),
			) ?? []
		);
	}, [query.data, theme]);

	const isAwaitingFirstResult = enabled && !query.isFetched;

	return {
		...query,
		items,
		isAwaitingFirstResult,
	};
}
