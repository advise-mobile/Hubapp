import { useState ,useCallback } from "react";

import  Api  from '@services/Api';

import  { FormatDateBR }  from '@helpers/DateFunctions.js';
import  { FormatReal }  from '@helpers/MoneyFunctions.ts';


import { DataItemsProps, ItemsProps, ItemProps ,
         DataItemsResumeProps, ItemsResumeProps,ItemResumeProps,
         DataItemsInstallmentsProps,ItemsInstallmentsProps,ItemInstallmentsProps, FilterPeriodProps } from "@pages/Finance/Releases/types";

import ToastNotifyActions from 'store/ducks/ToastNotify';

import { useDispatch } from 'react-redux';
import { DataItemsDetailsProps, ItemsDetailsProps } from "@pages/Finance/Details/types";


export const useGetFinanceID= () => {

    const [isLoadingFinanceID, setIsLoadingFinanceID] = useState(false);

    const dispatch = useDispatch();

    const getFinanceDataID = async () => {

        try {
            setIsLoadingFinanceID(true);

            const params = `ativo=true&campos=idContaFinanceiro,idFinanceiro`;
            const response: DataItemsProps = await Api.get(`/core/v1/contas-financeiro?${params}`);
            const { itens } : ItemsProps  = response.data;
            return itens

        } catch (error) {
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível recuperar estes lançamentos',true));
        }finally {
            setTimeout(() => {
                setIsLoadingFinanceID(false);
            }, 2000);
        }


    };
    return {isLoadingFinanceID, getFinanceDataID};
}

export const useGetResume = () => {

    const [isLoadingResumeRelease, setIsLoadingResumeRelease] = useState(false);

    const dispatch = useDispatch();

    const getReleaseResume = async (filters:ItemProps) => {

        try {
            setIsLoadingResumeRelease(true);

            const params = `campos=*`;
            const response: DataItemsResumeProps = await Api.get(`/core/v1/saldos-contas-financeiro/total?${params}`,{
                filters
            });

            const { itens } : ItemsResumeProps  = response.data;
            return {
                saldo: FormatReal(itens[0].saldo),
                saldoAnterior: FormatReal(itens[0].saldoAnterior),
                totalEntradas: FormatReal(itens[0].totalEntradas),
                totalSaidas: FormatReal(itens[0].totalSaidas)
            }

        } catch (error) {
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível buscar este resumo',true));
        }finally {
            setTimeout(() => {
                setIsLoadingResumeRelease(false);
            }, 2000);
        }
    };
    return {isLoadingResumeRelease, getReleaseResume};
}

export const useGetInstallments = () => {

    const [isLoadingInstallments, setIsLoadingInstallments] = useState(false);

    const dispatch = useDispatch();

    const getInstallments = async (filters:FilterPeriodProps) => {

        try {
            setIsLoadingInstallments(true);

            let currentPage = filters.currentPage ? filters.currentPage : 1;
            let period = `dataVencimento=${filters.dataVencimento}&dataVencimentoFim=${filters.dataVencimentoFim}`;



            const params = `campos=*&ativo=true&ordenacao=+dataVencimento&registrosPorPagina=20&paginaAtual=${currentPage}&${period}`;
            const response: DataItemsInstallmentsProps = await Api.get(`/core/v1/parcelas-financeiro?${params}`);

            const { itens } : ItemsInstallmentsProps  = response.data;

            const itensOptimized = itens.map((item:ItemInstallmentsProps) => {

                const dataVencimentoFormatada =  FormatDateBR(item.dataVencimento);
                const dataBaixaFormatada =  FormatDateBR(item.dataBaixa);

                return {
                            ...item,
                            dataVencimentoFormatada,
                            value:FormatReal(item.valorAberto),
                            dataBaixaFormatada
                        }
            });
            return itensOptimized;

        } catch (error) {
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível buscar as parcelas',true));
        }finally {
            setTimeout(() => {
                setIsLoadingInstallments(false);
            }, 2000);
        }
    };

    return {isLoadingInstallments, getInstallments};
}

export const useGetInstallmentsDetails = () => {

	const [isLoadingInstallmentsDetails, setIsLoadingInstallmentsDetails] = useState(false);

	const dispatch = useDispatch();

	const getInstallmentsDetails = async (filters: ItemProps) => {



			try {
					setIsLoadingInstallmentsDetails(true);

					const params = `campos=*`;
					const response: DataItemsDetailsProps = await Api.get(`/core/v1/lancamentos-financeiro?${params}&IdsLancamentoFinanceiro=${filters.idFinanceiro}`);



					const { itens } : ItemsDetailsProps  = response.data;


					if (itens.length > 0) {
							const item = itens[0];

							return {
									idLancamentoFinanceiro: item.idLancamentoFinanceiro,
									idCliente: (item.idCliente),
									idFinanceiro: (item.idFinanceiro),
									valor: FormatReal (item.valor),
									dataEmissao:FormatDateBR (item.dataEmissao),
									idProcesso: (item.idProcesso),
									quantidadeParcelas: (item.quantidadeParcelas),
									observacao: (item.observacao),
									categoria: (item.categoriaFinanceiro.nomeCategoriaFinanceiro),
							};
					} else {
							dispatch(ToastNotifyActions.toastNotifyShow('Lançamento não encontrado', true));
							return null;
					}

			} catch (error) {
					dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível buscar este resumo', true));
			} finally {
					setTimeout(() => {
							setIsLoadingInstallmentsDetails(false);
					}, 2000);
			}
	};

	return { isLoadingInstallmentsDetails, getInstallmentsDetails };
}

