import moment from 'moment';

import { FormatDateBR } from '@lhelpers/DateFunctions';
import { MaskCnj } from '@lhelpers/Mask';
import type { SummonsListApiItem, SummonsListItemViewModel } from '@models/summons-list';
import type { DefaultTheme } from 'styled-components';

import { resolveSummonsListBadgeBackgrounds } from './summonsBadgeColors';
import { formatPrazoLabel } from './formatPrazoLabel';
import { formatSummonsCodeLabel, formatTagLabel } from './formatTagLabel';

function hasText(value: unknown): value is string {
	return typeof value === 'string' && value.trim() !== '';
}

function buildTitle(tribunal?: string, nomeTribunal?: string): string {
	const tribunalLabel = hasText(tribunal) ? formatSummonsCodeLabel(tribunal) : '';
	const nomeLabel = hasText(nomeTribunal) ? formatTagLabel(nomeTribunal) : '';
	const parts = [tribunalLabel, nomeLabel].filter(part => part !== '');

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

function resolveMovProcUsuarioClienteId(
	raw: SummonsListApiItem,
): number | undefined {
	const value =
		raw.idMovProcUsuarioCliente ?? raw.IdMovProcUsuarioCliente;

	if (value == null) {
		return undefined;
	}

	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : undefined;
}

function resolveNumericId(value: unknown): number | undefined {
	if (value == null) {
		return undefined;
	}

	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : undefined;
}

function resolveListItemId(raw: SummonsListApiItem, index: number): string {
	if (raw.idIntimacao != null) {
		return String(raw.idIntimacao);
	}
	if (raw.id != null) {
		return String(raw.id);
	}
	return `summons-${index}`;
}

function resolvePrazoLabel(raw: SummonsListApiItem): string {
	if (hasText(raw.prazoTratado)) {
		return formatPrazoLabel(raw.prazoTratado);
	}

	if (hasText(raw.prazo)) {
		return formatPrazoLabel(raw.prazo);
	}

	if (raw.prazo != null && String(raw.prazo).trim() !== '') {
		return formatPrazoLabel(String(raw.prazo));
	}

	return 'Não informado';
}

export function mapSummonsApiItemToViewModel(
	raw: SummonsListApiItem,
	index: number,
	theme: DefaultTheme,
): SummonsListItemViewModel {
	const isRead = raw.flLido === true;
	const { tag1Bg, tag2Bg, metaTagBg } = resolveSummonsListBadgeBackgrounds(
		theme,
		isRead,
	);

	const badges: SummonsListItemViewModel['badges'] = [];

	if (hasText(raw.sistema)) {
		badges.push({
			label: formatSummonsCodeLabel(raw.sistema),
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

	const prazoLabel = resolvePrazoLabel(raw);
	badges.push({
		label: `Prazo: ${prazoLabel}`,
		backgroundColor: metaTagBg,
	});

	if (hasText(raw.numeroProcesso)) {
		badges.push({
			label: `Proc.: ${MaskCnj(raw.numeroProcesso.trim())}`,
			backgroundColor: metaTagBg,
		});
	}

	return {
		id: resolveListItemId(raw, index),
		markAsReadId: resolveNumericId(raw.id),
		idMovProcessoCliente: resolveNumericId(raw.idMovProcessoCliente),
		idMovProcUsuarioCliente: resolveMovProcUsuarioClienteId(raw),
		idPastaUsuarioCliente: resolveNumericId(
			raw.idPastaUsuarioCliente ?? raw.IdPastaUsuarioCliente,
		),
		nomeTribunal: hasText(raw.nomeTribunal)
			? raw.nomeTribunal.trim()
			: undefined,
		title: buildTitle(raw.tribunal, raw.nomeTribunal),
		description: hasText(raw.descricacaoIntimacao)
			? raw.descricacaoIntimacao.trim()
			: '',
		isRead,
		badges,
	};
}
