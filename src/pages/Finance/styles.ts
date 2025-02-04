import styled from 'styled-components';
import { fonts } from 'assets/styles';



const Badge = styled.View`
  border-radius: 22;
  padding: 2px 8px;
  margin-right: 10;
  text-align: center;
  align-self: flex-start;
  margin-top: 12px;
  background-color: ${props => {
    switch (props.type) {
      case -1: return '#ffab91'; //term
      case -2: return '#ffe082'; //meeting
      case -3: return '#fff59d'; //task
      case -4: return '#ce93d8'; //audience
      case -5: return '#b0bec5'; //others
      case -6: return '#E6EE9C'; //diligence
      case -7: return '#F48FB1'; //reminders

      default: return props.theme.colors.red; //others
    }
  }}
`;

const BadgeText = styled.Text`
  color: ${props => props.expired ? '#fff' : 'rgba(0, 0, 0, .8)'};
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.smaller};
`;

const ReadButton = styled.TouchableOpacity`
  width: 18px;
  height: 18px;
  border-radius: 18px;
  border-width: ${props => props.concluded ? 6 : 1};
  border-color: ${({ theme }) => theme.colors.primary};
  margin-top: 8px;
  margin-right: 8px;
`;

const Filters = styled.FlatList`
  padding: 12px 28px;
  background: ${({ theme }) => theme.colors.white};
  overflow: scroll;
  max-height: 54px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grayLighter};
`;

const FiltersButton = styled.TouchableOpacity`
  align-items: center;
  padding-right: 24;
`;

const FiltersText = styled.Text`
  font-family: ${(props) => (props.active ? fonts.circularStdBold : fonts.circularStdBook)};
  font-size: ${(props) => (props.active ? fonts.big + 2 : fonts.regular)};
  color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.inactive)};
`;

const FiltersActive = styled.View`
  width: ${(props) => (props.active ? 40 : 20)};
  height: 2px;
  margin-top: 4px;
  background-color: ${(props) => props.active ? props.theme.colors.primary : props.theme.colors.grayLight};
`;

const Agenda = styled.View`
  flex: 1;
`;

const ListItem = styled.TouchableHighlight`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 12px 24px 16px 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grayLighter};
`;

const ListGrid = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const ListContainer = styled.View`
  flex: 1;
`;

const ListTitle = styled.Text`
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
  color: ${props => props.expired ? props.theme.colors.red : props.theme.colors.grayDarker};
`;
const ListSchedule = styled.Text`
  color: ${props => props.expired ? props.theme.colors.red : props.theme.colors.grayDarker};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBold};
  flex: 1;
`;

const ListHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ListAction = styled.TouchableOpacity`
  padding: 4px;
  margin-left: 16px;
`;

const NotFound = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  
`;

const Image = styled.Image`
  width: 170px;
  height: 170px;
  resize-mode: contain;
  margin-bottom: 12px;
`;

const NotFoundText = styled.Text`
  font-size: ${fonts.big};
  color: ${({ theme }) => theme.colors.grayDarker};
  font-family: ${fonts.circularStdBold};
  margin-bottom: 8px;
`;

const NotFoundDescription = styled.Text`
  color: ${({ theme }) => theme.colors.grayLight};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
`;

const CreateNew = styled.TouchableOpacity`
  width: 350px;
  padding: 8px 0;
  margin-top: 24px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const CreateNewText = styled.Text`
  font-family: ${fonts.circularStdBold};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${fonts.small};
  text-align: center;
`;

const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ImportantFlag = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.white};
  position: absolute;
  bottom: 0;
  right: 0;
  padding-top: 12px;
  padding-left: 12px;
`;

export {
  Badge,
  BadgeText,
  Filters,
  FiltersButton,
  FiltersText,
  FiltersActive,
  Agenda,
  ListItem,
  ListGrid,
  ListContainer,
  ListTitle,
  ListSchedule,
  ListHeader,
  ListAction,
  ReadButton,
  NotFound,
  Image,
  NotFoundText,
  NotFoundDescription,
  CreateNew,
  CreateNewText,
  Content,
  ImportantFlag,
}
