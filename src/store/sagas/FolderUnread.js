import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';

import AuthAction from 'store/ducks/Auth';
import FolderUnreadActions from 'store/ducks/FolderUnread';
import ToastNotifyActions from 'store/ducks/ToastNotify';
import UserActions from 'store/ducks/User';

import { getLogin } from '../../services/Api';

export function* getFolderUnread() {
  try {
    const userData = yield getLogin();

    yield put(AuthAction.contractsRequest());

    yield delay(200);

    if (userData.foto) {
      yield put(UserActions.updatePicture(userData.foto));
    }

    const { data } = yield call(
      Api.get,
      '/core/v1/pastas-usuarios-clientes?campos=*&idTipoPasta=-1'
    );

    const dataResource = {
      id: data.itens[0].id,
      typeId: data.itens[0].idTipoPasta,
      totalItems: data.itens[0].totalNaoLidas,
    };

    yield put(FolderUnreadActions.folderUnreadSuccess(dataResource));
  } catch (err) {
    if (err) {
      const { status } = err.response;
      if (status !== 401) {
        yield put(FolderUnreadActions.folderUnreadFailure());
        yield put(
          ToastNotifyActions.toastNotifyShow(
            'Não foi possível carregar a pasta não lidas',
            true
          )
        );
      }
    }
  }
}
