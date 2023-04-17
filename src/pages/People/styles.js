import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Warp = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const ListItem = styled.TouchableHighlight`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 12px 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.white};
`;

const ListContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ListInfos = styled.View`
  margin-left: 12px;
`;

const ContactHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 24px;
`;

const ContactName = styled.Text`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.regular};
`;

const ContactText = styled.Text`
  margin: 4px 0;
  line-height: 16px;
  font-family: ${fonts.circularStdBook};
  font-size: ${fonts.small};
`;

const ContactActions = styled.TouchableOpacity`
  padding: 4px;
`;

const Badges = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 280;
`;

const Badge = styled.View`
  padding: 2px 8px;
  border-radius: 17px;
  background-color: ${(props) =>
    props.ativo ? props.theme.colors.greenLight : props.theme.colors.gray};
  margin-top: 8px;
  margin-right: 8px;
`;

const BadgeText = styled.Text`
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

const Markers = styled.FlatList`
  padding: 12px 12px 12px 24px;
  background: ${({ theme }) => theme.colors.white};
  overflow: scroll;
`;

const MarkersButton = styled.TouchableOpacity`
  align-items: center;
  margin-right: 24;
`;

const MarkersText = styled.Text`
  font-family: ${fonts.circularStdBook};
  font-size: ${(props) => (props.active ? fonts.big + 2 : fonts.regular)};
  color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.inactive)};
`;

const MarkersActive = styled.View`
  width: ${(props) => (props.active ? 40 : 20)};
  height: 2px;
  margin-top: 4px;
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.inactive};
`;

export {
  Container,
  Warp,
  ListItem,
  ListContainer,
  ListInfos,
  ContactHeader,
  ContactName,
  ContactActions,
  ContactText,
  Badges,
  Badge,
  BadgeText,
  Markers,
  MarkersText,
  MarkersButton,
  MarkersActive,
};
