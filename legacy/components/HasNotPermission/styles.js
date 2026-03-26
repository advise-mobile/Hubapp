import styled from 'styled-components';
import { fonts } from '@lassets/styles';

export const Content = styled.View`
	width: 100%;
	height: 80px;
	align-items: center;
	justify-content: center;
	flex: 1;
	padding: 15px 63px;
`;

export const Image = styled.Image`
	width: 160px;
	height: 160px;
	resize-mode: contain;
	margin-bottom: 24px;
`;

export const TextBody = styled.Text`
	font-size: 16px;
	line-height: 24px;
	font-family: ${fonts.circularStdBook};
	color: ${({ theme }) => theme.colors.fadedWhite};
	align-items: center;
	justify-content: center;
	align-self: center;
	text-align: center;
	color: ${({ theme }) => theme.colors.primary};
`;

export const TextTitle = styled.Text`
	font-size: 16px;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.grayDarker};
	font-family: ${fonts.circularStdBold};
	text-align: center;
	margin-bottom: 20px;
	color: ${({ theme }) => theme.colors.primary};
	font-weight: 700;
`;

export const Tag = styled.View`
	text-align: center;
	background: ${({ theme }) => theme.colors.grayLight};
	padding: 2px 10px;
	border-radius: 17px;
	margin-bottom: 20px;
`;

export const TagText = styled.Text`
	font-size: 16px;
	font-family: ${fonts.circularStdBold};
	text-align: center;
`;
