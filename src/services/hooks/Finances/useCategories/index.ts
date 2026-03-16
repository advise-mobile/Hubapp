import { useState } from 'react';
import { getLoggedUser } from '@lhelpers/Permissions';

import Api from '@lservices/Api';

import {
  DataCategoryItemProps,
  DataItemsResumeProps,
} from '@pages/Finance/Category/types';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';

export const useGetCategories = () => {
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const dispatch = useDispatch();

  const getCategoriesData = async () => {
    try {
      setIsLoadingCategories(true);

      const { idUsuarioCliente } = await getLoggedUser();

      const params = `ativo=true&campos=*&idUsuarioCliente=${idUsuarioCliente}&idsTipoCategoriaFinanceiro=-2&ordenacao=+nomeCategoriaFinanceiro`;
      const response: DataItemsResumeProps = await Api.get(
        `/core/v1/categorias-financeiro?${params}`,
      );

      const { itens }: DataCategoryItemProps = response.data;
      return itens;
    } catch (error) {
      dispatch(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível recuperar estas categorias',
          true,
        ),
      );
    } finally {
      setTimeout(() => {
        setIsLoadingCategories(false);
      }, 2000);
    }
  };
  return { isLoadingCategories, getCategoriesData };
};

export const useGetPopulateCategories = () => {
  // Variavel para usar o hook
  const colorUseTheme = useTheme();

  const { colors } = colorUseTheme;

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const getCategoriesData = async (type?: 'D' | 'R' | 'C') => {
    try {
      setIsLoading(true);

      const { idUsuarioCliente } = await getLoggedUser();

      // Monta os parâmetros base
      const baseParams = `ativo=true&campos=nomeCategoriaFinanceiro,corCategoria,+idCategoriaFinanceiro&idUsuarioCliente=${idUsuarioCliente}&registrosPorPagina=100&ordenacao=+nomeCategoriaFinanceiro`;

      // Adiciona o filtro de tipo apenas se type for fornecido
      let params = baseParams;
      if (type) {
        // 'D' = Despesa (-2), 'C' = Crédito/Receita (-1)
        const idsTipoCategoriaFinanceiro =
          type === 'D' ? '-2' : type === 'C' || type === 'R' ? '-1' : '-2';
        params = `${baseParams}&idsTipoCategoriaFinanceiro=${idsTipoCategoriaFinanceiro}`;
      }

      const response: DataItemsResumeProps = await Api.get(
        `/core/v1/categorias-financeiro?${params}`,
      );

      const { itens }: DataCategoryItemProps = response.data;

      const formatedItens = itens.map(item => {
        return {
          idCategoriaFinanceiro: item.idCategoriaFinanceiro,
          nomeCategoriaFinanceiro: item.nomeCategoriaFinanceiro,
          corCategoria:
            item.corCategoria === undefined
              ? colors.colorlessBadge
              : item.corCategoria,
        };
      });

      return formatedItens;
    } catch (error) {
      dispatch(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível popular estas categorias',
          true,
        ),
      );
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };
  return { isLoading, getCategoriesData };
};
