import styled from 'styled-components/native';

interface WeightTextProps {
	fontWeight: boolean
}

export const ContainerReleases = styled.TouchableOpacity`
  min-height: 110px;
	flex: 1;
  border-bottom-width: 0.3;
  border-color: ${({ theme }) => theme.colors.bordercolor};
`;

export const ContainerItemReleases = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding: 10px;
`;


export const ContainerIconDescriptionReleases =styled.View`
	justify-content: center;
  	align-items: center;
  	flex-direction: row;
`;

export const ContainerIcon = styled.View`
	margin-right: 7px;
	margin-left: 3px;
	align-items: center;
	justify-content: center;
`;

export const ContainerIconThumbs = styled.View`
	margin-right: 7px;
	align-items: center;
	justify-content: center;
`;

export const ContainerDescriptionReleases = styled.View`
margin-bottom: 5px    ;
`;

export const TextLabelDescriptionReleases = styled.Text<WeightTextProps>`
	font-size: 14px;
	color: ${({ theme }) => theme.colors.grayDarker};
	font-weight: ${({ fontWeight }) => fontWeight ? 'bold':'normal'};
	line-height: 24;
`;

export const ContainerLabel = styled.View`
	align-items: center;
	justify-content: center;
`;


export const ContainerValueReleases =styled.View`
  flex-direction: row;
	height: 30px;
	align-items: center;

`;

export const TextValueReleases = styled.Text<WeightTextProps>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grayDarker};
  font-weight: ${({ fontWeight }) => fontWeight ? 'bold':'normal'};
`;

export const ContainerCategoryReleases = styled.View`
	border-radius: 17px;
	max-width: 100px;
	margin-left: 5px;
	align-items: center;
	justify-content: center;
	padding: 4px;
	background-color: ${({ theme }) => theme.colors.green};
`;

export const TextLabelCategory = styled.Text<WeightTextProps>`
  font-size: 12px;
	margin-left: 2px;
	margin-right: 2px;
	color: ${({ theme }) => theme.colors.Darkesgray};
	font-weight: ${({ fontWeight }) => fontWeight ? 'bold':'normal'};
`;

export const ContainerDownloadedReleases = styled.View`
	border-radius: 17px;
	margin-left: 5px;
	align-items: center;
	justify-content: center;
	padding: 4px;
	background-color: ${({ theme }) => theme.colors.colorBackGround};
`;

export const TextLabel = styled.Text<WeightTextProps>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grayDarker};
  font-weight: bold;
`;

export const Content = styled.View`
	justify-content: space-between;
	margin: 0px 25px 10px 30px;
`;
