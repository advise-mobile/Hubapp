export interface DataFilterProps {
    DataMovimentoInicio: string,
    DataMovimentoFim: string,
    idTipoMovProcesso: string,
    Lido: boolean,
    idPalavraChave: Array<number>,
    idDiario: Array<number>,
    idJournals: Array<number>,
}

export interface FilterProps {
    handleSubmitFilters: (item:DataFilterProps) => void;
}