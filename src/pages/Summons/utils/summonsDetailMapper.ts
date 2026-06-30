import moment from 'moment';

import { FormatDateBR } from '@lhelpers/DateFunctions';
import { MaskCnj } from '@lhelpers/Mask';
import type {
	SummonsDetailApiItem,
	SummonsDetailViewModel,
} from '@models/summons-detail';
import type { SummonsListBadgeViewModel } from '@models/summons-list';

import { formatPrazoLabel } from './formatPrazoLabel';
import { formatTagLabel } from './formatTagLabel';

export type SummonsDetailBadgeThemeColors = {
	amber: string;
	gray: string;
	orange200: string;
};

function hasText(value: unknown): value is string {
	return typeof value === 'string' && value.trim() !== '';
}

function buildTitle(tribunal?: string, sistema?: string): string {
	const parts = [tribunal, sistema].filter(hasText);
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
	colors: SummonsDetailBadgeThemeColors,
): SummonsDetailViewModel {
	const badges: SummonsListBadgeViewModel[] = [];

	if (hasText(raw.responsavel)) {
		badges.push({
			label: formatTagLabel(raw.responsavel),
			backgroundColor: colors.orange200,
		});
	}

	if (hasText(raw.sistema)) {
		badges.push({
			label: formatTagLabel(raw.sistema),
			backgroundColor: colors.amber,
		});
	}

	if (hasText(raw.dataExpedicao)) {
		const formattedDate = formatExpeditionDate(raw.dataExpedicao.trim());
		if (formattedDate) {
			badges.push({
				label: `Data expedição: ${formattedDate}`,
				backgroundColor: colors.gray,
			});
		}
	}

	const prazoLabel = resolvePrazoLabel(raw);
	badges.push({
		label: `Prazo: ${prazoLabel}`,
		backgroundColor: colors.gray,
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
