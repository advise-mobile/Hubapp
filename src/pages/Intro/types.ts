import { ImageSourcePropType, ViewStyle, ImageStyle } from 'react-native';

export interface IntroSlideItem {
	key: string;
	title: string;
	text: string;
	image: ImageSourcePropType;
}

export interface IntroSliderStyles {
	inactiveDot: ViewStyle;
	activeDot: ViewStyle;
	icon: ImageStyle;
}

export interface IntroUIProps {
	slides: IntroSlideItem[];
	onDone: () => void;
	sliderStyles: IntroSliderStyles;
	iconSource: ImageSourcePropType;
	nextButtonLabel: string;
	doneButtonLabel: string;
}
