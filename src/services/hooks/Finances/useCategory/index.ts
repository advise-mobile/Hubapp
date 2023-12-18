import { useState } from "react";
import { getLoggedUser } from '@helpers/Permissions';

import Api from '@services/Api';

import { CategoryDataItemProps, CategoryDataProps } from "@pages/Finance/Category/types";

import ToastNotifyActions from 'store/ducks/ToastNotify';
import { useDispatch } from 'react-redux';

interface CategoryDataProps {
	type:number,
	situation:boolean
}

export const useGetCategory = () => {

	const [isLoadingCategory, setIsLoadingCategory] = useState(false);

	const dispatch = useDispatch();

	const getCategoryData = async (filtersData:CategoryDataProps | undefined ) => {

		try {
			setIsLoadingCategory(true);

			const { idUsuarioCliente } = await getLoggedUser();

			let filters;
			if (filtersData === undefined){
				filters = ""
			}else{
				filters = `“IdsTipoCategoriaFinanceiro”=${filtersData.type}&situacao=${filtersData.situation}`;
			}

			const params = `?campos=*&idUsuarioCliente=65810&ordenacao=+nomeCategoriaFinanceiro`;
			const response: CategoryDataProps = await Api.get(`/core/v1/categorias-financeiro${params}&${filters}`);

			const { itens }: CategoryDataItemProps = response.data;
			return itens

		} catch (error) {
			dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível recuperar estas categorias', true));
		} finally {
			setTimeout(() => {
				setIsLoadingCategory(false);
			}, 2000);
		}
	};
	return { isLoadingCategory, getCategoryData };
}

