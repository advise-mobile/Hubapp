import {useState, useCallback} from 'react';

import Api from '@services/Api';

import {FormatDateBR, FormatDateEN, FormatDateHourBR} from '@helpers/DateFunctions.js';
import {FormatReal} from '@helpers/MoneyFunctions.ts';

import {
	DataItemsProps,
	ItemsProps,
	ItemProps,
	DataItemsResumeProps,
	ItemsResumeProps,
	DataItemsInstallmentsProps,
	ItemsInstallmentsProps,
	ItemInstallmentsProps,
	FiltersReleaseDataProps,
	FinancialLossProps,
} from '@pages/Finance/Releases/types';

import ToastNotifyActions from 'store/ducks/ToastNotify';

import {useDispatch} from 'react-redux';
import {DataItemsDetailsProps, ItemsDetailsProps} from '@pages/Finance/Details/types';
import {removeNull} from '@helpers/functions';

interface DataEmailProps {
	destinatarios: string[];
	idParcela: number;
}

export const useGetFinanceID = () => {
	const [isLoadingFinanceID, setIsLoadingFinanceID] = useState(false);

	const dispatch = useDispatch();

	const getFinanceDataID = async () => {
		try {
			setIsLoadingFinanceID(true);

			const params = `ativo=true&campos=idContaFinanceiro,idFinanceiro`;
			const response: DataItemsProps = await Api.get(`/core/v1/contas-financeiro?${params}`);

			const {itens}: ItemsProps = response.data;

			return itens;
		} catch (error) {
			dispatch(
				ToastNotifyActions.toastNotifyShow('Não foi possível recuperar estes lançamentos', true),
			);
		} finally {
			setTimeout(() => {
				setIsLoadingFinanceID(false);
			}, 2000);
		}
	};
	return {isLoadingFinanceID, getFinanceDataID};
};

export const useGetResume = () => {
	const [isLoadingResumeRelease, setIsLoadingResumeRelease] = useState(false);

	const dispatch = useDispatch();

	const getReleaseResume = async (filters: ItemProps) => {
		try {
			setIsLoadingResumeRelease(true);

			const params = `campos=*`;
			const response: DataItemsResumeProps = await Api.get(
				`/core/v1/saldos-contas-financeiro/total?${params}`,
				{
					filters,
				},
			);

			const {itens}: ItemsResumeProps = response.data;

			return {
				saldo: FormatReal(itens[0].saldo),
				saldoAnterior: FormatReal(itens[0].saldoAnterior),
				totalEntradas: FormatReal(itens[0].totalEntradas),
				totalSaidas: FormatReal(itens[0].totalSaidas),
			};
		} catch (error) {
			dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível buscar este resumo', true));
		} finally {
			setTimeout(() => {
				setIsLoadingResumeRelease(false);
			}, 2000);
		}
	};
	return {isLoadingResumeRelease, getReleaseResume};
};

export const useGetInstallments = () => {
	const [isLoadingInstallments, setIsLoadingInstallments] = useState(false);

	const dispatch = useDispatch();

	const getInstallments = async (filters: FiltersReleaseDataProps) => {
		try {
			setIsLoadingInstallments(true);

			const filtersFormated = removeNull(filters);
			let filtersParams = '';
			Object.keys(filtersFormated).forEach(key => {
				filtersParams += key + '=' + filtersFormated[key] + '&';
			});

			let currentPage = filters.currentPage ? filters.currentPage : 1;

			const params = `${filtersParams}campos=*&ativo=true&ordenacao=+dataVencimento&registrosPorPagina=50&paginaAtual=${currentPage}`;

			const response: DataItemsInstallmentsProps = await Api.get(
				`/core/v1/parcelas-financeiro?${params}`,
			);

			const {itens}: ItemsInstallmentsProps = response.data;

			const itensOptimized = itens.map((item: ItemInstallmentsProps) => {
				const dataVencimentoFormatada = FormatDateBR(item.dataVencimento);
				const dataBaixaFormatada = item.dataBaixa ? FormatDateBR(item.dataBaixa) : null;

				return {
					...item,
					dataVencimentoFormatada,
					value: FormatReal(item?.valorOriginal),
					dataBaixaFormatada,
				};
			});

			return itensOptimized;
		} catch (error) {
			dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível buscar as parcelas', true));
		} finally {
			setTimeout(() => {
				setIsLoadingInstallments(false);
			}, 2000);
		}
	};

	return {isLoadingInstallments, getInstallments};
};

