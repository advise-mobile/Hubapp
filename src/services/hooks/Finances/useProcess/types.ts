
export interface ProcessProps{
    id: number,
    idUsuarioCliente: number,
    nomeUsuarioCliente: string,
    idTipoPasta: number,
    nomeTipoPasta: string,
    permiteAlterarNomeTipoPasta: boolean,
    nome: string,
    idProcesso?: number,
    numeroProcesso?: string,
    ativo: boolean,
    dataHoraInclusao: string,
    idUsuarioUltAlteracao: number,
    nomeUsuarioUltAlteracao: string,
    dataHoraUltAlteracao: string,
    totalNaoLidas: number,
    totalLidas: number,
    quantidadeTotal: number,
    totalPasta: number
}

export interface ItemProcessProps{
	itens: ProcessProps[];
}

export interface DataProcessProps{
	data: ItemProcessProps;
}