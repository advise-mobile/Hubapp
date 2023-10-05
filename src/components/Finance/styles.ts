import styled from 'styled-components';

interface WeightTextProps {
	fontWeight: boolean
}

export const ContainerReleases = styled.TouchableOpacity`
	min-height: 165px;
	border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.grayLighter};
`;

export const ContainerItemReleases = styled.View`
	flex-direction: row;
  padding: 10px;
  justify-content: space-between;
  min-height: 24px;
	padding: 13px;
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
	align-items: center;
	justify-content: center;
	height: 110px;

`;

export const TextLabelDescriptionReleases = styled.Text<WeightTextProps>`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.grayDarker};
  font-weight: ${({ fontWeight }) => fontWeight ? 'bold':'normal'};
	line-height: 30;
	width: 350px;
`;

export const ContainerValueReleases =styled.View`
	margin-left: 35px;
	padding-bottom: 10px;
  flex-direction: row;
	height: 30px;
	width: 370px;
	align-items: center;
`;

export const TextValueReleases = styled.Text<WeightTextProps>`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.grayDarker};
  font-weight: ${({ fontWeight }) => fontWeight ? 'bold':'normal'};
`;

export const ContainerCategoryReleases = styled.View`
	border-radius: 17px;
	max-width: 100px;
	margin-left: 5px;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.green};
`;

export const TextLabelCategory = styled.Text<WeightTextProps>`
  font-size: 14px;
	margin-left: 2px;
	margin-right: 2px;
  color: ${({ theme }) => theme.colors.Darkesgray};
  font-weight: ${({ fontWeight }) => fontWeight ? 'bold':'normal'};
`;

export const ContainerDownloadedReleases = styled.View`
	border-radius: 17px;
	margin-left: 5px;
	margin-left: 5px;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.colorBackGround};
`;
