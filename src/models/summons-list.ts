import type { SummonsPagedListMeta, SummonsApiEnvelopeStatus } from './filters-summons';

export interface SummonsListApiItem {
	idIntimacao?: number;
	tribunal?: string;
	nomeTribunal?: string;
	descricacaoIntimacao?: string;
	sistema?: string;
	responsavel?: string;
	dataExpedicao?: string;
	prazoTratado?: string;
	numeroProcesso?: string;
	flLido?: boolean;
	[key: string]: unknown;
}

export interface SummonsListBadgeViewModel {
	label: string;
	backgroundColor: string;
}

export interface SummonsListItemViewModel {
	id: string;
	title: string;
	description: string;
	isRead: boolean;
	badges: SummonsListBadgeViewModel[];
}

export interface SummonsListPageResponse {
	itens: SummonsListApiItem[];
	paginacao?: SummonsPagedListMeta;
	status?: SummonsApiEnvelopeStatus;
}
