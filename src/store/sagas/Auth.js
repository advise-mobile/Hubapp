import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthActions from 'store/ducks/Auth';
import ToastNotifyActions from 'store/ducks/ToastNotify';

import jwtDecode from 'jwt-decode';

import { REFRESH_TOKEN, TOKEN, EXPIRES_TOKEN, ACCEPT_TERMS } from 'helpers/StorageKeys';
import { getLoggedUser } from 'helpers/Permissions'

export function* login(action) {
  const { email, password } = action;
  const data = {
    username: email,
    password,
    grant_type: 'password',
    access_type: '94be650011cf412ca906fc335f615cdc'
  };

  try {
    const response = yield call(Api.post, '/login/v1/token', data);

    yield AsyncStorage.setItem(
      '@loginObject',
      JSON.stringify({
        username: email,
        password,
      })
    );

    if (response.data.access_token) {
      Api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    }

    const contracts = yield call(Api.get, '/core/v2/contratos?campos=idSituacaoContrato,convenioOAB&contratosAderidos=true&registrosPorPagina=-1');

    const { idCliente, idUsuarioCliente } = jwtDecode(response.data.access_token);

    const isConvenio = contracts.data.itens.some(contract => contract.convenioOAB);

    const activeContract = contracts.data.itens.some(contract => contract.idSituacaoContrato == -1);

    let active = activeContract;

    if (isConvenio) {
      const anotherContract = contracts.data.itens.some(contract => contract.idSituacaoContrato == -1 && !contract.convenioOAB);

      if (!anotherContract) {
        const situation = yield call(Api.get, `/core/v1/clientes?IDs=${idCliente}&campos=planosVinculados.idSituacaoClienteXPlano+&expansao=planosVinculados&registrosPorPagina=-1`);

        const adheredContract = situation.data.itens[0].planosVinculados.some(plan => (plan.idSituacaoClienteXPlano === -1));

        active = adheredContract && activeContract;
      }
    }

    const { data: { itens } } = yield call(Api.get, `/core/v1/usuarios-clientes?IDs=${idUsuarioCliente}&campos=aceitaTermosUso&registrosPorPagina=-1`);

    const acceptTerms = !!itens[0] && itens[0].aceitaTermosUso;

    const expires = new Date(response.data['.expires']);

    yield AsyncStorage.multiSet([
      [REFRESH_TOKEN, response.data.refresh_token || null],
      [TOKEN, response.data.access_token || null],
      [EXPIRES_TOKEN, expires.toString()],
      [ACCEPT_TERMS, JSON.stringify(acceptTerms)]
    ]);

    yield put(AuthActions.loginSuccess(response.data, isConvenio, active, acceptTerms));
  } catch (err) {
    console.log(err);

    if (err.response) {
      yield put(AuthActions.loginFailure());
      yield put(ToastNotifyActions.toastNotifyShow(err.response.data.status.erros[0].mensagem, true)
      );
    } else {
      yield put(AuthActions.loginFailure());
      yield put(ToastNotifyActions.toastNotifyShow('Não conseguimos realizar seu login. Por favor tente novamente!', true));
    }
  }
}

export function* logout() {
  try {
    const response = yield call(Api.post, '/login/v1/log-out');
    yield put(AuthActions.logoutSuccess(response.data));
  } catch (err) {
    yield put(AuthActions.logoutFailure());
  }
}

export function* forgot(action) {
  const data = {
    email: action.email,
  };

  try {
    const response = yield call(Api.post, '/login/v1/redefinir-senha', data);

    yield put(AuthActions.forgotSuccess(response.data));

    yield put(
      ToastNotifyActions.toastNotifyShow(response.data.status.mensagem, false)
    );
  } catch (err) {
    switch (err.response.status) {
      case 400:
        yield put(AuthActions.forgotFailure());
        yield put(
          ToastNotifyActions.toastNotifyShow(
            err.response.data.status.erros[0].mensagem,
            true
          )
        );
        break;
      default:
        yield put(AuthActions.forgotFailure());
        yield put(
          ToastNotifyActions.toastNotifyShow(
            'Não foi possível recuperar sua senha',
            true
          )
        );
    }
  }
}

export function* contracts() {
  try {
    const contracts = yield call(Api.get, '/core/v2/contratos?campos=idSituacaoContrato,convenioOAB&contratosAderidos=true&registrosPorPagina=-1');

    const token = contracts.config.headers.Authorization.replace("bearer ", "");

    const { idCliente } = jwtDecode(token);

    const isConvenio = contracts.data.itens.some(contract => contract.convenioOAB);

    const activeContract = contracts.data.itens.some(contract => contract.idSituacaoContrato == -1);

    let active = activeContract;

    if (isConvenio) {
      const anotherContract = contracts.data.itens.some(contract => contract.idSituacaoContrato == -1 && !contract.convenioOAB);

      if (!anotherContract) {
        const situation = yield call(Api.get, `/core/v1/clientes?IDs=${idCliente}&campos=planosVinculados.idSituacaoClienteXPlano+&expansao=planosVinculados&registrosPorPagina=-1`);

        const adheredContract = situation.data.itens[0].planosVinculados.some(plan => (plan.idSituacaoClienteXPlano === -1));

        active = adheredContract && activeContract;
      }
    }

    yield put(AuthActions.contractsSuccess(isConvenio, active));
  } catch (err) {
    // yield put(ToastNotifyActions.toastNotifyShow('Não conseguimos verificar o seu contrato. Por favor tente novamente!', true));
  }
}

export function* acceptTermsUse({ acceptTerms }) {

  const { idUsuarioCliente } = yield getLoggedUser();

  const data = {
    itens: [
      {
        aceitaTermosUso: acceptTerms,
        id: idUsuarioCliente
      }
    ]
  };

  try {
    const { data: { status } } = yield call(Api.put, '/core/v1/usuarios-clientes', data);

    if (status.codigo === 200) {
      yield AsyncStorage.setItem(ACCEPT_TERMS, JSON.stringify(true));
      yield put(AuthActions.termsUseSuccess(true));

      return;
    }

    yield put(AuthActions.termsUseSuccess(false));
    yield put(ToastNotifyActions.toastNotifyShow('Ocorreu uma falha ao aceitar os termos de uso. Por favor tente novamente!', true));
  } catch (err) {
    yield put(AuthActions.termsUseSuccess(false));
    yield put(ToastNotifyActions.toastNotifyShow('Ocorreu uma falha ao aceitar os termos de uso. Por favor tente novamente!', true));
  }
}
