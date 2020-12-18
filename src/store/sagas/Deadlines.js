import Api from 'services/Api';
import { call, put, delay } from 'redux-saga/effects';

import DeadlineActions from 'store/ducks/Deadlines';
import ToastNotifyActions from 'store/ducks/ToastNotify';

import moment from 'moment';

const DATE_FORMAT = 'DD/MM/YYYY';
const HOUR_FORMAT = 'HH:mm';

export function* getDeadlines() {
  try {
    const query = 'ativo=true&campos=*';
    const paginator = 'registrosPorPagina=100000&paginaAtual=1';

    const { data } = yield call(
      Api.get,
      `/core/v1/eventos-agenda?${query}&${paginator}`
    );
    yield delay(2000);
    yield put(
      DeadlineActions.deadlinesSuccess(
        data.itens.map(value => {
          let movement = {};
          if (value.idsMovimentosProcesso.length > 0) {
            const movementsProcess = value.idsMovimentosProcesso[0];
            movement = {
              id: movementsProcess.idMovimentosProcesso,
              typeId: movementsProcess.idTipoMovProcesso,
            };
          }

          return {
            id: value.id,
            scheduleId: value.idAgenda,
            title: value.titulo,
            important: value.importante,
            concluded: value.concluido,
            badge: {
              title: value.tipoEventoAgenda,
              id: value.idTipoEventoAgenda,
            },
            reminder: {
              title: value.opcaoLembreteAgenda,
              id: value.idOpcaoLembreteAgenda,
            },
            repeat: {
              title: value.tipoRepeticao,
              id: value.idRepetEventoAgenda,
              finalHour: value.dataFimRepeticao,
            },
            location: value.localizacao,
            observation: value.observacao,
            date: {
              fullTime: value.diaInteiro,
              day: moment(value.dataEventoAgenda)
                .format(DATE_FORMAT)
                .toString(),
              hour: moment(value.horaInicioEventoAgenda, 'HH:mm:ss')
                .format(HOUR_FORMAT)
                .toString(),
            },
            movement,
          };
        })
      )
    );
  } catch (error) {
    yield put(DeadlineActions.deadlinesFailure());
  }
}

export function* putDeadlineImportant(action) {
  const { important, deadline } = action;
  try {
    const data = {
      itens: [
        {
          id: deadline.id,
          idAgenda: deadline.scheduleId,
          importante: important,
        },
      ],
    };

    const response = yield call(Api.put, '/core/v1/eventos-agenda', data);

    yield put(
      DeadlineActions.putDeadlineImportantStatus({
        data: response.data,
        value: important,
      })
    );

    if (important) {
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'O prazo foi marcada como importante',
          false
        )
      );
    } else {
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'O prazo foi desmarcada como importante',
          false
        )
      );
    }
  } catch (error) {
    yield put(
      DeadlineActions.putDeadlineImportantStatus({
        error: true,
        value: important,
      })
    );
    yield put(
      ToastNotifyActions.toastNotifyShow('Falha ao marcar prazo!', true)
    );
  }
}

export function* putDeadlineConcluded(action) {
  const { concluded, deadline } = action;
  try {
    const data = {
      itens: [
        {
          id: deadline.id,
          idAgenda: deadline.scheduleId,
          concluido: concluded,
        },
      ],
    };

    const response = yield call(Api.put, '/core/v1/eventos-agenda', data);

    yield put(
      DeadlineActions.putDeadlineConcludedStatus({
        data: response.data,
        value: concluded,
      })
    );

    if (concluded) {
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'O prazo foi marcada como concluído',
          false
        )
      );
    } else {
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'O prazo foi desmarcada como concluído',
          false
        )
      );
    }
  } catch (error) {
    yield put(
      DeadlineActions.putDeadlineConcludedStatus({
        error: true,
        value: concluded,
      })
    );

    yield put(
      ToastNotifyActions.toastNotifyShow(
        'Não foi possível marcar o prazo como concluído, tente novamente.',
        true
      )
    );
  }
}

export function* putDeadlineInnactive(action) {
  const { id } = action;
  try {
    const data = {
      Ids: [id],
    };

    yield call(Api.put, '/core/v1/eventos-agenda/inativar', data);

    yield put(DeadlineActions.putDeadlineInnactiveStatus({ error: false }));
    yield put(
      ToastNotifyActions.toastNotifyShow('Prazo excluído com sucesso!', false)
    );
  } catch (error) {
    yield put(DeadlineActions.putDeadlineInnactiveStatus({ error: true }));
    yield put(
      ToastNotifyActions.toastNotifyShow(
        'Não foi possível excluir o prazo, tente novamente!',
        true
      )
    );
  }
}
