import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const BUTTON_MIN_WIDTH = 171;
export const BUTTON_HEIGHT = 40;
export const BUTTON_RADIUS = 4;

export const Root = styled.TouchableOpacity<{
	$variant: 'filled' | 'outlined';
	$fill?: boolean;
	$disabled?: boolean;
}>`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	min-width: ${BUTTON_MIN_WIDTH}px;
	height: ${BUTTON_HEIGHT}px;
	padding-horizontal: 16px;
	border-radius: ${BUTTON_RADIUS}px;
	flex: ${({ $fill }) => ($fill ? 1 : undefined)};
	opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
	background-color: ${({ theme, $variant }) =>
		$variant === 'filled' ? theme.colors.green200 : theme.colors.niceBackground};
	border-width: ${({ $variant }) => ($variant === 'outlined' ? 1 : 0)}px;
	border-color: ${({ theme, $variant }) =>
		$variant === 'outlined' ? theme.colors.primary : 'transparent'};
`;

export const Label = styled.Text<{ $variant: 'filled' | 'outlined' }>`
	font-family: ${fonts.circularStdBold};
	font-size: ${fonts.small}px;
	color: ${({ theme, $variant }) =>
		$variant === 'filled' ? '#FFFFFF' : theme.colors.primary};
`;
