interface AnexosProps {
    idAnexoProcesso: number,
    dataHoraAnexoSpider: string,
    descricaoAnexoProc: string,
    flArquivoRestrito: boolean
}

interface PathsProps {
    nome: string,
    idPastaUsuarioCliente: number
}

interface AndamentProccessProps {
    id: number,
    descricaoAndamento: string
    resumo: string
    idOrgaoJudiriario: number,
    siglaOrgaoJudiriario: string,
    idFontePesquisa: number,
    nomeFontePesquisa: string,
    identificadorClasseFonteProcesso: string,
    dataHoraAndamentoProcesso: string,
    idProcesso: number,
    numeroProcesso: string,
    sujeitos: string,
    anexo: [AnexosProps],
}
interface WordKeysProps {
    id: number,
    palavraChave: string,
    idTipoPalavraChave:number,
    idPalavraChavePrincipal?:number
}

interface PublicationProcessProps {
    id: number,
    numeroProcesso: string,
    numeroCNJ: boolean
}

interface PublicationProps {
        id: number,
        cidadeComarcaDescricao: string,
        despacho: string
        paginaInicial: number,
        paginaFinal: number,
        edicaoDiario: number,
        varaDescricao: string,
        conteudo: string,
        resumo: string,
        idCadernoDiario: number,
        nomeCadernoDiario: string,
        descricaoCadernoDiario: string,
        idDiarioEdicao: number,
        nomeDiario: string,
        descricaoDiario: string,
        dataPublicacaoDiarioEdicao: string,
        dataPublicacao: string,
        dataDivulgacao: string,
        palavrasChaves: [WordKeysProps],
        processosPublicacoes?: [PublicationProcessProps]
}
interface MovementProps {
    id: number,
    idCliente: number,
    nomeCliente: string
    idTipoMovProcesso: number,
    nomeTipoMovProcesso: string,
    dataHoraMovimento: string,
    ativo: boolean,

    idAndamentoProcesso?: number,
    idFonteAndamentoProcesso?: number,
    andamentoProcesso?: AndamentProccessProps,

    idPublicacao?: number,
    codPublicacao?: number,    
    publicacao?: PublicationProps,
    pastas:[PathsProps]
}

export interface ItemProps {
    id:number,
    idMovProcessoCliente:number,
    ativo:boolean,
    lido:boolean,
    movimento:MovementProps,
    title?:string,
    idTipoMovProcesso?:number,
    resumo?:string,
    numeroProcesso?:string,
    dataPublicacao?:string,
    publicacao?:PublicationProps | null,
    palavrasChaves?: [WordKeysProps] | null,

}
 
export interface ItensProps {
    itens: [ItemProps]
}
export interface MovementsProps {
    data:ItensProps;
}