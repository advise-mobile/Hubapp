import { API_BASE_URL } from '@constants/API';

/**
 * Absolute API URLs (same base as `API.ts`).
 */
export const ApiUrl = {
	/** Populate courts screen summon filter. */
	COURTS_LOOKUP: `${API_BASE_URL}/intimacao/consulta-orgao-judiciario`,
	/** Populate systems screen summon filter. */
	SUMMONS_SOURCES_LOOKUP: `${API_BASE_URL}/intimacao/ConsultaFonteIntimacoes`,
} as const;
