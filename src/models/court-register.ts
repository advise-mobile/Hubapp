/** Item de cadastro de tribunal para a lista (UI). */
export interface CourtRegisterListItem {
	registerId?: number;
	idPesqIntimacao?: number;
	responsible: string;
	courtAbbreviation: string;
	system: string;
	accessLogin: string;
	situationMessage: string;
	situationTextColor?: string;
	isActive: boolean;
}

/**
 * Item de `GET .../ConsultaCadastroAcessos` com `campos=*`.
 * Campos conforme retorno real do backend.
 */
export interface CourtRegisterApiItem {
	classifRetornoDadoAcesso?: number;
	classificacaoMensagem?: string;
	corFundo?: string;
	dadoAcesso?: string;
	idDadoAcessoFonte?: number;
	idFonteXTipoPesquisa?: number;
	idOrgaoJudiciario?: number;
	idPesqIntimacao?: number;
	idResponsavel?: number;
	idResponsavelFontePesqInt?: number;
	idSitPesqIntimacaoUsCliente?: number;
	idTipoDadoAcessoFonte?: number;
	idUsuarioCliente?: number;
	responsavel?: string;
	sigla?: string;
	sistema?: string;
	sitPesqIntimacaoUsCliente?: string;
	tipoDadoAcessoFonte?: string;
}

export interface ConsultaCadastroAcessosResponse {
	itens?: CourtRegisterApiItem[];
	paginaAtual?: number;
	paginaTotal?: number;
	registrosPorPagina?: number;
	registrosTotal?: number;
}

/** Resposta de PUT inativar (campo `mensagem` conforme API). */
export interface InactivateCourtRegistrationResponse {
	mensagem?: string;
}

/** Resposta de PUT ativar (campo `mensagem` conforme API). */
export type ActivateCourtRegistrationResponse =
	InactivateCourtRegistrationResponse;

/** Resposta de PUT excluir pesquisa (campo `mensagem` conforme API). */
export type DeleteCourtRegistrationResponse =
	InactivateCourtRegistrationResponse;
