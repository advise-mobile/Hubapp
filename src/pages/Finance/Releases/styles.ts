import styled from 'styled-components/native';

interface ColorTextProps {
	colorText: string
}

interface WeightTextProps {
	fontWeight: boolean
}

export const TextValue = styled.Text<ColorTextProps>`
  font-size: 14px;
  color: ${({ colorText, theme }) => colorText ? colorText : theme.colors.textInactive};
`;

export const TextLabel = styled.Text<WeightTextProps>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grayDarker};
  font-weight: normal;
`;

export const TextLabelSubtitle = styled.Text<WeightTextProps>`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grayDarker};
  font-weight: bold;
`;



export const ContainerFinance = styled.View`
	flex: 1;
`;

export const ContainerResume = styled.View`
	border-bottom-width: 0.5;
	border-color:  ${({ theme }) => theme.colors.iconGray};
	min-height: 40px;
	padding: 5px;
`;

export const ContainerItemResume = styled.View`
  flex-direction: row;
  padding: 10px;
  justify-content: space-between;
  min-height: 24px;
`;

export const ContainerIconReleases = styled.View`
	margin-right: 7px;
	align-items: center;
	justify-content: center;
`;

export const ContainerLabel = styled.View`
	align-items: center;
	justify-content: center;
`;

export const ContainerItensFinance = styled.View`
  flex-direction: row;
  padding: 15px;
  justify-content: space-between;
  height: 55px;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.grayLighter};  
`;


export const ContainerIconDescription = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;


export const ContainerValues = styled.View`
	align-items: center;
	margin-left: 10px;
`;

