import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const DetailContent = styled(ScrollView).attrs({
	contentContainerStyle: {
		flexGrow: 1,
		paddingBottom: 24,
	},
})`
	flex: 1;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white};
`;

export const DetailBody = styled.View`
	padding: 16px 20px;
`;

export const TagsRow = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	margin-bottom: 16px;
`;

export const Tag = styled.View<{ background: string }>`
	background-color: ${({ background }) => background};
	border-radius: 22px;
	padding: 4px 10px;
	margin-right: 8px;
	margin-bottom: 8px;
`;

export const TagText = styled.Text`
	color: rgba(0, 0, 0, 0.8);
	font-family: ${fonts.circularStdBlack};
	font-size: ${fonts.smaller};
`;

export const ProcessNumber = styled.Text`
	font-size: ${fonts.regular};
	font-family: ${fonts.circularStdBold};
	color: ${({ theme }) => theme.colors.primary};
	font-weight: 700;
	margin-bottom: 16px;
`;

export const DetailDescription = styled.Text`
	font-size: ${fonts.small};
	font-family: ${fonts.circularStdBook};
	color: ${({ theme }) => theme.colors.grayDarker};
	line-height: 20px;
`;
