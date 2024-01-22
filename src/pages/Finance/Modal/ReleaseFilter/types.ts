export interface DataFilterProps {
	DataMovimentoInicio: string,
	DataMovimentoFim: string,
	idTipoMovProcesso: string,
	Lido: boolean,
	idPalavraChave: Array<number>,
	idDiario: Array<number>,
	idJournals: Array<number>,
}

export interface FilterProps {
	handleSubmitFilters: (item: DataFilterProps) => void;
	handleClearFilters: () => void;
}

export interface ItemsInstallmentsFilterProps {
	nomeTipoCategoriaFinanceiro: string;
	nomeCategoriaFinanceiro: string;
	idProcesso: string;
	nomePessoaCliente: string;
	numeroProcesso: string;
}

export interface TypeFilterProps {
	tipoCategoriaFinanceiro?: string;
}


export interface ItemsFilterProps {
	itens: ItemsInstallmentsFilterProps[];
}

export interface DataItemsFilterProps {
	data: ItemsFilterProps;
}

export interface DataPopulateCategoriesProps {
	idCategoriaFinanceiro: number,
	nomeCategoriaFinanceiro: string
}

export interface DataPopulateProcessProps {
	id: number,
	nome: string,
	idProcesso?:number | null,
	numeroProcesso?: string
}

export interface DataPopulatePeopleProps {
	idPessoaCliente: number,
	nomePessoaCliente: string,
}
