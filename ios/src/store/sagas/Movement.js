import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';

import MovementActions from 'store/ducks/Movement';
import ToastNotifyActions from 'store/ducks/ToastNotify';

export function* getMovement(action) {
  try {
    const { param } = action;

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

export function* movementRead(action) {
  try {
    const { param } = action;

    const data = {
      itens: [
        {
          id: param.movementId,
          idMovProcessoCliente: param.movementId,
        },
      ],
    };
    const response = yield call(
      Api.put,
      `/core/v1/publicacoes-clientes/${param.movementType}`,
      data
    );

    if (response.status === 200) {
      yield put(MovementActions.movementReadSuccess());

      if (param.movementType === 'marcar-lidos') {
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
