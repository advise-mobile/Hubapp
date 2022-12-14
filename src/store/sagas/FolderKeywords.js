import Api from 'services/Api';
import {call, put, delay} from 'redux-saga/effects';

import AuthAction from 'store/ducks/Auth';
import UserActions from 'store/ducks/User';
import FolderKeywordsActions from 'store/ducks/FolderKeywords';
import ToastNotifyActions from 'store/ducks/ToastNotify';

function buildFiltersQuery(filtersQuery) {
	let filters = '';

	if (!filtersQuery) return filters;

	filters += filtersQuery.nome ? 'nome=' + filtersQuery.nome : '';

	return filters;
}

export function* getFolderKeywords(action) {
	try {
		const {page, perPage, filters} = action.params;
		const query = 'campos=*&idTipoPasta=-2&ativo=true';

		yield put(AuthAction.contractsRequest());

		yield delay(200);

		yield put(UserActions.updatePicture());
		// if (userData.foto) {
		// }
		const paginator = `paginaAtual=${page}&registrosPorPagina=${perPage}`;

		const queryFilters = buildFiltersQuery(filters);

		const {data} = yield call(
			Api.get,
			`/core/v1/pastas-usuarios-clientes?${query}&${paginator}&${queryFilters}`,
		);

		const endReached = data.itens.length < perPage;

		const movementsNotRead = data.itens
			.map(folder => folder.totalNaoLidas)
			.reduce((a, b) => a + b, 0);

		yield delay(300);
		yield put(
			FolderKeywordsActions.folderKeywordsSuccess({...data, endReached, movementsNotRead}, page),
		);
	} catch (err) {
		const {status} = err.response;
		if (status !== 401) {
			yield put(
				ToastNotifyActions.toastNotifyShow(
					'Não foi possível carregar as pastas de palavras-chave',
					true,
				),
			);

			yield put(FolderKeywordsActions.folderKeywordsFailure());
		}
	}
}
