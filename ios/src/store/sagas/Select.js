import Api from 'services/Api';
import { call, put } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';

import SelectActions from 'store/ducks/Select';

export function* fetchSelectOptions(action) {
  try {
    const { type, token } = action.data;

    const list = [];
    if (type === 'event-type') {
      const { idCliente } = jwtDecode(token);
      const { data } = yield call(Api.get, `/core/v1/tipos-eventos?campos=*&idCliente=${idCliente}`);
      data.itens.forEach((value) => list.push({
        title: value.nome,
        id: value.id,
      }));
    }

    if (type === 'event-reminder') {
      const { data } = yield call(Api.get, `/core/v1/tipos-lembretes-eventos`);
      data.itens.forEach((value) => list.push({
        title: value.descricao,
        id: value.id,
      }));
    }

    if (type === 'event-repeat') {
      const { data } = yield call(Api.get, '/core/v1/tipos-repeticao-eventos');
      data.itens.forEach((value) => list.push({
        title: value.descricao,
        id: value.id,
      }));
    }

    const titleSort = (item, other) => {
      if (item.title > other.title) return 1;
      if (item.title < other.title) return -1;
      return 0;
    };
    list.sort(titleSort);
    yield put(SelectActions.fetchSelectOptionsSuccess({ list }));
  } catch (error) {
    yield put(SelectActions.fetchSelectOptionsFailure(
      'Falha ao carregar opções. Tente novamente mais tarde!',
      true,
    ));
  }
}
