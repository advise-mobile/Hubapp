export type FonteTipoPesquisaIntimacoesEntry = Record<string, unknown>;

/** Item de `GET .../consulta-orgao-judiciario/` (combo Tribunal). */
export interface ConsultaOrgaoJudiciarioItem {
	idOrgaoJudiciario: number;
	nomeExibicao?: string;
	nome?: string;
	orgaoJudiciario?: string;
	siglaOrgao?: string;
}

export type JudicialAgencyOption = ConsultaOrgaoJudiciarioItem;

export function getJudicialAgencyLabel(row: JudicialAgencyOption): string {
	return (
		row.nomeExibicao ??
		row.nome ??
		row.orgaoJudiciario ??
		String(row.idOrgaoJudiciario)
	);
}

export interface ConsultaFonteIntimacaoItem {
	idFonteXTipoPesquisa: number;
	idOrgaoJudiciario: number;
	nomeExibicao: string;
	orgaoJudiciario: string;
	siglaOrgao: string;
	fonteTipoPesquisaIntimacoes: FonteTipoPesquisaIntimacoesEntry[];
}

export interface ConsultaFonteIntimacoesPaginacao {
	paginaAtual: number;
	paginaTotal: number;
	registrosPorPagina: number;
	registrosTotal: number;
}

export interface ConsultaFonteIntimacoesStatus {
	codigo: number;
	mensagem: string;
}

export interface ConsultaOrgaoJudiciarioResponse {
	itens: ConsultaOrgaoJudiciarioItem[];
	paginacao: ConsultaFonteIntimacoesPaginacao;
	status: ConsultaFonteIntimacoesStatus;
}

export interface ConsultaFonteIntimacoesResponse {
	itens: ConsultaFonteIntimacaoItem[];
	paginacao: ConsultaFonteIntimacoesPaginacao;
	status: ConsultaFonteIntimacoesStatus;
}

export interface ConsultaFonteIntimacoesParams {
	idUsuarioCliente: number;
	idOrgaoJudiciario?: number | null;
	tipoAcesso?: string;
	paginaAtual?: number;
	registrosPorPagina?: number;
}

export type CourtOption = ConsultaFonteIntimacaoItem;
