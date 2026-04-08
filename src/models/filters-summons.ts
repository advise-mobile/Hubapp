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

export interface SummonsSourceItem {
	idFonteXTipoPesquisa: number;
	idOrgaoJudiciario: number;
	nomeExibicao: string;
	orgaoJudiciario: string;
	siglaOrgao: string;
	fonteTipoPesquisaIntimacoes: SummonsSearchTypeEntry[];
	idTipoAcessoFontePesq?: number;
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
