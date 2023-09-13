import React from 'react';
import {DataItemProps,FinanceItemProps} from './types';
import {
	ContainerResume,
	// ContainerDataReleases,
	// ContainerIconReleases,
	// ContainerLabelReleases,
	// ContainerTextReleases,
	// ContainerTitleReleases,
	// IconContainerReleases,
	// PriceSubTitleContainer,
	// PriceSubTitleText,
	// SubTitleContainer,
	// SubtitleCategoryContainer,
	// SubtitleCategoryText,
	// SubtitleDateContainer,
	// SubtitleDateText,
	// TextDateReleases,
	// TextReleases,
} from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'styled-components';

const FinanceDataItem = ( { item }  : DataItemProps) => {

	function CompleteFinancialInformation() {
    props.navigation.navigate("CompleteFinancialInformation");
  }

	//const {Date, Type, Description, Value, Category, idBaixados} = item;

	console.log("===",item);

	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

	return (
		<ContainerResume>
			{/* <ContainerDataReleases>
				<ContainerTitleReleases>
					<ContainerLabelReleases>
						<ContainerIconReleases>
							{item.type ==='receita' &&  <FontAwesome name="circle" color={colors.green200} />}
							{item.type ==='despesa' &&  <FontAwesome name="circle" color={colors.red200} />}
						</ContainerIconReleases>

						<TextDateReleases>{item.date}</TextDateReleases>
					</ContainerLabelReleases>

					<IconContainerReleases>

						{item.type ==='receita' &&  <FontAwesome name={"thumbs-up"} color={colors.blueIcon} size={25} /> }
						{item.type ==='despesa' &&  <FontAwesome name={"thumbs-down"} color={colors.colorIconThumbdown} size={25} /> }

					</IconContainerReleases>
				</ContainerTitleReleases>

				<ContainerTextReleases>
					<TextReleases>
						{item.description}
					</TextReleases>
				</ContainerTextReleases>
				<SubTitleContainer>
					<PriceSubTitleContainer>
						<PriceSubTitleText>R$ {item.value}</PriceSubTitleText>
					</PriceSubTitleContainer>
					<SubtitleCategoryContainer>
						<SubtitleCategoryText> {item.category}</SubtitleCategoryText>
					</SubtitleCategoryContainer>

					{
						item.off &&
							<SubtitleDateContainer>
								<SubtitleDateText>Baixado em: {item.dateOff} </SubtitleDateText>
							</SubtitleDateContainer>
					}
				</SubTitleContainer>
			</ContainerDataReleases> */}
		</ContainerResume>
	);
};

export default FinanceDataItem;