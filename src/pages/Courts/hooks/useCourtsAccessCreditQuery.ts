import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import { fetchCourtsAccessCredit } from '@services/courts';

const QUERY_KEY = ['courts', 'access-credit'] as const;

function formatAccessCountPhrase(count: number): string {
	const accessWord = count === 1 ? 'acesso' : 'acessos';
	return `${count} ${accessWord}`;
}

export function useCourtsAccessCreditQuery(enabled: boolean) {
	const dispatch = useDispatch();

	const query = useQuery({
		queryKey: [...QUERY_KEY],
		queryFn: fetchCourtsAccessCredit,
		enabled,
	});

	useEffect(() => {
		if (!query.isError || query.error == null) {
			return;
		}
		dispatch(
			ToastNotifyActions.toastNotifyShow(
				'Não foi possível carregar os acessos disponíveis.',
				true,
			),
		);
	}, [query.isError, query.error, dispatch]);

	const isAwaitingFirstResult = enabled && !query.isFetched;

	const { contractedCountDisplayText, usedCountDisplayText } = useMemo(() => {
		if (isAwaitingFirstResult) {
			return {
				contractedCountDisplayText: '',
				usedCountDisplayText: '',
			};
		}
		if (query.isError) {
			return {
				contractedCountDisplayText: '—',
				usedCountDisplayText: '—',
			};
		}

		const item = query.data;
		const quantityUtilized = item?.qtdUtilizada ?? 0;
		const quantityContracted = item?.qtdContratada;

		const contractedRowText =
			quantityContracted === undefined || quantityContracted === null
				? 'Acessos ilimitados'
				: formatAccessCountPhrase(Number(quantityContracted));
		const usedRowText = formatAccessCountPhrase(quantityUtilized);

		return {
			contractedCountDisplayText: contractedRowText,
			usedCountDisplayText: usedRowText,
		};
	}, [isAwaitingFirstResult, query.data, query.isError]);

	return {
		...query,
		contractedCountDisplayText,
		usedCountDisplayText,
		isAwaitingFirstResult,
	};
}
