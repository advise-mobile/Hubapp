import React, {useCallback, useEffect, useRef, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useTheme} from 'styled-components';

import HeaderGlobals from '../../../components/HeaderGlobals';

import {Container} from '../../../assets/styles/global';

import LauchActionsMenu from '../Modal/LaunchActions';

import {useGetInstallmentsDetails} from '@services/hooks/Finances/useReleases';

import {ItemsInstallmentsDetailsProps} from './types';

import {
	ContainerDate,
	ContainerScreen,
	CircleIconContainer,
	ContainerIcon,
	DataTextContainer,
	DateText,
	FirstContainer,
	ThumbsIconContainer,
	DescriptionContainer,
	DataText,
	InformationContainer,
	InformationTitleTextContainer,
	InformationTextContainer,
	InformationTitleText,
	InformationText,
	DescriptionOfObservationsContainer,
	DescriptionOfObservationsText,
} from './styles';

export default function Details(props) {
	const {isLoadingInstallmentsDetails, getInstallmentsDetails} = useGetInstallmentsDetails();

	const [dataDetails, setDataDetails] = useState<ItemsInstallmentsDetailsProps>();

	const [itemComplete, setItemComplete] = useState();

	const LauchActionsMenuRef = useRef(null);

	const {item} = props.route.params;

	//chama o hook
	useEffect(() => {
		LauchActionsMenuRef.current?.close();
		fetchDataInstallmentsDetails();
	}, [item]);

	//busca a informação
	const fetchDataInstallmentsDetails = async () => {
		try {
			const installmentsDetails = await getInstallmentsDetails({
				idFinanceiro: item.idLancamentoFinanceiro,
			});
			setDataDetails(installmentsDetails);
			const itemComplete = {
				...item,
				dataEmissaofull: installmentsDetails?.dataEmissaofull,
				idTipoParcelamentoFinanceiro: installmentsDetails?.idTipoParcelamentoFinanceiro,
				observacao: installmentsDetails?.observacao,
			};
			setItemComplete(itemComplete);
		} catch (error) {}
	};

	const renderActionsOptions = useCallback(
		() => <LauchActionsMenu item={itemComplete} ref={LauchActionsMenuRef} />,
		[itemComplete],
	);

	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const getTransactionTitle = () => {
		return item.debitoCredito === 'C' ? 'Receita' : 'Despesa';
	};

	return (
		<Container>
			<HeaderGlobals
				title={getTransactionTitle()}
				back={() => props.navigation.goBack()}
				lower={true}
				more={() => LauchActionsMenuRef.current?.open()}
			/>
			{renderActionsOptions()}

			<ContainerScreen>
				<FirstContainer>
					<ContainerDate>
						<CircleIconContainer>
							<ContainerIcon>
								{item.debitoCredito === 'C' ? (
									<FontAwesome size={8} name="circle" si color={colors.green200} />
								) : (
									<FontAwesome size={8} name="circle" color={colors.red200} />
								)}
							</ContainerIcon>
						</CircleIconContainer>

						<DataTextContainer>
							<DateText>{item.dataVencimentoFormatada}</DateText>
						</DataTextContainer>
					</ContainerDate>
					<ThumbsIconContainer>
						{item.debitoCredito === 'C' ? (
							<FontAwesome name="thumbs-up" color={colors.blueIcon} size={20} />
						) : (
							<FontAwesome
								name="thumbs-down"
								color={colors.colorIconThumbdown}
								size={20}
								style={{transform: [{scaleX: -1}]}}
							/>
						)}
					</ThumbsIconContainer>
				</FirstContainer>

				<DescriptionContainer>
					<DataText>{item.descricaoLancamento || 'N/I'}</DataText>
				</DescriptionContainer>

				<InformationContainer>
					<InformationTitleTextContainer>
						<InformationTitleText>Valor</InformationTitleText>
					</InformationTitleTextContainer>

					<InformationTextContainer>
						<InformationText>{item?.value || 'N/I'}</InformationText>
					</InformationTextContainer>

					<InformationTitleTextContainer>
						<InformationTitleText>Vencimento</InformationTitleText>
					</InformationTitleTextContainer>

					<InformationTextContainer>
						<InformationText>{item.dataVencimentoFormatada || 'N/I'}</InformationText>
					</InformationTextContainer>

					<InformationTitleTextContainer>
						<InformationTitleText>Categoria</InformationTitleText>
					</InformationTitleTextContainer>

					<InformationTextContainer>
						<InformationText>{dataDetails?.categoria || 'N/I'}</InformationText>
					</InformationTextContainer>

					<InformationTitleTextContainer>
						<InformationTitleText>Pessoa</InformationTitleText>
					</InformationTitleTextContainer>

					<InformationTextContainer>
						<InformationText>{item.nomePessoaCliente || 'N/I'}</InformationText>
					</InformationTextContainer>
					<InformationTitleTextContainer>
						<InformationTitleText>Processo</InformationTitleText>
					</InformationTitleTextContainer>

					<InformationTextContainer>
						<InformationText>{item.numeroProcesso || 'N/I'}</InformationText>
					</InformationTextContainer>

					<InformationTitleTextContainer>
						<InformationTitleText>Repetir</InformationTitleText>
					</InformationTitleTextContainer>

					<InformationTextContainer>
						<InformationText>
							Durante {dataDetails?.quantidadeParcelas || 'N/I'} dia(s)
						</InformationText>
					</InformationTextContainer>

					<InformationTitleTextContainer>
						<InformationTitleText>Observações</InformationTitleText>
					</InformationTitleTextContainer>

					<DescriptionOfObservationsContainer>
						<DescriptionOfObservationsText>
							{dataDetails?.observacao || 'N/I'}
						</DescriptionOfObservationsText>
					</DescriptionOfObservationsContainer>
				</InformationContainer>
			</ContainerScreen>
		</Container>
	);
}
