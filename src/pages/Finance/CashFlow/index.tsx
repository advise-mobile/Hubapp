import React from 'react';

import HeaderGlobals from '../../../components/HeaderGlobals';
import HasNotPermission from 'components/HasNotPermission';
import {Container, Warp} from 'assets/styles/global';

import Blocked from 'pages/Blocked';

import {useTheme} from 'styled-components';
import {ScrollView} from 'react-native';

import {
	ContainerIconMore,
	ContainerMainInformation,
	ContainerScreen,
	TextLabel,
	TextValue,
	TopContainer,
} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CashFlowDataItem from '@components/Finance/CashFlow';

export default function CashFlow(props) {
	const dataItem = [
		{
			valueProhibited: '10.000,20',
			valueExit: '-611,15',
			valueBalance: '9.389,05',
			date: '23/07/2023',
		},
		{
			valueProhibited: '10.000,20',
			valueExit: '-611,15',
			valueBalance: '9.389,05',
			date: '25/07/2023',
		},
		{
			valueProhibited: '10.000,20',
			valueExit: '-611,15',
			valueBalance: '9.389,05',
			date: '03/08/2023',
		},
	];

	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const havePermission = true;
	const active = true;

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
								<ContainerScreen>
									<TopContainer>
										<ContainerMainInformation>
											<TextLabel WeightTextProps>Saldo Total</TextLabel>

											<ContainerMainInformation>
												<TextValue>16.251,55</TextValue>
											</ContainerMainInformation>
										</ContainerMainInformation>

										<ContainerIconMore>
											<MaterialIcons name="more-horiz" size={25} color={colors.fadedBlack} />
										</ContainerIconMore>
									</TopContainer>

									{dataItem.map(item => {
										return <CashFlowDataItem item={item} />;
									})}
								</ContainerScreen>
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
