import React, { useCallback, useRef, useState } from 'react';
import HasNotPermission from 'components/HasNotPermission';
import {Container, Warp, Actions, ActionButton} from 'assets/styles/global';
import Image from 'react-native-remote-svg';
import Blocked from 'pages/Blocked';
import { ItemProps } from '@pages/MovementsTrash/types'

import {useTheme} from 'styled-components';
import {ScrollView, Animated} from 'react-native';
import { ContainerIcon, ContainerItems, ContainerScreen, ContainerText, ContainerTextTitle, SubTitle, TextTitle } from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Category(props) {

	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const iconDelete = colorUseTheme.name === 'dark'
	? require('assets/images/movements-trash-delete-dark.png')
	: require('assets/images/movements-trash-delete-white.png');

	const iconRestore = colorUseTheme.name === 'dark'
	? require('assets/images/movements-trash-restore-dark.png')
	: require('assets/images/movements-trash-restore-white.png');

	

	const havePermission = true;
	const active = true;

	const confirmationModalRef = useRef();
	const confirmationModalRecoverRef = useRef();
	const [currentItem, setCurrentItem] = useState<ItemProps>();

	const handleModalCancel = useCallback(() => confirmationModalRef.current?.close(),[]);

	const handleDelete = useCallback((item:ItemProps) => {
		
		setCurrentItem(item)
		confirmationModalRef.current?.open();			
	},[]);

	const handleRecover = useCallback((item:ItemProps) => {
		setCurrentItem(item)
		confirmationModalRecoverRef.current?.open();
	},[]);

	const renderHiddenItem = useCallback(
		
		({ item }: { item: ItemProps })   => (
			<Actions
				as={Animated.View}
				style={{
					overflow: 'hidden',
				}}>
				<ActionButton onPress={() => handleRecover(item)}>
					<Image source={iconRestore} style={{ width: 30, height: 45 }}  />
				</ActionButton>
				<ActionButton onPress={() => handleDelete(item)}>
					<Image source={iconDelete} style={{ width: 30, height: 45 }}  />
				</ActionButton>
			</Actions>
	),[]);

	return (
		<Container>
			{active ? (
				<>
					{havePermission ? (
						<Warp>
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
