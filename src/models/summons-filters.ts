import type { SummonsFilters } from './summons-hooks-types';

export type SummonsSituationFilter = 'all' | 'read' | 'unread';

export interface SummonsListQueryFilters {
	dataInicial?: string;
	dataFinal?: string;
	FlLido?: string;
	idOrgaoJudiciario?: string;
	FonteNomeSistema?: string;
}

function hasNonEmptyString(value: unknown): value is string {
	return typeof value === 'string' && value.trim() !== '';
}

function parseFiniteNumber(value: unknown): number | null {
	if (value == null || value === '') {
		return null;
	}
	const parsed = typeof value === 'number' ? value : Number(value);
	return Number.isFinite(parsed) ? parsed : null;
}

export function summonsFiltersToQueryParams(
	filters: SummonsFilters = {},
): SummonsListQueryFilters {
	const params: SummonsListQueryFilters = {};

	if (hasNonEmptyString(filters.dataInicial)) {
		params.dataInicial = filters.dataInicial.trim();
	}

	if (hasNonEmptyString(filters.dataFinal)) {
		params.dataFinal = filters.dataFinal.trim();
	}

	if (filters.FlLido === true) {
		params.FlLido = 'true';
	} else if (filters.FlLido === false) {
		params.FlLido = 'false';
	}

	const orgaoId = parseFiniteNumber(filters.idOrgaoJudiciario);
	if (orgaoId != null) {
		params.idOrgaoJudiciario = String(orgaoId);
	}

	const fonteNomeSistema =
		typeof filters.fonteNomeSistema === 'string'
			? filters.fonteNomeSistema.trim()
			: '';
	if (fonteNomeSistema !== '') {
		params.FonteNomeSistema = fonteNomeSistema;
	}

	return params;
}

export function countActiveSummonsFilters(filters: SummonsFilters = {}): number {
	const hasDataDe =
		hasNonEmptyString(filters.dataDe) || hasNonEmptyString(filters.dataInicial);
	const hasDataAte =
		hasNonEmptyString(filters.dataAte) || hasNonEmptyString(filters.dataFinal);

	const situacao = filters.situacao as SummonsSituationFilter | undefined;
	const hasSituacao =
		(situacao != null && situacao !== 'all') ||
		filters.FlLido === true ||
		filters.FlLido === false;

	return [
		hasDataDe,
		hasDataAte,
		hasSituacao,
		parseFiniteNumber(filters.idOrgaoJudiciario) != null,
		hasNonEmptyString(filters.fonteNomeSistema),
	].filter(Boolean).length;
}
