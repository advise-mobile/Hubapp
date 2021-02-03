import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';
import { getLoggedUser } from 'helpers/Permissions';

import MovementsTypes from 'store/ducks/Movements';
import ToastNotifyActions from 'store/ducks/ToastNotify';

import { getLogin } from '../../services/Api';

import { removeDuplicateById } from 'helpers/ArrayUtils';

// import moment from 'moment';

// const selectedKeywords = filters.keywords;
// if (selectedKeywords && selectedKeywords.length > 0) {
//   result += '&idsPalavrasChaves=';
//   for (let index = 0; index < selectedKeywords.length; index++) {
//     result += `${selectedKeywords[index]}`;

//     if (index !== selectedKeywords.length - 1) {
//       result += ',';
//     }
//   }
// }

// const selectedJournals = filters.journals;
// if (selectedJournals && selectedJournals.length > 0) {
//   result += '&idsDiarios=';
//   for (let index = 0; index < selectedJournals.length; index++) {
//     result += `${selectedJournals[index]}`;

//     if (index !== selectedJournals.length - 1) {
//       result += ',';
//     }
//   }
// }

function getFilterString(filters) {
  let result = '';

  if (!filters) result;

  Object.keys(filters).map(key => result += (filters[key] != null) && `${key}=${filters[key]}&` || '');

  return `&${result.slice(0, -1)}`;
}

export function* getDiaries({ params }) {
  try {
    yield getLogin();
    yield delay(200);

    const userInfo = yield getLoggedUser();
    const query = `campos=diario&FlListarVariacoes=true&idCliente=${userInfo.idCliente}&idPalavraChave=${params.idPalavraChave}&idUsuarioCliente=${userInfo.idUsuarioCliente}`;

    const { data } = yield call(
      Api.get,
      `/core/v1/pesquisa-publicacao/consultar?${query}`
    );

    const searchPublications = data.itens[0].listaPesqPublicUsuarioCliente;

    const diaries = removeDuplicateById(searchPublications.map(searchActive => searchActive.diario), 'id').sort((a, b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0));

    // const diaries = searchPublications.filter(search => search.flAtivo).map(searchActive => searchActive.diario).sort((a, b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0));

    yield put(MovementsTypes.diariesSuccess(diaries));
    return;
  } catch (err) {
    yield put(
      ToastNotifyActions.toastNotifyShow(
        'Não foi possível carregar as Publicações',
        true
      )
    );
  }
}

export function* getTribunals({ params }) {
  try {
    yield getLogin();
    yield delay(200);

    const query = `campos=idOrgaoJudiciario,nomeOrgaoJudiciario&numeroProcesso=${params.processNumber}`;

    const { data } = yield call(
      Api.get,
      `/core/v1/processos-solicitados/orgaos-judiciarios?${query}`
    );

    yield put(MovementsTypes.tribunalsSuccess(data.itens));
    return;
  } catch (err) {
    yield put(
      ToastNotifyActions.toastNotifyShow(
        'Não foi possível carregar as Publicações',
        true
      )
    );
  }
}

export function* getMovements({ params }) {
  try {
    const { filters, refreshing } = params;

    const queryFilters = getFilterString(filters);

    const query = `campos=*&ordenacao=-dataPublicacao&idPastaUsuarioCliente=${params.folderId}`;
    const paginator = `registrosPorPagina=${params.perPage}&paginaAtual=${params.page}`;

    yield getLogin();
    yield delay(200);

    let { data } = yield call(
      Api.get,
      `/core/v1/movimentos-pastas-usuarios-clientes?${query}&${paginator}${queryFilters}`
    );

    data.itens.map(movement => movement.checked = false);

    const endReached = data.itens.length == 0;

    if (refreshing)
      yield put(MovementsTypes.movementsRefreshSuccess({ ...data, endReached }, params.page));
    else
      yield put(MovementsTypes.movementsSuccess({ ...data, endReached }, params.page));

    return;
  } catch (err) {
    console.error(err);
    yield put(
      ToastNotifyActions.toastNotifyShow(
        'Não foi possível carregar as Publicações',
        true
      )
    );
  }
}
