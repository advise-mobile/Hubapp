import styled from 'styled-components';

interface ColorTextProps {
	colorText: string
}

export const TextValue = styled.Text<ColorTextProps>`
  font-size: 19px;
  color: ${({ colorText, theme }) => colorText ? colorText : theme.colors.textInactive};
  /* border: black; */
  height: 23px;
	margin-right: 10px;
	`;

export const TextValueDespesa = styled.Text<ColorTextProps>`
font-size: 19px;
color: ${({ colorText, theme }) => colorText ? colorText : theme.colors.textInactive};
/* border: black; */
height: 23px;
margin-right: 10px;
`;

export const ContainerD = styled.View`
	/* border:purple ; */
	border-top-width: 0.5;
	border-bottom-width: 0.5;
	border-color: #ABABAB;


`;


export const ContainerFinance = styled.View`
	flex: 1;
	padding-right: 8px;
	padding-left: 8px;
  /* border: red; */
  width: 100%;
`;

export const ContainerItensFinance = styled.View`
  width: 400px;
  flex: 1;
  margin-right: 100px;
  justify-content: space-between;
  flex-direction: row;
	/* border: black; */
	padding-top: 20px;
  /* border-bottom-color: #ABABAB;
  border-top-color: #ABABAB;
  border-bottom-width: 1px; */
  align-items: center;
	/* border: yellow; */
	padding-right: 8px;
	padding-left: 8px;

`;

export const ContainerDataFinanceTitle = styled.View`
  width: 450px;
  margin-right: 20px;
  padding: 15px;
  height: 55px;
	/* border: blue; */
	padding-right: 8px;
	padding-left: 8px;
`;

export const ContainerDataFinance = styled.View`
  width: 450px;
  margin-right: 20px;
  padding: 15px;
  height: 105px;
	padding-right: 8px;
	padding-left: 8px;
	/* border: blue; */
`;

export const TextLabel = styled.Text`
  font-size: 19px;
  color: ${({ theme }) => theme.colors.grayDarker};
  /* padding-top: 20px; */
  height: 30px;
  /* border: black; */
	margin-right: 60px;
	flex: 1;
`;


// export const Container = Styled.View<ContainerProps>`
//     align-items:center;
//     justify-content:center;
//     height:80px;
//     width: 80px;
//     background-color    ${({ isActive, theme }) => isActive ?  theme.colors.one : theme.colors.two  }
// `;



export const ContainerIconFinance = styled.View`
  /* border: red; */


`;


export const ContainerValues = styled.View`
  width: 130px;
	height: 28px;
	align-items: center;

	/* border: purple; */
`;

export const ContainerValuesDespesa = styled.View`
  width: 135px;
	height: 28px;
	align-items: center;
	/* border: purple; */
`;

export const ContainerLabel = styled.View`
  width: 230px;
	height: 27px;
	padding-right: 8px;
	padding-left: 8px;

	justify-content: space-between;
	/* border: purple */
`;

export const ContainerHelp = styled.View`
	flex: 1;

`;

export const ContainerLabelFinance = styled.View`
	height: 45px;
	width: 100%;
  justify-content: space-between;
  flex-direction: row;
	/* border: black; */
	align-items: center ;

`;


//lancamentos

export const ContainerDataReleases = styled.View`
	width: 424px;
  padding: 15px;
	padding-right: 30px;
	padding-left: 6px;
  height: 175px;
	/* border: green; */
`;

export const ContainerTitleReleases = styled.View`

	height: 45px;
	width: 100%;
	padding-right: 8px;
	padding-left: 8px;

  justify-content: space-between;
  flex-direction: row;

	/* border: yellow; */
`;

export const TextDateReleases = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.grayDarker};
  /* padding-top: 20px; */
  height: 30px;
  /* border: black; */
	margin-right: 60px;
	flex: 1;
	font-weight: bold;
	margin-top: 10px;
`;



export const ContainerLabelReleases = styled.View`
  width: 230px;
	height: 30px;
	padding-right: 8px;
	padding-left: 8px;

	flex-direction: row;
	justify-content: space-between;

	/* border: purple; */
	align-items: center;


`;

export const ContainerIconReleases = styled.View`
  /* border: red; */
	height: 18px;
	margin-right: 5px;

`;

export const ContainerTextReleases = styled.View`
	height: 60px;
	/* border: red; */
	flex-wrap: wrap;
	flex-direction:row ;
	margin-left: 07px;
	width:100% ;
`;

export const TextReleases = styled.Text`
		font-size: 17px;
  	color: ${({ colorText, theme }) => colorText ? colorText : theme.colors.inactive};
		lineHeight: 26;
		/* border: red; */

`;

export const IconContainerReleases = styled.View`
	width: 24px;
	height: 24px;
	margin-right: 10px;

`;

export const SubTitleContainer = styled.View`
	/* border: green; */
	height: 20px;
	width: 100%;
  flex-direction: row;
	margin-top: 10px;
	align-items: center;
	padding-right: 8px;
	padding-left: 8px;

`;

export const PriceSubTitleContainer = styled.View`
	width: 100px;
	height: 20px;
	align-items: center;
	margin-top: 15px;
	padding-right: 8px;
	padding-left: 8px;
`;

export const PriceSubTitleText = styled.Text`
	width: 100px;
	height: 20px;
	font-size: 14px;
	font-weight: bold;

	`;


export const SubtitleCategoryContainer = styled.View`
	width: 80px;
	height: 20px;
	align-items: center;
	margin-top: 15px;
	border-radius: 17px;
	background-color: #C5E1A5;
	margin-left: 4px;
	padding-right: 8px;
	padding-left: 8px;

`;

export const SubtitleCategoryText = styled.Text`
	width: 100px;
	height: 20px;
	font-size: 14px;
	font-weight: bold;
	align-items: center;
	text-align: center ;

`;

export const SubtitleDateContainer = styled.View`
	margin-right: 10px;
	flex: 1;
	height: 20px;
	margin-left: 10px;
	text-align: center ;
	margin-top: 15px;
	border-radius: 17px;
	background-color: ${({ theme }) => theme.colors.colorBackGround};

`;

export const SubtitleDateText = styled.Text`
	width: 200px;
	height: 30px;
	font-size: 14px;
	font-weight: bold;
	margin-left: 10px;


`;

export const LegendDateColorContainer = styled.View`
	width: 100px;
	height: 20px;
	align-items: center;
	margin-top: 15px;
	border-radius: 17px;
	margin-left: 4px;
	background-color: ${({ theme }) => theme.colors.yellowLight};
	padding-right: 8px;
	padding-left: 8px;
`;
