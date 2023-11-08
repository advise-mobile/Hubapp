import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FinanceDataItem from '@components/Finance/Installments';

import { GetMonthPeriod, GetToday, GetWeekPeriod } from 'helpers/DateFunctions';

import Spinner from 'components/Spinner';

import {
	ContainerFinance,
	ContainerItensFinance,
	TextLabel,
	TextLabelSubtitle,
	TextValue,
	ContainerResume,
	ContainerItemResume,
	ContainerIconDescription,
	ContainerValues,
	ContainerLabel,
	ContainerIconReleases,
	FinanceList
} from './styles';


import {ItemProps, ItemResumeProps,ItemInstallmentsProps} from './types';

import {Container} from 'assets/styles/global';

import {useTheme} from 'styled-components';
import FilterScreen from '../tab-Filters';

// Hook custom para pegar os Lançamentos do modulo financeiro
import { useGetFinanceID, useGetResume, useGetInstallments } from '@services/hooks/Finances/useReleases'

export default function Release() {
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const { isLoadingFinanceID, getFinanceDataID} = useGetFinanceID();
	const { isLoadingResumeRelease, getReleaseResume} = useGetResume();
	const { isLoadingInstallments, getInstallments} = useGetInstallments();

	const [dataFinanceID, setDataFinanceID] = useState<ItemProps>();
	const [dataResume, setDataResume] = useState<ItemResumeProps>();
	const [dataInstallments, setDataInstallments] = useState<ItemInstallmentsProps[]>();

	const [selectedFilterPeriod, setSelectedFilterPeriod] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchFinanceDataID = async () => {
			const responseFinanceID = await getFinanceDataID();
			setDataFinanceID(responseFinanceID);
		};

		fetchFinanceDataID();
	}, []);

	useEffect(() => {
		const fetchResume = async () => {
			if (dataFinanceID != undefined) {
				const responseResume = await getReleaseResume(dataFinanceID);
				setDataResume(responseResume);
			}
		};
		fetchResume();
	}, [dataFinanceID]);

   	useEffect( () => {

		const fetchInstallments = async () => {
			const parameterPeriod = getParametersPeriod(selectedFilterPeriod)	
			const installments =  await getInstallments({currentPage,...parameterPeriod});
			setDataInstallments(installments)
		}

		fetchInstallments();
	}, [selectedFilterPeriod]);

	const getParametersPeriod = (id:number) => {
		
		let period = {
			dataVencimento: null,
			dataVencimentoFim: null
		};;

		
		switch (id) {
			case 1:
				const {startOfMonth,endOfMonth} = GetMonthPeriod();

				period = {
					dataVencimento: startOfMonth,
					dataVencimentoFim: endOfMonth
				};
			   return period;		
			break;

			case 2:
				const today = GetToday();
				
				period = {
					dataVencimento: today,
					dataVencimentoFim: today
				};
			   return period;		
			break;

			case 3:
				const {startOfWeek, endOfWeek} = GetWeekPeriod();
				
				period = {
					dataVencimento: startOfWeek,
					dataVencimentoFim: endOfWeek
				};

			   return period;		
			break;
		}

		return period;	
	}


	const renderItem =  (  { item } : { item: ItemInstallmentsProps })   => {
        return (
            <FinanceDataItem item={item} />
        );
    }


	return (
		<Container>
			<FilterScreen
				onFilterSelect={(setSelectedFilterPeriod)}
					// setSelectedFilterName(selectedFilterName);
					// console.log(`=== ${selectedFilterName}`);
				//}

			/>
			<ContainerFinance>
				{isLoadingResumeRelease ? (
					<Spinner height={50} color={colors.primary} transparent={true} />
				) : (
					<>
						<ContainerItensFinance>
							<ContainerLabel>
								<TextLabel>Saldo anterior</TextLabel>
							</ContainerLabel>
							<ContainerValues>
								<TextValue>{dataResume?.saldoAnterior}</TextValue>
							</ContainerValues>
						</ContainerItensFinance>

						<ContainerResume>
							<ContainerItemResume>
								<ContainerIconDescription>
									<ContainerIconReleases>
										<FontAwesome size={8} name="circle" color={colors.green200} />
									</ContainerIconReleases>

									<ContainerLabel>
										<TextLabel>Receita realizada</TextLabel>
									</ContainerLabel>
								</ContainerIconDescription>

								<ContainerValues>
									<TextValue>{dataResume?.totalEntradas}</TextValue>
								</ContainerValues>
							</ContainerItemResume>
							<ContainerItemResume>
								<ContainerIconDescription>
									<ContainerIconReleases>
										<FontAwesome size={8} name="circle" color={colors.red200} />
									</ContainerIconReleases>

									<ContainerLabel>
										<TextLabel>Despesa realizada</TextLabel>
									</ContainerLabel>
								</ContainerIconDescription>

								<ContainerValues>
									<TextValue colorText={colors.red200}>{dataResume?.totalSaidas}</TextValue>
								</ContainerValues>
							</ContainerItemResume>
						</ContainerResume>

						<ContainerItensFinance>
							<ContainerLabel>
							<TextLabelSubtitle>Saldo Atual</TextLabelSubtitle>
							</ContainerLabel>
							<ContainerValues>
								<TextValue fontWeight colorText={colors.forgetLink}>
									{dataResume?.saldo}
								</TextValue>
							</ContainerValues>
						</ContainerItensFinance>
					</>
				)}




				<FinanceList
					data={dataInstallments}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
			/>

			</ContainerFinance>
		</Container>
	);
}
