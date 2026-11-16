import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const ActionsList = styled.View`
	margin: 0 -24px;
`;

export const ActionItem = styled.TouchableOpacity`
	flex-direction: row;
	padding: 12px 24px;
	align-items: center;
	border-bottom-width: 1px;
	border-bottom-color: ${({ theme }) => theme.colors.grayLighter};
`;

export const ActionItemText = styled.Text`
	font-family: ${fonts.circularStdBook};
	font-size: ${fonts.small}px;
	color: ${({ theme }) => theme.colors.fadedBlack};
	margin-left: 12px;
`;

export const ButtonsFooter = styled.View`
	align-self: stretch;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
