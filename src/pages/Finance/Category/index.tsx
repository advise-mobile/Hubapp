import React from 'react';

import HeaderGlobals from '../../../components/HeaderGlobals';
import HasNotPermission from 'components/HasNotPermission';
import {Container, Warp} from 'assets/styles/global';

import Blocked from 'pages/Blocked';

import {useTheme} from 'styled-components';
import {ScrollView} from 'react-native';
import { ContainerIcon, ContainerItems, ContainerScreen, ContainerText, ContainerTextTitle, SubTitle, TextTitle } from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Category(props) {

	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const havePermission = true;
	const active = true;

	return (
		<Container>
			{active ? (
				<>
					{havePermission ? (
						<Warp>
							<HeaderGlobals
								title={'Financeiro'}
								filter={() => openFilters()}
								add={() => addRef.current?.open()}
								lower={true}
							/>
							<ScrollView>
								<ContainerScreen>
									<ContainerItems>
										<ContainerTextTitle>
											<ContainerIcon>
											<FontAwesome name="list" color={colors.pinkTag} size={20}/>
											</ContainerIcon>
											<ContainerText>
												<TextTitle>
													Salários
												</TextTitle>
											</ContainerText>
												<SubTitle>
													Receitas
												</SubTitle>
										</ContainerTextTitle>
									</ContainerItems>

									<ContainerItems>
										<ContainerTextTitle>
											<ContainerIcon>
											<FontAwesome name="list" color={colors.greenTag} size={20}/>
											</ContainerIcon>
											<ContainerText>
												<TextTitle>
													Viagem
												</TextTitle>
											</ContainerText>
												<SubTitle>
													Despesa
												</SubTitle>
										</ContainerTextTitle>
									</ContainerItems>
								</ContainerScreen>
							</ScrollView>
						</Warp>
					) : (
						<HasNotPermission
							image={image}
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
