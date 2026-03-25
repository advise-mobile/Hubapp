import { api } from '@constants/API';
import { ApiUrl } from '@constants/urls';
import { getLoggedUser } from '@lhelpers/Permissions';
import type {
	ConsultaFonteIntimacoesResponse,
	ConsultaOrgaoJudiciarioResponse,
	CourtOption,
	JudicialAgencyOption,
} from '@models/filters-summons';

/** Tribunal: `consulta-orgao-judiciario` (`ativo=true`, `campos=*`, …). */
export async function fetchCourtsForSummonsFilter(): Promise<
	JudicialAgencyOption[]
> {
	const user = await getLoggedUser();

	const idUsuarioCliente = Number(
		(user as { idUsuarioCliente?: number | string }).idUsuarioCliente,
	);

	if (!Number.isFinite(idUsuarioCliente)) {
		throw new Error('Missing or invalid idUsuarioCliente on logged user.');
	}

	const queryParams = new URLSearchParams();
	queryParams.set('ativo', 'true');
	queryParams.set('campos', '*');
	queryParams.set('idUsuarioCliente', String(idUsuarioCliente));
	queryParams.set('paginaAtual', '1');
	queryParams.set('registrosPorPagina', '999');

	const { data } = await api.get<ConsultaOrgaoJudiciarioResponse>(
		`${ApiUrl.COURTS_LOOKUP}?${queryParams.toString()}`,
	);

	return data.itens ?? [];
}

/** Sistema: `ConsultaFonteIntimacoes` com `idOrgaoJudiciario` do tribunal. */
export async function fetchSystemsForSummonsFilter(
	idOrgaoJudiciario: number,
): Promise<CourtOption[]> {
	if (!Number.isFinite(idOrgaoJudiciario)) {
		throw new Error('Invalid idOrgaoJudiciario for ConsultaFonteIntimacoes.');
	}

	const user = await getLoggedUser();

	const idUsuarioCliente = Number(
		(user as { idUsuarioCliente?: number | string }).idUsuarioCliente,
	);

	if (!Number.isFinite(idUsuarioCliente)) {
		throw new Error('Missing or invalid idUsuarioCliente on logged user.');
	}

	const queryParams = new URLSearchParams();
	queryParams.set('campos', '*');
	queryParams.set('idOrgaoJudiciario', String(idOrgaoJudiciario));
	queryParams.set('idUsuarioCliente', String(idUsuarioCliente));
	queryParams.set('tipoAcesso', '-1,-2');
	queryParams.set('paginaAtual', '1');
	queryParams.set('registrosPorPagina', '999');

	const { data } = await api.get<ConsultaFonteIntimacoesResponse>(
		`${ApiUrl.SUMMONS_SOURCES_LOOKUP}?${queryParams.toString()}`,
	);

	return data.itens ?? [];
}
