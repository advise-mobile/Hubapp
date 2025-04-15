import {useCallback, useState} from 'react';
import {getLoggedUser} from '@helpers/Permissions';
import {toCamelCase} from '@helpers/functions';

import Api from '@services/Api';

import {
	DataCategoryItemProps,
	DataCategoryProps,
	CategoryDataProps,
	CategoryProps,
} from '@pages/Finance/Category/types';

import ToastNotifyActions from 'store/ducks/ToastNotify';
import {useDispatch} from 'react-redux';

export const useGetCategory = () => {
	const [isLoadingCategory, setIsLoadingCategory] = useState(false);

	const dispatch = useDispatch();

	const getCategoryData = async (filtersData: CategoryDataProps | undefined) => {
		try {
			setIsLoadingCategory(true);

			const {idUsuarioCliente} = await getLoggedUser();

			let filters;
			if (
				filtersData === undefined ||
				(filtersData.type === null && filtersData.situation == null)
			) {
				filters = '';
			} else {
				filters = `IdsTipoCategoriaFinanceiro=${filtersData.type}&ativo=${filtersData.situation}`;
			}

			const params = `?campos=*&registrosPorPagina=300&idUsuarioCliente=${idUsuarioCliente}&ordenacao=+nomeCategoriaFinanceiro`;
			const response: DataCategoryProps = await Api.get(
				`/core/v1/categorias-financeiro${params}&${filters}`,
			);

			const {itens}: DataCategoryItemProps = response.data;

			const itensOptimized = itens.map((item: ItemInstallmentsProps) => {
				return {
					...item,
					nomeCategoriaFinanceiroShow:
						item.nomeCategoriaFinanceiro.length > 13
							? toCamelCase(item.nomeCategoriaFinanceiro.substr(0, 10)) + ' ...'
							: toCamelCase(item.nomeCategoriaFinanceiro),
				};
			});
			return itensOptimized;
		} catch (error) {
			dispatch(
				ToastNotifyActions.toastNotifyShow('Não foi possível recuperar estas categorias', true),
			);
		} finally {
			setTimeout(() => {
				setIsLoadingCategory(false);
			}, 200);
		}
	};
	return {isLoadingCategory, getCategoryData};
};

export const useCategory = () => {
	const [isSavingCategory, setIsSavingCategory] = useState(false);

	const dispatch = useDispatch();

	const saveCategory = async (data: DataCategoryItemProps, handleCallback: () => void) => {
		try {
			setIsSavingCategory(true);

			const response = await Api.post(`core/v1/categorias-financeiro`, data);

			dispatch(ToastNotifyActions.toastNotifyShow('Categoria cadastrada com sucesso!', false));

			return true;
		} catch (error) {
			dispatch(
				ToastNotifyActions.toastNotifyShow('Não foi possível cadastrar esta categoria', true),
			);
		} finally {
			setTimeout(() => {
				setIsSavingCategory(false);
				handleCallback();
			}, 1000);
		}
	};

	const updateCategory = async (data: DataCategoryItemProps, handleCallback: () => void) => {
		try {
			setIsSavingCategory(true);

			const response = await Api.put(`core/v1/categorias-financeiro`, data);

			dispatch(ToastNotifyActions.toastNotifyShow('Categoria alterada com sucesso!', false));

			return true;
		} catch (error) {
			dispatch(
				ToastNotifyActions.toastNotifyShow('Não foi possível cadastrar esta categoria', true),
			);
		} finally {
			setTimeout(() => {
				setIsSavingCategory(false);
				handleCallback();
			}, 1000);
		}
	};

	const inactivateCategory = async (data: CategoryProps, handleCallback: () => void) => {
		try {
			setIsSavingCategory(true);

			const categoryIds = {
				ids: [data.idCategoriaFinanceiro],
			};

			const response = await Api.put(`core/v1/categorias-financeiro/inativar`, categoryIds);

			dispatch(ToastNotifyActions.toastNotifyShow('Categoria inativada com sucesso!', false));

			return true;
		} catch (error) {
			const errorMessage =
				error.response?.data?.status?.erros?.[0]?.mensagem ||
				'Não foi possível inativar esta categoria';

			dispatch(ToastNotifyActions.toastNotifyShow(errorMessage, true));
		} finally {
			setTimeout(() => {
				setIsSavingCategory(false);
				handleCallback();
			}, 1000);
		}
	};

	const activateCategory = async (data: CategoryProps, handleCallback: () => void) => {
		try {
			setIsSavingCategory(true);

			const categoryIds = {
				ids: [data.idCategoriaFinanceiro],
			};

			const response = await Api.put(`core/v1/categorias-financeiro/ativar`, categoryIds);

			dispatch(ToastNotifyActions.toastNotifyShow('Categoria ativada com sucesso!', false));

			return true;
		} catch (error) {
			dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível ativar esta categoria', true));
		} finally {
			setTimeout(() => {
				setIsSavingCategory(false);
				handleCallback();
			}, 1000);
		}
	};

	return {isSavingCategory, saveCategory, updateCategory, inactivateCategory, activateCategory};
};
