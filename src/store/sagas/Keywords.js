import Api from 'services/Api';
import { getLoggedUser } from 'helpers/Permissions';

import { call, put } from 'redux-saga/effects';

import KeywordsActions from 'store/ducks/Keywords';
import ToastNotifyActions from 'store/ducks/ToastNotify';

export function* getKeywords() {
  try {
    const user = yield getLoggedUser();

    const query = 'campos=*&IdTipoPalavraChave=-1';
    const paginator = 'registrosPorPagina=100000';
    const usersIDs = `idUsuarioCliente=${user.idUsuarioCliente}&idCliente=${user.idCliente}`;
    const { data } = yield call(
      Api.get,
      `/core/v1/palavra-chave-cliente/consultar?${query}&${paginator}&${usersIDs}`
    );

    //palavra-chave-cliente/consultar?campos=*&idCliente=32519&idTipoPalavraChave=-1&idUsuarioCliente=43337&paginaAtual=1&registrosPorPagina=10

    yield put(KeywordsActions.keywordsSuccess(data));
  } catch (err) {
    const { status } = err.response;
    if (status !== 401) {
      yield put(KeywordsActions.keywordsFailure());
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível carregar as palavras-chaves',
          true
        )
      );
    }
  }
}
