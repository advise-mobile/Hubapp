import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {useGetCashFlow} from '@services/hooks/Finances/useCashFlow';
import {CashFlowProps} from './types';

export default function CashFlow() {
	const {isLoadingCashFlow, getCashFlowData} = useGetCashFlow();
	const [CashFlowResume, setCashFlowResume] = useState<CashFlowProps[]>([]);

	const CategoryRef = useRef(null);

	const addCategory = useCallback(
		() => <StockCashFlow ref={CategoryRef} idAgenda={null} onAdd={() => {}} />,
		[],
	);

	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const havePermission = true;
	const active = true;

	useEffect(() => {
		fetchCashFlow();
	}, []);

	const fetchCashFlow = async () => {
		try {
			const responseCashFlow = await getCashFlowData();
			if (responseCashFlow !== undefined) {
				setCashFlowResume(responseCashFlow);
			}
		} catch (error) {}
	};

	const renderItem = ({item}: {item: CashFlowProps}) => {
		return <CashFlowDataItem item={item} />;
	};

	return (
		<Container>
			{active ? (
				<>
					{havePermission ? (
						<Warp>
							<ContainerScreen style={{flex: 1}}>
								<TopContainer>
									<ContainerMainInformation>
										<TextLabel WeightTextProps>Saldo Total</TextLabel>

										<ContainerValueInformation>
											<TextValue>{}</TextValue>
										</ContainerValueInformation>
									</ContainerMainInformation>

									<ContainerIconMore onPress={() => CategoryRef.current?.open()}>
										<MaterialIcons name="more-horiz" size={25} color={colors.fadedBlack} />
									</ContainerIconMore>
								</TopContainer>

								<FlatList
									data={CashFlowResume}
									renderItem={renderItem}
									showsVerticalScrollIndicator={false}
								/>
							</ContainerScreen>

							{addCategory()}
						</Warp>
					) : (
						<HasNotPermission
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
