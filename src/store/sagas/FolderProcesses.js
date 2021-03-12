import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';

import FolderProcessesActions from 'store/ducks/FolderProcesses';
import { getLogin } from '../../services/Api';

export function* getFolderProcesses(action) {
  try {
    const { page, perPage } = action.params;
    const query = 'campos=*&idTipoPasta=-3&ativo=true';

    yield getLogin();
    yield delay(300);

    const paginator = `paginaAtual=${page}&registrosPorPagina=${perPage}`;

    const { data } = yield call(
      Api.get,
      `/core/v1/pastas-usuarios-clientes?${query}&${paginator}`
    );

    const endReached = data.itens.length == 0;

    const movementsNotRead = data.itens.map(folder => folder.totalNaoLidas).reduce((a, b) => a + b, 0);

    yield put(FolderProcessesActions.folderProcessesSuccess({ ...data, endReached, movementsNotRead }));
  } catch (err) {
    yield put(FolderProcessesActions.folderProcessesFailure());
  }
}
