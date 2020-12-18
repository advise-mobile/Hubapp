import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';

import FolderKeywordsActions from 'store/ducks/FolderKeywords';
import ToastNotifyActions from 'store/ducks/ToastNotify';
import { getLogin } from '../../services/Api';

export function* getFolderKeywords() {
  try {
    const query = 'campos=*&idTipoPasta=-2&ativo=true';
    const paginator = 'registrosPorPagina=100000';

    yield getLogin();
    yield delay(700);

    const { data } = yield call(
      Api.get,
      `/core/v1/pastas-usuarios-clientes?${query}&${paginator}`
    );

    yield delay(700);
    yield put(FolderKeywordsActions.folderKeywordsSuccess(data));
  } catch (err) {
    const { status } = err.response;
    if (status !== 401) {
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível carregar as pastas de palavras-chave',
          true
        )
      );

      yield put(FolderKeywordsActions.folderKeywordsFailure());
    }
  }
}
