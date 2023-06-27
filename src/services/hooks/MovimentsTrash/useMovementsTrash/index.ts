import { useEffect, useState ,useCallback } from "react";

import  Api  from '@services/Api';

import { MovementsProps, ItemProps } from '@pages/MovementsTrash/types'

import { MovementsTrashProps } from "./types";

import ToastNotifyActions from 'store/ducks/ToastNotify';

import { useDispatch } from 'react-redux';

import  { FormatDateBR }  from '@helpers/DateFunctions.js';

import { MaskCnj } from '@helpers/Mask';

import { getLoggedUser } from '@helpers/Permissions';

import { KeyWordsProps, ItemKeyWordsProps, DiariesParamsProps, DiariesDataProps, ItemDiarieProps, JournalsParamsProps, ItemJournalProps, JournalsDataProps } from "../types";

import { ItemProps as MultiSelectCheckBoxProps } from "@components/MultiSelectCheckBox/types";

export const useGetMovementsTrash = (dataFilters:MovementsTrashProps) => {

    const [loading, setLoading] = useState(true);    
    const [movementsTrash, setMovementsTrash] = useState<ItemProps[]>([]);
    
    const getData = async (filters:MovementsTrashProps) => {
        
        try {

            let addFilters = `&paginaAtual=${filters.page}`;
            if(filters.itens){
                                
                if(filters.itens.Lido){
                    addFilters+=`&lido=${filters.itens.Lido}`;
                }
                if(filters.itens.idPalavraChave){
                    addFilters+=`&idsPalavraChave=${filters.itens.idPalavraChave.toString()}`;
                }
                
                if(filters.itens.idDiario){
                    addFilters+=`&idsDiarios=${filters.itens.idDiario.toString()}`;
                }

                if(filters.itens.idJournals){
                    addFilters+=`&idsCadernos=${filters.itens.idJournals.toString()}`;
                }
                
                if(filters.itens.idTipoMovProcesso){
                    addFilters+=`&idTipoMovProcesso=${filters.itens.idTipoMovProcesso}`;
                }

                if(filters.itens.DataMovimentoInicio){
                    addFilters+=`&DataMovimentoInicio=${filters.itens.DataMovimentoInicio}`;
                }
                
                if(filters.itens.DataMovimentoFim){
                    addFilters+=`&DataMovimentoFim=${filters.itens.DataMovimentoFim}`;
                }
                
            }
            
            
          
            const params = `campos=*&ordenacao=-dataHoraInclusao&registrosPorPagina=300&possuiDataLixeira=true${addFilters}`;

            const response:MovementsProps = await Api.get(`/core/v1/movimentos-usuarios-clientes?${params}`);
            
            const { itens } = response.data;

            const itensOptimized = itens.map((item:ItemProps) => {
                                
                const dataPublicacao =  item.movimento.idTipoMovProcesso === -1 ?  
                                        FormatDateBR(item.movimento.dataHoraMovimento) :
                                        FormatDateBR(item.movimento.publicacao?.dataPublicacaoDiarioEdicao);

                                        

                const dataDivulgacao =  item.movimento.idTipoMovProcesso === -1 ?  
                FormatDateBR(item.movimento.dataHoraMovimento) :
                FormatDateBR(item.movimento.publicacao?.dataDivulgacao);

                const title = item.movimento.idTipoMovProcesso === -1 ? 
                            `${ dataPublicacao } - ${item.movimento.andamentoProcesso?.siglaOrgaoJudiriario} - ${item.movimento.andamentoProcesso?.nomeFontePesquisa}`:
                            `${ dataDivulgacao } - ${item.movimento.publicacao?.descricaoCadernoDiario}`

                const resumo = item.movimento.idTipoMovProcesso === -1 ? 
                                    item.movimento.andamentoProcesso?.resumo:
                                    item.movimento.publicacao?.resumo;

                const idTipoMovProcesso = item.movimento.idTipoMovProcesso;

                const numeroProcesso = item.movimento.idTipoMovProcesso === -1 ? 
                                        MaskCnj(item.movimento.andamentoProcesso?.numeroProcesso):
                                        item.movimento.publicacao?.processosPublicacoes && item.movimento.publicacao?.processosPublicacoes?.length > 0 ?
                                        MaskCnj(item.movimento.publicacao?.processosPublicacoes[0].numeroProcesso) : null;

                const palavrasChaves = item.movimento.idTipoMovProcesso === -1 ? 
                                        null:
                                        item.movimento.publicacao?.palavrasChaves && item.movimento.publicacao?.palavrasChaves?.length > 0 ?
                                        item.movimento.publicacao?.palavrasChaves : null;



                return { 
                            ...item,
                            title,
                            idTipoMovProcesso,
                            numeroProcesso,
                            resumo,
                            dataPublicacao,
                            dataDivulgacao,
                            palavrasChaves
                        }
            });

            setMovementsTrash(itensOptimized);
            
        } catch (error) {
            const dispatch = useDispatch();
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível carregar os movimentos. Tente mais tarde',true));
        }finally {
            setLoading(false);        
        }
    }

    useEffect(() => {
        getData(dataFilters);
    }, []);

  return { loading, movementsTrash ,getData };
};

