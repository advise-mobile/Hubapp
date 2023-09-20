export interface CashFlowItemProps {
	title: string,
	date: string,
	valueProhibited: string,
	valueExit: string,
	valueBalance: string,
	valueTotal: string,
}

export interface DataItemProps {
	item: CashFlowItemProps
}
