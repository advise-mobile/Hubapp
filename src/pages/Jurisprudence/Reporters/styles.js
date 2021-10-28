import styled from 'styled-components/native';
import {fonts, colors} from 'assets/styles';

const Content = styled.View`
	margin: 0 -24px;
`;

const SearchContent = styled.View`
	flex-direction: row;
	border-bottom-width: 1px;
	border-bottom-color: ${colors.grayLighter};
`;

const Search = styled.TextInput`
	flex: 1;
	padding: 12px;
	color: ${props => (props.error ? colors.red : colors.grayLight)};
	font-size: ${fonts.small};
	font-family: ${fonts.circularStdMedium};
	height: 44px;
`;

const SearchButton = styled.TouchableOpacity`
	flex-direction: row;
	padding: 12px;
	align-items: center;
`;

const ReportersContainer = styled.View`
	height: 500px;
`;

const ReportersList = styled.FlatList`
	flex: 1;
`;

const Item = styled.TouchableOpacity`
	padding: 12px;
	border-bottom-width: 1px;
	border-bottom-color: ${colors.grayLighter};
`;

const ItemText = styled.Text`
	color: ${colors.fadedBlack};
	font-size: ${fonts.regular};
	font-family: ${fonts.circularStdMedium};
`;

export {
	Content,
	SearchContent,
	Search,
	SearchButton,
	ReportersContainer,
	ReportersList,
	Item,
	ItemText,
};
