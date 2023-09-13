import styled from 'styled-components';

interface ColorTextProps {
	colorText: string
}

export const ContainerHeader = styled.View`
	border: black;
	width: 410px;
	align-items: center;
	justify-content: space-between;
`;

export const ContainerScreen = styled.View`
	flex: 1;
`;

export const FirstContainer = styled.View`
	height: 25px;
	width: 366px;
	margin-left: 25px;
	margin-top: 20px;
	flex-direction: row;
	align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin-right: 16;
`;

export const ContainerDate = styled.View`
	height: 22px;
	width: 326px;
	flex-direction: row;
	align-items: center;
	margin-top: 10px;
`;

export const CircleIconContainer = styled.View`
	height: 20px;
	width: 15px;
	align-items: center;
`;

export const ContainerIcon = styled.View`
	height: 19px;
`;

export const DataTextContainer = styled.View`
	height: 25px;
	width: 110px;
	margin-left: 10px;
`;

export const DateText = styled.Text`
	font-weight: bold;
	font-size: 16px;
`;

export const ThumbsIconContainer = styled.View`
	height: 24px;
	align-items: center ;
	margin-left: 15px;
`;

export const DescriptionContainer = styled.View`
	height: 24px;
	width: 310px;
	margin-top: 30px;
	margin-left: 55px;
`;

export const DataText = styled.Text`
	font-size: 14px;
	color: ${({ colorText, theme }) => colorText ? colorText : theme.colors.inactive};
`;

export const InformationContainer = styled.View`
	width: 297px;
	height: 570px;
	margin-left: 55px;
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
	height: 50px;
	margin-top: 1px;
`;

export const InformationTitleText = styled.Text`
	font-weight: bold;
	font-size: 16px;
`;



export const InformationText = styled.Text`
	font-size: 14px;
`;

export const DescriptionOfObservationsText = styled.Text`
	font-size: 14px;
	height: 115px;
	lineHeight: 20px;
`;

