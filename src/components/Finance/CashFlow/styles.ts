import styled from 'styled-components';


interface WeightTextProps {
	fontWeight: boolean
}

export const ContainerReleases = styled.View`
		width: 414px;
		height: 90px;
		border-bottom-width: 0.5;
		border-color: #ABABAB;
		align-items: center;
		justify-content: center;
`;

export const ContainerItems = styled.View`
	width: 366px;
	height: 56px;
`;

export const ContainerDataReleases = styled.View`
	width: 120px;
	height: 24px;
	justify-content: center;
	margin-bottom: 7px;
`;

export const TextData = styled.Text`
	font-size: 18px;
	color: ${({ theme }) => theme.colors.grayDarker};
	font-weight: bold;
`;

export const ContainerDescriptionReleases = styled.View`
	width: 322px;
	height: 25px;
	align-items: center;
	flex-direction: row;
	margin-top: 5px;
`;

export const ContainerDescriptionItems = styled.View`
	flex-direction: row;
`;


export const TextLabelDescription = styled.Text<WeightTextProps>`
	max-width: 70px;
	height: 23px;
	font-size: 15px;
	margin-right: 5px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.BlackInactive};
`;


export const TextValueDescriptionProhibited = styled.Text`
	max-width: 70px;
	height: 23px;
	font-size: 15px;
	margin-right: 8px;
	color: ${({ theme }) => theme.colors.green200};
`;

export const TextValueDescriptionExit = styled.Text`
	max-width: 70px;
	height: 23px;
	font-size: 15px;
	margin-right: 8px;
	color: ${({ theme }) => theme.colors.red200};
`;

export const TextValueDescriptionBalance = styled.Text`
	max-width: 70px;
	height: 23px;
	font-size: 15px;
	margin-right: 8px;
	color: ${({ theme }) => theme.colors.grayDarker};
`;
