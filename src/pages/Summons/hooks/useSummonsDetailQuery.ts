import { useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import type { UseSummonsDetailQueryParams } from '@models/summons-hooks-types';
import type { SummonsDetailViewModel } from '@models/summons-detail';
import {
	fetchSummonsDetail,
	markSummonsAsRead,
} from '@services/summons';

import { mapSummonsDetailApiItemToViewModel } from '../utils/summonsDetailMapper';
import { SUMMONS_LIST_QUERY_KEY } from './useSummonsInfiniteQuery';

export const SUMMONS_DETAIL_QUERY_KEY = ['summons', 'detail'] as const;

export function useSummonsDetailQuery(params: UseSummonsDetailQueryParams | undefined) {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const { colors } = useTheme();

	const idMovProcUsuarioCliente = params?.idMovProcUsuarioCliente;
	const enabled = idMovProcUsuarioCliente != null;

	const query = useQuery({
		queryKey: [
			...SUMMONS_DETAIL_QUERY_KEY,
			idMovProcUsuarioCliente,
			params?.flLido,
			params?.markAsReadId,
			params?.idMovProcessoCliente,
		],
		enabled,
		queryFn: async (): Promise<SummonsDetailViewModel> => {
			if (idMovProcUsuarioCliente == null) {
				throw new Error('Missing idMovProcUsuarioCliente for summons detail.');
			}

			if (
				params?.flLido === false &&
				params.markAsReadId != null &&
				params.idMovProcessoCliente != null
			) {
				await markSummonsAsRead({
					id: params.markAsReadId,
					idMovProcessoCliente: params.idMovProcessoCliente,
				});
				await queryClient.invalidateQueries({
					queryKey: SUMMONS_LIST_QUERY_KEY,
				});
			}

			const response = await fetchSummonsDetail(idMovProcUsuarioCliente);
			const detailItem = response.itens?.[0];

			if (detailItem == null) {
				throw new Error('Summons detail response has no items.');
			}

			return mapSummonsDetailApiItemToViewModel(detailItem, {
				amber: colors.amber,
				gray: colors.gray,
				orange200: colors.orange200,
			});
		},
	});

	useEffect(() => {
		if (!query.isError || query.error == null) {
			return;
		}

		dispatch(
			ToastNotifyActions.toastNotifyShow(
				'Não foi possível carregar os detalhes da intimação.',
				true,
			),
		);
	}, [dispatch, query.error, query.isError]);

	const detail = useMemo(() => query.data, [query.data]);

	return {
		detail,
		isLoading: enabled && query.isLoading,
		isError: query.isError,
	};
}
