import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const Wrapper = styled.View`
	background-color: ${({ theme }) => theme.colors.white};
	border-top-width: 1px;
	border-bottom-width: 1px;
	border-color: ${({ theme }) => theme.colors.gray};
	padding: 16px 20px 16px;
	margin-top: 16px;
`;

export const Title = styled.Text`
	font-family: ${fonts.circularStdBold};
	font-size: ${fonts.big}px;
	color: ${({ theme }) => theme.colors.textPrimary};
	margin-bottom: 10px;
`;

export const Row = styled.View`
	flex-direction: row;
	align-items: center;
	margin-top: 8px;
	padding-right: 128px;
`;

export const RowLabel = styled.Text`
	flex: 1;
	font-family: ${fonts.circularStdBook};
	font-size: ${fonts.small}px;
	color: ${({ theme }) => theme.colors.textPrimary};
`;

export const RowValue = styled.Text`
	font-family: ${fonts.circularStdBook};
	font-size: ${fonts.small}px;
	color: ${({ theme }) => theme.colors.darkGray};
	text-align: right;
	min-width: 96px;
`;

export const RowValueLoading = styled.View`
	min-width: 96px;
	align-items: flex-end;
	justify-content: center;
`;
