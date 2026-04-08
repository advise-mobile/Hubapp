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

export function isQrCodeCourtAccessType(value: unknown): boolean {
	return Number(value) === -2;
}
