import { useState } from "react";

import Api from '@services/Api';
import ToastNotifyActions from 'store/ducks/ToastNotify';
import { useDispatch } from 'react-redux';
import { DataFilterCategoryProps, ItemFilterCategoryProps } from "@pages/Finance/Modal/CategoryFilter/types";



export const useGetFilterCategory = () => {
	const [isLoadingFilterCategory, setIsLoadingFilterCategory] = useState(false);
	const dispatch = useDispatch();

	const getFilterCategoryData = async () => {
		try {
			setIsLoadingFilterCategory(true);

			const params = `?campos=*`;
			const response: DataFilterCategoryProps = await Api.get(`core/v1/tipos-categorias-financeiro${params}`);

			const { itens }: ItemFilterCategoryProps = response.data;

			return itens;



		} catch (error) {
			dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível recuperar estes processos', true));
		} finally {
			setTimeout(() => {
				setIsLoadingFilterCategory(false);
			}, 2000);
		}
	};

	return { isLoadingFilterCategory, getFilterCategoryData };
}

