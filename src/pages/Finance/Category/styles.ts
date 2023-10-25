import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

export const ContainerIcon = styled.View`
	height: 25px;
	width: 24px;
	margin-right: 8px;
`;

export const TextTitle = styled.Text`
	font-size: 16px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.BlackInactive};
`;

export const SubTitle = styled.Text`
	font-size: 16px;
	color: ${({ theme }) => theme.colors.BlackInactive};
	width: 290px;
`;

export const ContainerSubtitle = styled.View`
	width: 80px;
	height: 23px;
`;

export const Movement = styled.View`
  background-color:  ${({ theme }) => theme.colors.white};
  padding: 12px 17px;
  border-bottom-width: 1px;
	border-top-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grayLighter};
	border-top-color: ${({ theme }) => theme.colors.grayLighter};
`;

export const MovementHeader = styled.View`
  flex-wrap: nowrap;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

export const MovementHeading = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${props => props.read ? fonts.circularStdBook : fonts.circularStdBold};
  font-size: 16px;
	flex: 1;
	max-width: 70px;
	height: 25px;
`;





