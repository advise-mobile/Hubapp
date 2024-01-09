import { useState } from "react";
import { getLoggedUser } from '@helpers/Permissions';
import Api from '@services/Api';
import ToastNotifyActions from 'store/ducks/ToastNotify';
import { useDispatch } from 'react-redux';

import { DataPersonItemProps, ItemPersonItemProps } from "@pages/Finance/Category/types";




export const useGetPeople = () => {
	const [isLoadingPeople, setIsLoadingPeople] = useState(false);
	const dispatch = useDispatch();

	const getPeopleData = async () => {
		try {
			setIsLoadingPeople(true);



			const params = `?campos=nomePessoaCliente,idPessoaCliente,email`;
			const response: DataPersonItemProps = await Api.get(`/core/v1/contatos${params}`);


			const { itens }: ItemPersonItemProps = response.data;

			return itens;



		} catch (error) {
			dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível recuperar estas pessoas', true));
		} finally {
			setTimeout(() => {
				setIsLoadingPeople(false);
			}, 2000);
		}
	};

	return { isLoadingPeople, getPeopleData };
}

