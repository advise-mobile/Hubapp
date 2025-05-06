import React, {useEffect, useState, useMemo, useCallback} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FinanceDataItem from '@components/Finance/Installments';
import {GetMonthPeriod, GetToday, GetWeekPeriod} from '@helpers/DateFunctions';
import Spinner from '@components/Spinner';

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
	FinanceList,
	NotFound,
	Image,
	NotFoundText,
	NotFoundDescription,
} from './styles';
import {ItemProps, ItemResumeProps, ItemInstallmentsProps, DataFiltersRelease} from './types';
import {Container} from '@assets/styles/global';
import {useTheme} from 'styled-components';
import FilterScreen from '../tab-Filters';
import {
	useGetFinanceID,
	useGetResume,
	useGetInstallments,
} from '@services/hooks/Finances/useReleases';
import {useFocusEffect} from '@react-navigation/native';

export default function Release(dataFilters: DataFiltersRelease) {
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const notFound =
		colorUseTheme.name === 'dark'
			? require('assets/images/not_found/movements_white.png')
			: require('assets/images/not_found/movements.png');

	const {isLoadingFinanceID, getFinanceDataID} = useGetFinanceID();
	const {isLoadingResumeRelease, getReleaseResume} = useGetResume();
	const {isLoadingInstallments, getInstallments} = useGetInstallments();

	const [dataFinanceID, setDataFinanceID] = useState<ItemProps>();
	const [dataResume, setDataResume] = useState<ItemResumeProps>();
	const [allInstallments, setAllInstallments] = useState<ItemInstallmentsProps[]>([]);
	const [selectedFilterPeriod, setSelectedFilterPeriod] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalData, setTotalData] = useState(0);

	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchDataResume();
	}, []);

	useFocusEffect(
		useCallback(() => {
			setCurrentPage(1);
			setLoading(true);
			setTimeout(() => {
				fetchDataInstallments();
			}, 1000);
		}, [selectedFilterPeriod, dataFilters]),
	);
	const fetchDataResume = async () => {
		try {
			const responseFinanceID = await getFinanceDataID();
			setDataFinanceID(responseFinanceID);

			const responseResume = await getReleaseResume(responseFinanceID);
			setDataResume(responseResume);
		} catch (error) {}
	};

	const fetchDataInstallments = async () => {
		try {
			let paramsFilters = {};
			let parameterPeriod;
			if (dataFilters.dataFiltersRelease === undefined) {
				parameterPeriod = getParametersPeriod(selectedFilterPeriod);
				paramsFilters = {...parameterPeriod, currentPage};
			} else {
				const {dataVencimento} = dataFilters.dataFiltersRelease;
				const {dataVencimentoFim} = dataFilters.dataFiltersRelease;

				if (dataVencimento === undefined || dataVencimentoFim === undefined) {
					parameterPeriod = getParametersPeriod(selectedFilterPeriod);
					paramsFilters = {
						...dataFilters.dataFiltersRelease,
						...parameterPeriod,
						currentPage: currentPage,
					};
				} else {
					paramsFilters = {...dataFilters.dataFiltersRelease, currentPage: currentPage};
				}
			}

			const installments = await getInstallments(paramsFilters);

			setTotalData(installments?.length === 0 ? 0 : installments[0].totalRegistros);

			if (currentPage === 1) {
				setAllInstallments(installments);
			} else {
				setAllInstallments([...allInstallments, ...installments]);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	const handleLoadMore = async () => {
		if (allInstallments.length === totalData || isLoadingInstallments) {
			return;
		}
		setCurrentPage(currentPage + 1);
		await fetchDataInstallments();
	};

	const getParametersPeriod = (id: number) => {
		let period = {
			dataVencimento: null,
			dataVencimentoFim: null,
		};

		switch (id) {
			case 1:
				const {startOfMonth, endOfMonth} = GetMonthPeriod();

				period = {
					dataVencimento: startOfMonth,
					dataVencimentoFim: endOfMonth,
				};
				return period;
			case 2:
				const {startDay, endOfDay} = GetToday();
				period = {
					dataVencimento: startDay,
					dataVencimentoFim: endOfDay,
				};
				return period;
			case 3:
				const {startOfWeek, endOfWeek} = GetWeekPeriod();

				period = {
					dataVencimento: startOfWeek,
					dataVencimentoFim: endOfWeek,
				};

				return period;
			default:
				return period;
		}
	};

	const renderItem = ({item}: {item: ItemInstallmentsProps}) => {
		return <FinanceDataItem item={item} />;
	};

	const renderFooter = () => {
		if (allInstallments.length < 20) return false;
		return isLoadingInstallments ? (
			<Spinner height={50} color={colors.primary} transparent={true} />
		) : null;
	};

	const setPeriod = (period: any) => {
		setSelectedFilterPeriod(period);
	};

	return (
		<Container>
			<FilterScreen onFilterSelect={setPeriod} />
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

				{(isLoadingInstallments || loading) && currentPage === 1 ? (
					<Spinner height={50} color={colors.primary} transparent={true} />
				) : allInstallments.length > 0 ? (
					<FinanceList
						data={allInstallments}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
						onEndReached={handleLoadMore}
						onEndReachedThreshold={0.2}
						ListFooterComponent={renderFooter}
					/>
				) : (
					<NotFound>
						<Image source={notFound} />
						<NotFoundText>Não há resultados</NotFoundText>
						<NotFoundDescription>Tente uma busca diferente!</NotFoundDescription>
					</NotFound>
				)}
			</ContainerFinance>
		</Container>
	);
}
