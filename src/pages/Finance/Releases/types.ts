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
    saldo: number;
    saldoAnterior: number;
    totalEntradas: number;
    totalSaidas: number;
}
export interface ItemsResumeProps {
    itens:ItemResumeProps[];
}

export interface DataItemsResumeProps {
    data:ItemsResumeProps;
}