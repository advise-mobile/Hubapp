import React from 'react';
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


export default function Details(props) {

	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const {item} = props.route.params;

	return (
		<Container>
			<HeaderGlobals
					title={item.title}
					back={() => props.navigation.goBack()}
					lower={true}
					more={() => props.navigation.goBack()}

				/>

			<ContainerScreen>
				<FirstContainer>
					<ContainerDate>
						<CircleIconContainer>
							<ContainerIcon>
								{item.type === 'receita' && (
									<FontAwesome name="circle" color={colors.green200} />
								)}
								{item.type === 'despesa' && (
									<FontAwesome name="circle" color={colors.red200} />
								)}
							</ContainerIcon>
						</CircleIconContainer>

						<DataTextContainer>
							<DateText size={20}>{item.date}</DateText>
						</DataTextContainer>
					</ContainerDate>
					<ThumbsIconContainer>
						{item.type === 'receita' && (
							<FontAwesome name={'thumbs-up'} color={colors.blueIcon} size={25} />
						)}
						{item.type === 'despesa' && (
							<FontAwesome name={'thumbs-down'} color={colors.colorIconThumbdown} size={25} />
						)}
					</ThumbsIconContainer>
				</FirstContainer>

				<DescriptionContainer>
					<DataText>{item.description}</DataText>
				</DescriptionContainer>

				<InformationContainer>
					<InformationTitleTextContainer>
						<InformationTitleText>Valor</InformationTitleText>
					</InformationTitleTextContainer>

					<InformationTextContainer>
						<InformationText>R$ {item.value}</InformationText>
					</InformationTextContainer>

					<InformationTitleTextContainer>
						<InformationTitleText>Vencimento</InformationTitleText>
					</InformationTitleTextContainer>

					<InformationTextContainer>
						<InformationText>01/07/2023</InformationText>
					</InformationTextContainer>

					<InformationTitleTextContainer>
						<InformationTitleText>Categoria</InformationTitleText>
					</InformationTitleTextContainer>

					<InformationTextContainer>
						<InformationText>{item.category}</InformationText>
					</InformationTextContainer>

					<InformationTitleTextContainer>
						<InformationTitleText>Pessoa</InformationTitleText>
					</InformationTitleTextContainer>

					<InformationTextContainer>
						<InformationText>Nenhuma</InformationText>
					</InformationTextContainer>
					<InformationTitleTextContainer>
						<InformationTitleText>Processo</InformationTitleText>
					</InformationTitleTextContainer>

					<InformationTextContainer>
						<InformationText>Nenhuma</InformationText>
					</InformationTextContainer>

					<InformationTitleTextContainer>
						<InformationTitleText>Repetir</InformationTitleText>
					</InformationTitleTextContainer>

					<InformationTextContainer>
						<InformationText>Durante 480 dias</InformationText>
					</InformationTextContainer>

					<InformationTitleTextContainer>
						<InformationTitleText>Observações</InformationTitleText>
					</InformationTitleTextContainer>

					<DescriptionOfObservationsContainer>
						<DescriptionOfObservationsText>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sollicitudin, erat
							commodo lacinia imperdiet, metus velit rhoncus nisl, non auctor erat metus ut quam.
							Mauris in vestibulum sem.
						</DescriptionOfObservationsText>
					</DescriptionOfObservationsContainer>
				</InformationContainer>
			</ContainerScreen>
		</Container>
	);
}
