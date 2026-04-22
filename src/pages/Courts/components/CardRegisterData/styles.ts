import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const Card = styled.View`
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 8px;
	border-width: 1px;
	border-color: ${({ theme }) => theme.colors.gray};
	padding: 16px 20px;
`;

export const Section = styled.View`
	margin-top: 14px;
`;

export const SectionFirst = styled.View`
	margin-top: 0;
`;

export const ResponsibleTitleRow = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 4px;
`;

export const ResponsibleTitle = styled.Text`
	font-family: ${fonts.circularStdBold};
	font-size: ${fonts.small}px;
	color: ${({ theme }) => theme.colors.textPrimary};
	flex: 1;
	margin-right: 12px;
`;

export const TitleLine = styled.Text`
	font-family: ${fonts.circularStdBold};
	font-size: ${fonts.small}px;
	color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ValueLine = styled.Text`
	font-family: ${fonts.circularStdBook};
	font-size: ${fonts.small}px;
	color: ${({ theme }) => theme.colors.darkGray};
	margin-top: 4px;
`;

export const ResponsibleValueLine = styled(ValueLine)`
	font-family: ${fonts.circularStdMedium};
	margin-top: 0;
`;

export const ActionsInline = styled.View`
	flex-direction: row;
	align-items: center;
	flex-shrink: 0;
`;

export const TrashButton = styled.TouchableOpacity`
	padding: 4px 0 4px 8px;
	justify-content: center;
	align-items: center;
`;

export const SituationValueLine = styled(ValueLine)`
	font-family: ${fonts.circularStdMedium};
`;
