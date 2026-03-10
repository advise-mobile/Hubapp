import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';

import {
	Container,
	Warp,
	Slide,
	Title,
	Icon,
	Image,
	Text,
	NextButton,
	ButtonText,
	SlideContainer,
} from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { INTRO } from '@lhelpers/StorageKeys';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

const icon = require('assets/images/icon.png');

const slides = [
	{
		key: 'one',
		title: 'Unifique tarefas',
		text: 'Tenha acesso às informações de todos os tribunais e órgãos oficiais do país em um mesmo lugar.',
		image: require('assets/images/intro/1.jpg'),
	},
	{
		key: 'two',
		title: 'Organize prazos',
		text: 'Gerencie seus prazos judiciais e compromissos no mesmo lugar. Tudo integrado à sua Google Agenda.',
		image: require('assets/images/intro/2.jpg'),
	},
	{
		key: 'three',
		title: 'Simplifique a gestão financeira',
		text: 'Controle as finanças do seu escritório com facilidade. Gerencie receitas, despesas e fluxo de caixa em um só lugar.',
		image: require('assets/images/intro/4.jpg'),
	},
	{
		key: 'four',
		title: 'Acompanhe intimações',
		text: 'Receba, visualize e monitore suas intimações judiciais em tempo real. Evite prazos perdidos e mantenha total controle das ações que exigem atenção imediata.',
		image: require('assets/images/intro/5.jpg'),
	},
];

const stylesIntro = colors =>
	StyleSheet.create({
		inactiveDot: {
			display: 'none',
			backgroundColor: colors.grayLighter,
			width: 4,
			height: 4,
		},
		activeDot: {
			display: 'none',
			backgroundColor: colors.grayDarker,
			width: 6,
			height: 6,
		},
		icon: {
			width: 32,
			height: 27,
			marginTop: -32,
		},
	});

const _keyExtractor = item => item.title;

const Intro = props => {
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

	const styles = stylesIntro(colors);

	const _renderItem = useCallback(
		({ item }) => (
			<Slide>
				<Icon source={icon} resizeMode="contain" style={styles.icon} />
				<Image source={item.image} resizeMode="contain" />
				<SlideContainer>
					<Title>{item.title}</Title>
					<Text>{item.text}</Text>
				</SlideContainer>
			</Slide>
		),
		[],
	);

	const _onDone = useCallback(() => {
		AsyncStorage.setItem(INTRO, 'true').then(() => {
			props.navigation.navigate('Initial');
		});
	}, []);

	const _renderNextButton = useCallback(() => {
		return (
			<NextButton>
				<ButtonText>Próximo</ButtonText>
			</NextButton>
		);
	}, []);

	const _renderFinishButton = useCallback(() => {
		return (
			<NextButton>
				<ButtonText>Continuar</ButtonText>
			</NextButton>
		);
	}, []);

	return (
		<Container>
			<Warp>
				<AppIntroSlider
					bottomButton
					data={slides}
					onDone={_onDone}
					showPrevButton={false}
					renderItem={_renderItem}
					keyExtractor={_keyExtractor}
					dotStyle={styles.inactiveDot}
					activeDotStyle={styles.activeDot}
					renderNextButton={_renderNextButton}
					renderDoneButton={_renderFinishButton}
				/>
			</Warp>
		</Container>
	);
};

export default Intro;
