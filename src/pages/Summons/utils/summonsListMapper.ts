import moment from 'moment';

import { FormatDateBR } from '@lhelpers/DateFunctions';
import type { SummonsListApiItem, SummonsListItemViewModel } from '@models/summons-list';

import { formatTagLabel } from './formatTagLabel';

export type SummonsBadgeThemeColors = {
	amber: string;
	orange200: string;
	gray: string;
};

function hasText(value: unknown): value is string {
	return typeof value === 'string' && value.trim() !== '';
}

function buildTitle(tribunal?: string, nomeTribunal?: string): string {
	const parts = [tribunal, nomeTribunal].filter(hasText);
	if (parts.length === 0) {
		return 'Intimação';
	}
	if (parts.length === 1) {
		return formatTagLabel(parts[0]);
	}
	return `${formatTagLabel(parts[0])} - ${formatTagLabel(parts[1])}`;
}

function formatExpeditionDate(value: string): string | null {
	const parsed = moment(value);
	if (!parsed.isValid()) {
		return null;
	}
	return FormatDateBR(parsed);
}

function resolveListItemId(raw: SummonsListApiItem, index: number): string {
	if (raw.idIntimacao != null) {
		return String(raw.idIntimacao);
	}
	return `summons-${index}`;
}

export function mapSummonsApiItemToViewModel(
	raw: SummonsListApiItem,
	index: number,
	colors: SummonsBadgeThemeColors,
): SummonsListItemViewModel {
	const isRead = raw.flLido === true;
	const tag1Bg = isRead ? colors.gray : colors.amber;
	const tag2Bg = isRead ? colors.gray : colors.orange200;
	const metaTagBg = colors.gray;

	const badges: SummonsListItemViewModel['badges'] = [];

	if (hasText(raw.sistema)) {
		badges.push({
			label: formatTagLabel(raw.sistema),
			backgroundColor: tag1Bg,
		});
	}

	if (hasText(raw.responsavel)) {
		badges.push({
			label: formatTagLabel(raw.responsavel),
			backgroundColor: tag2Bg,
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

	const prazoRaw = hasText(raw.prazoTratado)
		? raw.prazoTratado.trim()
		: 'Não informado';
	const prazoLabel =
		prazoRaw === 'Não informado' ? prazoRaw : formatTagLabel(prazoRaw);
	badges.push({
		label: `Prazo: ${prazoLabel}`,
		backgroundColor: metaTagBg,
	});

	if (hasText(raw.numeroProcesso)) {
		badges.push({
			label: `Proc.: ${raw.numeroProcesso.trim()}`,
			backgroundColor: metaTagBg,
		});
	}

	return {
		id: resolveListItemId(raw, index),
		title: buildTitle(raw.tribunal, raw.nomeTribunal),
		description: hasText(raw.descricacaoIntimacao)
			? raw.descricacaoIntimacao.trim()
			: '',
		isRead,
		badges,
	};
}
