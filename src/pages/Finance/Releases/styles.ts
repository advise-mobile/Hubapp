import styled from 'styled-components/native';

interface ColorTextProps {
	colorText: string;
  fontWeight: boolean;
}

export const TextValue = styled.Text<ColorTextProps>`
  font-size: 14px;
  color: ${({ colorText, theme }) => colorText ? colorText : theme.colors.textvalue};
  font-weight:${({ fontWeight }) => fontWeight ? "bold" : "normal"};
`;

export const TextLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.realWhites};
  font-weight: normal;
`;

export const TextLabelSubtitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grayDarker};
  font-weight: bold;
`;

export const ContainerFinance = styled.View`
	flex: 1;
`;

export const ContainerResume = styled.View`
	border-bottom-width: 0.3;
	border-color:  ${({ theme }) => theme.colors.bordercolor};
	min-height: 80px;
  justify-content: center;
  padding: 15px;
`;

export const ContainerItemResume = styled.View`
  flex-direction: row;
  justify-content: space-between;
  min-height: 24px;
  margin-bottom: 3px;
`;

export const ContainerIconReleases = styled.View`
	margin-right: 7px;
	align-items: center;
	justify-content: center;
`;


export const ContainerItensFinance = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  border-bottom-width: 0.3;
  border-color: ${({ theme }) => theme.colors.bordercolor};
  padding: 15px;
`;


export const ContainerIconDescription = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;


export const ContainerValues = styled.View`
	align-items: center;
  justify-content: center;
`;
export const ContainerLabel = styled.View`
	align-items: center;
	justify-content: center; 
`;


export const FinanceList = styled.FlatList`
`;



