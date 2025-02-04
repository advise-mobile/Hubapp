import React from 'react';

import { ItemInstallmentsProps } from '@pages/Finance/Releases/types';

import {
	ContainerReleases,
	ContainerItemReleases,
	ContainerIconDescriptionReleases,
	ContainerIcon,
	ContainerIconThumbs,
	TextLabelDescriptionReleases,
	ContainerDescriptionReleases,
	TextValueReleases,
	ContainerCategoryReleases,
	TextLabelCategory,
	ContainerDownloadedReleases,
	ContainerValueReleases,
	TextLabel,
	ContainerLabel,
	Content,
} from './styles';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import {useNavigation} from '@react-navigation/native';

const FinanceDataItem =  (  { item } : { item: ItemInstallmentsProps }) => {

	const navigation = useNavigation();

	function Details() {
		navigation.navigate('Details', {
			item: item,
		});
	}

	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	return (

			<ContainerReleases onPress={Details}>
				<ContainerItemReleases>
					<ContainerIconDescriptionReleases>
						<ContainerIcon>
							{item.debitoCredito === 'C' ? (
								<FontAwesome size={8} name="circle" si color={colors.green200} />
							) : (
								<FontAwesome size={8} name="circle" color={colors.red200} />
							)}
						</ContainerIcon>

						<ContainerLabel>
							<TextLabel fontWeight>{item.dataVencimentoFormatada}</TextLabel>
							<TextLabel fontWeight> ({item.numeroParcela}/{item.quantidadeParcelas})</TextLabel>
						</ContainerLabel>
					</ContainerIconDescriptionReleases>

					<ContainerIconThumbs>
						{item.debitoCredito === 'C' ? (
							<FontAwesome name="thumbs-up" color={colors.blueIcon} size={20} />
						) : (
							<FontAwesome name="thumbs-down" flip="horizontal" color={colors.colorIconThumbdown} size={20} />
						)}
					</ContainerIconThumbs>
				</ContainerItemReleases>

				<Content>
					<ContainerDescriptionReleases>

						<TextLabelDescriptionReleases>
							{item.descricaoLancamento}
						</TextLabelDescriptionReleases>
					</ContainerDescriptionReleases>

					<ContainerValueReleases>
						<TextValueReleases fontWeight> {item.value}</TextValueReleases>



						<ContainerCategoryReleases backgroundContainerColor={
													item.categoriaFinanceiro.corCategoria === undefined
													? colors.purple
													: item.categoriaFinanceiro.corCategoria }
													baixado={item.baixado} >
							<TextLabelCategory numberOfLines={1} fontWeight>{item.categoriaFinanceiro.nomeCategoriaFinanceiro}</TextLabelCategory>
						</ContainerCategoryReleases>

						{
							item.baixado &&
								<ContainerDownloadedReleases>
									<TextLabelCategory fontWeight>Baixado em {item.dataBaixaFormatada}</TextLabelCategory>
								</ContainerDownloadedReleases>
						 }
					</ContainerValueReleases>
				</Content>
			</ContainerReleases>
	);
};

export default FinanceDataItem;
