/** Filtros aplicados na lista de cadastros de acessos (RF7 / tela 8). */
export type CourtsRegistrationsAccessFilter = 'all' | 'active' | 'inactive';

export type CourtsRegistrationsSituationFilter =
	| 'all'
	| 'success'
	| 'failure'
	| 'processing';

export interface CourtsRegistrationsAppliedFilters {
	acesso: CourtsRegistrationsAccessFilter;
	/** Tribunal; `null` = todos (sem `idOrgaoJudiciario`). */
	idOrgaoJudiciario: number | null;
	situacao: CourtsRegistrationsSituationFilter;
}

export const DEFAULT_COURTS_REGISTRATIONS_FILTERS: CourtsRegistrationsAppliedFilters =
	{
		acesso: 'all',
		idOrgaoJudiciario: null,
		situacao: 'all',
	};

/** Parâmetros opcionais para `GET .../ConsultaCadastroAcessos`. */
export interface ConsultaCadastroAcessosListFilters {
	idsSitPesqIntimacaoUsCliente?: string;
	idOrgaoJudiciario?: number;
	idClassifRetornoDadoAcesso?: number;
}

export function courtRegistrationsAppliedToQueryParams(
	filters: CourtsRegistrationsAppliedFilters,
): ConsultaCadastroAcessosListFilters {
	const params: ConsultaCadastroAcessosListFilters = {};

	if (filters.acesso === 'active') {
		params.idsSitPesqIntimacaoUsCliente = '-1';
	} else if (filters.acesso === 'inactive') {
		params.idsSitPesqIntimacaoUsCliente = '-2,-3';
	}

	if (
		filters.idOrgaoJudiciario != null &&
		Number.isFinite(filters.idOrgaoJudiciario)
	) {
		params.idOrgaoJudiciario = filters.idOrgaoJudiciario;
	}

	if (filters.situacao === 'success') {
		params.idClassifRetornoDadoAcesso = 2;
	} else if (filters.situacao === 'failure') {
		params.idClassifRetornoDadoAcesso = 1;
	} else if (filters.situacao === 'processing') {
		params.idClassifRetornoDadoAcesso = 3;
	}

	return params;
}

export function countActiveCourtRegistrationsFilters(
	filters: CourtsRegistrationsAppliedFilters,
): number {
	let activeFilterCount = 0;
	if (filters.acesso !== 'all') activeFilterCount += 1;
	if (filters.idOrgaoJudiciario != null) activeFilterCount += 1;
	if (filters.situacao !== 'all') activeFilterCount += 1;
	return activeFilterCount;
}
