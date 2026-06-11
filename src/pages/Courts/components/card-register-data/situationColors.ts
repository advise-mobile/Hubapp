const FAILURE_MESSAGE =
	'Falha ao acessar. As credenciais informadas são inválidas';
const SUCCESS_MESSAGE = 'Logado com sucesso.';

/** Quando `classificacaoMensagem` não vem da API; texto e cor fixos na UI. */
export const PROCESSING_ACCESS_MESSAGE =
	'Processando acesso ao sistema, aguarde';

export const PROCESSING_ACCESS_TEXT_COLOR = '#000000';

const SITUATION_COLOR_BY_MESSAGE: Record<string, string> = {
	[FAILURE_MESSAGE]: '#D32F2F',
	[SUCCESS_MESSAGE]: '#689F38',
	[PROCESSING_ACCESS_MESSAGE]: PROCESSING_ACCESS_TEXT_COLOR,
};

export function getSituationMessageColor(message: string): string {
	return SITUATION_COLOR_BY_MESSAGE[message] ?? '#666666';
}
