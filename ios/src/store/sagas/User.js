import Api from 'services/Api';
import { getLoggedUser } from 'helpers/Permissions';
import { call, put } from 'redux-saga/effects';

import UserActions from 'store/ducks/User';
import ToastNotifyActions from 'store/ducks/ToastNotify';

import env from 'services/env';

export function* getOAB() {
  try {
    const userInfo = yield getLoggedUser();
    const idUsuarioCliente = userInfo.idUsuarioCliente;

    const response = yield call(
      Api.get,
      `/core/v1/usuarios-clientes?campos=*&IDs=${idUsuarioCliente}&idParceiro=6`
    );
    yield put(UserActions.oabSuccess(response.data));
  } catch (err) {
    const { status } = err.response;
    if (status !== 401) {
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível carregar seus dados',
          true
        )
      );
    }
  }
}

export function* getPerson() {
  try {
    // Request Person
    const userInfo = yield getLoggedUser();
    const idUsuarioCliente = userInfo.idUsuarioCliente;

    const person = yield call(
      Api.get,
      `/core/v1/usuarios-clientes?campos=*&expansao=pessoa&IDs=${idUsuarioCliente}&idParceiro=${env.idParceiro}`
    );

    // Request UF
    const userUfId = person.data.itens[0].pessoa.idUFMunicipio;
    const ufId = userUfId ? `&ids=${userUfId}` : undefined;

    const uf = yield call(Api.get, `/core/v1/uf?campos=sigla${ufId || ''}`);

    yield put(UserActions.personSuccess(person.data, uf.data));
  } catch (err) {
    const { status } = err.response;
    if (status !== 401) {
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível carregar seus dados',
          true
        )
      );
    }
  }
}

export function* changePassword(action) {
  const data = {
    itens: [
      {
        email: action.param.email,
        senhaAtual: action.param.password,
        novaSenha: action.param.passwordNew,
        confirmacaoNovaSenha: action.param.passwordNew,
      },
    ],
  };

  try {
    const response = yield call(
      Api.put,
      '/core/v1/usuarios/usuario-logado-alterar-senha',
      data
    );

    yield put(
      ToastNotifyActions.toastNotifyShow(response.data.status.mensagem)
    );
  } catch (err) {
    switch (err.response.status) {
      case 400:
        yield put(
          ToastNotifyActions.toastNotifyShow(
            err.response.data.status.erros[0].mensagem,
            true
          )
        );
        break;
      case 500:
        yield put(
          ToastNotifyActions.toastNotifyShow(
            err.response.data.status.erros[0].mensagem,
            true
          )
        );
        break;
      default:
        yield put(
          ToastNotifyActions.toastNotifyShow(
            'Não foi possível alterar sua senha',
            true
          )
        );
    }
  }
}
