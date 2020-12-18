import Api from 'services/Api';
import { call, put } from 'redux-saga/effects';

import DeadlineAddActions from 'store/ducks/DeadlineAdd';
import ToastNotifyActions from 'store/ducks/ToastNotify';

import jwtDecode from 'jwt-decode';
import moment from 'moment';

const APP_DATE_FORMAT = 'DD/MM/YYYY';
const API_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

export function* postDeadline(action) {
  try {
    const { deadline } = action;
    const { date } = deadline;
    const { idCliente } = jwtDecode(deadline.token);

    const dataHoraInicio = moment(date.day, APP_DATE_FORMAT).add(
      moment.duration(date.hour)
    );
    const dataHoraFim = dataHoraInicio.clone().add(1, 'h');

    let dataFimRepeticao;
    if (deadline.repeat.finalHour) {
      dataFimRepeticao = moment(deadline.repeat.finalHour, APP_DATE_FORMAT)
        .format(API_DATE_FORMAT)
        .toString();
    }

    const data = {
      itens: [
        {
          idUsuarioCliente: idCliente,
          idAgenda: deadline.scheduleId,
          titulo: deadline.title,
          diaInteiro: date.fullTime,
          dataHoraInicio: dataHoraInicio.format(API_DATE_FORMAT),
          dataHoraFim: dataHoraFim.format(API_DATE_FORMAT),
          horaInicioEventoAgenda: date.fullTime ? undefined : date.hour,
          ativo: true,
          importante: false,
          concluido: false,
          idRepetEventoAgenda: deadline.repeat.id,
          dataFimRepeticao,
          idTipoEventoAgenda: deadline.badge.id,
          idOpcaoLembreteAgenda: deadline.reminder.id,
          localizacao: deadline.location,
          observacao: deadline.observation,
        },
      ],
    };

    const { data: response } = yield call(
      Api.post,
      '/core/v1/eventos-agenda',
      data
    );

    yield put(
      DeadlineAddActions.postDeadlineSuccess({
        success: true,
        id: response.itens[0].id,
      })
    );

    yield put(
      ToastNotifyActions.toastNotifyShow('Prazo cadastrado com sucesso!', false)
    );
  } catch (error) {
    yield put(
      DeadlineAddActions.postDeadlineFailure(
        'Não foi possível cadastrar o prazo. Tente novamente mais tarde.'
      )
    );
  }
}

export function* putDeadline(action) {
  try {
    const { deadline } = action;
    const { date } = deadline;

    const dataHoraInicio = moment(date.day, APP_DATE_FORMAT).add(
      moment.duration(date.hour)
    );
    const dataHoraFim = dataHoraInicio.clone().add(1, 'h');

    let dataFimRepeticao;
    if (deadline.repeat.finalHour) {
      dataFimRepeticao = moment(deadline.repeat.finalHour, APP_DATE_FORMAT)
        .format(API_DATE_FORMAT)
        .toString();
    }

    const data = {
      itens: [
        {
          id: deadline.id,
          idAgenda: deadline.scheduleId,
          titulo: deadline.title,
          diaInteiro: deadline.date.fullTime,
          dataHoraInicio: dataHoraInicio.format(API_DATE_FORMAT),
          dataHoraFim: dataHoraFim.format(API_DATE_FORMAT),
          idRepetEventoAgenda: deadline.repeat.id,
          idTipoEventoAgenda: deadline.badge.id,
          idOpcaoLembreteAgenda: deadline.reminder.id,
          localizacao: deadline.location,
          observacao: deadline.observation,
          dataFimRepeticao,
        },
      ],
    };

    yield call(Api.put, '/core/v1/eventos-agenda', data);
    yield put(DeadlineAddActions.putDeadlineStatus({ success: true }));

    yield put(
      ToastNotifyActions.toastNotifyShow('Prazo alterado com sucesso!', false)
    );
  } catch (error) {
    yield put(DeadlineAddActions.putDeadlineStatus({ success: false }));
  }
}

export function* getScheduleId(action) {
  try {
    const { token } = action;
    const { idCliente } = jwtDecode(token);

    const { data } = yield call(
      Api.get,
      `/core/v1/agendas?idUsuarioCliente=${idCliente}&ativo=true`
    );

    yield put(DeadlineAddActions.getScheduleIdStatus(data.itens[0].id));
  } catch (error) {
    yield put(DeadlineAddActions.getScheduleIdStatus());
  }
}
