import { useState } from "react";

import Api from '@services/Api';
import ToastNotifyActions from 'store/ducks/ToastNotify';
import { useDispatch } from 'react-redux';
import { DataProcessProps, ItemProcessProps } from "@pages/Finance/Category/types";


export const useGetProcess = () => {
	const [isLoadingProcess, setIsLoadingProcess] = useState(false);
	const dispatch = useDispatch();

	const getProcessData = async () => {
		try {
			setIsLoadingProcess(true);



			const params = `?ativo=true&campos=*&idTipoPasta=-3`;
			const response: DataProcessProps = await Api.get(`core/v1/pastas-usuarios-clientes${params}`);




			const { itens }: ItemProcessProps = response.data;

			return itens;



		} catch (error) {
			dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível recuperar estes processos', true));
		} finally {
			setTimeout(() => {
				setIsLoadingProcess(false);
			}, 2000);
		}
	};

	return { isLoadingProcess, getProcessData };
}

