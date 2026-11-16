import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import {
	courtRegistrationsAppliedToQueryParams,
	type CourtsRegistrationsAppliedFilters,
} from '@models/court-registrations-filters';
import type { CourtRegisterListItem } from '@models/court-register';
import { mapCourtRegisterApiItemToListItem } from '../utils/courtRegisterListMapper';
import {
	COURTS_REGISTRATIONS_PAGE_SIZE,
	fetchCourtsRegistrationsPage,
} from '@services/courts';

export const COURTS_REGISTRATIONS_LIST_QUERY_KEY = [
	'courts',
	'registrations',
	'list',
] as const;

export function useCourtsRegistrationsInfiniteQuery(
	enabled: boolean,
	appliedFilters: CourtsRegistrationsAppliedFilters,
) {
	const dispatch = useDispatch();

	const listQueryParams = useMemo(
		() => courtRegistrationsAppliedToQueryParams(appliedFilters),
		[appliedFilters],
	);

	const query = useInfiniteQuery({
		queryKey: [
			...COURTS_REGISTRATIONS_LIST_QUERY_KEY,
			appliedFilters.acesso,
			appliedFilters.idOrgaoJudiciario,
			appliedFilters.situacao,
		],
		initialPageParam: 1,
		queryFn: ({ pageParam }) =>
			fetchCourtsRegistrationsPage(
				pageParam as number,
				listQueryParams,
			),
		getNextPageParam: (lastPage, allPages) => {
			const itens = lastPage.itens ?? [];
			if (itens.length === 0) {
				return undefined;
			}
			const total = lastPage.registrosTotal;
			if (typeof total === 'number') {
				const loaded = allPages.reduce(
					(acc, page) => acc + (page.itens?.length ?? 0),
					0,
				);
				if (loaded >= total) {
					return undefined;
				}
			}
			if (itens.length < COURTS_REGISTRATIONS_PAGE_SIZE) {
				return undefined;
			}
			const currentPage =
				lastPage.paginaAtual ?? allPages.length;
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
				'Não foi possível carregar os cadastros.',
				true,
			),
		);
	}, [query.isError, query.error, dispatch]);

	const items: CourtRegisterListItem[] = useMemo(
		() =>
			query.data?.pages.flatMap(page =>
				(page.itens ?? []).map(mapCourtRegisterApiItemToListItem),
			) ?? [],
		[query.data],
	);

	return {
		...query,
		items,
	};
}
