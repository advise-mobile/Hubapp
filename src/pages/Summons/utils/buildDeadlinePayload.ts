import moment from 'moment';

import type {
	CreateLinkedDeadlineInput,
	LinkedDeadlinePayloadItem,
} from '@models/summons-deadline';

export function buildDeadlinePayload(
	input: CreateLinkedDeadlineInput,
): LinkedDeadlinePayloadItem {
	const finalDate = input.date ?? new Date();
	const datePart = moment(finalDate).format('YYYY-MM-DD');
	const hourPart = input.diaInteiro ? '00:00' : input.hour || '00:00';
	const dataHoraInicio = `${datePart}T${hourPart}:59`;
	const dataHoraFim = input.diaInteiro
		? moment(dataHoraInicio).format('YYYY-MM-DDT23:59:00')
		: moment(dataHoraInicio).add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss');

	return {
		titulo: input.titulo,
		idAgenda: input.idAgenda,
		dataHoraFim,
		dataHoraInicio,
		sincronizado: false,
		idRepetEventoAgenda: -1,
		idOpcaoLembreteAgenda: -1,
		observacao: input.observacao ?? '',
		localizacao: input.localizacao ?? '',
		diaInteiro: input.diaInteiro,
		idTipoEventoAgenda: input.idTipoEventoAgenda,
		idsMovProcessosVinculados: [
			{ idMovProcessoCliente: input.idMovProcessoCliente },
		],
	};
}
