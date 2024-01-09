import { useState } from "react";
import { getLoggedUser } from '@helpers/Permissions';

import Api from '@services/Api';

import { DataCategoryItemProps, DataItemsResumeProps } from "@pages/Finance/Category/types";

import ToastNotifyActions from 'store/ducks/ToastNotify';
import { useDispatch } from 'react-redux';


export const useGetCategories = () => {

	const [isLoadingCategories, setIsLoadingCategories] = useState(false);

	const dispatch = useDispatch();

	const getCategoriesData = async () => {

		try {
			setIsLoadingCategories(true);

			const { idUsuarioCliente } = await getLoggedUser();

			console.log("=== id", idUsuarioCliente)
			const params = `ativo=true&campos=*&idUsuarioCliente=${idUsuarioCliente}&idsTipoCategoriaFinanceiro=-2&ordenacao=+nomeCategoriaFinanceiro`;
			const response: DataItemsResumeProps = await Api.get(`/core/v1/categorias-financeiro?${params}`);

			const { itens }: DataCategoryItemProps = response.data;
			return itens

		} catch (error) {
			dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível recuperar estas categorias', true));
		} finally {
			setTimeout(() => {
				setIsLoadingCategories(false);
			}, 2000);
		}
	};
	return { isLoadingCategories, getCategoriesData };
}

