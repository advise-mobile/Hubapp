import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';

import AuthAction from 'store/ducks/Auth';
import ProcessActions from '../ducks/Process';
import ToastNotifyActions from 'store/ducks/ToastNotify';
import UserActions from 'store/ducks/User';

export function* getProcess(action) {
  try {
    const { param } = action;

    yield put(AuthAction.contractsRequest());

    yield delay(200);

    yield put(UserActions.updatePicture());

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
