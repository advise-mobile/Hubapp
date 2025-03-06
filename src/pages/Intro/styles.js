import styled from 'styled-components';
import {fonts} from 'assets/styles';

const Container = styled.SafeAreaView`
	flex: 1;
	background-color: ${({theme}) => theme.colors.white};
`;

const Warp = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	flex-direction: row;
`;

const HeaderLogo = styled.View`
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	height: 80px;
`;

const Slide = styled.View`
	flex: 1;
	background-color: ${({theme}) => theme.colors.white};
	align-items: center;
	justify-content: center;
`;

const Icon = styled.Image`
	padding: 18px;
	flex: 1;
	width: 24px;
	height: 24px;
`;

const Image = styled.Image`
	margin: 0 32px 32px 32px;
	flex: 4;
	border-radius: 16px;
`;

const Title = styled.Text`
	font-size: 24px;
	font-family: ${fonts.circularStdBold};
	color: ${({theme}) => theme.colors.primary};
	margin-bottom: 16px;
	text-align: center;
`;

const Text = styled.Text`
	font-size: 16px;
	font-family: ${fonts.circularStdMedium};
	color: ${({theme}) => theme.colors.primary};
	text-align: center;
	max-width: 75%;
	margin-bottom: 16px;
`;

const NextButton = styled.View`
	background: ${({theme}) => theme.colors.primary};
	padding: 16px;
	border-radius: 4px;
`;

const ButtonText = styled.Text`
	font-size: 16px;
	font-family: ${fonts.circularStdMedium};
	color: ${({theme}) => theme.colors.white};
	text-align: center;
`;

const SlideContainer = styled.View`
	flex: 3;
	align-items: center;
	width: 105%;
`;

export {
	Container,
	Warp,
	HeaderLogo,
	Slide,
	Title,
	Text,
	Icon,
	Image,
	NextButton,
	ButtonText,
	SlideContainer,
};