export const useMovementRecover = () => {
    
    const [isLoadingRecover, setIsloadngRecover] = useState(false);
    
    const dispatch = useDispatch();

    const recoverMoviment = useCallback( async (item:ItemProps, handleCallback:() => void) => {
        
        try {
            setIsloadngRecover(true);

            const { idUsuarioCliente } =  await getLoggedUser();
    
            const data = [{
                idMovimentoProcessoCliente:item.idMovProcessoCliente,
                idUsuarioCliente
            }]
            
            const response = await Api.put(`/core/v1/movimentos-usuarios-clientes/restaurar-lixeira`,data);

            dispatch(ToastNotifyActions.toastNotifyShow('Movimento recuperado com sucesso!',false));

            return true;

        } catch (error) {
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível recuperar este movimento',true));
        }finally {
            setTimeout(() => {
                setIsloadngRecover(false);
                handleCallback(); 
            }, 2000); 

            
        }
    }, [isLoadingRecover])
    
    return {isLoadingRecover, recoverMoviment};
}

export const useMovementDelete = () => {
    
    const [isLoadingDelete, setIsloadngDelete] = useState(false);
    
    const dispatch = useDispatch();

    const deleteMovement = useCallback( async (item:ItemProps, handleCallback:() => void) => {
        
        try {
            setIsloadngDelete(true);

            const { idUsuarioCliente } =  await getLoggedUser();
            
            const data = [{
                idMovimentoProcessoCliente:item.idMovProcessoCliente,
                idUsuarioCliente
            }]
            
            const response = await Api.put(`core/v1/pastas-usuarios-clientes/desvincular-movimento`,data);

            dispatch(ToastNotifyActions.toastNotifyShow('Movimento excluído com sucesso!',false));

            return true;
        } catch (error) {
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível excluir este movimento',true));
        }finally {
            setTimeout(() => {
                setIsloadngDelete(false);
                handleCallback(); 
            }, 2000);  
        }
    }, [isLoadingDelete])
    
    return {isLoadingDelete, deleteMovement};
}

export const  useKeyWordsGet =  () => {
    const [loadingKeyWords, setLoadingKeyWords] = useState(true);    
    const [dataKeyWords, setDataKeyWords] = useState<MultiSelectCheckBoxProps[]>([]);

    const getData = async () => {
        
            try  {

                setLoadingKeyWords(true);  

                const params = `ativo=true&campos=idPalavra,palavraChave&idTipoPasta=-2`;
                
                const response: KeyWordsProps = await Api.get(`core/v1/pastas-usuarios-clientes`);
                
                const { itens } = response.data;

                

                const itensPasta = itens.filter((item:ItemKeyWordsProps) => {
                    if(item.idTipoPasta === -2 && item.ativo === true) return item;
                    
                });

                const keyWords = itensPasta.map((item:ItemKeyWordsProps) => {
                    const {idPalavraChave, palavraChave} = item;
                    return {
                                id:idPalavraChave,
                                description:palavraChave,
                                isChecked:true
                            }
                });

                setDataKeyWords(keyWords);
            } catch (error) {
                const dispatch = useDispatch();
                dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível carregar os movimentos. Tente mais tarde',true));
            }finally {
                setLoadingKeyWords(false);        
            }
    }

    useEffect(() => {
        getData();
    }, []);

    return { loadingKeyWords, dataKeyWords };
}

export const  useDiariesGet =  () => {
    const [isLoadingDiaries, setIsLoadingDiaries] = useState(false);    
    const [dataDiaries, setDataDiaries] = useState<ItemDiarieProps[]>([]);

    const diariesGet = useCallback( async ( keyWords : DiariesParamsProps) => {
        
        try {
            setIsLoadingDiaries(true);  

            const params = `IdsPalavraChave=${keyWords.idPalavraChave.toString()}`;
            
            const response: DiariesDataProps = await Api.get(`/core/v1/diarios/usuario-grupo?${params}`);

            const { data } = response;
            
            const diaries = data.itens.sort((a, b) => (a.nomeDiario > b.nomeDiario) ? 1 : ((b.nomeDiario > a.nomeDiario) ? -1 : 0));

            const diariesOptimized = diaries.map((item:ItemDiarieProps) => {
                return { 
                        id:item.idDiario,
                        description:item.nomeDiario,
                        isChecked:true
                    }
            });
                     
            setIsLoadingDiaries(false);  
            return diariesOptimized;

        } catch (error) {
            const dispatch = useDispatch();
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível carregar os diarios. Tente mais tarde',true));
        }finally {
            setTimeout(() => {
                setIsLoadingDiaries(false);  
            }, 5000); 

            
        }
    }, [isLoadingDiaries])


    return { isLoadingDiaries, dataDiaries, diariesGet };
}

export const useJournalsGet = () =>{
    
    const [isLoadingJournals, setIsLoadingJournals] = useState(false);    
    const [dataJournals, setDataJournals] = useState<ItemJournalProps[]>([]);

    const journalsGet = useCallback( async ( diaries : JournalsParamsProps) => {
        
        try {
            setIsLoadingJournals(true);  

            const params = `campos=*&paginaAtual=1&registrosPorPagina=100&IdsDiario=${diaries.IdsDiario.toString()}`;
            
            const response: JournalsDataProps  = await Api.get(`/core/v1/cadernos-diarios?${params}`);

            const { data } = response;
            
            const journalsOptimized = data.itens.map((item:ItemJournalProps) => {
                return { 
                        id:item.id,
                        description:item.descricao,
                        isChecked:true
                    }
            });
                     
            setIsLoadingJournals(false);  
            return journalsOptimized;

        } catch (error) {
            const dispatch = useDispatch();
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível carregar os cadernos. Tente mais tarde',true));
        }finally {
            setTimeout(() => {
                setIsLoadingJournals(false);  
            }, 5000); 

            
        }
    }, [isLoadingJournals])


    return { isLoadingJournals, dataJournals, journalsGet };
}