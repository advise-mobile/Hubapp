import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';

import AuthAction from 'store/ducks/Auth';
import PeopleActions from '../ducks/People';
import ToastNotifyActions from 'store/ducks/ToastNotify';
import UserActions from 'store/ducks/User';

import { getLogin } from '../../services/Api';

function getFilterString(filters) {
  let result = '';

  if (!filters) return result;

  const marcador = filters.marcador;

  if (marcador && marcador > 0) result += `&idMarcadorContato=${marcador}&MarcadorAtivo=true`;

  return result;
}

function* getMarkers() {
  try {
    let { data } = yield call(
      Api.get,
      `/core/v1/marcadores-contato?ativo=true&campos=*`
    );

    const allMarkers = {
      idMarcadorContato: 0,
      nomeMarcadorContato: 'Todas',
    };

    data.itens.unshift(allMarkers);
    return data;
  } catch (err) {
    yield put(
      ToastNotifyActions.toastNotifyShow(
        'Não foi possível carregar os Marcadores',
        true
      )
    );

    return false;
  }
}

export function* getPeople(action) {
  try {
    const { param } = action;
    const { filters } = param;

    const queryFilters = getFilterString(filters);
    const paginator = `registrosPorPagina=10&paginaAtual=${param.page}`;

    const userData = yield getLogin();

    yield put(AuthAction.contractsRequest());

    yield delay(200);

    if (userData.foto) {
      yield put(UserActions.updatePicture(userData.foto));
    }

    let { data } = yield call(
      Api.get,
      `/core/v1/contatos?campos=*&ordenacao=%2BNomePessoaCliente${queryFilters}&${paginator}`
    );

    data.itens.map(item => item.checked = false);

    let markers = param.loadMarkers ? yield getMarkers() : false;

    yield put(
      PeopleActions.peopleSuccess({ ...data }, markers, param.page)
    );
  } catch (err) {
    yield put(
      ToastNotifyActions.toastNotifyShow(
        'Não foi possível carregar as Pessoas',
        true
      )
    );
  }
}
