import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const Root = styled.TouchableOpacity<{
	$backgroundColor: string;
	$iconPosition: 'start' | 'end';
}>`
	align-items: center;
	justify-content: center;
	padding: 10px 14px;
	border-radius: 8px;
	background-color: ${({ $backgroundColor }) => $backgroundColor};
	flex-direction: ${({ $iconPosition }) =>
		$iconPosition === 'start' ? 'row' : 'row-reverse'};
`;

export const Title = styled.Text<{ $titleColor: string }>`
	font-size: ${fonts.small};
	font-family: ${fonts.circularStdBold};
	color: ${({ $titleColor }) => $titleColor};
	margin-horizontal: 8px;
`;

export const IconWrap = styled.View`
	align-items: center;
	justify-content: center;
`;
