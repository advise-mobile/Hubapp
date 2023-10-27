import { useState ,useCallback } from "react";

import  Api  from '@services/Api';

import { DataItemsProps, ItemsProps, ItemProps , DataItemsResumeProps,ItemsResumeProps } from "@pages/Finance/Releases/types";

import ToastNotifyActions from 'store/ducks/ToastNotify';

import { useDispatch } from 'react-redux';


export const useGetFinanceID= () => {
    
    const [isLoadingFinanceID, setIsLoadingFinanceID] = useState(false);

    const dispatch = useDispatch();

    const getFinanceDataID = async () => {
    
        
        try {
            setIsLoadingFinanceID(true);

            const params = `ativo=true&campos=idContaFinanceiro,idFinanceiro`;
            const response: DataItemsProps = await Api.get(`/core/v1/contas-financeiro?${params}`);
            const { itens } : ItemsProps  = response.data;
            return itens
            
        } catch (error) {
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível recuperar estes lançamentos',true));
        }finally {
            setTimeout(() => {
                setIsLoadingFinanceID(false);
            }, 2000); 

            
        }
    };
    
    return {isLoadingFinanceID, getFinanceDataID};
}

export const useGetResume = () => {

    const [isLoadingResumeRelease, setIsLoadingResumeRelease] = useState(false);

    const dispatch = useDispatch();

    const getReleaseResume = async (filters:ItemProps) => {
        
        try {
            setIsLoadingResumeRelease(true);

            const params = `campos=*`;
            const response: DataItemsResumeProps = await Api.get(`/core/v1/saldos-contas-financeiro/total?${params}`,{
                filters
            });

            const { itens } : ItemsResumeProps  = response.data;
            return itens[0]
            
        } catch (error) {
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível buscar este resumo',true));
        }finally {
            setTimeout(() => {
                setIsLoadingResumeRelease(false);
            }, 2000); 

            
        }
    };
    
    return {isLoadingResumeRelease, getReleaseResume};
}