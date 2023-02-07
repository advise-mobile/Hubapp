import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';

import UserActions from 'store/ducks/User';
import AuthAction from 'store/ducks/Auth';
import DeadlineActions from 'store/ducks/Deadlines';
import ToastNotifyActions from 'store/ducks/ToastNotify';

import { getLoggedUser } from 'helpers/Permissions';

const getFilters = filters => {
  let formatted = '&';

  Object.keys(filters).map(key => formatted += `${key}=${filters[key]}&`);

  return formatted.slice(0, -1);
};

export function* getDeadlines({ param }) {
  try {
    const user = yield getLoggedUser();

    yield put(AuthAction.contractsRequest());

    yield delay(200);

    yield put(UserActions.updatePicture());

    const filters = getFilters(param.filters);

    const query = 'ativo=true&campos=*&ordenacao=+dataHoraInicio';
    const paginator = `registrosPorPagina=${param.perPage}&paginaAtual=${param.page}&idUsuarioCliente=${user.idUsuarioCliente}`;

    const { data } = yield call(Api.get, `/core/v1/eventos-agenda?${query}&${paginator}${filters}`);

    const endReached = data.itens.length == 0;

    yield delay(2000);
    yield put(DeadlineActions.deadlinesSuccess({ ...data, endReached }, param.page));
  } catch (error) {
    yield put(DeadlineActions.deadlinesFailure());
    yield put(ToastNotifyActions.toastNotifyShow('Não foi possível carregar os prazos', true));
  }
}

export function* sendDeadlineEmail({ param }) {
  try {
    const data = {
      'idPublicacao': param.idPublicacao || null,
      'idAndamento': param.idAndamento || null,
      'destinatarios': param.destinatarios || null,
      'idEventoAgenda': param.idEventoAgenda || null,
    };

    yield call(Api.post, `/core/v1/envio-email-prazos`, data);

    yield put(ToastNotifyActions.toastNotifyShow('Prazo enviado por email!', false));
    yield put(DeadlineActions.deadlinesEmailSuccess());
  } catch (err) {
    const { status } = err.response;
    if (status !== 401) {
      yield put(DeadlineActions.deadlinesEmailFailure());
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível enviar o prazo por email.',
          true
        )
      );
    }
  }
}

export function* markAsImportant({ param }) {
  const { importante, id, idAgenda } = param;
  try {
    const data = {
      itens: [
        {
          id,
          idAgenda,
          importante,
        },
      ],
    };

    yield call(Api.put, '/core/v1/eventos-agenda', data);

    yield put(DeadlineActions.deadlinesAlterationSuccess({ params: { importante }, id }));

    yield put(ToastNotifyActions.toastNotifyShow(`O prazo foi ${importante ? 'marcado' : 'desmarcado'} como importante`, false));
  } catch (error) {
    console.error(error);
    yield put(ToastNotifyActions.toastNotifyShow('Falha ao marcar prazo!', true));
  }
}

export function* markAsConcluded({ param }) {
  const { concluido, id, idAgenda } = param;
  try {
    const data = {
      itens: [
        {
          id,
          idAgenda,
          concluido,
        },
      ],
    };

    yield call(Api.put, '/core/v1/eventos-agenda', data);

    yield put(DeadlineActions.deadlinesAlterationSuccess({ params: { concluido }, id }));

    yield put(ToastNotifyActions.toastNotifyShow(`O prazo foi ${concluido ? 'marcado' : 'desmarcado'} como concluído`, false));
  } catch (error) {
    yield put(ToastNotifyActions.toastNotifyShow('Não foi possível marcar o prazo como concluído, tente novamente.', true));
  }
}

export function* markAsInactive({ id }) {
  try {
    const data = {
      Ids: [id],
    };

    yield call(Api.put, '/core/v1/eventos-agenda/inativar', data);

    yield put(DeadlineActions.deadlinesAlterationSuccess({ params: { ativo: false }, id }));
    yield put(ToastNotifyActions.toastNotifyShow('Prazo excluído com sucesso!', false));
  } catch (error) {
    yield put(
      ToastNotifyActions.toastNotifyShow('Não foi possível excluir o prazo, tente novamente!', true)
    );
  }
}

export function* getTypes() {
  try {
    const user = getLoggedUser();

    const { data } = yield call(Api.get, `/core/v1/tipos-eventos?campos=*&idCliente=${user.idCliente}`);

    yield put(DeadlineActions.deadlinesTypesSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(ToastNotifyActions.toastNotifyShow('Não foi possível buscar os tipos de prazos.', true));
  }
}

export function* addDeadline({ itens }) {
  try {
    const data = { itens };

    const reponse = yield call(Api.post, '/core/v1/eventos-agenda', data);

    yield put(DeadlineActions.deadlinesProcessSuccess(reponse.data.itens));
    yield put(ToastNotifyActions.toastNotifyShow('Prazo adicionado com sucesso!', false));
  } catch (error) {
    console.log(error);
    yield put(ToastNotifyActions.toastNotifyShow('Não foi possível cadastrar o prazo', true));
    yield put(DeadlineActions.deadlinesProcessFailure());
  }
}


export function* editDeadline({ itens }) {
  try {
    const data = { itens };

    const reponse = yield call(Api.put, '/core/v1/eventos-agenda', data);

    yield put(DeadlineActions.deadlinesProcessSuccess(reponse.data.itens));
    yield put(ToastNotifyActions.toastNotifyShow('Prazo atualizado com sucesso!', false));
  } catch (error) {
    console.log(error);
    yield put(ToastNotifyActions.toastNotifyShow('Não foi possível atualizar o prazo', true));
    yield put(DeadlineActions.deadlinesProcessFailure());
  }
}
