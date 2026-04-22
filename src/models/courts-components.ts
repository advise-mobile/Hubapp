import type { CourtsRegistrationsAppliedFilters } from './court-registrations-filters';

/** Props do card de um cadastro de acesso (lista Cadastros). */
export interface CardRegisterDataProps {
	responsible: string;
	courtAbbreviation: string;
	system: string;
	accessLogin: string;
	situationMessage: string;
	/** `corFundo` da API; se ausente, usa-se cor por texto de `classificacaoMensagem`. */
	situationTextColor?: string;
	/**
	 * Estado de captura (ativo/inativo) conforme `sitPesqIntimacaoUsCliente` em ConsultaCadastroAcessos.
	 * Sem `onActiveChange`, o switch fica somente leitura.
	 */
	isActive: boolean;
	/** `idPesqIntimacao` do GET; necessário para ativar/inativar. */
	idPesqIntimacao?: number;
	/** Enquanto a inativação está em andamento para este cadastro. */
	isInactivating?: boolean;
	/** Enquanto a ativação está em andamento para este cadastro. */
	isActivating?: boolean;
	/** Enquanto a exclusão está em andamento para este cadastro. */
	isDeleting?: boolean;
	onActiveChange?: (value: boolean) => void;
	/** Toque na lixeira (ex.: abrir confirmação). */
	onDeletePress?: () => void;
}

/** Props do card fixo de créditos (Contratados / Utilizados). */
export interface CardAccessAvailableProps {
	contractedCountDisplayText: string;
	usedCountDisplayText: string;
	isValuesLoading: boolean;
}

export interface AddCourtsModalProps {
	visible: boolean;
	onClose: () => void;
}

export interface CourtsFilterModalProps {
	visible: boolean;
	onClose: () => void;
	onApply: (filters: CourtsRegistrationsAppliedFilters) => void;
	initialFilters?: CourtsRegistrationsAppliedFilters;
}
