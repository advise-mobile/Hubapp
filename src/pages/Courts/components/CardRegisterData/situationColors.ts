const FAILURE_MESSAGE =
	'Falha ao acessar. As credenciais informadas são inválidas';
const SUCCESS_MESSAGE = 'Logado com sucesso.';
const PROCESSING_MESSAGE = 'Processando acesso ao sistema, aguarde.';

const SITUATION_COLOR_BY_MESSAGE: Record<string, string> = {
	[FAILURE_MESSAGE]: '#D32F2F',
	[SUCCESS_MESSAGE]: '#689F38',
	[PROCESSING_MESSAGE]: '#FF5800',
};

export function getSituationMessageColor(message: string): string {
	return SITUATION_COLOR_BY_MESSAGE[message] ?? '#666666';
}
