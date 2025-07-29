export interface CategoryProps {
	idCategoriaFinanceiro?: number;
	nomeCategoriaFinanceiro: string;
	corCategoria: string;
	idTipoCategoriaFinanceiro: TypeCategoryProps;
	ativo: boolean;
}

export interface TypeCategoryProps {
	nomeTipoCategoriaFinanceiro: string;
}

export interface DataCategoryItemProps {
	itens: CategoryProps[];
}

export interface DataCategoryProps {
	data: DataCategoryItemProps;
}

export interface PersonProps {
	nomePessoaCliente: string;
	idPessoaCliente: number;
	email: string;
}

export interface ItemPersonItemProps {
	items: PersonProps[];
}

export interface DataPersonItemProps {
	data: ItemPersonItemProps;
}

export interface ProcessProps {
	id: number;
	idProcesso: number;
	numeroProcesso: string;
}

export interface ItemProcessProps {
	items: ProcessProps[];
}

export interface DataProcessProps {
	data: ItemProcessProps;
}

export interface CategoryDataProps {
	type: number;
	situation: boolean;
}

export interface DataFiltersCategory {
	dataFiltersCategory: CategoryDataProps | undefined;
}

export interface CategoryRef {
	refresh: () => Promise<void>;
}

export interface PaginatedCategoryResult {
	items: CategoryProps[];
	hasMore: boolean;
	currentPage: number;
	pageSize: number;
}
