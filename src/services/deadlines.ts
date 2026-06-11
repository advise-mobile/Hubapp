import { api } from '@constants/API';
import { ApiUrl } from '@constants/urls';
import { getLoggedUser } from '@lhelpers/Permissions';
import type {
	CreateLinkedDeadlineInput,
	EventTypeItem,
	EventTypesResponse,
	UserAgendasResponse,
} from '@models/summons-deadline';

import { buildDeadlinePayload } from '@pages/Summons/utils/buildDeadlinePayload';

async function resolveClientIds(): Promise<{
	idUsuarioCliente: number;
	idCliente: number;
}> {
	const user = await getLoggedUser();
	const idUsuarioCliente = Number(
		(user as { idUsuarioCliente?: number | string }).idUsuarioCliente,
	);
	const idCliente = Number((user as { idCliente?: number | string }).idCliente);

	if (!Number.isFinite(idUsuarioCliente)) {
		throw new Error('Missing or invalid idUsuarioCliente on logged user.');
	}

	if (!Number.isFinite(idCliente)) {
		throw new Error('Missing or invalid idCliente on logged user.');
	}

	return { idUsuarioCliente, idCliente };
}

export async function fetchEventTypes(): Promise<EventTypeItem[]> {
	const { idCliente } = await resolveClientIds();

	const queryParams = new URLSearchParams();
	queryParams.set('ativo', 'true');
	queryParams.set('campos', 'id,nome');
	queryParams.set('idCliente', String(idCliente));

	const { data } = await api.get<EventTypesResponse>(
		`${ApiUrl.EVENT_TYPES_LOOKUP}?${queryParams.toString()}`,
	);

	return data.itens ?? [];
}

export async function fetchUserAgendaId(): Promise<number> {
	const { idUsuarioCliente } = await resolveClientIds();

	const queryParams = new URLSearchParams();
	queryParams.set('campos', '*');
	queryParams.set('idUsuarioCliente', String(idUsuarioCliente));

	const { data } = await api.get<UserAgendasResponse>(
		`${ApiUrl.USER_AGENDAS_LOOKUP}?${queryParams.toString()}`,
	);

	return data.itens?.[0]?.id ?? 0;
}

export async function createLinkedDeadline(
	input: CreateLinkedDeadlineInput,
): Promise<void> {
	const payloadItem = buildDeadlinePayload(input);

	await api.post(ApiUrl.EVENTS_AGENDA_CREATE, {
		itens: [payloadItem],
	});
}
