import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';

import MovementsTypes from 'store/ducks/Movements';
import ToastNotifyActions from 'store/ducks/ToastNotify';

import { getLogin } from '../../services/Api';

import moment from 'moment';

function getFilterString(filters) {
  let result = '';
  if (!filters) {
    return result;
  }

  const selectedKeywords = filters.keywords;
  if (selectedKeywords && selectedKeywords.length > 0) {
    result += '&idsPalavrasChaves=';
    for (let index = 0; index < selectedKeywords.length; index++) {
      result += `${selectedKeywords[index]}`;

      if (index !== selectedKeywords.length - 1) {
        result += ',';
      }
    }
  }

  const selectedJournals = filters.journals;
  if (selectedJournals && selectedJournals.length > 0) {
    result += '&idsDiarios=';
    for (let index = 0; index < selectedJournals.length; index++) {
      result += `${selectedJournals[index]}`;

      if (index !== selectedJournals.length - 1) {
        result += ',';
      }
    }
  }

  return result;
}

function getPublicationDate(filters) {
  let result = '';

  if (filters && filters.disponibilityDate) {
    const APP_FORMAT = 'DD-MM-YYYY';
    const API_FORMAT = 'YYYY-MM-DD';
    const initialDate = moment(
      filters.disponibilityDate.initialDate,
      APP_FORMAT
    )
      .format(API_FORMAT)
      .toString();
    const finalDate = moment(filters.disponibilityDate.finalDate, APP_FORMAT)
      .format(API_FORMAT)
      .toString();

    result = `DataFimMovimento=${finalDate}&DataInicioMovimento=${initialDate}`;
  } else {
    const today = moment(new Date()).format('Y-MM-DD');
    const pastDay = moment(moment(today).add(-30, 'days')).format('Y-MM-DD');
    result = `DataFimMovimento=${today}&DataInicioMovimento=${pastDay}`;
  }

  return result;
}

export function* getMovements(action) {
  try {
    const { param } = action;
    const { filters } = param;

    let readFilter = '';

    if (filters) {
      if (filters.situation) {
        if (filters.situation.read) {
          readFilter = 'true';
        }
        if (filters.situation.notRead) {
          readFilter = 'false';
        }
      }
    }

    const query = `idPastaUsuarioCliente=${param.folderId}`;

    const read = `&lido=${param.folderRead ? param.folderRead : readFilter}`;
    const queryFilters = getFilterString(filters);
    const paginator = `registrosPorPagina=${param.perPage}&paginaAtual=${param.page}`;

    let response = [];

    const dateFilter = getPublicationDate(filters);

    yield getLogin();
    yield delay(700);

    response = yield call(
      Api.get,
      `/core/v1/publicacoes-clientes/consulta-paginada?${dateFilter}&campos=*&ordenacao=-dataPublicacao${queryFilters}${read}&${paginator}`
    );

    yield put(MovementsTypes.movementsSuccess(response.data, param.page));

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
