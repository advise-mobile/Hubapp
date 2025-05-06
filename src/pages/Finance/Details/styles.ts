import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const ContainerHeader = styled.View`
	border: black;
	width: 410px;
	align-items: center;
	justify-content: space-between;
`;

export const ContainerScreen = styled.ScrollView`
	flex: 1;
	border-top-width: 1px;
	border-color: ${({theme}) => theme.colors.grayLighter};
	margin-top: 10px;
`;

export const FirstContainer = styled.View`
	width: 100%;
	padding-horizontal: 20px;
	height: 25px;
	margin-top: 20px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity`
	margin-right: 16;
`;

export const ContainerDate = styled.View`
	height: 22px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const CircleIconContainer = styled.View`
	height: 20px;
	width: 15px;
	align-items: center;
	justify-content: center;
`;

export const ContainerIcon = styled.View`
	height: 20px;
	justify-content: center;
`;

export const DataTextContainer = styled.View`
	height: 25px;
	align-items: center;
	justify-content: center;
	margin-left: 5px;
`;

export const DateText = styled.Text`
	font-weight: bold;
	font-size: 16px;
	color: ${({theme}) => theme.colors.BlackInactive};
	text-align: center;
`;

export const ThumbsIconContainer = styled.TouchableOpacity`
	height: 24px;
	align-items: center;
	justify-content: center;
	right: 3px;
`;

export const DescriptionContainer = styled.View`
	width: 100%;
	padding-horizontal: 40px;
	height: 25px;
	margin-top: 30px;
	justify-content: center;
`;

export const DataText = styled.Text`
	font-size: 14px;
	color: ${({theme}) => theme.colors.inactiveDetails};
`;

export const InformationContainer = styled.View`
	width: 100%;
	padding-horizontal: 40px;
	margin-top: 30px;
`;

export const InformationTitleTextContainer = styled.View`
	width: 200px;
	height: 24px;
	margin-top: 1px;
	margin-bottom: 10px;
`;

export const InformationTextContainer = styled.View`
	width: 290px;
	height: 24px;
	margin-top: 1px;
	margin-bottom: 10px;
`;

export const DescriptionOfObservationsContainer = styled.View`
	width: 290px;
	height: auto;
	margin-top: 1px;
	margin-left: 4px;
`;

export const InformationTitleText = styled.Text`
	font-weight: bold;
	font-size: 16px;
	color: ${({theme}) => theme.colors.BlackInactive};
`;

export const InformationText = styled.Text`
	font-size: 14px;
	color: ${({theme}) => theme.colors.BlackInactive};
`;

export const DescriptionOfObservationsText = styled.Text`
	font-size: 14px;
	height: auto;
	line-height: 20px;
	color: ${({theme}) => theme.colors.BlackInactive};
`;
