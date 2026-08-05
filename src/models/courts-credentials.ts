export interface CreateCourtCredentialRequestBody {
	dadoAcesso: string;
	senha: string;
	idFonteXTipoPesquisa: number;
	idOrgaoJudiciario: number;
	idUsuarioCliente: number;
	nomeResponsavel: string;
	autenticacao?: string;
}

export type CreateCourtCredentialInput = Omit<
	CreateCourtCredentialRequestBody,
	'idUsuarioCliente' | 'nomeResponsavel'
>;

/** Login/senha. */
export const COURT_ACCESS_TYPE_LOGIN_PASSWORD = -1;
/** QR Code. */
export const COURT_ACCESS_TYPE_QR_CODE = -2;
/** Certificado digital — não suportado no app. */
export const COURT_ACCESS_TYPE_CERTIFICATE = -3;

export function isQrCodeCourtAccessType(value: unknown): boolean {
	return Number(value) === COURT_ACCESS_TYPE_QR_CODE;
}

export function isCertificateCourtAccessType(value: unknown): boolean {
	return Number(value) === COURT_ACCESS_TYPE_CERTIFICATE;
}

/** Tipos que o app pode exibir no select (Guideline RF6: tipoAcesso=-1,-2). */
export function isAppSupportedCourtAccessType(value: unknown): boolean {
	const accessTypeId = Number(value);
	return (
		accessTypeId === COURT_ACCESS_TYPE_LOGIN_PASSWORD ||
		accessTypeId === COURT_ACCESS_TYPE_QR_CODE
	);
}
