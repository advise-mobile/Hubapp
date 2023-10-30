import React from 'react';
import {DataItemProps} from './types';
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

const FinanceDataItem = ({item}: DataItemProps) => {
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
		<>

			<ContainerReleases onPress={Details}>
				<ContainerItemReleases>
					<ContainerIconDescriptionReleases>
						<ContainerIcon>
							{item.type === 'receita' ? (
								<FontAwesome size={8} name="circle" si color={colors.green200} />
							) : (
								<FontAwesome size={8} name="circle" color={colors.red200} />
							)}
						</ContainerIcon>

						<ContainerLabel>
							<TextLabel fontWeight>{item.date}</TextLabel>
						</ContainerLabel>
					</ContainerIconDescriptionReleases>

					<ContainerIconThumbs>
						{item.type === 'receita' ? (
							<FontAwesome name="thumbs-up" color={colors.blueIcon} size={20} />
						) : (
							<FontAwesome name="thumbs-down" color={colors.colorIconThumbdown} size={20} />
						)}
					</ContainerIconThumbs>
				</ContainerItemReleases>

				<Content>
					<ContainerDescriptionReleases>
						<TextLabelDescriptionReleases numberOfRows={2}>
							{item.description}
						</TextLabelDescriptionReleases>
					</ContainerDescriptionReleases>

					<ContainerValueReleases>
						<TextValueReleases fontWeight>R$ {item.value}</TextValueReleases>

						<ContainerCategoryReleases>
							<TextLabelCategory fontWeight>{item.category}</TextLabelCategory>
						</ContainerCategoryReleases>

						<ContainerDownloadedReleases>
							<TextLabelCategory fontWeight>Baixado em {item.dateOff}</TextLabelCategory>
						</ContainerDownloadedReleases>
					</ContainerValueReleases>
				</Content>
			</ContainerReleases>
		</>
	);
};

export default FinanceDataItem;
