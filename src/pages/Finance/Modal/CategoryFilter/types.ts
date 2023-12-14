export interface DataFilterProps {
    type: number | null,
		situation: boolean | null,
}

export interface FilterProps {
    handleSubmitFilters: (item:DataFilterProps) => void;
    handleClearFilters: () => void;
}


export interface FilterCategoryProps{
	nomeTipoCategoriaFinanceiro: string,
	idTipoCategoriaFinanceiro: number,
	debitoCredito: string,
}

export interface ItemFilterCategoryProps{
	itens: FilterCategoryProps[];
}

export interface DataFilterCategoryProps{
	data: ItemFilterCategoryProps;
}

export interface TypesCategoryFilterProps {
	value: number | null;
	label: string;
}
