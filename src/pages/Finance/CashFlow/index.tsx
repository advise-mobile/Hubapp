import React, {useCallback, useRef} from 'react';
import HasNotPermission from 'components/HasNotPermission';
import {Container, Warp} from 'assets/styles/global';
import Blocked from 'pages/Blocked';

import {useTheme} from 'styled-components';
import {FlatList} from 'react-native';

import {
	ContainerIconMore,
	ContainerMainInformation,
	ContainerScreen,
	ContainerValueInformation,
	TextLabel,
	TextValue,
	TopContainer,
} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CashFlowDataItem from '@components/Finance/CashFlow';
import StockCashFlow from '../Modal/StockCashFlow';

export default function CashFlow() {
	const dataItem = [
		{
			valueProhibited: '10.000,20',
			valueExit: '-612,15',
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

	const CategoryRef = useRef(null);

	const addCategory = useCallback(
		() => <StockCashFlow ref={CategoryRef} idAgenda={null} onAdd={() => {}} />,
		[],
	);

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
							<ContainerScreen>
								<TopContainer>
									<ContainerMainInformation>
										<TextLabel WeightTextProps>Saldo Total</TextLabel>

										<ContainerValueInformation>
											<TextValue>16.251,55</TextValue>
										</ContainerValueInformation>
									</ContainerMainInformation>

									<ContainerIconMore onPress={() => CategoryRef.current?.open()}>
										<MaterialIcons name="more-horiz" size={25} color={colors.fadedBlack} />
									</ContainerIconMore>
								</TopContainer>
								<FlatList
									data={dataItem}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({item}) => <CashFlowDataItem item={item} />}
								/>
							</ContainerScreen>

							{addCategory()}
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