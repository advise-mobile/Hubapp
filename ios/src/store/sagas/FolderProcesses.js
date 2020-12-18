import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';

import FolderProcessesActions from 'store/ducks/FolderProcesses';
import { getLogin } from '../../services/Api';

export function* getFolderProcesses() {
  try {
    const query = 'campos=*&idTipoPasta=-3';
    const paginator = 'registrosPorPagina=100000';

    yield getLogin();
    yield delay(700);

    let { data } = yield call(
      Api.get,
      `/core/v1/pastas-usuarios-clientes?${query}&${paginator}`
    );
    yield put(FolderProcessesActions.folderProcessesSuccess(data));
  } catch (err) {
    yield put(FolderProcessesActions.folderProcessesFailure());
  }
}
