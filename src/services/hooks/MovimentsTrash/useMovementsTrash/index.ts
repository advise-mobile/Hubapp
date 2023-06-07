import { useEffect, useState ,useCallback } from "react";

import  Api  from '@services/Api';

import { MovementsProps, ItemProps } from '@pages/MovementsTrash/types'

import ToastNotifyActions from 'store/ducks/ToastNotify';

import { useDispatch } from 'react-redux';

import  { FormatDateBR }  from '@helpers/DateFunctions.js';

import { MaskCnj } from '@helpers/Mask';

import { getLoggedUser } from '@helpers/Permissions';

export const useGetMovementsTrash = (currentPage:number = 1) => {

    const [loading, setLoading] = useState(true);    
    const [movementsTrash, setMovementsTrash] = useState<ItemProps[]>([]);
    
    const getData = async () => {
        const dispatch = useDispatch();

        try {

            const params = `campos=*&ordenacao=-dataHoraInclusao&paginaAtual=${1}&registrosPorPagina=100&possuiDataLixeira=true`;
            
            const response:MovementsProps = await Api.get(`/core/v1/movimentos-usuarios-clientes?${params}`);
            
            const { itens } = response.data;

            const itensOptimized = itens.map((item:ItemProps) => {
                                
                const dataPublicacao =  item.movimento.idTipoMovProcesso === -1 ?  
                                        FormatDateBR(item.movimento.dataHoraMovimento) :
                                        FormatDateBR(item.movimento.publicacao?.dataPublicacaoDiarioEdicao);

                const title = item.movimento.idTipoMovProcesso === -1 ? 
                            `${ dataPublicacao } - ${item.movimento.andamentoProcesso?.siglaOrgaoJudiriario} - ${item.movimento.andamentoProcesso?.nomeFontePesquisa}`:
                            `${ dataPublicacao } - ${item.movimento.publicacao?.descricaoCadernoDiario}`

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
                            palavrasChaves
                        }
            });

            setMovementsTrash(itensOptimized);
            
        } catch (error) {
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível carregar os movimentos. Tente mais tarde',true));
        }finally {
            setLoading(false);        
        }
    }

    useEffect(() => {
        getData();
    }, []);

  return { loading, movementsTrash };
};

export const useMovementRecover = () => {
    
    const [isLoadingRecover, setIsloadngRecover] = useState(false);
    
    const dispatch = useDispatch();

    const recoverMoviment = useCallback( async (item:ItemProps, handleCallback:() => void) => {
        
        try {
            setIsloadngRecover(true);

            const { idUsuarioCliente } =  await getLoggedUser();
            
            const data = {
                idMovimentoProcessoCliente:item.idMovProcessoCliente,
                idUsuarioCliente
            }
            
            //const response = await Api.put(`/core/v1/movimentos-usuarios-clientes/restaurar-lixeira`,data);
            
            dispatch(ToastNotifyActions.toastNotifyShow('Movimento recuperado com sucesso!',false));

        } catch (error) {
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível recuperar este movimento',true));
        }finally {
            setTimeout(() => {
                setIsloadngRecover(false);
                handleCallback(); 
            }, 5000); 

            
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
            
            const data = {
                idMovimentoProcessoCliente:item.idMovProcessoCliente,
                idUsuarioCliente
            }
            
            //const response = await Api.put(`core/v1/pastas-usuarios-clientes/desvincular-movimento`,data);

            dispatch(ToastNotifyActions.toastNotifyShow('Movimento excluído com sucesso!',false));
        } catch (error) {
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível excluir este movimento',true));
        }finally {
            setTimeout(() => {
                setIsloadngDelete(false);
                handleCallback(); 
            }, 5000);  
        }
    }, [isLoadingDelete])
    
    return {isLoadingDelete, deleteMovement};
}