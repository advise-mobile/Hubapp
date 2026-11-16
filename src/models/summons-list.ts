import type { SummonsPagedListMeta, SummonsApiEnvelopeStatus } from './filters-summons';

export interface SummonsListApiItem {
	id?: number | string;
	idIntimacao?: number;
	idMovProcessoCliente?: number | string;
	idMovProcUsuarioCliente?: number | string;
	IdMovProcUsuarioCliente?: number | string;
	idPastaUsuarioCliente?: number | string;
	IdPastaUsuarioCliente?: number | string;
	tribunal?: string;
	nomeTribunal?: string;
	descricacaoIntimacao?: string;
	sistema?: string;
	responsavel?: string;
	dataExpedicao?: string;
	prazo?: string | number;
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
	markAsReadId?: number;
	idMovProcessoCliente?: number;
	idMovProcUsuarioCliente?: number;
	idPastaUsuarioCliente?: number;
	nomeTribunal?: string;
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
