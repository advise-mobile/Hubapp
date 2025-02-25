import React, {useCallback, useEffect, useRef, useState} from 'react';
import Spinner from '@components/Spinner';
import {Container, Warp} from 'assets/styles/global';

import {useTheme} from 'styled-components';
import {FlatList} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CashFlowDataItem from '@components/Finance/CashFlow';
import CashFlowActions from '../Modal/CashFlowActions';
import {useGetCashFlow} from '@services/hooks/Finances/useCashFlow';
import {CashFlowProps, DataFiltersCashFlowProps, FiltersCashFlowDataProps} from './types';
import {FormatReal} from '@helpers/MoneyFunctions';

import {
	ContainerIconMore,
	ContainerMainInformation,
	ContainerScreen,
	TextLabel,
	TextValue,
	TopContainer,
	NotFound,
	ImageNotFound,
	NotFoundText,
	NotFoundDescription,
} from './styles';

export default function CashFlow({dataFiltersCashFlow}: DataFiltersCashFlowProps) {
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const notFound =
		colorUseTheme.name === 'dark'
			? require('assets/images/not_found/movements_white.png')
			: require('assets/images/not_found/movements.png');

	const {isLoadingCashFlow, getCashFlowData} = useGetCashFlow();
	const [CashFlowResume, setCashFlowResume] = useState<CashFlowProps[]>([]);
	const [saldoAnterior, setSaldoAnterior] = useState(0);
	const [registroTotal, setRegistroTotal] = useState(0);

	const ModalActionsRef = useRef(null);

	const actionsMenu = useCallback(
		() => <CashFlowActions ref={ModalActionsRef} filters={dataFiltersCashFlow} />,
		[dataFiltersCashFlow],
	);

	useEffect(() => {
		fetchCashFlow(dataFiltersCashFlow!);
	}, [dataFiltersCashFlow]);

	const fetchCashFlow = async (dataFilters: FiltersCashFlowDataProps) => {
		try {
			const responseCashFlow = await getCashFlowData(dataFilters);

			if (responseCashFlow !== undefined) {
				setCashFlowResume(responseCashFlow);
				setSaldoAnterior(responseCashFlow[0].saldoAnterior);
				setRegistroTotal(responseCashFlow[0].registroTotal);
			}
		} catch (error) {}
	};

	const renderItem = ({item}: {item: CashFlowProps}) => {
		return <CashFlowDataItem item={item} />;
	};

	return (
		<Container>
			<Warp>
				<ContainerScreen style={{flex: 1}}>
					<TopContainer>
						<ContainerMainInformation>
							<TextLabel WeightTextProps>Saldo Anterior</TextLabel>
							<TextValue>{FormatReal(saldoAnterior)}</TextValue>
						</ContainerMainInformation>

						<ContainerIconMore onPress={() => ModalActionsRef.current?.open()}>
							<MaterialIcons name="more-horiz" size={25} color={colors.fadedBlack} />
						</ContainerIconMore>
					</TopContainer>
					{isLoadingCashFlow ? (
						<Spinner />
					) : registroTotal > 0 ? (
						<FlatList
							data={CashFlowResume}
							renderItem={renderItem}
							showsVerticalScrollIndicator={false}
						/>
					) : (
						<NotFound>
							<ImageNotFound source={notFound} width={120} height={120} />
							<NotFoundText>Não há resultados</NotFoundText>
							<NotFoundDescription>Tente uma busca diferente!</NotFoundDescription>
						</NotFound>
					)}
				</ContainerScreen>

				{actionsMenu()}
			</Warp>
		</Container>
	);
}
