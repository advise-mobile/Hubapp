import type {
	CourtRegisterApiItem,
	CourtRegisterListItem,
} from '@models/court-register';

import {
	PROCESSING_ACCESS_MESSAGE,
	PROCESSING_ACCESS_TEXT_COLOR,
} from '../components/card-register-data/situationColors';

function stripDiacritics(value: string): string {
	return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Interpreta `sitPesqIntimacaoUsCliente` retornado por `ConsultaCadastroAcessos`.
 * Ativo → switch ligado; inativo → desligado.
 */
function isClientSummonsSearchActive(
	sitPesqIntimacaoUsCliente: string | undefined,
): boolean {
	if (sitPesqIntimacaoUsCliente == null) {
		return false;
	}
	const normalizedSituation = stripDiacritics(String(sitPesqIntimacaoUsCliente))
		.trim()
		.toLowerCase();
	if (normalizedSituation.length === 0) {
		return false;
	}
	if (normalizedSituation.includes('inativ')) {
		return false;
	}
	if (normalizedSituation.includes('ativ')) {
		return true;
	}

	return false;
}

export function mapCourtRegisterApiItemToListItem(
	raw: CourtRegisterApiItem,
): CourtRegisterListItem {
	const registerId =
		raw.idPesqIntimacao ?? raw.idDadoAcessoFonte ?? undefined;

	const messageFromApi = raw.classificacaoMensagem?.trim() ?? '';
	const hasClassificationMessage = messageFromApi.length > 0;

	return {
		registerId,
		idPesqIntimacao: raw.idPesqIntimacao,
		responsible: raw.responsavel ?? '',
		courtAbbreviation: raw.sigla ?? '',
		system: raw.sistema ?? '',
		accessLogin: raw.dadoAcesso ?? '',
		situationMessage: hasClassificationMessage
			? messageFromApi
			: PROCESSING_ACCESS_MESSAGE,
		situationTextColor: hasClassificationMessage
			? typeof raw.corFundo === 'string' && raw.corFundo.trim() !== ''
				? raw.corFundo.trim()
				: undefined
			: PROCESSING_ACCESS_TEXT_COLOR,
		isActive: isClientSummonsSearchActive(raw.sitPesqIntimacaoUsCliente),
	};
}
