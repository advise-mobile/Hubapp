export interface EventTypeItem {
	id: number;
	nome: string;
}

export interface EventTypesResponse {
	itens?: EventTypeItem[];
}

export interface UserAgendaItem {
	id: number;
}

export interface UserAgendasResponse {
	itens?: UserAgendaItem[];
}

export interface CreateLinkedDeadlineInput {
	titulo: string;
	idAgenda: number;
	idTipoEventoAgenda: number;
	idMovProcessoCliente: number;
	diaInteiro: boolean;
	date: Date | string | null;
	hour: string | null;
	localizacao?: string;
	observacao?: string;
}

export interface LinkedDeadlinePayloadItem {
	titulo: string;
	idAgenda: number;
	dataHoraFim: string;
	dataHoraInicio: string;
	sincronizado: boolean;
	idRepetEventoAgenda: number;
	idOpcaoLembreteAgenda: number;
	observacao: string;
	localizacao: string;
	diaInteiro: boolean;
	idTipoEventoAgenda: number;
	idsMovProcessosVinculados: Array<{ idMovProcessoCliente: number }>;
}

export interface SummonsAddDeadlineFormValues {
	titulo: string;
	diaInteiro: boolean;
	data: Date | null;
	hora: string;
	localizacao: string;
	observacao: string;
}
