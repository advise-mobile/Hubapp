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
