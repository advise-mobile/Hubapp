import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

const Container = styled.View`
	padding: 0 24px;
	background-color: ${({ theme }) => theme.colors.white};
`;

const Header = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 40px 24px 12px 24px;
`;

const Title = styled.Text`
	font-family: ${fonts.circularStdBold};
	text-align: center;
	font-size: ${fonts.big};
	color: ${({ theme }) => theme.colors.primary};
`;

const Footer = styled.View`
	background-color: ${({ theme }) => theme.colors.white};
	padding: 24px 0;
`;

const ClearFilters = styled.TouchableOpacity`
	position: absolute;
	bottom: 8px;
	right: 16px;
	height: 20;
	margin: auto;
`;

const ClearText = styled.Text`
	font-size: ${fonts.smaller};
	color:  ${({ theme }) => theme.colors.grayLight};
	font-family: ${fonts.circularStdBold};
`;

export {Container, Header, Title, Footer, ClearFilters, ClearText};
