export interface FinanceItemProps {
	date: string,
	title: string,
	type: string,
	description: string,
	value: string,
	category: string,
	off: boolean,
	dateOff?:string,
}

export interface DataItemProps {
	item:FinanceItemProps
}
