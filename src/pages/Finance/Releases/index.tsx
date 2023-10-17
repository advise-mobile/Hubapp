import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FinanceDataItem from '@components/Finance';

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

import {Container} from 'assets/styles/global';

import {useTheme} from 'styled-components';
import {ScrollView} from 'react-native';
import FilterScreen from '../tab-Filters';

export default function Finance() {
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const dataItem = [
		{
			title: 'Despesa',
			date: '29/07/2023',
			type: 'despesa',
			description: 'Título Lorem ipsum dolor sit amet, consectetur adipisci, Duis sollicitudin, erat commodo lacinia.',
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

	return (
		<Container>
				<FilterScreen/>
				<ScrollView>
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
										<FontAwesome size={8} name="circle" color={colors.green200} />
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
										<FontAwesome size={8} name="circle" color={colors.red200} />
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
							<TextLabelSubtitle >Saldo Atual</TextLabelSubtitle>
							<ContainerValues>
								<TextValue colorText={colors.forgetLink}>999.999.999</TextValue>
							</ContainerValues>
						</ContainerItensFinance>

						{dataItem.map(item => {
							return <FinanceDataItem item={item} />;
						})}
					</ContainerFinance>
				</ScrollView>
		</Container>
	);
}
