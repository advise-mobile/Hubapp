import moment from 'moment';

import { FormatDateBR } from '@lhelpers/DateFunctions';
import { MaskCnj } from '@lhelpers/Mask';
import type {
	SummonsDetailApiItem,
	SummonsDetailViewModel,
} from '@models/summons-detail';
import type { SummonsListBadgeViewModel } from '@models/summons-list';
import type { DefaultTheme } from 'styled-components';

import { resolveSummonsListBadgeBackgrounds } from './summonsBadgeColors';
import { formatPrazoLabel } from './formatPrazoLabel';
import { formatSummonsCodeLabel, formatTagLabel } from './formatTagLabel';

function hasText(value: unknown): value is string {
	return typeof value === 'string' && value.trim() !== '';
}

function buildTitle(tribunal?: string, sistema?: string): string {
	const parts = [
		hasText(tribunal) ? formatSummonsCodeLabel(tribunal) : '',
		hasText(sistema) ? sistema.trim() : '',
	].filter(part => part !== '');

	if (parts.length === 0) {
		return 'Intimação';
	}

	if (parts.length === 1) {
		return parts[0];
	}

	return `${parts[0]} - ${parts[1]}`;
}

function formatExpeditionDate(value: string): string | null {
	const parsed = moment(value);
	if (!parsed.isValid()) {
		return null;
	}
	return FormatDateBR(parsed);
}

function resolvePrazoLabel(raw: SummonsDetailApiItem): string {
	if (hasText(raw.prazoTratado)) {
		return formatPrazoLabel(raw.prazoTratado);
	}

	if (raw.prazo != null && String(raw.prazo).trim() !== '') {
		return formatPrazoLabel(String(raw.prazo));
	}

	return 'Não informado';
}

export function mapSummonsDetailApiItemToViewModel(
	raw: SummonsDetailApiItem,
	theme: DefaultTheme,
	isRead: boolean,
): SummonsDetailViewModel {
	const { tag1Bg, tag2Bg, metaTagBg } = resolveSummonsListBadgeBackgrounds(
		theme,
		isRead,
	);
	const badges: SummonsListBadgeViewModel[] = [];

	if (hasText(raw.responsavel)) {
		badges.push({
			label: formatTagLabel(raw.responsavel),
			backgroundColor: tag2Bg,
		});
	}

	if (hasText(raw.sistema)) {
		badges.push({
			label: raw.sistema.trim(),
			backgroundColor: tag1Bg,
		});
	}

	if (hasText(raw.dataExpedicao)) {
		const formattedDate = formatExpeditionDate(raw.dataExpedicao.trim());
		if (formattedDate) {
			badges.push({
				label: `Data expedição: ${formattedDate}`,
				backgroundColor: metaTagBg,
			});
		}
	}

	const prazoLabel = resolvePrazoLabel(raw);
	badges.push({
		label: `Prazo: ${prazoLabel}`,
		backgroundColor: metaTagBg,
	});

	const processNumber = hasText(raw.numeroProcesso)
		? MaskCnj(raw.numeroProcesso.trim())
		: undefined;

	return {
		title: buildTitle(raw.tribunal, raw.sistema),
		badges,
		processNumber,
		description: hasText(raw.descricacaoIntimacao)
			? raw.descricacaoIntimacao.trim()
			: '',
	};
}
