import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FinanceDataItem from '@components/Finance';

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
} from './styles';

import {FlatList} from 'react-native';

import {ItemProps, ItemResumeProps} from './types';

import {Container} from 'assets/styles/global';

import {useTheme} from 'styled-components';
import FilterScreen from '../tab-Filters';

// Hook custom para pegar os Lançamentos do modulo financeiro
import {useGetFinanceID, useGetResume} from '@services/hooks/Finances/useReleases';

export default function Release() {
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const {isLoadingFinanceID, getFinanceDataID} = useGetFinanceID();
	const {isLoadingResumeRelease, getReleaseResume} = useGetResume();

	const [dataFinanceID, setDataFinanceID] = useState<ItemProps>();
	const [dataResume, setDataResume] = useState<ItemResumeProps>();

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
				console.log('=== responseResume', responseResume);

				setDataResume(responseResume);
			}
		};
		fetchResume();
	}, [dataFinanceID]);

	const dataItem = [
		{
			title: 'Despesa',
			date: '29/07/2023',
			type: 'despesa',
			description:
				'Título Lorem ipsum dolor sit amet, consectetur adipisci, Duis sollicitudin, erat commodo lacinia.',
			value: '2.000,00',
			category: 'Contas',
			off: true,
			dateOff: '30/06/2023',
		},
		{
			title: 'Receita',
			date: '30/07/2023',
			type: 'receita',
			description: 'Receita ...Título Lorem ipsum dolor sit amet.',
			value: '5.000,00',
			category: 'Emprestimos',
			off: false,
			dateOff: '25/06/2023',
		},
	];

	const FinanceList = ({data}) => {
		return (
			<FlatList
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({item}) => <FinanceDataItem item={item} />}
			/>
		);
	};

	return (
		<Container>
			<FilterScreen />
			<ContainerFinance>
				{isLoadingResumeRelease ? (
					<Spinner height={50} color={colors.primary} transparent={true} />
				) : (
					<>
						<ContainerItensFinance>
							<TextLabel>Saldo anterior</TextLabel>
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
							<TextLabelSubtitle>Saldo Atual</TextLabelSubtitle>
							<ContainerValues>
								<TextValue fontWeight colorText={colors.forgetLink}>
									{dataResume?.saldo}
								</TextValue>
							</ContainerValues>
						</ContainerItensFinance>
					</>
				)}

				<FinanceList data={dataItem} />
			</ContainerFinance>
		</Container>
	);
}
