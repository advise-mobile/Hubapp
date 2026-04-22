import { api } from '@constants/API';
import { ApiUrl } from '@constants/urls';
import { getLoggedUser } from '@lhelpers/Permissions';
import type {
	JudicialAgenciesResponse,
	JudicialAgencyItem,
	SummonsListItem,
	SummonsListResponse,
	SummonsSourceItem,
	SummonsSourcesResponse,
} from '@models/filters-summons';

export async function fetchCourtsForSummonsFilter(): Promise<
	JudicialAgencyItem[]
> {
	const user = await getLoggedUser();

	const clientUserId = Number(
		(user as { idUsuarioCliente?: number | string }).idUsuarioCliente,
	);

	if (!Number.isFinite(clientUserId)) {
		throw new Error('Missing or invalid idUsuarioCliente on logged user.');
	}

	const queryParams = new URLSearchParams();
	queryParams.set('ativo', 'true');
	queryParams.set('campos', '*');
	queryParams.set('idUsuarioCliente', String(clientUserId));
	queryParams.set('paginaAtual', '1');
	queryParams.set('registrosPorPagina', '999');

	const { data } = await api.get<JudicialAgenciesResponse>(
		`${ApiUrl.COURTS_LOOKUP}?${queryParams.toString()}`,
	);

	return data.itens ?? [];
}

const SUMMONS_LIST_PAGE_SIZE = 20;

export async function fetchSummonsList(): Promise<SummonsListItem[]> {
	const user = await getLoggedUser();

	const clientUserId = Number(
		(user as { idUsuarioCliente?: number | string }).idUsuarioCliente,
	);

	if (!Number.isFinite(clientUserId)) {
		throw new Error('Missing or invalid idUsuarioCliente on logged user.');
	}

	const queryParams = new URLSearchParams();
	queryParams.set('idUsuarioCliente', String(clientUserId));
	queryParams.set('paginaAtual', '1');
	queryParams.set('registrosPorPagina', String(SUMMONS_LIST_PAGE_SIZE));

	const { data } = await api.get<SummonsListResponse>(
		`${ApiUrl.SUMMONS_LIST_LOOKUP}?${queryParams.toString()}`,
	);

	return data.itens ?? [];
}

export async function fetchSystemsForSummonsFilter(
	judicialAgencyId: number,
): Promise<SummonsSourceItem[]> {
	if (!Number.isFinite(judicialAgencyId)) {
		throw new Error('Invalid judicialAgencyId for summons sources lookup.');
	}

	const user = await getLoggedUser();

	const clientUserId = Number(
		(user as { idUsuarioCliente?: number | string }).idUsuarioCliente,
	);

	if (!Number.isFinite(clientUserId)) {
		throw new Error('Missing or invalid idUsuarioCliente on logged user.');
	}

	const queryParams = new URLSearchParams();
	queryParams.set('campos', '*');
	queryParams.set('idOrgaoJudiciario', String(judicialAgencyId));
	queryParams.set('idUsuarioCliente', String(clientUserId));
	queryParams.set('tipoAcesso', '-1,-2');
	queryParams.set('paginaAtual', '1');
	queryParams.set('registrosPorPagina', '999');

	const { data } = await api.get<SummonsSourcesResponse>(
		`${ApiUrl.SUMMONS_SOURCES_LOOKUP}?${queryParams.toString()}`,
	);

	return data.itens ?? [];
}
