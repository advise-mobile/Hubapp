import { formatTagLabel } from './formatTagLabel';

export function formatPrazoLabel(value: string): string {
	const trimmed = value.trim();
	if (!trimmed) {
		return 'Não informado';
	}

	if (/^\d+$/.test(trimmed)) {
		return `${trimmed} dias`;
	}

	return formatTagLabel(trimmed);
}
