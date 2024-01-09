import styled from 'styled-components/native';

interface ColorTextProps {
	colorText: string
}

interface WeightTextProps {
	fontWeight: boolean
}


export const ContainerScreen = styled.View`
	height: 740px;
`;

export const TopContainer = styled.View`
	height: 40px;
	width: 430px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-right: 15px;
	border-top-width: 0.4;
	border-bottom-width: 0.4;
	border-color: #ABABAB;
`;

export const ContainerMainInformation = styled.View`
	height: 30px;
	width: 340px;
	margin-left: 19px;
	flex-direction: row;
	flex: 1;
	align-items: center;
`;

export const ContainerValueInformation = styled.View`
	height: 30px;
	width: 340px;
	margin-left: 19px;
	flex-direction: row;
	flex: 1;
	margin-top: 5px;

`;

export const TextLabel = styled.Text<WeightTextProps>`
	font-size: 14px;
	color: ${({ theme }) => theme.colors.grayDarker};
	font-weight: bold;
`;

export const TextValue = styled.Text`
	font-size: 18px;
	color: ${({ theme }) => theme.colors.blueValue};
	height: 20px;
`;

export const ContainerIconMore = styled.TouchableOpacity`
	width: 30px;
	height: 30px;
	margin-right: 35px;
	margin-top: 5px;
`;

