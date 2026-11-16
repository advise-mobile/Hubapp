import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';

import { INTRO } from '@lhelpers/StorageKeys';

import { IntroUI } from './ui';
import type { IntroSlideItem, IntroSliderStyles } from './types';

import icon from 'assets/images/icon.png';
import unificationImage from 'assets/images/intro/1.jpg';
import deadLineModuleImage from 'assets/images/intro/2.jpg';
import financeModuleImage from 'assets/images/intro/4.jpg';
import summonsModuleImage from 'assets/images/intro/5.jpg';

const SLIDES_DATA: Omit<IntroSlideItem, 'image'>[] = [
	{
		key: 'one',
		title: 'Unifique tarefas',
		text: 'Tenha acesso às informações de todos os tribunais e órgãos oficiais do país em um mesmo lugar.',
	},
	{
		key: 'two',
		title: 'Organize prazos',
		text: 'Gerencie seus prazos judiciais e compromissos no mesmo lugar. Tudo integrado à sua Google Agenda.',
	},
	{
		key: 'three',
		title: 'Simplifique a gestão financeira',
		text: 'Controle as finanças do seu escritório com facilidade. Gerencie receitas, despesas e fluxo de caixa em um só lugar.',
	},
	{
		key: 'four',
		title: 'Acompanhe intimações',
		text: 'Receba, visualize e monitore suas intimações judiciais em tempo real. Evite prazos perdidos e mantenha total controle das ações que exigem atenção imediata.',
	},
];

const introImages = [
	unificationImage,
	deadLineModuleImage,
	financeModuleImage,
	summonsModuleImage,
];

const slides: IntroSlideItem[] = SLIDES_DATA.map((item, index) => ({
	...item,
	image: introImages[index],
}));

function buildSliderStyles(colors: Record<string, string>): IntroSliderStyles {
	return StyleSheet.create({
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
}

export interface IntroScreenProps {
	navigation: {
		navigate: (screen: string) => void;
	};
}

export default function Intro({ navigation }: IntroScreenProps) {
	const theme = useTheme();
	const { colors } = theme;

	const sliderStyles = useMemo(() => buildSliderStyles(colors), [colors]);

	const onDone = useCallback(() => {
		AsyncStorage.setItem(INTRO, 'true').then(() => {
			navigation.navigate('Initial');
		});
	}, [navigation]);

	return (
		<IntroUI
			slides={slides}
			onDone={onDone}
			sliderStyles={sliderStyles}
			iconSource={icon}
			nextButtonLabel="Próximo"
			doneButtonLabel="Continuar"
		/>
	);
}
