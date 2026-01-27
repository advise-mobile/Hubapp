import Api from '@lservices/Api';
import { call, put, delay } from 'redux-saga/effects';

import AuthAction from '@lstore/ducks/Auth';
import FolderUnreadActions from '@lstore/ducks/FolderUnread';
import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import UserActions from '@lstore/ducks/User';

export function* getFolderUnread() {
  try {
    yield put(AuthAction.contractsRequest());

    yield delay(200);

    yield put(UserActions.updatePicture());

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
