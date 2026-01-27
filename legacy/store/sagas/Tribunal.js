import Api from '@lservices/Api';
import { call, put } from 'redux-saga/effects';

import TribunalActions from '@lstore/ducks/Tribunal';
import ToastNotifyActions from '@lstore/ducks/ToastNotify';

export function* getTribunal(action) {
  try {
    const query = `campos=*&numeroProcesso=${action.param.numberProcess}`;
    const paginator = 'registrosPorPagina=100000';

    const { data } = yield call(
      Api.get,
      `/core/v1/processos-solicitados/orgaos-judiciarios?${query}&${paginator}`,
    );

    yield put(TribunalActions.tribunalSuccess(data));
  } catch (err) {
    const { status } = err.response;
    if (status !== 401) {
      yield put(TribunalActions.tribunalFailure());
    }
  }
}
