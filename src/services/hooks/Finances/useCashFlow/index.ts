import { useState } from "react";
import { getLoggedUser } from '@helpers/Permissions';
import Api from '@services/Api';
import ToastNotifyActions from 'store/ducks/ToastNotify';
import { useDispatch } from 'react-redux';
import { CashFlowProps, DataCashFlowProps, ItemCashFlowItensProps, ItemCashFlowProps } from "@pages/Finance/CashFlow/types";
import { GetMonthPeriod } from 'helpers/DateFunctions';
import { FormatReal } from "@helpers/MoneyFunctions";
import  { FormatDateBR }  from '@helpers/DateFunctions.js';



export const useGetCashFlow = () => {
	const [isLoadingCashFlow, setIsLoadingCashFlow] = useState(false);
	const dispatch = useDispatch();

	const getCashFlowData = async () => {
		try {
			setIsLoadingCashFlow(true);

			// const { idUsuarioCliente } = await getLoggedUser();

			const { startOfMonth, endOfMonth } = GetMonthPeriod();

			const params = `?ativo=true&campos=*&dataFim=2023-01-31dataSaldo=2023-01-01&ordenacao=+dataVencimento`;
			const response: DataCashFlowProps = await Api.get(`/core/v1/saldos-contas-financeiro${params}`);

			const { itens }: ItemCashFlowItensProps = response.data;

			console.log("=== response",response)

			const itensOptimized = itens[0].itens.map((_,index) => {

				return {
										...itens[0].itens,
										dataSaldo: (itens[0].itens[index].dataSaldo),
										totalEntradas: FormatReal (itens[0].itens[index].totalEntradas),
										totalSaidas: FormatReal (itens[0].itens[index].totalSaidas),
										valorSaldo: FormatReal (itens[0].itens[index].valorSaldo),
								}
		});


			// return [{
			// 	...itens[0].itens,
				// dataSaldo: (itens[0].itens[0].dataSaldo),
				// totalEntradas: FormatReal (itens[0].itens[0].totalEntradas),
				// totalSaidas: FormatReal (itens[0].itens[0].totalSaidas),
				// valorSaldo: FormatReal (itens[0].itens[0].valorSaldo),
			// }]
			return itensOptimized



		} catch (error) {
			dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível recuperar estes valores', true));
		} finally {
			setTimeout(() => {
				setIsLoadingCashFlow(false);
			}, 2000);
		}
	};

	return { isLoadingCashFlow, getCashFlowData };
}

