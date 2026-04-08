import { API_BASE_URL } from '@constants/API';

export const ApiUrl = {
	COURTS_LOOKUP: `${API_BASE_URL}/intimacao/consulta-orgao-judiciario`,
	SUMMONS_SOURCES_LOOKUP: `${API_BASE_URL}/intimacao/ConsultaFonteIntimacoes`,
	SUMMONS_LIST_LOOKUP: `${API_BASE_URL}/intimacao/ConsultaListaIntimacoes`,
	COURTS_CREDENTIAL_CREATE: `${API_BASE_URL}/intimacao`,
} as const;
