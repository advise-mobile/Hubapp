import React, {useState} from 'react';

import {ItemInstallmentsProps} from '@pages/Finance/Releases/types';

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
import {ActivityIndicator} from 'react-native';

import {useFinancialLoss, useGetFinanceID} from '@services/hooks/Finances/useReleases';

const FinanceDataItem = ({
	item,
	onDataChange,
}: {
	item: ItemInstallmentsProps;
	onDataChange: () => void;
}) => {
	const [localItem, setLocalItem] = useState(item);
	const navigation = useNavigation();
	const {addFinancialLoss, removeFinancialLoss, isLoadingFinancialLoss} = useFinancialLoss();
	const {getFinanceDataID} = useGetFinanceID();

	function Details() {
		navigation.navigate('Details', {
			item: localItem,
		});
	}

	const handleFinancialLoss = () => {
		if (localItem.baixado) {
			removeFinancialLoss(
				{
					idParcelaFinanceiro: localItem.idParcelaFinanceiro,
				},
				() => {
					onDataChange();
				},
			);
		} else {
			addFinancialLoss(
				{
					idParcelaFinanceiro: localItem.idParcelaFinanceiro,
					valorBaixa: localItem.valorAberto || '0',
				},
				() => {
					onDataChange();
				},
			);
		}
	};

	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	return (
		<ContainerReleases onPress={Details}>
			<ContainerItemReleases>
				<ContainerIconDescriptionReleases>
					<ContainerIcon>
						{localItem.debitoCredito === 'C' ? (
							<FontAwesome size={8} name="circle" si color={colors.green200} />
						) : (
							<FontAwesome size={8} name="circle" color={colors.red200} />
						)}
					</ContainerIcon>

					<ContainerLabel>
						<TextLabel fontWeight>{localItem.dataVencimentoFormatada}</TextLabel>
						<TextLabel fontWeight>
							({localItem.numeroParcela}/{localItem.quantidadeParcelas})
						</TextLabel>
					</ContainerLabel>
				</ContainerIconDescriptionReleases>

				<ContainerIconThumbs
					onPress={() => handleFinancialLoss()}
					disabled={isLoadingFinancialLoss}>
					{isLoadingFinancialLoss ? (
						<ActivityIndicator size="small" color={colors.blueIcon} />
					) : localItem.baixado === true ? (
						<FontAwesome name="thumbs-up" color={colors.blueIcon} size={20} />
					) : (
						<FontAwesome
							name="thumbs-down"
							flip="horizontal"
							color={colors.colorIconThumbdown}
							size={20}
							style={{transform: [{scaleX: -1}]}}
						/>
					)}
				</ContainerIconThumbs>
			</ContainerItemReleases>

			<Content>
				<ContainerDescriptionReleases>
					<TextLabelDescriptionReleases>
						{localItem.descricaoLancamento}
					</TextLabelDescriptionReleases>
				</ContainerDescriptionReleases>

				<ContainerValueReleases>
					<TextValueReleases fontWeight> {localItem.value}</TextValueReleases>

					<ContainerCategoryReleases
						backgroundContainerColor={
							localItem.categoriaFinanceiro.corCategoria === undefined
								? colors.purple
								: localItem.categoriaFinanceiro.corCategoria
						}
						baixado={localItem.baixado}>
						<TextLabelCategory numberOfLines={1} fontWeight>
							{localItem.categoriaFinanceiro.nomeCategoriaFinanceiro}
						</TextLabelCategory>
					</ContainerCategoryReleases>

					{localItem.baixado && (
						<ContainerDownloadedReleases>
							<TextLabelCategory fontWeight>
								Baixado em {localItem.dataBaixaFormatada}
							</TextLabelCategory>
						</ContainerDownloadedReleases>
					)}
				</ContainerValueReleases>
			</Content>
		</ContainerReleases>
	);
};

export default FinanceDataItem;
