import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';

import ProcessActions from '../ducks/Process';
import ToastNotifyActions from 'store/ducks/ToastNotify';
import FilterStore from 'store/MovementFiltersStore';

import { getLogin } from '../../services/Api';

function getFilterString(filters: FilterStore): string {
  let result = '';
  if (!filters) {
    return result;
  }

  const selectedTribubals = filters.tribunal;
  if (selectedTribubals && selectedTribubals.length > 0) {
    result += '&idsOrgaosJudiciarios=';
    for (let index = 0; index < selectedTribubals.length; index++) {
      result += `${selectedTribubals[index]}`;

      if (index !== selectedTribubals.length - 1) {
        result += ',';
      }
    }
  }
  return result;
}

export function* getProcess(action) {
  try {
    const { param } = action;
    const { filters } = param;

    const queryFilters = getFilterString(filters);
    const paginator = `registrosPorPagina=${param.perPage}&paginaAtual=${param.page}`;

    yield getLogin();
    yield delay(700);

    const fonts = yield call(
      Api.get,
      `/core/v1/processos-clientes/fontes-processos?IdProcesso=${param.processId}&campos=*&registrosPorPagina=20`
    );

    const processHeaders = yield call(
      Api.get,
      `/core/v1/cabecalhos-processos?idFonteProcesso=${fontProcessId}&ids=${param.processId}`
    );

    const fontProcessId =
      fonts.data.itens[0].fontesPesquisas[0].idFonteProcesso;

    const query = `idFonteProcesso=${fontProcessId}&idPastaUsuarioCliente=${param.folderId}`;

    let { data } = yield call(
      Api.get,
      `/core/v1/movimentos-pastas-usuarios-clientes?${query}${queryFilters}&${paginator}`
    );

    yield put(
      ProcessActions.processSuccess({ ...data, processHeaders }, param.page)
    );
  } catch (err) {
    yield put(
      ToastNotifyActions.toastNotifyShow(
        'Não foi possível carregar as movimentações',
        true
      )
    );
  }
}
