import React, { useEffect, useState } from 'react';
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
  FinanceList,
} from './styles';
import { ItemProps, ItemResumeProps, ItemInstallmentsProps } from './types';
import { Container } from 'assets/styles/global';
import { useTheme } from 'styled-components';
import FilterScreen from '../tab-Filters';
import {
  useGetFinanceID,
  useGetResume,
  useGetInstallments,
} from '@services/hooks/Finances/useReleases';

export default function Release() {
  const colorUseTheme = useTheme();
  const { colors } = colorUseTheme;
  const [isFetching, setIsFetching] = useState(false);

  const { isLoadingFinanceID, getFinanceDataID } = useGetFinanceID();
  const { isLoadingResumeRelease, getReleaseResume } = useGetResume();
  const { isLoadingInstallments, getInstallments } = useGetInstallments();

  const [dataFinanceID, setDataFinanceID] = useState<ItemProps>();
  const [dataResume, setDataResume] = useState<ItemResumeProps>();
  const [allInstallments, setAllInstallments] = useState<ItemInstallmentsProps[]>([]);
  const [selectedFilterPeriod, setSelectedFilterPeriod] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
    fetchDataResume();
  }, []);

  useEffect(() => {
    fetchDataInstallments();
  }, [selectedFilterPeriod]);



	const fetchDataResume = async () => {
    try {
      const responseFinanceID = await getFinanceDataID();
      setDataFinanceID(responseFinanceID);

      const responseResume = await getReleaseResume(responseFinanceID);
      setDataResume(responseResume);


    } catch (error) {

    }
  };

  const fetchDataInstallments = async () => {
    try {
      const parameterPeriod = getParametersPeriod(selectedFilterPeriod);
			const installments = await getInstallments({ currentPage, ...parameterPeriod });

			setCurrentPage(currentPage + 1);
			if(currentPage === 1 ){
				setAllInstallments(installments);
			}else{
				setAllInstallments((prevInstallments) => [...prevInstallments, ...installments]);
			}

    } catch (error) {

    }
  };

  const handleLoadMore = async () => {

    if (isFetching) {
      return;
    }

    setIsFetching(true);

    try {

       await fetchDataInstallments();

    } finally {
      setIsFetching(false);
    }
  };

  const getParametersPeriod = (id: number) => {
    let period = {
      dataVencimento: null,
      dataVencimentoFim: null,
    };

    switch (id) {
      case 1:
        const { startOfMonth, endOfMonth } = GetMonthPeriod();

        period = {
          dataVencimento: startOfMonth,
          dataVencimentoFim: endOfMonth,
        };
        return period;
      case 2:
        const today = GetToday();

        period = {
          dataVencimento: today,
          dataVencimentoFim: today,
        };
        return period;
      case 3:
        const { startOfWeek, endOfWeek } = GetWeekPeriod();

        period = {
          dataVencimento: startOfWeek,
          dataVencimentoFim: endOfWeek,
        };

        return period;
      default:
        return period;
    }
  };

  const renderItem = ({ item }: { item: ItemInstallmentsProps }) => {
    return <FinanceDataItem item={item} />;
  };

  const renderFooter = () => {
    if (allInstallments.length < 20) return false;
    return isFetching ? <Spinner height={50} color={colors.primary} transparent={true} /> : null;
  };

	const setPeriod = (period) => {
		setCurrentPage(1);
		setSelectedFilterPeriod(period)
	}

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

				{isLoadingInstallments && currentPage === 1 ? (
          <Spinner height={50} color={colors.primary} transparent={true} />
        ) : (
        <FinanceList
          data={allInstallments}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
				)}
      </ContainerFinance>
    </Container>
  );
}
