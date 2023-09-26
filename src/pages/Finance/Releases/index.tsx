import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FinanceDataItem from '../../../components/Finance';

import {
	ContainerFinance,
	ContainerItensFinance,
	TextLabel,
	TextValue,
	ContainerResume,
	ContainerItemResume,
	ContainerIconDescription,
	ContainerValues,
	ContainerLabel,
	ContainerIconReleases,
} from './styles';

import {Container, Warp} from 'assets/styles/global';

import {useTheme} from 'styled-components';
import {ScrollView} from 'react-native';
import Filter from '@components/Filters';

export default function Finance() {
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const dataItem = [
		{
			title: 'Despesa',
			date: '29/07/2023',
			type: 'despesa',
			description: 'Título Lorem ipsum dolor sit amet, consectetur.',
			value: '2.000,00',
			category: 'Contas',
			off: true,
			dateOff: '30/06/2023',
		},
		{
			title: 'Receita',
			date: '30/07/2023',
			type: 'receita',
			description: 'Receita ...Título Lorem ipsum dolor sit amet, consectetur.',
			value: '5.000,00',
			category: 'Contas',
			off: false,
			dateOff: '25/06/2023',
		},
	];

	return (
		<Container>
			<Warp>
				<ScrollView>
					<Filter />
					<ContainerFinance>
						<ContainerItensFinance>
							<TextLabel>Saldo anterior</TextLabel>
							<ContainerValues>
								<TextValue>999.999.999</TextValue>
							</ContainerValues>
						</ContainerItensFinance>

						<ContainerResume>
							<ContainerItemResume>
								<ContainerIconDescription>
									<ContainerIconReleases>
										<FontAwesome name="circle" color={colors.green200} />
									</ContainerIconReleases>

									<ContainerLabel>
										<TextLabel>Receita realizada</TextLabel>
									</ContainerLabel>
								</ContainerIconDescription>

								<ContainerValues>
									<TextValue>999.999.999</TextValue>
								</ContainerValues>
							</ContainerItemResume>
							<ContainerItemResume>
								<ContainerIconDescription>
									<ContainerIconReleases>
										<FontAwesome name="circle" color={colors.red200} />
									</ContainerIconReleases>

									<ContainerLabel>
										<TextLabel>Despesa realizada</TextLabel>
									</ContainerLabel>
								</ContainerIconDescription>

								<ContainerValues>
									<TextValue colorText={colors.red200}>-999.999.999</TextValue>
								</ContainerValues>
							</ContainerItemResume>
						</ContainerResume>

						<ContainerItensFinance>
							<TextLabel fontWeight>Saldo Atual</TextLabel>
							<ContainerValues>
								<TextValue colorText={colors.forgetLink}>999.999.999</TextValue>
							</ContainerValues>
						</ContainerItensFinance>

						{dataItem.map(item => {
							return <FinanceDataItem item={item} />;
						})}
					</ContainerFinance>
				</ScrollView>
			</Warp>
		</Container>
	);
}
