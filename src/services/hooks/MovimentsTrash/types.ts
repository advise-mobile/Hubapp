export interface ItemKeyWordsProps {
    
    id: string,
    idUsuarioCliente: number,
    nomeUsuarioCliente: string,
    idTipoPasta: number,
    nomeTipoPasta: string,
    permiteAlterarNomeTipoPasta: boolean,
    nome: string,
    idPalavraChave: number,
    palavraChave: string,
    idSituacaoPalavraChave:number,
    nomeSituacaoPalavraChave: string,
    ativo: boolean,
    dataHoraInclusao: string,
    idUsuarioUltAlteracao:number,
    nomeUsuarioUltAlteracao:string,
    dataHoraUltAlteracao: string,
    totalNaoLidas: number,
    totalLidas: number,
    quantidadeTotal: number,
    totalPasta: number
}

export interface ItensProps {
    itens: [ItemKeyWordsProps]
}

export interface KeyWordsProps {
    data:ItensProps;
}

export interface DiariesParamsProps {
    idPalavraChave:Array<number>;
}

export interface ItemDiarieProps {
    idDiario: number,
    nomeDiario: string,
    descricaoDiario: string
}

export interface ItemsDiariesProps {
    itens:Array<ItemDiarieProps>
}

export interface DiariesDataProps {
    data: ItemsDiariesProps
}

export interface JournalsParamsProps {
    IdsDiario:Array<number>;
}

export interface ItemJournalProps {
    id: number,
    idDiario: number,
    nome: string,
    descricao: string,
    idUsuarioInclusao: number,
    dataHoraInclusao: string,
    codCaderno: number,
    ativo: boolean,
    nomeDiario: string,
    nomeUsuarioInclusao: string,
    totalRegistros: number
}

export interface ItemsJournalsProps {
    itens:Array<ItemJournalProps>
}

export interface JournalsDataProps {
    data: ItemsJournalsProps
}

