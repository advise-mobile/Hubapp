export interface CashFlowProps {
  totalEntradas: number;
  totalSaidas: number;
  dataSaldo: string;
  valorSaldo: number;
}

export interface ItemCashFlowProps {
  itens: CashFlowProps[];
}

export interface ItemCashFlowItensProps {
  itens: ItemCashFlowProps[];
}

export interface DataCashFlowProps {
  data: ItemCashFlowItensProps;
}
