import Api from 'services/Api';
import { call, put } from 'redux-saga/effects';
import { getLoggedUser } from 'helpers/Permissions';

import JournalActions from 'store/ducks/Journal';

export function* getJournal(action) {
  try {
    const user = yield getLoggedUser();

    const { folderKeywordId } = action.param;
    const query = 'campos=*';
    const paginator = 'registrosPorPagina=10000&paginaAtual=1';
    const usersFilters = `&iDsPalavraChave=${folderKeywordId}&idUsuarioCliente=${action.param.userId}&idCliente=${user.idCliente}`;

    let url = `/core/v1/pesquisa-publicacao/consultar?FlListarVariacoes=true?${query}${usersFilters}&${paginator}`;
    if (folderKeywordId) {
      url += '';
    }
    const { data } = yield call(Api.get, url);
    yield put(JournalActions.journalSuccess(data));
  } catch (err) {
    yield put(JournalActions.journalFailure());
  }
}
