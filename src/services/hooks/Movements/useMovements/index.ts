import { useEffect, useState } from "react";

import  Api  from '@services/Api';

import { useDispatch } from 'react-redux';

import ToastNotifyActions from 'store/ducks/ToastNotify';

export const useMovementsGetDeleteTrash = () => {

    const [loadingDeleteTrash, setLoadingDeleteTrash] = useState(true);    
    const [currentDayDeleteMovTrash, setCurrentDayDeleteMovTrash] = useState<number>(0);
    
    const getData = async () => {
        
        try {

            const { data } = await Api.get('/core/v1/parametros-gerais?campos=diasExcluirMovLixeira');
            
            const { itens } = data;
            
            setCurrentDayDeleteMovTrash(itens[0].diasExcluirMovLixeira);
            
        } catch (error) {
            const dispatch = useDispatch();
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível carregar os dias de vencimento. Tente mais tarde',true));
        }finally {
            setLoadingDeleteTrash(false);        
        }
    }

    useEffect(() => {
        getData();
    }, []);

  return { loadingDeleteTrash, currentDayDeleteMovTrash  };
};