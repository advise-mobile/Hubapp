import { useState } from "react";
import { getLoggedUser } from '@helpers/Permissions';
import { toCamelCase } from "@helpers/functions";

import Api from '@services/Api';

import { DataCategoryItemProps, DataCategoryProps, CategoryDataProps } from "@pages/Finance/Category/types";

import ToastNotifyActions from 'store/ducks/ToastNotify';
import { useDispatch } from 'react-redux';


export const useGetCategory = () => {

	const [isLoadingCategory, setIsLoadingCategory] = useState(false);

	const dispatch = useDispatch();

	const getCategoryData = async (filtersData:CategoryDataProps | undefined ) => {

		try {
			setIsLoadingCategory(true);

			const { idUsuarioCliente } = await getLoggedUser();

			let filters;
			if ((filtersData === undefined) || (filtersData.type === null && filtersData.situation == null) ){
				filters = ""
			}else{
				filters = `IdsTipoCategoriaFinanceiro=${filtersData.type}&ativo=${filtersData.situation}`;
			}

			const params = `?campos=*&registrosPorPagina=300&idUsuarioCliente=${idUsuarioCliente}&ordenacao=+nomeCategoriaFinanceiro`;
			const response: DataCategoryProps = await Api.get(`/core/v1/categorias-financeiro${params}&${filters}`);

			const { itens }: DataCategoryItemProps = response.data;

			const itensOptimized = itens.map((item:ItemInstallmentsProps) => {

                return {
                            ...item,
  							nomeCategoriaFinanceiro:item.nomeCategoriaFinanceiro.length > 13 ? 
							  toCamelCase(item.nomeCategoriaFinanceiro.substr(0,10)) + " ...":
							  toCamelCase(item.nomeCategoriaFinanceiro)
                        }
            });
            return itensOptimized;

		} catch (error) {
			dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível recuperar estas categorias', true));
		} finally {
			setTimeout(() => {
				setIsLoadingCategory(false);
			}, 200);
		}
	};
	return { isLoadingCategory, getCategoryData };
}

