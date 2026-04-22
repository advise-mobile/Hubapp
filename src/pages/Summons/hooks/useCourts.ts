import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';

import type { CourtOption, JudicialAgencyOption } from '@models/filters-summons';
import type { UseCourtsReturn } from '@models/summons-hooks-types';
import {
	fetchCourtsForSummonsFilter,
	fetchSystemsForSummonsFilter,
} from '@services/summons';

export function useCourts(): UseCourtsReturn {
	const dispatch = useDispatch();
	const [courts, setCourts] = useState<JudicialAgencyOption[]>([]);
	const [isLoadingCourts, setIsLoadingCourts] = useState(false);
	const [systems, setSystems] = useState<CourtOption[]>([]);
	const [isLoadingSystems, setIsLoadingSystems] = useState(false);

	const loadCourts = useCallback(async () => {
		try {
			setIsLoadingCourts(true);
			const itens = await fetchCourtsForSummonsFilter();
			setCourts(itens);
			return itens;
		} catch {
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Não foi possível carregar os tribunais.',
					true,
				),
			);
			setCourts([]);
			return [];
		} finally {
			setIsLoadingCourts(false);
		}
	}, [dispatch]);

	const loadSystems = useCallback(
		async (idOrgaoJudiciario: number | null) => {
			if (idOrgaoJudiciario == null || !Number.isFinite(idOrgaoJudiciario)) {
				setSystems([]);
				return [];
			}
			try {
				setIsLoadingSystems(true);
				const itens = await fetchSystemsForSummonsFilter(idOrgaoJudiciario);
				setSystems(itens);
				return itens;
			} catch {
				dispatch(
					ToastNotifyActions.toastNotifyShow(
						'Não foi possível carregar os sistemas.',
						true,
					),
				);
				setSystems([]);
				return [];
			} finally {
				setIsLoadingSystems(false);
			}
		},
		[dispatch],
	);

	return {
		courts,
		isLoadingCourts,
		loadCourts,
		systems,
		isLoadingSystems,
		loadSystems,
	};
}
