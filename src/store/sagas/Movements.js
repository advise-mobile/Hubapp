import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';

import AuthAction from 'store/ducks/Auth';
import MovementsTypes from 'store/ducks/Movements';
import ToastNotifyActions from 'store/ducks/ToastNotify';
import UserActions from 'store/ducks/User';
import { FormatDateInFull, FormatDateBR } from 'helpers/DateFunctions';
import { MaskCnj } from 'helpers/Mask';

import { getLoggedUser } from 'helpers/Permissions';

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
    const query = `IdsPalavraChave=${params.idPalavraChave}`;

    const { data } = yield call(
      Api.get,
      `/core/v1/diarios/usuario-grupo?${query}`
    );

    const diaries = data.itens.sort((a, b) => (a.nomeDiario > b.nomeDiario) ? 1 : ((b.nomeDiario > a.nomeDiario) ? -1 : 0));

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

    

    yield put(AuthAction.contractsRequest());

    yield put(UserActions.updatePicture());

    let { data } = yield call(
      Api.get,
      `/core/v1/movimentos-pastas-usuarios-clientes?${query}&${paginator}${queryFilters}`
    );

    data.itens.map(movement => movement.checked = false);

    const optmizedMovements = data.itens.map(movement => {
      const {
        id,
        lido,
        idMovProcessoCliente,
        idPastaUsuarioCliente,
        movimento: {
          dataHoraMovimento,
          idTipoMovProcesso,
          andamentoProcesso,
          publicacao,
        }
      } = movement;

      const formatedDate = FormatDateBR(dataHoraMovimento);

      let optmizedMovement = {
        id,
        lido,
        idTipoMovProcesso,
        idMovProcessoCliente,
        idPastaUsuarioCliente
      }

      if (andamentoProcesso) {

        const {
          siglaOrgaoJudiriario,
          nomeFontePesquisa,
          resumo,
          numeroProcesso,
        } = andamentoProcesso;

        optmizedMovement = {
          ...optmizedMovement,
          resumo,
          numeroProcesso: MaskCnj(numeroProcesso),
          title: `${formatedDate} - ${siglaOrgaoJudiriario} - ${nomeFontePesquisa && nomeFontePesquisa}`,
        };

      }

      if (publicacao) {

        const {
          resumo,
          descricaoCadernoDiario,
          dataPublicacaoDiarioEdicao,
          palavrasChaves,
          processosPublicacoes,
        } = publicacao;

        const dataPublicacao = FormatDateBR(dataPublicacaoDiarioEdicao);

        optmizedMovement = {
          ...optmizedMovement,
          resumo,
          dataPublicacao,
          palavrasChaves,
          title: `${formatedDate} - ${descricaoCadernoDiario}`,
        };

        if (processosPublicacoes?.length > 0) {
          optmizedMovement.numeroProcesso = MaskCnj(processosPublicacoes[0].numeroProcesso);
        }

      }

      return optmizedMovement;
    });

    const endReached = data.itens.length == 0;

    if (refreshing)
      yield put(MovementsTypes.movementsRefreshSuccess(optmizedMovements, params.page, endReached));
    else
      yield put(MovementsTypes.movementsSuccess(optmizedMovements, params.page, endReached));

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

export function* sendMovementsEmail({ param }) {
  try {
    const data = {
      'destinatarios': param.destinatarios || null,
      'idsMovimentos': param.idsMovimentos || null,
    };

    yield call(Api.post, `/core/v1/envio-email-movimentos`, data);

    yield put(ToastNotifyActions.toastNotifyShow('Movimentação enviada por email!', false));
    yield put(MovementsTypes.movementsEmailSuccess());
  } catch (err) {
    const { status } = err.response;
    if (status !== 401) {
      yield put(MovementsTypes.movementsEmailFailure());
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível enviar o movimento por email.',
          true
        )
      );
    }
  }
}

export function* deleteMovement({ params }) {
  try {
    const { idUsuarioCliente } = yield getLoggedUser();

    const data = [{ ...params, idUsuarioCliente }];

    yield call(Api.put, `/core/v1/pastas-usuarios-clientes/desvincular-movimento`, data);

    yield put(ToastNotifyActions.toastNotifyShow('Movimentação excluída com sucesso!', false));
    yield put(MovementsTypes.deleteMovementProceeded());
  } catch (err) {
    console.error(err);

    const { status } = err.response;
    if (status !== 401) {
      yield put(MovementsTypes.deleteMovementProceeded());
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível excluir o movimento.',
          true
        )
      );
    }
  }
}

export function* deleteLogicalMovement({ params }) {
  try {
    const { idUsuarioCliente } = yield getLoggedUser();
  
    const data = [{ ...params, idUsuarioCliente }];

    yield call(Api.put, `/core/v1/movimentos-usuarios-clientes/enviar-lixeira`, data);

    yield put(ToastNotifyActions.toastNotifyShow('Movimentação excluída com sucesso!', false));
  } catch (err) {
    console.error(err);

    const { status } = err.response;
    if (status !== 401) {
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível excluir o movimento.',
          true
        )
      );
    }
  }finally {
    yield put(MovementsTypes.deleteMovementProceeded());
  }
}
