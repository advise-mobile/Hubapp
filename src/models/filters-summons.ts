import { isAppSupportedCourtAccessType } from '@models/courts-credentials';

export type SummonsSearchTypeEntry = Record<string, unknown>;

export interface JudicialAgencyItem {
	idOrgaoJudiciario: number;
	nomeExibicao?: string;
	nome?: string;
	orgaoJudiciario?: string;
	siglaOrgao?: string;
}

/** @deprecated Use `JudicialAgencyItem` */
export type JudicialAgencyOption = JudicialAgencyItem;

export function getJudicialAgencyLabel(row: JudicialAgencyItem): string {
	return (
		row.nomeExibicao ??
		row.nome ??
		row.orgaoJudiciario ??
		String(row.idOrgaoJudiciario)
	);
}

/** Preferência pela sigla (`siglaOrgao`); fallback para o nome completo. */
export function getJudicialAgencySiglaLabel(row: JudicialAgencyItem): string {
	const siglaOrgaoRaw = row.siglaOrgao;
	if (typeof siglaOrgaoRaw === 'string' && siglaOrgaoRaw.trim() !== '') {
		return siglaOrgaoRaw.trim();
	}
	return getJudicialAgencyLabel(row);
}

export interface SummonsSourceItem {
	idFonteXTipoPesquisa: number;
	idOrgaoJudiciario: number;
	nomeExibicao: string;
	orgaoJudiciario: string;
	siglaOrgao: string;
	fonteTipoPesquisaIntimacoes: SummonsSearchTypeEntry[];
	idTipoAcessoFontePesq?: number;
	fonteNomeSistema?: string;
	FonteNomeSistema?: string;
	sistema?: string;
}

function readFiniteAccessTypeId(value: unknown): number | null {
	if (value == null || value === '') {
		return null;
	}
	const accessTypeId = Number(value);
	return Number.isFinite(accessTypeId) ? accessTypeId : null;
}

/** Resolve `idTipoAcessoFontePesq` no item ou em `fonteTipoPesquisaIntimacoes`. */
export function getCourtAccessTypeId(row: SummonsSourceItem): number | null {
	const record = row as SummonsSourceItem & Record<string, unknown>;
	const fromRow =
		readFiniteAccessTypeId(row.idTipoAcessoFontePesq) ??
		readFiniteAccessTypeId(record.IdTipoAcessoFontePesq);
	if (fromRow != null) {
		return fromRow;
	}

	const nested = row.fonteTipoPesquisaIntimacoes;
	if (!Array.isArray(nested)) {
		return null;
	}

	for (const entry of nested) {
		if (entry == null || typeof entry !== 'object') {
			continue;
		}
		const nestedRecord = entry as Record<string, unknown>;
		const fromNested =
			readFiniteAccessTypeId(nestedRecord.idTipoAcessoFontePesq) ??
			readFiniteAccessTypeId(nestedRecord.IdTipoAcessoFontePesq);
		if (fromNested != null) {
			return fromNested;
		}
	}

	return null;
}

/**
 * Fontes exibíveis no app (RF6): apenas login/senha (-1) e QR (-2).
 * Exclui certificado (-3) e itens sem tipo resolvido.
 */
export function isSelectableCourtSourceForApp(row: SummonsSourceItem): boolean {
	const accessTypeId = getCourtAccessTypeId(row);
	if (accessTypeId == null) {
		return false;
	}
	return isAppSupportedCourtAccessType(accessTypeId);
}

function hasNonEmptyString(value: unknown): value is string {
	return typeof value === 'string' && value.trim() !== '';
}

export function getSummonsSourceSystemName(row: SummonsSourceItem): string {
	const record = row as SummonsSourceItem & Record<string, unknown>;
	const candidates = [
		record.fonteNomeSistema,
		record.FonteNomeSistema,
		record.sistema,
		row.nomeExibicao,
	];

	for (const candidate of candidates) {
		if (hasNonEmptyString(candidate)) {
			return candidate.trim();
		}
	}

	return String(row.idFonteXTipoPesquisa);
}

export interface SummonsPagedListMeta {
	paginaAtual: number;
	paginaTotal: number;
	registrosPorPagina: number;
	registrosTotal: number;
}

export interface SummonsApiEnvelopeStatus {
	codigo: number;
	mensagem: string;
}

export interface JudicialAgenciesResponse {
	itens: JudicialAgencyItem[];
	paginacao: SummonsPagedListMeta;
	status: SummonsApiEnvelopeStatus;
}

export interface SummonsSourcesResponse {
	itens: SummonsSourceItem[];
	paginacao: SummonsPagedListMeta;
	status: SummonsApiEnvelopeStatus;
}

export interface SummonsSourcesRequestParams {
	idUsuarioCliente: number;
	idOrgaoJudiciario?: number | null;
	tipoAcesso?: string;
	paginaAtual?: number;
	registrosPorPagina?: number;
}

export type SummonsListItem = Record<string, unknown>;

export interface SummonsListResponse {
	itens: SummonsListItem[];
	paginacao?: SummonsPagedListMeta;
	status?: SummonsApiEnvelopeStatus;
}

/** @deprecated Use `SummonsSourceItem` */
export type CourtOption = SummonsSourceItem;