export const useGetInstallmentsDetails = () => {
	const [isLoadingInstallmentsDetails, setIsLoadingInstallmentsDetails] = useState(false);

	const dispatch = useDispatch();

	const getInstallmentsDetails = async (filters: ItemProps) => {
		try {
			setIsLoadingInstallmentsDetails(true);

			const params = `campos=*`;
			const response: DataItemsDetailsProps = await Api.get(
				`/core/v1/lancamentos-financeiro?${params}&IdsLancamentoFinanceiro=${filters.idFinanceiro}`,
			);

			const {itens}: ItemsDetailsProps = response.data;

			if (itens.length > 0) {
				const item = itens[0];
				return {
					idLancamentoFinanceiro: item.idLancamentoFinanceiro,
					idCliente: item.idCliente,
					idFinanceiro: item.idFinanceiro,
					dataEmissao: FormatDateBR(item.dataEmissao),
					idProcesso: item.idProcesso,
					quantidadeParcelas: item.quantidadeParcelas,
					observacao: item.observacao,
					categoria: item.categoriaFinanceiro.nomeCategoriaFinanceiro,
					idTipoParcelamentoFinanceiro:
						item.tipoParcelamentoFinanceiro.idTipoParcelamentoFinanceiro,
					dataEmissaofull: item.dataEmissao,
					baixado: item.baixado,
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

	return {isLoadingInstallmentsDetails, getInstallmentsDetails};
};

export const useRelease = () => {
	const [isLoadingRelease, setIsLoadingRelease] = useState(false);

	const dispatch = useDispatch();

	const addRelease = useCallback(
		async (data: ItemProps, handleCallback: () => void) => {
			try {
				setIsLoadingRelease(true);

				const response = await Api.post(`/core/v1/lancamentos-financeiro`, data);

				dispatch(ToastNotifyActions.toastNotifyShow('Lançamento cadastrado com sucesso!', false));

				return true;
			} catch (error) {
				dispatch(
					ToastNotifyActions.toastNotifyShow('Não foi possível cadastrar este lançamento', true),
				);
			} finally {
				setTimeout(() => {
					setIsLoadingRelease(false);
					handleCallback();
				}, 1000);
			}
		},
		[isLoadingRelease],
	);

	const updateRelease = useCallback(
		async (data: ItemProps, handleCallback: () => void) => {
			try {
				setIsLoadingRelease(true);

				const response = await Api.put(`/core/v1/lancamentos-financeiro`, data);

				dispatch(ToastNotifyActions.toastNotifyShow('Lançamento alterado com sucesso!', false));

				return true;
			} catch (error) {
				const responseMessage = error.response?.data.status.erros[0].mensagem;

				const errorMessage = responseMessage || 'Não foi possível ativar esta categoria';

				dispatch(ToastNotifyActions.toastNotifyShow(errorMessage, true));
			} finally {
				setTimeout(() => {
					setIsLoadingRelease(false);
					handleCallback();
				}, 1000);
			}
		},
		[isLoadingRelease],
	);

	const deleteRelease = useCallback(
		async (item: ItemProps, handleCallback: () => void) => {
			try {
				setIsLoadingRelease(true);

				const data = {
					Ids: item.idParcelaFinanceiro,
					inativaEsteEProximosLancamentos: 'true',
				};

				const response = await Api.put(`core/v1/parcelas-financeiro/inativar`, data);

				dispatch(ToastNotifyActions.toastNotifyShow('Lançamento excluído com sucesso!', false));

				return true;
			} catch (error) {
				dispatch(
					ToastNotifyActions.toastNotifyShow('Não foi possível excluir este lançamento', true),
				);
			} finally {
				setTimeout(() => {
					setIsLoadingRelease(false);
					handleCallback();
				}, 1000);
			}
		},
		[isLoadingRelease],
	);

	const sendReleaseEmail = useCallback(
		async (data: DataEmailProps, handleCallback: () => void) => {
			try {
				setIsLoadingRelease(true);

				const response = await Api.post(`/core/v1/envio-email-parcelas`, data);

				dispatch(ToastNotifyActions.toastNotifyShow('Lançamento enviado com sucesso!', false));

				return true;
			} catch (error) {
				dispatch(
					ToastNotifyActions.toastNotifyShow('Não foi possível enviar este lançamento', true),
				);
			} finally {
				setTimeout(() => {
					setIsLoadingRelease(false);
					handleCallback();
				}, 1000);
			}
		},
		[isLoadingRelease],
	);

	return {isLoadingRelease, addRelease, updateRelease, deleteRelease, sendReleaseEmail};
};

export const useFinancialLoss = () => {
	const [isLoadingFinancialLoss, setIsLoadingFinancialLoss] = useState(false);
	const dispatch = useDispatch();

	const addFinancialLoss = useCallback(
		async (data: FinancialLossProps, handleCallback: () => void) => {
			try {
				setIsLoadingFinancialLoss(true);
				const date = new Date();

				const dataBaixa = FormatDateEN(date);

				const dataFinancialLoss = {
					itens: [
						{
							idParcelaFinanceiro: data.idParcelaFinanceiro,
							dataBaixa,
							valorBaixa: data.valorBaixa,
						},
					],
				};

				const response = await Api.post(`/core/v1/baixas-financeiro`, dataFinancialLoss);

				dispatch(
					ToastNotifyActions.toastNotifyShow(
						'Baixa parcela financeira realizada com sucesso!',
						false,
					),
				);

				return true;
			} catch (error) {
				dispatch(
					ToastNotifyActions.toastNotifyShow('Não foi possível cadastrar a baixa financeira', true),
				);
			} finally {
				setTimeout(() => {
					setIsLoadingFinancialLoss(false);
					handleCallback();
				}, 1000);
			}
		},
		[],
	);

	const removeFinancialLoss = useCallback(
		async (data: {idParcelaFinanceiro: number}, handleCallback: () => void) => {
			try {
				setIsLoadingFinancialLoss(true);

				const dataFinancialLoss = {
					Ids: [data.idParcelaFinanceiro],
				};

				const response = await Api.put(`/core/v1/baixas-financeiro/inativar`, dataFinancialLoss);

				dispatch(
					ToastNotifyActions.toastNotifyShow(
						'Baixa parcela financeira removida com sucesso!',
						false,
					),
				);

				return true;
			} catch (error) {
				dispatch(
					ToastNotifyActions.toastNotifyShow('Não foi possível remover a baixa financeira', true),
				);
			} finally {
				setTimeout(() => {
					setIsLoadingFinancialLoss(false);
					handleCallback();
				}, 1000);
			}
		},
		[],
	);
	return {isLoadingFinancialLoss, addFinancialLoss, removeFinancialLoss};
};
