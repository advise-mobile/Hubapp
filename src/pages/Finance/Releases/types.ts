export interface ItemProps {
    idContaFinanceiro:number,
    idFinanceiro:number
}

export interface ItemsProps {
    itens:ItemProps;
}

export interface DataItemsProps {
    data:ItemsProps
}

export interface ItemResumeProps {
    saldo: string;
    saldoAnterior: string;
    totalEntradas: string;
    totalSaidas: string;
}
export interface ItemsResumeProps {
    itens:ItemResumeProps[];
}

export interface DataItemsResumeProps {
    data:ItemsResumeProps;
}

export interface ItemInstallmentsProps {
    title: string;
    dataVencimento: string;
    debitoCredito:string;
    descricaoLancamento: string;
    value: string;
    category: string;
    baixado: boolean
    dataBaixa: string;
    quantidadeParcelas: number,
    numeroParcela: number,

    dataVencimentoFormatada?:string;
    dataBaixaFormatada?:string;
    valorAberto?:string;
    categoriaFinanceiro:CategoryFinanceProps;
}

export interface CategoryFinanceProps { 
    nomeCategoriaFinanceiro: string;
    corCategoria: string;
 }

export interface ItemsInstallmentsProps {
    itens:ItemInstallmentsProps[];
}

export interface DataItemsInstallmentsProps {
    data:ItemsInstallmentsProps;
}