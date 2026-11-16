import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const Section = styled.View`
	margin-bottom: 20px;
`;

export const SectionTitle = styled.Text`
	font-family: ${fonts.circularStdBold};
	font-size: ${fonts.big}px;
	color: ${({ theme }) => theme.colors.primary};
	margin-bottom: 8px;
`;

export const RBRow = styled.View`
	flex-direction: row-reverse;
	flex: 1;
	justify-content: space-between;
	align-items: center;
	padding: 8px 0;
`;

export const PickerRow = styled.View`
	flex-direction: row;
	align-items: center;
	min-height: 36px;
`;

export const PickerField = styled.View`
	flex: 1;
`;
