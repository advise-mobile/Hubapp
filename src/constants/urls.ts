import { API_BASE_URL } from '@constants/API';

export const ApiUrl = {
	COURTS_LOOKUP: `${API_BASE_URL}/intimacao/consulta-orgao-judiciario`,
	SUMMONS_SOURCES_LOOKUP: `${API_BASE_URL}/intimacao/ConsultaFonteIntimacoes`,
	SUMMONS_LIST_LOOKUP: `${API_BASE_URL}/intimacao/ConsultaListaIntimacoes`,
	COURTS_CREDENTIAL_CREATE: `${API_BASE_URL}/intimacao`,
	USER_CLIENT_FEATURE_CREDIT_LOOKUP: `${API_BASE_URL}/usuario-cliente-funcionalidade/consultar-credito`,
	COURTS_REGISTRATIONS_LOOKUP: `${API_BASE_URL}/intimacao/ConsultaCadastroAcessos`,
	COURTS_INACTIVATE_SEARCH: `${API_BASE_URL}/intimacao/inativar-pesquisa`,
	COURTS_ACTIVATE_SEARCH: `${API_BASE_URL}/intimacao/ativar-pesquisa`,
	COURTS_DELETE_SEARCH: `${API_BASE_URL}/intimacao/excluir-pesquisa`,
} as const;
