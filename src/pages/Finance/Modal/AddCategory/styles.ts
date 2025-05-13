import styled from 'styled-components/native';
import {fonts} from 'assets/styles';

interface ValidationProps {
	backgroundColor?: string;
	borderWidth?: string;
	borderColor?: string;
	isSelected?: boolean;
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
	background: ${({theme}) => theme.colors.white};
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	border-width: 1px;
	border-color: ${({theme}) => theme.colors.primary};
`;

export const Register = styled.TouchableOpacity`
	flex: 1;
	padding: 7px;
	margin-right: 12px;
	background: ${({theme}) => theme.colors.primary};
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	border-width: 1px;
	border-color: ${({theme}) => theme.colors.primary};
`;

export const CancelText = styled.Text`
	color: ${({theme}) => theme.colors.primary};
	font-size: ${fonts.small};
	font-family: ${fonts.circularStdBold};
`;

export const RegisterText = styled.Text`
	color: ${({theme}) => theme.colors.realWhite};
	font-size: ${fonts.small};
	font-family: ${fonts.circularStdBold};
`;

export const Row = styled.View`
	padding: 12px 0;
	width: 100%;
	justify-content: space-between;
	flex-direction: row;
	/* border: 1px solid red; */
`;

export const Label = styled.Text`
	margin-right: 12px;
	margin-bottom: 10px;
	color: ${({theme}) => theme.colors.BlackInactive};
	font-size: ${fonts.regular};
	font-family: ${fonts.circularStdBold};
`;

export const Input = styled.TextInput`
	flex: 1;
	color: ${props => (props.error ? props.theme.colors.red : props.theme.colors.grayLight)};
	font-size: ${fonts.regular};
	font-family: ${fonts.circularStdBook};
	height: 20px;
	padding: 0;
`;
//

export const ContentName = styled.View<ValidationProps>`
	justify-content: center;
	align-items: center;

	width: 100%;
	border-bottom-width: 0.5px;
	border-bottom-color: ${({isError, theme}) =>
		isError ? theme.colors.red200 : theme.colors.grayLighter};

	/* border: 1px solid red; */
`;

export const ContentType = styled.View`
	margin: 8px 0px 5px 0;
	justify-content: center;
	width: 100%;
	flex: 1;
`;

export const RBRow = styled.View`
	flex-direction: row-reverse;
	flex: 1;
	justify-content: space-between;
	align-items: center;
	padding: 8px 0px 8px 20px;
	/* border: 1px solid red; */
`;

export const ContentColor = styled.View`
	justify-content: center;
	width: 100%;
	flex: 1;
`;
export const ContentColorItem = styled.View`
	margin: 0 -3px;
	justify-content: center;
	height: 58px;
`;
export const ContainerColor = styled.View`
	height: 20px;
	flex-direction: row;
`;

export const ColorsItem = styled.TouchableOpacity<ValidationProps>`
	width: 51px;
	height: ${({isSelected}) => (isSelected ? 25 : 20)}px;
	border-radius: 17px;
	background-color: ${({backgroundColor, isError, theme}) =>
		isError ? theme.colors.red200 : backgroundColor};
	margin-right: 7px;
	border-width: 5px;
	border-color: ${({isError, theme}) => (isError ? theme.colors.red200 : theme.colors.colorSelect)};
`;

export const ToSave = styled.TouchableOpacity`
	flex: 1;
	padding: 7px;
	margin-right: 12px;
	background: ${({theme}) => theme.colors.primary};
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	border-width: 1px;
	border-color: ${({theme}) => theme.colors.primary};
`;

export const ToSaveText = styled.Text`
	color: ${({theme}) => theme.colors.realWhite};
	font-size: ${fonts.small};
	font-family: ${fonts.circularStdBold};
`;
