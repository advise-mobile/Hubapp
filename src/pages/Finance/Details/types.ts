export interface ItemsInstallmentsDetailsProps {
	idLancamentoFinanceiro: string;
	idCliente: string;
	idFinanceiro: string;
	valor: string;
	dataEmissao: string;
	idProcesso: string;
	quantidadeParcelas: string;
	observacao: string;
	categoria: string;
	baixado: boolean;
}

export interface ItemsDetailsProps {
	itens: ItemsInstallmentsDetailsProps[];
}

export interface DataItemsDetailsProps {
	data: ItemsDetailsProps;
}

export interface CategoryFinanceProps {
	nomeCategoriaFinanceiro?: string;
}
