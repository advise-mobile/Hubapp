import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';

import ProcessActions from '../ducks/Process';
import ToastNotifyActions from 'store/ducks/ToastNotify';

import { getLogin } from '../../services/Api';

export function* getProcess(action) {
  try {
    const { param } = action;

    yield getLogin();
    yield delay(300);

    let { data } = yield call(
      Api.get,
      `/core/v1/detalhes-movimentacoes/andamentos?IDs=${param.movementId}&campos=*&registrosPorPagina=-1`
    );

    yield put(ProcessActions.processSuccess(data));
  } catch (err) {
    yield put(
      ToastNotifyActions.toastNotifyShow(
        'Não foi possível carregar a movimentação',
        true
      )
    );
  }
}
