import styled from 'styled-components/native';
import {TouchableHighlight} from 'react-native';

interface ContainerProps {
	active: boolean;
}

export const ContainerIcon = styled.View`
	height: 25px;
	width: 24px;
	margin-right: 8px;
`;

export const TextTitle = styled.Text`
	font-size: 16px;
	font-weight: bold;
	color: ${({theme}) => theme.colors.BlackInactive};
`;

export const SubTitle = styled.Text`
	font-size: 16px;
	color: ${({theme}) => theme.colors.BlackInactive};
`;

export const ContainerSubtitle = styled.View`
	width: 100px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const Container = styled.View<ContainerProps>`
	background-color: ${({theme}) => theme.colors.white};

	padding: 12px 17px;
	border-bottom-width: 0.7px;
	border-bottom-color: ${({theme}) => theme.colors.grayLighter};
`;

export const ContainerItems = styled.View`
	flex-wrap: nowrap;
	margin-top: 1px;
	flex-direction: row;
	align-items: center;
`;

export const ContainerTitle = styled.View`
	flex: 1;
	max-width: 140px;
	margin-right: 10px;
`;

export const ContainerSpinner = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;
