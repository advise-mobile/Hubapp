import Api from 'services/Api';
import { call, put } from 'redux-saga/effects';

import JurisprudenceActions from 'store/ducks/Jurisprudence';
import ToastNotifyActions from 'store/ducks/ToastNotify';

function getFilterString(filters) {
  let result = '';

  if (!filters) result;

  Object.keys(filters).map(key => result += (filters[key] != null) && `${key}=${filters[key]}&` || '');

  return result.slice(0, -1);
}

export function* getJurisprudences({ param }) {
  try {
    // const term = param.term.replaceAll(' ', '+');

    const query = `termo=${param.term}`;
    const paginator = `paginaAtual=${param.page}&registrosPorPagina=20`;

    const queryFilters = getFilterString(param.filters);

    const { data } = yield call(
      Api.get,
      `/jurisprudencia/v1/jurisprudencia?${query}&${paginator}&${queryFilters}`,
    );

    const endReached = data.itens.length == 0;

    yield put(JurisprudenceActions.jurisprudenceSuccess({ ...data, endReached }, param.page));
  } catch (err) {
    const { status } = err.response;
    if (status !== 401) {
      yield put(JurisprudenceActions.jurisprudenceFailure());
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível carregar as jurisprudências',
          true
        )
      );
    }
  }
}

export function* sendJurisprudenceEmail({ param }) {
  try {
    const data = {
      "destinatarios": param.destinatarios,
      "numeroRecursos": param.numeroRecursos,
      "termo": param.term,
      "codEmenta": param.codEmenta
    };

    yield call(Api.post, `/core/v1/envio-email-jurisprudencias`, data);

    yield put(ToastNotifyActions.toastNotifyShow('Jurisprudência enviada por email!', false));
    yield put(JurisprudenceActions.jurisprudenceEmailSuccess());
  } catch (err) {
    const { status } = err.response;
    if (status !== 401) {
      yield put(JurisprudenceActions.jurisprudenceEmailFailure());
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível enviar a jurisprudência por email.',
          true
        )
      );
    }
  }
}
