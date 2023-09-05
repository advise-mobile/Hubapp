import React, { useCallback } from 'react';
import moment from 'moment';
import Header from 'components/Header';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HasNotPermission from 'components/HasNotPermission';

import Blocked from 'pages/Blocked';

import {
	ContainerFinance,
	ContainerDataFinance,
	ContainerItensFinance,
	TextLabel,
	TextValue,
	ContainerIconFinance,
	ContainerD,
	ContainerValues,
	ContainerLabel,
	ContainerDataReleases,
	ContainerDataFinanceTitle,
	ContainerTitleReleases,
	ContainerLabelReleases,
	ContainerIconReleases,
	ContainerTextReleases,
	TextReleases,
	IconContainerReleases,
	PriceSubTitleContainer,
	PriceSubTitleText,
	SubTitleContainer,
	SubtitleCategoryContainer,
	SubtitleCategoryText,
	SubtitleDateContainer,
	SubtitleDateText,
	TextDateReleases,
	LegendDateColorContainer,
	ContainerLabelFinance,
	TextValueDespesa,
	ContainerValuesDespesa,
} from './styles';

import { Container, Warp } from 'assets/styles/global';


const rowTranslateAnimatedValues = {};

const filters = [{
	id: 'lançamentos',
	name: 'Lançamentos',
	params: {
		concluido: false,
		dataInicial: moment().format('YYYY-MM-DD') + 'T' + moment().format('HH:mm:ss') + '.000Z',
	}
},
{
	id: 'fluxo-de-caixa',
	name: 'Fluxo de caixa',
	params: {
		concluido: false,
		dataFinal: new Date().toJSON()
	}
},
{
	id: 'categoria',
	name: 'Categoria',
	params: {
		importante: true,
		concluido: false
	}
}];

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

export default function Deadlines(props) {

	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

	const havePermission = true;
	const loading = false;
	const active = true;


	const renderFooter = useCallback(() => (!loading) ? null : <Spinner />, [loading]);


	return (
		<Container>
			{active ?
				<>
					{
						havePermission ?
							<Warp>
								<Header title="Financeiro" colorIcon={colors.success} />

								<ContainerFinance>

									<ContainerDataFinanceTitle>

										<ContainerItensFinance>

											<TextLabel>
												Saldo anterior
											</TextLabel>
											<ContainerValues>
												<TextValue>
													999.999.999
												</TextValue>
											</ContainerValues>

										</ContainerItensFinance>
									</ContainerDataFinanceTitle>

									<ContainerD>

										<ContainerDataFinance>
											<ContainerItensFinance>
												<ContainerIconFinance>
													<FontAwesome name="circle" color={colors.green200} />
												</ContainerIconFinance>
												<ContainerLabel>
													<TextLabel>Receita realizada</TextLabel>
												</ContainerLabel>
												<ContainerValues>
													<TextValue>999.999.999</TextValue>
												</ContainerValues>
											</ContainerItensFinance>

											<ContainerItensFinance>
											<ContainerLabelFinance>
												<ContainerIconFinance>
													<FontAwesome name="circle" color={colors.red200} />
												</ContainerIconFinance>

												<ContainerLabel>
													<TextLabel>Despesa realizada</TextLabel>
												</ContainerLabel>
												<ContainerValuesDespesa>
													<TextValueDespesa colorText={colors.red200}>
														-999.999.999
													</TextValueDespesa>
												</ContainerValuesDespesa>
												</ContainerLabelFinance>
											</ContainerItensFinance>



										</ContainerDataFinance>





									</ContainerD>


									<ContainerDataFinanceTitle>
										<ContainerItensFinance>

											<TextLabel style={{ fontWeight: "bold" }}>
												Saldo Atual
											</TextLabel>

											<ContainerValues>
												<TextValue colorText={colors.forgetLink}>
													999.999.999
												</TextValue>
											</ContainerValues>

										</ContainerItensFinance>
									</ContainerDataFinanceTitle>



									{/* lancamentos */}

									<ContainerD>

										<ContainerDataReleases>
											<ContainerTitleReleases>


												<ContainerLabelReleases>
													<ContainerIconReleases>
														<FontAwesome name="circle" color={colors.green200} />
													</ContainerIconReleases>

													<TextDateReleases>04/09/2022</TextDateReleases>
												</ContainerLabelReleases>

												<IconContainerReleases>
											<FontAwesome name="thumbs-up" color={colors.blueIcon} size={25}/>
											</IconContainerReleases>

											</ContainerTitleReleases>

											<ContainerTextReleases>
												<TextReleases> Título Lorem ipsum dolor sit amet,consectetur adipisci, Duis sollicitudin, erat commodo lacinia.</TextReleases>
											</ContainerTextReleases>
											<SubTitleContainer>
											<PriceSubTitleContainer>
												<PriceSubTitleText>
													R$ 2.000,00
												</PriceSubTitleText>
											</PriceSubTitleContainer>
											<SubtitleCategoryContainer>
												<SubtitleCategoryText>
													Trabalho
												</SubtitleCategoryText>
											</SubtitleCategoryContainer>

											<SubtitleDateContainer>
												<SubtitleDateText>
												Baixado em: 30/09/2023
												</SubtitleDateText>
											</SubtitleDateContainer>

											</SubTitleContainer>

										</ContainerDataReleases>

									</ContainerD>

									<ContainerD>

										<ContainerDataReleases>
											<ContainerTitleReleases>


												<ContainerLabelReleases>
													<ContainerIconReleases>
														<FontAwesome name="circle" color={colors.red200} />
													</ContainerIconReleases>

													<TextDateReleases>04/09/2022</TextDateReleases>
												</ContainerLabelReleases>

												<IconContainerReleases>
											<FontAwesome name="thumbs-down" color={colors.colorIconThumbdown} size={25}/>
											</IconContainerReleases>

											</ContainerTitleReleases>

											<ContainerTextReleases>
												<TextReleases> Título Lorem ipsum dolor sit amet,consectetur adipisci, Duis sollicitudin, erat commodo lacinia.</TextReleases>
											</ContainerTextReleases>
											<SubTitleContainer>
											<PriceSubTitleContainer>
												<PriceSubTitleText>
													R$ - 2.000,00
												</PriceSubTitleText>
											</PriceSubTitleContainer>
											<LegendDateColorContainer>
												<SubtitleCategoryText>
													Emprestimo
												</SubtitleCategoryText>
											</LegendDateColorContainer>


											</SubTitleContainer>

										</ContainerDataReleases>

									</ContainerD>




								</ContainerFinance>



							</Warp>
							:
							<HasNotPermission
								image={image}
								title="A sua rotina totalmente organizada!"
								body="Tenha a facilidade de cadastrar um prazo judicial, uma audiência ou uma reunião diretamente na sua ferramenta de monitoramento de informações jurídicas"
							/>
					}
				</> :
				<Blocked />
			}
		</Container>
	);
};
