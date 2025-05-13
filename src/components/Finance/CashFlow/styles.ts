import styled from 'styled-components/native';
import {fonts} from 'assets/styles';

interface WeightTextProps {
	fontWeight: boolean;
}

export const ContainerReleases = styled.View`
	min-height: 110px;
	border-bottom-width: 0.4;

	border-color: ${({theme}) => theme.colors.grayDarker};
	align-items: center;
	justify-content: center;
	/* border : 1px solid; */
`;

export const ContainerItems = styled.View`
	width: 100%;
`;

export const ContainerDataReleases = styled.View`
	width: 100%;
	height: 24px;
	justify-content: center;
	margin-top: 10px;
	margin-bottom: 8px;
	padding-horizontal: 20px;
`;

export const TextData = styled.Text`
	/* font-size: 14px; */
	font-size: ${fonts.regular};
	color: ${({theme}) => theme.colors.BlackInactive};
	font-weight: bold;
`;

export const ContainerDescriptionReleases = styled.View`
	justify-content: center;
	padding-horizontal: 20px;
`;

export const ContainerDescriptionItems = styled.View`
	flex-direction: row;
	margin-bottom: 10px;
	align-items: center;
`;

export const TextLabelDescription = styled.Text<WeightTextProps>`
	font-size: ${fonts.small};
	margin-right: 5px;
	font-weight: bold;
	color: ${({theme}) => theme.colors.BlackInactive};
	min-width: 60px;
`;

export const TextValueDescriptionProhibited = styled.Text`
	width: 70px;
	font-size: ${fonts.small};
	/* margin-right: 8px; */
	color: ${({theme}) => theme.colors.green200};
`;

export const TextValueDescriptionExit = styled.Text`
	font-size: ${fonts.small};
	margin-right: 10px;
	color: ${({theme}) => theme.colors.red200};
`;

export const TextValueDescriptionBalance = styled.Text`
	font-size: ${fonts.small};
	color: ${({theme}) => theme.colors.grayDarker};
`;
