import styled from 'styled-components';
import {fonts, colors} from 'assets/styles';

const Image = styled.Image`
	width: 170px;
	height: 170px;
	resize-mode: contain;
`;

const Content = styled.View`
	padding: 24px;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Title = styled.Text`
	margin-bottom: 8px;
	color: ${colors.grayDarker};
	font-size: ${fonts.big + 2};
	font-family: ${fonts.circularStdBold};
`;

const Subtitle = styled.Text`
	text-align: center;
	margin-bottom: 18px;
	color: ${colors.fadedBlack};
	font-size: ${fonts.regular};
	font-family: ${fonts.circularStdBook};
`;

const SearchBar = styled.View`
	margin-bottom: 16px;
	flex-direction: row;
	border-bottom-width: 1px;
	border-bottom-color: ${props => (props.error ? colors.red : colors.grayLighter)};
	background-color: ${props => (props.disabled ? colors.grayLighter : colors.white)};
`;

const SearchInput = styled.TextInput`
	height: 44px;
	font-size: ${fonts.small};
	font-family: ${fonts.circularStdMedium};
	padding: 8px;
	flex: 1;
	color: ${props => (props.error ? colors.red : colors.grayLight)};
`;

const SearchButton = styled.TouchableOpacity`
	padding: 12px;
	align-items: center;
	display: ${props => (props.show === true ? 'flex' : 'none')};
`;

const ActionButton = styled.TouchableOpacity`
	padding: 12px 24px;
	background: ${props => (props.loading ? colors.disabled : colors.primary)};
	border-radius: 4px;
`;

const ActionButtonText = styled.Text`
	font-family: ${fonts.circularStdBold};
	color: ${props => (props.loading ? colors.disabledText : colors.realWhite)};
	font-size: ${fonts.small};
`;

const ModalView = styled.View`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	align-items: center;
	justify-content: center;
`;

const ModalOverlay = styled.TouchableOpacity`
	flex: 1;
	background-color: rgba(45, 45, 45, 0.8);
	z-index: 10;
`;

const ModalContent = styled.View`
	max-width: 250px;
	margin: auto;
	background-color: #fff;
	border-radius: 4px;
	padding: 16px;
	align-items: center;
	elevation: 5;
	box-shadow: 5px 10px 5px rgba(0, 0, 0, 0.25);
`;

const ModalTitle = styled.Text`
	font-family: ${fonts.circularStdMedium};
	color: ${colors.darkGray};
	font-size: ${fonts.regular};
	text-align: center;
`;

const ModalButton = styled.TouchableOpacity`
	background-color: #2d2d2d;
	padding: 4px 16px;
	margin-top: 16px;
	margin-bottom: 8px;
	border-radius: 4px;
`;

const ModalTextButton = styled.Text`
	font-size: ${fonts.regular};
	font-family: ${fonts.circularStdMedium};
	color: #fff;
	line-height: 24px;
`;

const SearchOverlay = styled.TouchableOpacity`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	opacity: 0;
	elevation: 5;
	z-index: 5;
	display: ${props => (props.display ? 'flex' : 'none')};
`;

export {
	Content,
	Image,
	Title,
	Subtitle,
	SearchBar,
	SearchInput,
	SearchButton,
	ActionButton,
	ActionButtonText,
	ModalView,
	ModalOverlay,
	ModalContent,
	ModalTitle,
	ModalButton,
	ModalTextButton,
	SearchOverlay,
};
