import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';

import MovementActions from 'store/ducks/Movement';
import ToastNotifyActions from 'store/ducks/ToastNotify';

export function* getMovement({ param }) {
  try {
    const response = yield call(
      Api.get,
      `/core/v1/detalhes-movimentacoes/${param.movementType}?campos=*&Ids=${param.movementId}`
    );
    yield delay(3000);
    yield put(MovementActions.movementSuccess(response.data));
  } catch (err) {
    const { status } = err.response;

    if (status !== 401) {
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível carregar os dados da movimentação',
          true
        )
      );
    }
  }
}

export function* movementRead({ params }) {
  try {
    const { id, idMovProcessoCliente, movementType } = params;

    const data = {
      itens: [{
        id,
        idMovProcessoCliente
      }],
    };
    const response = yield call(
      Api.put,
      `/core/v1/movimento-processo-cliente-lido/${movementType}`,
      data
    );

    if (response.status === 200) {
      yield put(MovementActions.movementReadSuccess());

      if (movementType === 'marcar') {
        yield put(
          ToastNotifyActions.toastNotifyShow(
            'A movimentação foi marcada como lida',
            false
          )
        );
      } else {
        yield put(
          ToastNotifyActions.toastNotifyShow(
            'A movimentação foi marcada como não lida',
            false
          )
        );
      }
    } else {
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Ops! Algo aconteceu de errado, por favor tente novamente.',
          true
        )
      );
    }
  } catch (err) {
    const { status } = err.response;
    if (status !== 401) {
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível marcar a movimentação como lida',
          true
        )
      );
    }
  }
}
