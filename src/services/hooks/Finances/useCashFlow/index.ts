import {useState, useCallback} from 'react';
import Api from '@services/Api';
import ToastNotifyActions from 'store/ducks/ToastNotify';
import {useDispatch} from 'react-redux';
import {
	FiltersCashFlowDataProps,
	DataCashFlowProps,
	ItemCashFlowItensProps,
} from '@pages/Finance/CashFlow/types';

import {FormatReal} from '@helpers/MoneyFunctions';
import {FormatYearMonthEN} from '@helpers/DateFunctions';

interface DataEmailProps {
	destinatarios: string[];
	period: number;
	dataSaldo: string;
	dataFim: string;
}

export const useGetCashFlow = () => {
	const [isLoadingCashFlow, setIsLoadingCashFlow] = useState(false);
	const dispatch = useDispatch();

	const getCashFlowData = async ({dataFim, dataSaldo}: FiltersCashFlowDataProps) => {
		try {
			setIsLoadingCashFlow(true);

			const params = `?ativo=true&campos=*&dataSaldo=${dataSaldo}&dataFim=${dataFim}&ordenacao=+dataVencimento`;

			const response: DataCashFlowProps = await Api.get(
				`/core/v1/saldos-contas-financeiro${params}`,
			);

			const {itens}: ItemCashFlowItensProps = response.data;

			if (itens[0].registrosTotal === 0) {
				return [
					{
						registroTotal: itens[0].registrosTotal,
						saldoAnterior: FormatReal(0),
					},
				];
			}

			const saldoAnterior = itens[0].contador[0].saldoAnterior;

			const itensOptimized = itens[0].itens.map((_, index) => {
				return {
					...itens,
					...itens[0].itens,
					registroTotal: itens[0].registrosTotal,
					dataSaldo: itens[0].itens[index].dataSaldo,
					totalEntradas: FormatReal(itens[0].itens[index].totalEntradas),
					totalSaidas: FormatReal(itens[0].itens[index].totalSaidas),
					valorSaldo: FormatReal(itens[0].itens[index].valorSaldo),
					saldoAnterior: FormatReal(saldoAnterior),
				};
			});

			return itensOptimized;
		} catch (error) {
			dispatch(
				ToastNotifyActions.toastNotifyShow('Não foi possível recuperar estes valores', true),
			);
		} finally {
			setTimeout(() => {
				setIsLoadingCashFlow(false);
			}, 1000);
		}
	};

	const sendCashFlowEmail = useCallback(
		async (data: DataEmailProps, handleCallback: () => void) => {
			try {
				setIsLoadingCashFlow(true);

				const params =
					data.period === 4
						? {
								dataInicio: FormatYearMonthEN(data.dataSaldo),
								dataFim: FormatYearMonthEN(data.dataFim),
								destinatarios: data.destinatarios,
						  }
						: {
								dataSaldo: data.dataSaldo,
								dataFim: data.dataFim,
								destinatarios: data.destinatarios,
						  };

				// - quando for anual muda o endpoint segundo documentacao
				const endpoint =
					data.period === 4
						? '/core/v1/envio-email-saldo-conta-financ/mensal'
						: '/core/v1/envio-email-saldo-conta-financ';

				const response = await Api.post(endpoint, params);

				dispatch(ToastNotifyActions.toastNotifyShow('Email enviado com sucesso!', false));

				return true;
			} catch (error) {
				dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível enviar este email', true));
			} finally {
				setTimeout(() => {
					setIsLoadingCashFlow(false);
					handleCallback();
				}, 1000);
			}
		},
		[isLoadingCashFlow],
	);

	return {isLoadingCashFlow, getCashFlowData, sendCashFlowEmail};
};
