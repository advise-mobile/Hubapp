import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

interface IsErrorProps {
	isError: boolean;
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

export const ContentEmail = styled.View`
  	margin: 0 -24px;
	justify-content: center;
	height: 60px;
	width: 414px;
	border-bottom-width: 0.3px;
	border-bottom-color: ${({ theme }) => ( theme.colors.grayLighter)};
`;

export const RowLabel = styled.View`
  	padding: 5px 24px;
	margin-top: 10px;
	width: 360px;
	flex-direction: row;
	align-items: center;
`;

export const Label = styled.Text`
  margin-right: 12;
  color: ${({ theme }) => theme.colors.BlackInactive};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBold};
`;

export const LabelInfo = styled.Text`
  color: ${({ theme }) => theme.colors.red200};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;


export const ContentComments = styled.View`
  margin: 0 -24px;
	height: 110px;
	width: 414px;
	border-bottom-width: 0.3px;
	border-top-width: 0.3px;
	border-color: ${({  theme }) => theme.colors.grayLighter};
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
