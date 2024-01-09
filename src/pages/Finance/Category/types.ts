export interface CategoryItemProps {
	id:number,
	title?: string,
	SubTitle?: string,
}

export interface DataItemProps {
	items: [CategoryItemProps]
}



export interface CategoryProps {
	idCategoriaFinanceiro: number,
	nomeCategoriaFinanceiro: string,
	corCategoria: string,
}

export interface DataCategoryItemProps{
	items: [CategoryProps],
}


export interface PersonProps {
	nomePessoaCliente: string,
	idPessoaCliente: number,
	email: string,
}

export interface ItemPersonItemProps{
	items: PersonProps[];
}

export interface DataPersonItemProps{
	data: ItemPersonItemProps;
}



export interface ProcessProps{
	numeroProcesso: string;
}

export interface ItemProcessProps{
	items: ProcessProps[];
}

export interface DataProcessProps{
	data: ItemProcessProps;
}











