import React, {useCallback, useMemo, useState, useRef} from 'react';
import HeaderGlobals from '../../components/HeaderGlobals';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HasNotPermission from 'components/HasNotPermission';
import FinanceDataItem from '../../components/Finance';

import Blocked from 'pages/Blocked';

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
import Filters from '@pages/MovementsTrash/Filters';
import { ScrollView } from 'react-native';

export default function Deadlines(props) {
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const [filters, setFilters] = useState({});
	const [formattedData, setFormattedData] = useState({});

	const filtersRef = useRef(null);

	const addRef = useRef(null);

	const openFilters = () => filtersRef.current?.open();

	const havePermission = true;
	const active = true;


	const dataItem = [
		{
			title: 'Despesa',
			date: '29/07/2023',
			type: 'despesa',
			description:
				'Título Lorem ipsum dolor sit amet, consectetur adipisci, Duis sollicitudin, erat commodo lacinia.',
			value: '2.000,00',
			category: 'Emprestimo',
			off: true,
			dateOff: '30/06/2023',
		},
		{
			title: 'Receita',
			date: '30/07/2023',
			type: 'receita',
			description:
				'Título Lorem ipsum dolor sit amet, consectetur adipisci, Duis sollicitudin, erat commodo lacinia.',
			value: '5.000,00',
			category: 'Contas',
			off: false,
			dateOff: "25/06/2023",
		},
	];

	const renderFilters = useMemo(
		() => (
			<Filters
				ref={filtersRef}
				customField={formattedData}
				submit={data => handleSubmit(data)}
				filters={filters}
			/>
		),
		[formattedData],
	);

	const handleSubmit = useCallback(data => {
		setCurrentPage(1);
		setFilters(data);
	}, []);

	return (
		<Container>
			{active ? (
				<>
					{havePermission ? (
						<Warp>
							<HeaderGlobals
								title={'Financeiro'}
								filter={() => openFilters()}
								add={() => addRef.current?.open()}
								lower={true}
							/>
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


								{
									dataItem.map(item => {
										return <FinanceDataItem item={item} />;
									})
								}
							</ContainerFinance>
							</ScrollView>
						</Warp>
					) : (
						<HasNotPermission
							image={image}
							title="A sua rotina totalmente organizada!"
							body="Tenha a facilidade de cadastrar um prazo judicial, uma audiência ou uma reunião diretamente na sua ferramenta de monitoramento de informações jurídicas"
						/>
					)}
				</>
			) : (
				<Blocked />
			)}
		</Container>
	);
}
