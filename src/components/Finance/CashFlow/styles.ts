import styled from 'styled-components/native';
import { fonts } from 'assets/styles';


interface WeightTextProps {
	fontWeight: boolean
}

export const ContainerReleases = styled.View`
		min-height: 110px;
		border-bottom-width: 0.4;
		
		border-color:${({ theme }) => theme.colors.grayDarker};
		align-items: center;
		justify-content: center;
		/* border : 1px solid; */
`;

export const ContainerItems = styled.View`
	width: 366px;
	/* height: 56px; */
`;

export const ContainerDataReleases = styled.View`
	width: 120px;
	height: 24px;
	justify-content: center;
	margin-top: 10px;
	margin-bottom: 10px;
`;

export const TextData = styled.Text`
	/* font-size: 14px; */
	font-size: ${fonts.regular};
	color: ${({ theme }) => theme.colors.BlackInactive};
	font-weight: bold;
`;

export const ContainerDescriptionReleases = styled.View`
	
	align-items: flex-start;
	justify-content: space-around;
	/* flex-direction: row; */
	/* margin-top: 5px; */
	
	/* border : 1px solid; */
`;

export const ContainerDescriptionItems = styled.View`
	flex-direction: row;
	margin-bottom: 15px;
	/* border: 1px solid; */
`;


export const TextLabelDescription = styled.Text<WeightTextProps>`
	font-size: ${fonts.small};
	margin-right: 5px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.BlackInactive};
	/* border: 1px solid blue; */
`;


export const TextValueDescriptionProhibited = styled.Text`
	width: 70px;
	font-size: ${fonts.small};
	/* margin-right: 8px; */
	color: ${({ theme }) => theme.colors.green200};
`;

export const TextValueDescriptionExit = styled.Text`
	font-size: ${fonts.small};
	margin-right: 10px;
	color: ${({ theme }) => theme.colors.red200};
`;

export const TextValueDescriptionBalance = styled.Text`
	font-size: ${fonts.small};
	color: ${({ theme }) => theme.colors.grayDarker};
`;
