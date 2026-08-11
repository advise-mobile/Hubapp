import { api } from '@constants/API';
import { ApiUrl } from '@constants/urls';
import { USE_SUMMONS_LIST_MOCK } from '@constants/environment';
import { getLoggedUser } from '@lhelpers/Permissions';
import type { SummonsFilters } from '@models/summons-hooks-types';
import { summonsFiltersToQueryParams } from '@models/summons-filters';
import type {
	JudicialAgenciesResponse,
	JudicialAgencyItem,
	SummonsSourceItem,
	SummonsSourcesResponse,
} from '@models/filters-summons';
import { isSelectableCourtSourceForApp } from '@models/filters-summons';
import type { SummonsDetailResponse } from '@models/summons-detail';
import type { SendSummonsEmailInput } from '@models/summons-email';
import type { DeleteSummonsInput } from '@models/summons-delete';
import type { SummonsListPageResponse } from '@models/summons-list';
import { getMockSummonsListPage } from '@pages/Summons/mocks/summons-list-mock';

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

export const SUMMONS_LIST_PAGE_SIZE = 20;

async function resolveClientUserId(): Promise<number> {
	const user = await getLoggedUser();
	const clientUserId = Number(
		(user as { idUsuarioCliente?: number | string }).idUsuarioCliente,
	);

	if (!Number.isFinite(clientUserId)) {
		throw new Error('Missing or invalid idUsuarioCliente on logged user.');
	}

	return clientUserId;
}

export async function fetchSummonsListPage(
	page: number,
	filters: SummonsFilters = {},
): Promise<SummonsListPageResponse> {
	if (USE_SUMMONS_LIST_MOCK) {
		return getMockSummonsListPage(page, SUMMONS_LIST_PAGE_SIZE);
	}

	const clientUserId = await resolveClientUserId();

	const queryParams = new URLSearchParams();
	queryParams.set('idUsuarioCliente', String(clientUserId));
	queryParams.set('paginaAtual', String(page));
	queryParams.set('registrosPorPagina', String(SUMMONS_LIST_PAGE_SIZE));

	const listFilters = summonsFiltersToQueryParams(filters);
	Object.entries(listFilters).forEach(([key, value]) => {
		queryParams.set(key, value);
	});

	const { data } = await api.get<SummonsListPageResponse>(
		`${ApiUrl.SUMMONS_LIST_LOOKUP}?${queryParams.toString()}`,
	);

	return data;
}

export async function fetchSummonsList() {
	const page = await fetchSummonsListPage(1);
	return page.itens ?? [];
}

export async function fetchSummonsDetail(
	idMovProcUsuarioCliente: number,
): Promise<SummonsDetailResponse> {
	const clientUserId = await resolveClientUserId();

	const { data } = await api.put<SummonsDetailResponse>(
		ApiUrl.SUMMONS_DETAIL_LOOKUP,
		{
			itens: [
				{
					idUsuarioCliente: String(clientUserId),
					IdMovProcUsuarioCliente: [idMovProcUsuarioCliente],
				},
			],
		},
	);

	return data;
}

export async function markSummonsAsRead(params: {
	id: number;
	idMovProcessoCliente: number;
}): Promise<void> {
	const clientUserId = await resolveClientUserId();

	await api.put(ApiUrl.SUMMONS_MARK_READ, {
		itens: [
			{
				id: params.id,
				idMovProcessoCliente: params.idMovProcessoCliente,
				idUsuarioCliente: String(clientUserId),
			},
		],
	});
}

export async function unmarkSummonsAsRead(params: {
	id: number;
	idMovProcessoCliente: number;
}): Promise<void> {
	const clientUserId = await resolveClientUserId();

	await api.put(ApiUrl.SUMMONS_UNMARK_READ, {
		itens: [
			{
				id: params.id,
				idMovProcessoCliente: params.idMovProcessoCliente,
				idUsuarioCliente: String(clientUserId),
			},
		],
	});
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
	// Retorno APP item 9: API espera params repetidos (não "-1,-2" em um único valor).
	queryParams.append('tipoAcesso', '-1');
	queryParams.append('tipoAcesso', '-2');
	queryParams.set('paginaAtual', '1');
	queryParams.set('registrosPorPagina', '999');

	const { data } = await api.get<SummonsSourcesResponse>(
		`${ApiUrl.SUMMONS_SOURCES_LOOKUP}?${queryParams.toString()}`,
	);

	// Rede de segurança: API às vezes ainda devolve certificado (-3).
	return (data.itens ?? []).filter(isSelectableCourtSourceForApp);
}

export async function sendSummonsEmail(
	input: SendSummonsEmailInput,
): Promise<void> {
	await api.post(ApiUrl.SUMMONS_SEND_EMAIL, {
		idsMovimentos: input.idMovProcessoCliente,
		destinatarios: input.destinatarios,
	});
}

export async function deleteSummons(input: DeleteSummonsInput): Promise<void> {
	const clientUserId = await resolveClientUserId();

	await api.put(ApiUrl.SUMMONS_DELETE, [
		{
			idPastaUsuarioCliente: input.idPastaUsuarioCliente,
			idMovimentoProcessoCliente: input.idMovimentoProcessoCliente,
			idUsuarioCliente: String(clientUserId),
			excluirPrazosVinculados: true,
		},
	]);
}
