import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

export const ContainerItems = styled.TouchableOpacity`
	width: 414px;
	height: 48px;
	border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.grayLighter};
	justify-content: center;
	padding: 20px;
`;

export const ContainerTextTitle = styled.View`
	width: 176px;
	height: 24px;
	flex-direction: row;
	align-items: center ;
`;

export const ContainerText = styled.View`
	width: 66px;
	height: 24px;
`;

export const ContainerIcon = styled.View`
	height: 25px;
	width: 24px;
	margin-right: 8px;
	border: blue;
`;

export const TextTitle = styled.Text`
	font-size: 16px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.BlackInactive};
`;

export const SubTitle = styled.Text`
	font-size: 16px;
	max-width: 170px;
	height: 24px;
	margin-left: 14px;
	color: ${({ theme }) => theme.colors.BlackInactive};
	margin-top: 2.5px;
`;

//
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
	border: red;
	flex-direction: row;
`;



