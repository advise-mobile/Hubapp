import { useState } from "react";

import Api from '@services/Api';
import ToastNotifyActions from 'store/ducks/ToastNotify';
import { useDispatch } from 'react-redux';
import { DataProcessProps,ItemProcessProps } from "./types";

import { getLoggedUser } from '@helpers/Permissions';


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

export const useGetPopulateProcess = () => {
	const [isLoadingProcess, setIsLoadingProcess] = useState(false);
	const dispatch = useDispatch();

	const getProcessData = async () => {
		try {
			setIsLoadingProcess(true);

			const { idUsuarioCliente } = await getLoggedUser();	

			const params = `?campos=*&idUsuarioCliente=${idUsuarioCliente}&ativo=true&idTipoPasta=-3`;
			const response: DataProcessProps = await Api.get(`core/v1/pastas-usuarios-clientes${params}`);

			const { itens }: ItemProcessProps = response.data;

			const formatedItens = itens.map((item) => {
				
				return {
					id: item.id,
					nome:item.nome,
					idProcesso : item.idProcesso != undefined ? item.idProcesso : null ,
					numeroProcesso: item.numeroProcesso != undefined ? item.numeroProcesso : item.nome,
				}
			});

			return formatedItens;

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


