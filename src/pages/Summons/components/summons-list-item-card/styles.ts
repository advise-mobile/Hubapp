import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const CardTouchable = styled(TouchableOpacity)`
	width: 100%;
`;

export const Card = styled.View`
	padding: 16px 20px;
	background-color: ${({ theme }) => theme.colors.white};
`;

export const CardTitle = styled.Text`
	font-size: ${fonts.regular};
	font-family: ${fonts.circularStdBold};
	color: ${({ theme }) => theme.colors.primary};
	font-weight: 700;
	margin-bottom: 8px;
`;

export const CardDescription = styled.Text`
	font-size: ${fonts.small};
	font-family: ${fonts.circularStdBook};
	color: ${({ theme }) => theme.colors.grayDarker};
	line-height: 20px;
	margin-bottom: 12px;
`;

export const TagsRow = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
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
