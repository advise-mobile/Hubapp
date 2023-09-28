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

export const ContentDescription = styled.View`
  margin: 0 -24px;
	justify-content: center;
	height: 60px;
	width: 414px;
`;

export const Content = styled.View`
  margin: 0 -24px;
	justify-content: center;
	border: ${({ theme }) => theme.colors.grayLighter};
	height: 60px;
	width: 414px;
`;

export const ContentCategory = styled.View`
  margin: 0 -24px;
	border: ${({ theme }) => theme.colors.grayLighter};
	height: 116px;
	width: 414px;
`;

export const ContentRepeat = styled.View`
  margin: 0 -24px;
	height: 116px;
	width: 414px;
	border: ${({ theme }) => theme.colors.grayLighter};
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
  color: ${({ theme }) => theme.colors.realWhites};
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
	width: 335px;
	height: 55px;
	flex-direction: row;
	flex-wrap: wrap;
	margin-left: 25px;
	margin-top: 5px;
	align-items: center;
`;

export const Items = styled.TouchableOpacity`
	border-radius: 10px;
	width: 87px;
	height: 20px;
	margin-right: 7px;
	margin-bottom: 7px;
	align-items: center;
	justify-content: center;
`;

export const LabelItems = styled.Text`
  color: ${({ theme }) => theme.colors.realWhites};
  font-size: ${fonts.smaller};
	font-family: ${fonts.circularStdBold};
`;

export const ContainerItemsPerson = styled.View`
	width: 355px;
	height: 55px;
	flex-direction: row;
	flex-wrap: wrap;
	margin-left: 25px;
	margin-top: 5px;
	align-items: center;
`;

export const ItemsPerson = styled.TouchableOpacity`
	border-radius: 10px;
	width: 80px;
	height: 20px;
	margin-right: 7px;
	margin-bottom: 7px;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.gray};
`;

export const ContainerItemsProcess = styled.View`
	width: 365px;
	height: 85px;
	flex-direction: row;
	flex-wrap: wrap;
	margin-left: 25px;
	margin-top: 5px;
	align-items: center;
`;

export const ContentProcess = styled.View`
  margin: 0 -24px;
	border: ${({ theme }) => theme.colors.grayLighter};
	height: 147px;
	width: 414px;
`;

export const ItemsProcess = styled.TouchableOpacity`
	border-radius: 10px;
	max-width: 300px;
	height: 20px;
	margin-right: 7px;
	margin-bottom: 7px;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.gray};
`;

export const LabelItemsProcess = styled.Text`
  color: ${({ theme }) => theme.colors.realWhites};
  font-size: ${fonts.smaller};
	font-family: ${fonts.circularStdBold};
	margin-left: 10px;
	margin-right: 10px;
`;

export const ContainerItemsRepeat = styled.View`
	width: 375px;
	height: 55px;
	flex-direction: row;
	flex-wrap: wrap;
	margin-left: 25px;
	margin-top: 5px;
	align-items: center;
`;

export const ContentDuring= styled.View`
  margin: 0 -24px;
	justify-content: center;
	height: 60px;
	width: 414px;
	border: ${({ theme }) => theme.colors.grayLighter};
`;

export const LabelDuring = styled.Text`
  margin-right: 12;
  color: ${({ theme }) => theme.colors.realWhites};
  font-size: ${fonts.regular};
	font-family: ${fonts.circularStdBold};
`;

export const LabelDuringInfo = styled.Text`
  margin-right: 12;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: ${fonts.regular};
`;

export const ContainerInfo = styled.View`
	width: 237px;
	height: 24px;
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
  color: ${({ theme }) => theme.colors.realWhites};
  font-size: ${fonts.regular};
	font-family: ${fonts.circularStdBold};
`;


export const InputDescription = styled.TextInput`
  color: ${({ theme }) => theme.colors.realWhites};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
	margin-left: 25px;
	width: 350px;
	height: 50px;
`;
