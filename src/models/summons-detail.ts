import type { SummonsApiEnvelopeStatus } from './filters-summons';
import type { SummonsListBadgeViewModel } from './summons-list';

export interface SummonsDetailNavParams {
	idMovProcUsuarioCliente: number;
	flLido: boolean;
	markAsReadId?: number;
	idMovProcessoCliente?: number;
}

export interface SummonsDetailApiItem {
	tribunal?: string;
	sistema?: string;
	responsavel?: string;
	dataExpedicao?: string;
	prazoTratado?: string;
	prazo?: string | number;
	numeroProcesso?: string;
	descricacaoIntimacao?: string;
	[key: string]: unknown;
}

export interface SummonsDetailViewModel {
	title: string;
	badges: SummonsListBadgeViewModel[];
	processNumber?: string;
	description: string;
}

export interface SummonsDetailResponse {
	itens?: SummonsDetailApiItem[];
	status?: SummonsApiEnvelopeStatus;
}
