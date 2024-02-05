import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

interface ColorsItemProps {
	backgroundColor: string;
	borderWidth: string;
	borderColor: string;
  isError: boolean;
  isSelected:boolean;
}


export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Cancel = styled.TouchableOpacity`
  flex: 1;
  padding: 7px;
  margin-right: 12px;
  background: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const ToSave = styled.TouchableOpacity`
  flex: 1;
  padding: 7px;
  margin-right: 12px;
  background: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const CancelText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

export const ToSaveText = styled.Text`
  color: ${({ theme }) => theme.colors.realWhite};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

export const ContentName = styled.View<IsErrorProps>`
  margin: 0 -24px;
	justify-content: center;
	height: 60px;
	width: 414px;
	border-bottom-width: 1px;
	border-bottom-color: ${({ isError, theme }) => (isError ? theme.colors.red200 : theme.colors.grayLighter)};
`;

export const ContentType = styled.View`
  margin: 0 -24px;
	justify-content: center;
	height: 48px;
	width: 414px;
`;

export const Color = styled.View`
  margin: 0 -24px;
	justify-content: center;
	height: 48px;
	width: 414px;
`;

export const ContentColor = styled.View`
  margin: 0 -24px;
	justify-content: center;
	height: 48px;
	width: 414px;
`;

export const Content = styled.TouchableOpacity`
  margin: 0 -24px;
	justify-content: center;
	height: 48px;
	width: 414px;
	align-items: center;
`;

export const RBRow = styled.View`
  flex-direction: row-reverse;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px;
`;

export const Row = styled.View`
  padding: 12px 24px;
	width: 412px;
	justify-content: space-between;
	flex-direction: row;

`;

export const Label = styled.Text`
  margin-right: 12;
  color: ${({ theme }) => theme.colors.BlackInactive};
  font-size: ${fonts.regular};
	font-family: ${fonts.circularStdBold};
`;

export const LabelType = styled.Text`
  margin-right: 12;
  color: ${({ theme }) => theme.colors.BlackInactive};
  font-size: ${fonts.regular};
	width: 336px;
	height: 24px;
`;

export const Input = styled.TextInput`
  flex: 1;
  color: ${props => props.error ? props.theme.colors.red : props.theme.colors.grayLight};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
  height: 20px;
  padding: 0;
`;

export const ContainerIcon = styled.View`
	width: 18px;
	height: 18px;
`;

export const ContainerColor = styled.View`
	width: 346px;
	height: 20px;
	margin-left: 25px;
	flex-direction: row;
`;

export const ColorsItem = styled.TouchableOpacity<ColorsItemProps>`
  width: 51px;
  height: 20px;
  border-radius: 17px;
  background-color: ${({ backgroundColor,isError, theme }) => isError ? theme.colors.red200 : backgroundColor};
  margin-right: 7px;
  border-width: 5px;
  border-color: ${({ isError,isSelected, theme }) => isSelected ? 'transparent' : (isError ? theme.colors.red200 : theme.colors.colorSelect)};
`;


