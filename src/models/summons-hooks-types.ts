import type { HeaderActionConfig } from '@components/Header';

import type { CourtOption, JudicialAgencyOption } from './filters-summons';
import type { SummonsDetailViewModel } from './summons-detail';

export interface SummonsFilters {
	dataInicial?: string;
	dataFinal?: string;
	FlLido?: boolean;
	idOrgaoJudiciario?: number;
	fonteNomeSistema?: string;
	idFonteXTipoPesquisa?: number;
	idFonteXTipoPesquisaSistema?: number;
	dataDe?: string;
	dataAte?: string;
	situacao?: 'all' | 'read' | 'unread';
	[key: string]: string | number | boolean | null | undefined;
}

export interface UseSummonsHeaderReturn {
	headerProps: {
		title: string;
		rightActions: HeaderActionConfig[];
	};
	addModalVisible: boolean;
	setAddModalVisible: (visible: boolean) => void;
}

export interface UseSummonsHeaderFiltersReturn {
	filters: SummonsFilters;
	applyFilters: (filters: SummonsFilters) => void;
	closeFilterModal: () => void;
	filterModalVisible: boolean;
	openFilterModal: () => void;
	activeFiltersCount: number;
}

export interface UseCourtsReturn {
	courts: JudicialAgencyOption[];
	isLoadingCourts: boolean;
	loadCourts: () => Promise<JudicialAgencyOption[]>;

	systems: CourtOption[];
	isLoadingSystems: boolean;
	loadSystems: (idOrgaoJudiciario: number | null) => Promise<CourtOption[]>;
}

export interface UseSummonsDetailQueryParams {
	idMovProcUsuarioCliente: number;
	flLido: boolean;
	markAsReadId?: number;
	idMovProcessoCliente?: number;
}

export interface UseSummonsDetailQueryReturn {
	detail: SummonsDetailViewModel | undefined;
	isLoading: boolean;
	isError: boolean;
}
