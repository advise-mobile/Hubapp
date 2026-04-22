import { api } from '@constants/API';
import { ApiUrl } from '@constants/urls';
import { getLoggedUser } from '@lhelpers/Permissions';
import type {
	CreateCourtCredentialInput,
	CreateCourtCredentialRequestBody,
} from '@models/courts-credentials';
import type { ConsultaCadastroAcessosListFilters } from '@models/court-registrations-filters';
import type {
	ActivateCourtRegistrationResponse,
	ConsultaCadastroAcessosResponse,
	DeleteCourtRegistrationResponse,
	InactivateCourtRegistrationResponse,
} from '@models/court-register';
import type {
	UserClientFeatureCreditItem,
	UserClientFeatureCreditListResponse,
} from '@models/courts-access-credit';

const COURTS_MANAGEMENT_FUNCTIONALITY_ID = -72;

type JwtUserShape = {
	idUsuarioCliente?: number | string;
	nome?: string;
};

export const COURTS_REGISTRATIONS_PAGE_SIZE = 10;

export async function fetchCourtsAccessCredit(): Promise<UserClientFeatureCreditItem> {
	const queryParams = new URLSearchParams();
	queryParams.set(
		'idFuncionalidade',
		String(COURTS_MANAGEMENT_FUNCTIONALITY_ID),
	);

	const { data } = await api.get<UserClientFeatureCreditListResponse>(
		`${ApiUrl.USER_CLIENT_FEATURE_CREDIT_LOOKUP}?${queryParams.toString()}`,
	);

	return data.itens?.[0] ?? {};
}

export async function fetchCourtsRegistrationsPage(
	page: number,
	listFilters?: ConsultaCadastroAcessosListFilters | null,
): Promise<ConsultaCadastroAcessosResponse> {
	const user = (await getLoggedUser()) as JwtUserShape;

	const clientUserId = Number(user.idUsuarioCliente);
	if (!Number.isFinite(clientUserId)) {
		throw new Error('Missing or invalid idUsuarioCliente on logged user.');
	}

	const queryParams = new URLSearchParams();
	queryParams.set('campos', '*');
	queryParams.set('paginaAtual', String(page));
	queryParams.set('registrosPorPagina', String(COURTS_REGISTRATIONS_PAGE_SIZE));
	queryParams.set('idUsuarioCliente', String(clientUserId));

	if (listFilters != null) {
		const idsSit = listFilters.idsSitPesqIntimacaoUsCliente;
		if (typeof idsSit === 'string' && idsSit.trim() !== '') {
			queryParams.set('idsSitPesqIntimacaoUsCliente', idsSit.trim());
		}
		if (
			listFilters.idOrgaoJudiciario != null &&
			Number.isFinite(listFilters.idOrgaoJudiciario)
		) {
			queryParams.set(
				'idOrgaoJudiciario',
				String(listFilters.idOrgaoJudiciario),
			);
		}
		if (
			listFilters.idClassifRetornoDadoAcesso != null &&
			Number.isFinite(listFilters.idClassifRetornoDadoAcesso)
		) {
			queryParams.set(
				'idClassifRetornoDadoAcesso',
				String(listFilters.idClassifRetornoDadoAcesso),
			);
		}
	}

	const { data } = await api.get<ConsultaCadastroAcessosResponse>(
		`${ApiUrl.COURTS_REGISTRATIONS_LOOKUP}?${queryParams.toString()}`,
	);

	return data;
}

export async function inactivateCourtRegistration(
	summonsSearchId: number,
): Promise<InactivateCourtRegistrationResponse> {
	const { data } = await api.put<InactivateCourtRegistrationResponse>(
		ApiUrl.COURTS_INACTIVATE_SEARCH,
		{ idPesqIntimacaoUsCliente: summonsSearchId },
	);

	return data ?? {};
}

export async function activateCourtRegistration(
	summonsSearchId: number,
): Promise<ActivateCourtRegistrationResponse> {
	const { data } = await api.put<ActivateCourtRegistrationResponse>(
		ApiUrl.COURTS_ACTIVATE_SEARCH,
		{ idPesqIntimacaoUsCliente: summonsSearchId },
	);

	return data ?? {};
}

export async function deleteCourtRegistration(
	summonsSearchId: number,
): Promise<DeleteCourtRegistrationResponse> {
	const { data } = await api.put<DeleteCourtRegistrationResponse>(
		ApiUrl.COURTS_DELETE_SEARCH,
		{ idPesqIntimacaoUsCliente: summonsSearchId },
	);

	return data ?? {};
}

export async function createCourts(
	input: CreateCourtCredentialInput,
): Promise<unknown> {
	const user = (await getLoggedUser()) as JwtUserShape;

	const clientUserId = Number(user.idUsuarioCliente);
	if (!Number.isFinite(clientUserId)) {
		throw new Error('Missing or invalid idUsuarioCliente on logged user.');
	}

	const nomeResponsavel =
		typeof user.nome === 'string' && user.nome.trim() !== ''
			? user.nome.trim()
			: '—';

	const body: CreateCourtCredentialRequestBody = {
		dadoAcesso: input.dadoAcesso,
		senha: input.senha,
		idFonteXTipoPesquisa: input.idFonteXTipoPesquisa,
		idOrgaoJudiciario: input.idOrgaoJudiciario,
		idUsuarioCliente: clientUserId,
		nomeResponsavel,
		...(input.autenticacao != null && input.autenticacao !== ''
			? { autenticacao: input.autenticacao }
			: {}),
	};

	const { data } = await api.post<unknown>(
		ApiUrl.COURTS_CREDENTIAL_CREATE,
		body,
	);

	return data;
}
