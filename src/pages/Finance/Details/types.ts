export interface ItemsInstallmentsDetailsProps {
  idLancamentoFinanceiro: string;
  idCliente: string;
  idFinanceiro: string;
  valor: string;
  dataEmissao: string;
  idProcesso: string | null;
  quantidadeParcelas: string;
  observacao: string | null;
  categoria: string | null;
  idCategoriaFinanceiro: number | null;
  idPessoaCliente: number | null;
  categoriaFinanceiro: any | null;
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
