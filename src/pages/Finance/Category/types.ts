// export interface CategoryItemProps {
// 	id:number,
// 	title?: string,
// 	SubTitle?: string,
// }

// export interface DataItemProps {
// 	items: [CategoryItemProps]
// }



export interface CategoryProps {
	idCategoriaFinanceiro: number,
	nomeCategoriaFinanceiro: string,
	corCategoria: string,
	tipoCategoriaFinanceiro: TypeCategoryProps;
}

export interface TypeCategoryProps{
	nomeTipoCategoriaFinanceiro: string;
}

export interface DataCategoryItemProps{
	items: [CategoryProps],
}


export interface DataCategoryProps{
	data: DataCategoryItemProps,
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


//

export interface ACategoryProps {
	idCategoriaFinanceiro: number,
	nomeCategoriaFinanceiro: string,
	corCategoria: string,
	tipoCategoriaFinanceiro: ATypeCategoryProps;
}

export interface ATypeCategoryProps{
	nomeTipoCategoriaFinanceiro: string;
}

export interface ADataCategoryItemProps{
	items: [ACategoryProps],
}


export interface ADataCategoryProps{
	data: ADataCategoryItemProps,
}
















