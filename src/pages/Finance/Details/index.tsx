import React, { useCallback, useEffect, useRef,useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import {useTheme} from 'styled-components';

import HeaderGlobals from '../../../components/HeaderGlobals';

import {Container} from '../../../assets/styles/global';

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
import More from '../Modal/LaunchActions';

import {
  useGetInstallmentsDetails,
} from '@services/hooks/Finances/useReleases';

import { ItemsInstallmentsDetailsProps } from './types';

export default function Details(props) {

	const { isLoadingInstallmentsDetails, getInstallmentsDetails } = useGetInstallmentsDetails();

	const [dataDetails, setDataDetails] = useState<ItemsInstallmentsDetailsProps>();

	const addRef = useRef(null);

	const {item} = props.route.params;



	const renderAddOptions = useCallback(() => <More ref={addRef} idAgenda={null} onAdd={() => {}} />, []);

	//chama o hook
	useEffect(() => {
    fetchDataInstallmentsDetails();
  }, []);


	//busca a informação
	const fetchDataInstallmentsDetails = async () => {
    try {

      const installmentsDetails = await getInstallmentsDetails({idFinanceiro:item.idLancamentoFinanceiro});

			setDataDetails(installmentsDetails);

    } catch (error) {

    }
  };



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
					more={() => addRef.current?.open()}

				/>
				{renderAddOptions()}

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
							<FontAwesome name="thumbs-down" flip="horizontal" color={colors.colorIconThumbdown} size={20} />
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
						<InformationText>{dataDetails?.valor || 'N/I'}</InformationText>
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
						<InformationText>Durante {dataDetails?.quantidadeParcelas || 'N/I'} dia(s)</InformationText>
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
