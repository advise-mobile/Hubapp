import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const Content = styled.View`
	flex: 1;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white};
`;

export const DisclaimerContainer = styled.View`
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 8px;
	border-bottom-width: 0.3px;
	border-bottom-color: ${({ theme }) => theme.colors.primary};
	padding: 24px 20px 20px;
`;

export const DisclaimerText = styled.Text`
	font-size: ${fonts.smaller};
	font-family: ${fonts.circularStdBook};
	color: ${({ theme }) => theme.colors.grayLight};
	text-align: center;
	line-height: 18px;
`;

export const EmptyState = styled.View`
	flex: 1;
	width: 100%;
	justify-content: center;
	align-items: center;
	padding: 16px 24px;
`;

export const ImageNotFoundWrap = styled.View`
	width: 100%;
	align-items: center;
	margin-bottom: 32px;
`;

export const ImageNotFound = styled.Image.attrs({
	resizeMode: 'contain',
})`
	width: 160px;
	height: 160px;
	align-self: center;
	justify-content: center;
`;

export const EmptyStateMessage = styled.Text`
	max-width: 332px;
	font-size: ${fonts.regular};
	font-family: ${fonts.circularStdBold};
	color: ${({ theme }) => theme.colors.primary};
	text-align: center;
	line-height: 22px;
	margin-bottom: 32px;
	font-weight: 700;
`;

export const ListPlaceholderText = styled.Text`
	padding: 24px;
	font-size: ${fonts.regular};
	font-family: ${fonts.circularStdBook};
	color: ${({ theme }) => theme.colors.primary};
	text-align: center;
`;
