import Api from 'services/Api';
import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthActions from 'store/ducks/Auth';
import ToastNotifyActions from 'store/ducks/ToastNotify';

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
        email,
        password,
      })
    );

    yield put(AuthActions.loginSuccess(response.data));
  } catch (err) {
    if (err.response) {
      yield put(AuthActions.loginFailure());
      yield put(
        ToastNotifyActions.toastNotifyShow(
          err.response.data.status.erros[0].mensagem,
          true
        )
      );
    } else {
      yield put(AuthActions.loginFailure());
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Não conseguimos realizar seu login. Por favor tente novamente!',
          true
        )
      );
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
