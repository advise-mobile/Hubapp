import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

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

export const Register = styled.TouchableOpacity`
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

export const RegisterText = styled.Text`
  color: ${({ theme }) => theme.colors.realWhite};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

interface IsErrorProps {
	isError:boolean;
  }
  

export const ContentDescription = styled.View<IsErrorProps>`
  margin: 0 -24px;
	justify-content: center;
	height: 60px;
	width: 414px;
	border-bottom-width: 1px;
	border-bottom-color: ${({ isError,theme }) => (isError ? theme.colors.red200 : theme.colors.grayLighter) };
	
`;

export const Content = styled.View<IsErrorProps>`
  	margin: 0 -24px;
	justify-content: center;
	border-bottom-width: 1px;
	border-bottom-color: ${({ isError,theme }) => (isError ? theme.colors.red200 : theme.colors.grayLighter) };
	height: 60px;
	width: 414px;
`;

export const Category = styled.View`
	margin: 0 -24px;
	height: auto;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;

	border-top-width: 1px;
	border-top-color: ${({ theme }) => theme.colors.grayLighter};
`;

export const ContainerCategories = styled.View`
	width: 366px;
	height: auto;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
`;

export const ReleaseType = styled.TouchableOpacity`
	border-radius: 10px;
	max-width: 300px;
	height: 20px;
	margin-right: 7px;
	margin-bottom: 7px;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.gray};
`;



export const People = styled.View`
	margin: 0 -24px;
	border-top-width: 1px;
  	border-top-color: ${({ theme }) => theme.colors.grayLighter};
	height: auto;
	width: 414px;

`;

export const ContentRepeat = styled.View`
  	margin: 0 -24px;
	height: 116px;
	width: 414px;
	border-top-width: 1px;
  	border-top-color: ${({ theme }) => theme.colors.grayLighter};
`;

export const Row = styled.View`
  	padding: 12px 24px;
	width: 360px;
	justify-content: space-between;
	flex-direction: row;
`;

export const RowCategory = styled.View`
  padding: 5px 24px;
	margin-top: 10px;
	width: 360px;
`;

export const Label = styled.Text`
  margin-right: 12;
  color: ${({ theme }) => theme.colors.BlackInactive};
  font-size: ${fonts.regular};
	font-family: ${fonts.circularStdBold};
`;

export const Input = styled.TextInput`
  flex: 1;
  color: ${props => props.error ? props.theme.colors.red : props.theme.colors.grayLight};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
  height: 20px;
  padding: 0;
`;

export const ContainerItems = styled.View`
	width: auto;
	height: auto;
	flex-direction: row;
	flex-wrap: wrap;
	margin-left: 21px;
	margin-top: 5px;
	margin-bottom: 5px;
	align-items: center;
`;

export const Items = styled.TouchableOpacity`
	border-radius: 10px;
	max-width: 300px;
	height: 20px;
	margin-right: 7px;
	margin-bottom: 7px;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.gray};
`;

export const LabelItems = styled.Text`
  font-size: ${fonts.smaller};
	font-family: ${fonts.circularStdBold};
`;

export const ContainerItemsPerson = styled.View`
	width: 355px;
	height: auto;
	flex-direction: row;
	flex-wrap: wrap;
	margin-left: 21px;
	margin-top: 5px;
	margin-bottom: 5px;
	align-items: center;
`;



export const ItemsPerson = styled.TouchableOpacity`
	border-radius: 10px;
	max-width: 300px;
	height: 20px;
	margin-right: 3px;
	margin-left: 1px;
	margin-bottom: 9px;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.gray};
`;

export const ContainerItemsProcess = styled.View`
	width: auto;
	height: 85px;
	flex-direction: row;
	flex-wrap: wrap;
	margin-left: 21px;
	margin-top: 5px;
	align-items: center;
`;

export const Process = styled.View`
	margin: 0 -24px;
	border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grayLighter};
	height: 190px;
	width: 434px;
`;

export const ItemsProcess = styled.TouchableOpacity`
	border-radius: 10px;
	max-width: 300px;
	height: 20px;
	margin-right: 7px;
	margin-bottom: 7px;
	align-items: center;
	justify-content: center;

`;

export const LabelItemsProcess = styled.Text`
  font-size: ${fonts.smaller};
	font-family: ${fonts.circularStdBold};
	margin-left: 10px;
	margin-right: 10px;
`;

export const ContainerItemsRepeat = styled.View`
	width: auto;
	height: 55px;
	flex-direction: row;
	flex-wrap: wrap;
	margin-left: 21px;
	margin-top: 5px;
	align-items: center;
`;

export const ContentDuring = styled.View`
  margin: 0 -24px;
	justify-content: center;
	height: 60px;
	width: 414px;
	border-top-width: 1px;
	border-bottom-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grayLighter};
	border-bottom-color: ${({ theme }) => theme.colors.grayLighter};
`;

export const LabelDuring = styled.Text`
  margin-right: 12;
  color: ${({ theme }) => theme.colors.BlackInactive};
  font-size: ${fonts.regular};
	font-family: ${fonts.circularStdBold};
`;

export const ContainerInfo = styled.View`
	width: 237px;
	height: 24px;
	margin-left: 10px;
`;

export const LabelDuringInfo = styled.Text`
  margin-right: 12;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: ${fonts.regular};
`;

export const ContentComments = styled.View`
  margin: 0 -24px;
	height: 110px;
	width: 414px;
	border-bottom-width: 1px;
	border-bottom-color: ${({ theme }) => theme.colors.grayLighter};
`;

export const LabelComments = styled.Text`
  margin-right: 12;
  color: ${({ theme }) => theme.colors.BlackInactive};
  font-size: ${fonts.regular};
	font-family: ${fonts.circularStdBold};
`;


export const InputDescription = styled.TextInput`
  color: ${({ theme }) => theme.colors.BlackInactive};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
	margin-left: 25px;
	width: 350px;
	height: 50px;
`;
