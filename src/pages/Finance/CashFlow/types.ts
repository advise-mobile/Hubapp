export interface CashFlowProps {
  totalEntradas: number;
  totalSaidas: number;
  dataSaldo: string;
  valorSaldo: number;
	contador: saldoAnteriorProps;
}

export interface ItemCashFlowProps {
  itens: CashFlowProps[];
}

export interface ItemCashFlowItensProps {
  contador: ItemCashFlowProps[];
}

export interface DataCashFlowProps {
  data: ItemCashFlowItensProps;
}

export interface saldoAnteriorProps{
	saldoAnterior: number;
}
