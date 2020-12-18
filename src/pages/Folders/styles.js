import styled from 'styled-components';
import { fonts, colors } from 'assets/styles';

const Scene = styled.ScrollView`
  flex: 1;
  background-color: ${colors.white};
`;

const Card = styled.TouchableOpacity`
  margin: 12px;
  background-color: ${colors.white};
  border-radius: 4px;
  border-width: 1px;
  border-color: ${colors.grayLighter};
`;

const CardInfos = styled.View`
  padding: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CardCounter = styled.Text`
  color: ${colors.advise};
  font-size: ${fonts.larger};
  font-family: ${fonts.circularStdBlack};
`;

const CardContainer = styled.View`
  padding: 0 12px;
  flex: 1;
`;

const CardDescription = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdMedium};
  line-height: ${fonts.bigger};
`;

const CardSubtitle = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.grayLight};
  font-family: ${fonts.circularStdMedium};
  line-height: ${fonts.bigger};
`;

const Illustration = styled.Image`
  flex: 1;
  height: 40;
  background-color: #aaa;
`;

const Heading = styled.Text`
  line-height: ${fonts.bigger};
  font-size: ${fonts.regular};
  color: ${colors.grayDarker};
  padding: 0 24px;
  margin-bottom: 12px;
  font-family: ${fonts.circularStdMedium};
`;

const List = styled.FlatList`
  flex: 1;
`;

const ListItem = styled.TouchableOpacity`
  padding: 12px 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grayLighter};
`;

const ListItemText = styled.Text`
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdMedium};
  flex: 1;
  color: ${colors.grayLight};
`;

const ListItemCounterContainer = styled.View`
  margin-right: 8;
  padding: 2px 8px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.yellowLight};
`;

const ListItemCounterText = styled.Text`
  font-family: ${fonts.circularStdMedium};
`;

const SearchBar = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: ${colors.grayLighter};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grayLighter};
`;

const SearchInput = styled.TextInput`
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdMedium};
  padding: 12px 24px;
  flex: 1;
  color: ${colors.grayLight};
`;

const SearchButton = styled.TouchableOpacity`
  padding: 12px 24px;
  align-items: center;
`;

const HeaderContainer = styled.View``;

export {
  Scene,
  Card,
  CardInfos,
  CardCounter,
  CardContainer,
  CardDescription,
  CardSubtitle,
  Illustration,
  Heading,
  List,
  ListItem,
  ListItemText,
  ListItemCounterContainer,
  ListItemCounterText,
  SearchBar,
  SearchInput,
  SearchButton,
  HeaderContainer
}
