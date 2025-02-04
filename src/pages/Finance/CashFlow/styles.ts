import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

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
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding:12px;
	border-top-width: 0.2px;
	border-bottom-width: 0.3;
	border-color:${({ theme }) => theme.colors.grayDarker};
`;

export const ContainerMainInformation = styled.View`
	flex: 1;
	align-items: center;
	flex-direction: row;
	justify-content: flex-start;
	/* border : 1px solid; */
`;

export const ContainerValueInformation = styled.View`
	margin-left: 20px;
	align-items: center;
	/* border : 1px solid; */
`;

export const TextLabel = styled.Text<WeightTextProps>`
	font-size: ${fonts.regular};
	color: ${({ theme }) => theme.colors.grayDarker};
	font-weight: bold;
`;

export const TextValue = styled.Text`
	font-size: ${fonts.regular};
	color: ${({ theme }) => theme.colors.blueValue};
	/* height: 20px; */
	margin-left: 20px;
`;

export const ContainerIconMore = styled.TouchableOpacity`
	/* width: 30px; */
	/* height: 30px; */
	/* border: 1px solid; */
	align-items: center;

`;

export const NotFound = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ImageNotFound = styled.Image`
  width: 200px;
  height: 200px;
  resize-mode: contain;
  margin-bottom: 12px;
  
`;

export const NotFoundText = styled.Text`
  font-size: ${fonts.big};
  color: ${({ theme }) => theme.colors.grayDarker};
  font-family: ${fonts.circularStdBold};
  margin-bottom: 8px;
`;

export const NotFoundDescription = styled.Text`
  color:  ${({ theme }) => theme.colors.grayLight};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
`;

