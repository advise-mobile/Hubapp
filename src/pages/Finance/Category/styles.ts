import styled from 'styled-components';


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
	color: ${({ theme }) => theme.colors.BlackInactive};
`;

export const SubTitle = styled.Text`
	font-size: 16px;
	max-width: 170px;
	height: 24px;
	margin-left: 15px;
	color: ${({ theme }) => theme.colors.BlackInactive};

`;



