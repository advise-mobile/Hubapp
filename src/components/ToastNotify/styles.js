import styled from 'styled-components';
import {Platform} from 'react-native';
import {fonts, colors, metrics} from 'assets/styles';

const Container = styled.View`
	bottom: ${Platform.OS === 'android' ? metrics.baseMargin : metrics.baseMargin + 70};
	position: absolute;
`;

const Notify = styled.View`
	align-items: center;
	border-radius: ${metrics.baseRadius};
	flex-direction: row;
	font-family: ${fonts.circularStdBold};
	font-size: ${fonts.big};
	justify-content: space-between;
	left: ${metrics.baseMargin + 10};
	padding-horizontal: 10;
	padding-vertical: ${metrics.baseMargin + 5};
	width: ${metrics.screenWidth - metrics.basePadding - 20};
`;

const NotifyMessage = styled.Text`
	color: #111111;
	flex: 1;
	margin-left: 10;
`;

export {Container, Notify, NotifyMessage};
