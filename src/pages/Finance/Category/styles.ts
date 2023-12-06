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
	width: 190px;
	margin-left: 10px;

`;

export const ContainerSubtitle = styled.View`
	width: 80px;
	height: 23px;
`;

export const Container = styled.View`
  background-color:  ${({ theme }) => theme.colors.white};
  padding: 12px 17px;
  border-bottom-width: 0.7px;
  border-bottom-color: ${({ theme }) => theme.colors.grayLighter};


`;

export const ContainerItems = styled.View`
  flex-wrap: nowrap;
  margin-top: 1px;
  flex-direction: row;
  align-items: center;
`;

export const ContainerTitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${props => props.read ? fonts.circularStdBook : fonts.circularStdBold};
  font-size: 16px;
	flex: 1;
	max-width: 165px;
	height: 25px;
`;
