import { useState } from "react";
import { getLoggedUser } from '@helpers/Permissions';

import Api from '@services/Api';

import { DataCategoryItemProps, DataItemsResumeProps } from "@pages/Finance/Category/types";

import ToastNotifyActions from 'store/ducks/ToastNotify';
import { useDispatch } from 'react-redux';
import { useTheme } from "styled-components";


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

export const useGetPopulateCategories = () => {

		// Variavel para usar o hook
	const colorUseTheme = useTheme();

	const {colors} = colorUseTheme;

	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const getCategoriesData = async () => {

		try {
			setIsLoading(true);
			
			const params = `campos=nomeCategoriaFinanceiro,corCategoria,+idCategoriaFinanceiro&registrosPorPagina=9999`;
			const response: DataItemsResumeProps = await Api.get(`/core/v1/categorias-financeiro?${params}`);

			const { itens }: DataCategoryItemProps = response.data;

			const formatedItens = itens.map((item) => {
				
				return {
						idCategoriaFinanceiro: item.idCategoriaFinanceiro,
						nomeCategoriaFinanceiro: item.nomeCategoriaFinanceiro,
						corCategoria: item.corCategoria !== undefined ? item.corCategoria : colors.gray
					}
			});

			
			return formatedItens;

		} catch (error) {
			dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível popular estas categorias', true));
		} finally {
			setTimeout(() => {
				setIsLoading(false);
			}, 2000);
		}
	};
	return { isLoading, getCategoriesData };
} 

