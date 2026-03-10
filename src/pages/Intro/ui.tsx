import React, { useCallback } from 'react';
import type { IntroSlideItem, IntroUIProps } from './types';
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

const keyExtractor = (item: IntroSlideItem) => item.key;

export function IntroUI({
	slides,
	onDone,
	sliderStyles,
	iconSource,
	nextButtonLabel,
	doneButtonLabel,
}: IntroUIProps) {
	const renderItem = useCallback(
		({ item }: { item: IntroSlideItem }) => (
			<Slide>
				<Icon
					source={iconSource}
					resizeMode="contain"
					style={sliderStyles.icon}
				/>
				<Image source={item.image} resizeMode="contain" />
				<SlideContainer>
					<Title>{item.title}</Title>
					<Text>{item.text}</Text>
				</SlideContainer>
			</Slide>
		),
		[iconSource, sliderStyles.icon],
	);

	const renderNextButton = useCallback(
		() => (
			<NextButton>
				<ButtonText>{nextButtonLabel}</ButtonText>
			</NextButton>
		),
		[nextButtonLabel],
	);

	const renderDoneButton = useCallback(
		() => (
			<NextButton>
				<ButtonText>{doneButtonLabel}</ButtonText>
			</NextButton>
		),
		[doneButtonLabel],
	);

	return (
		<Container>
			<Warp>
				<AppIntroSlider
					bottomButton
					data={slides}
					onDone={onDone}
					showPrevButton={false}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					dotStyle={sliderStyles.inactiveDot}
					activeDotStyle={sliderStyles.activeDot}
					renderNextButton={renderNextButton}
					renderDoneButton={renderDoneButton}
				/>
			</Warp>
		</Container>
	);
}
