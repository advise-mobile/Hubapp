import styled from 'styled-components';


export const ContainerScreen = styled.View`
	height: 740px;
`;

export const ContainerItems = styled.TouchableOpacity`
	width: 414px;
	height: 48px;
	border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.grayLighter};
	justify-content: center;
	padding: 20px;
`;

export const ContainerTextTitle = styled.View`
	width: 176px;
	height: 24px;
	flex-direction: row;
	align-items: center ;
`;

export const ContainerText = styled.View`
	width: 66px;
	height: 24px;
`;

export const ContainerIcon = styled.View`
	width: 24px;
	height: 24px;
	align-items: center;
	margin-right: 08px;
`;

export const TextTitle = styled.Text`
	font-size: 16px;
	font-weight: bold;
`;

export const SubTitle = styled.Text`
	font-size: 16px;
	width: 70px;
	height: 24px;
	margin-left: 15px;
`;



