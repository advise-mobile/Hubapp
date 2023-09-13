import styled from 'styled-components';

interface ColorTextProps {
	colorText: string
}

interface WeightTextProps {
	fontWeight: boolean
}

export const TextValue = styled.Text<ColorTextProps>`
  font-size: 19px;
  color: ${({ colorText, theme }) => colorText ? colorText : theme.colors.textInactive};
`;

export const TextLabel = styled.Text<WeightTextProps>`
  font-size: 19px;
  color: ${({ theme }) => theme.colors.grayDarker};
  font-weight: ${({ fontWeight }) => fontWeight ? 'bold':'normal'};
`;

export const ContainerFinance = styled.View`
	flex: 1;
`;


export const ContainerResume = styled.View`
	border-top-width: 0.5;
	border-bottom-width: 0.5;
	border-color: #ABABAB;
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
  
`;



export const ContainerIconDescription = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;



export const ContainerValues = styled.View`
	/* height: 28px; */
	align-items: center;
	margin-left: 10px;
	

`;

export const ContainerValuesDespesa = styled.View`
  	/* width: 135px; */
	height: 28px;
	align-items: center;
	margin-left: 3px;
`;



export const ContainerDataFinance = styled.View`
  /* width: 450px; */
  /* margin-right: 20px; */
  /* padding: 15px;
  height: 105px; */

  /* border: 1px solid #3F51E7; */
`;





//lancamentos


export const ContainerIcon = styled.View`
	height: 18px;
	margin-right: 15px;
	margin-left: 1px;
`;

export const ContainerLabelFinance = styled.View`
	height: 45px;
	width: 100%;
  flex-direction: row;
	align-items: center ;
`;