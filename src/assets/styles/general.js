import { Platform } from 'react-native';

import styled from 'styled-components';
import { metrics, fonts, colors } from './index';

const Container = styled.SafeAreaView`
  background-color: ${colors.white};
  flex: 1;
`;

const Warp = styled.View`
  flex: 1;
`;

const HeaderContainer = styled.View`
  align-items: flex-start;
  background-color: ${colors.white};
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 12;
`;

const HeaderEmpty = styled.TouchableOpacity`
  align-items: flex-start;
`;

const HeaderAction = styled.TouchableOpacity`;
  margin-top: 6px;
  margin-horizontal: 8px;
`;

const HeaderActionsLeft = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  width: 65px;
  height: 20;
`;

const HeaderActionsRight = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  width: 65px;
`;

const HeaderActionsLink = styled.TouchableOpacity`
  padding-bottom: ${Platform.OS === 'ios' ? 28 : 37};
  padding-left: 20;
  padding-top: ${Platform.OS === 'ios' ? 28 : 37};
  position: relative;
`;

const HeaderTitle = styled.Text`
  align-items: center;
  text-align: center;
  color: ${colors.primary};
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.bigger};
  text-transform: capitalize;
  flex: 1;
`;

const HeaderSubtitle = styled(HeaderTitle)`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.big};
`;

const HeaderButton = styled.TouchableOpacity`
  background-color: ${(props) => props.background ? props.background : colors.darkGray};
  border-radius: ${metrics.baseRadius};
  padding-horizontal: 15;
  padding-vertical: 7;
`;

const HeaderButtonText = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.smaller};
  text-align: center;
`;

const Blank = styled.View`
  padding-bottom: ${Platform.OS === 'ios' ? 28 : 37};
  padding-left: 20;
  padding-top: ${Platform.OS === 'ios' ? 28 : 37};
  position: relative;
  margin: 0 8px;
`;

const Content = styled.View`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 80)};
  margin-horizontal: 8;
  margin-vertical: 8;
`;

const Message = styled.View`
  align-items: center;
  margin-vertical: 130;
`;

const MessageTitle = styled.Text`
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.big};
`;

const MessageSubtitle = styled.Text`
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdMedium};
  font-size: ${fonts.regular};
  line-height: 20px;
  margin-top: 5px;
  padding: 15px;
  text-align: center;
`;

const MessageLink = styled.TouchableOpacity`
  margin-top: 15px;
`;

const MessageLinkText = styled.Text`
  color: ${(props) => props.color};
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.big};
`;

const Tabs = styled.View`
  padding: 0 12px 12px 24px;
  background: ${colors.white};
  overflow: scroll;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom-color: ${colors.grayLighter};
  border-bottom-width: 1px;
`;

const TabsButton = styled.TouchableOpacity`
  align-items: center;
  margin-right: 24;
`;

const TabsText = styled.Text`
  font-family: ${fonts.circularStdBook};
  font-size: ${(props) => (props.active ? fonts.big + 2 : fonts.regular)};
  color: ${(props) => (props.active ? colors.primary : colors.inactive)};
`;

const TabsActive = styled.View`
  width: ${(props) => (props.active ? 40 : 20)};
  height: 2px;
  margin-top: 4px;
  background-color: ${(props) => props.active ? colors.primary : colors.inactive};
`;

const Actions = styled.View`
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  align-items: center;
  flex-direction: row;
  padding-horizontal: 8px;
  border-bottom-width: 1px;
  background: ${colors.white};
  border-bottom-color: ${colors.grayLighter};
`;

const ActionButton = styled.TouchableOpacity`
  padding: 12px;
  background: ${colors.white}
`;

export {
  Container,
  Warp,
  HeaderContainer,
  HeaderEmpty,
  HeaderAction,
  HeaderActionsLeft,
  HeaderActionsRight,
  HeaderActionsLink,
  HeaderTitle,
  HeaderSubtitle,
  HeaderButton,
  HeaderButtonText,
  Blank,
  Content,
  Message,
  MessageTitle,
  MessageSubtitle,
  MessageLink,
  MessageLinkText,
  Tabs,
  TabsButton,
  TabsText,
  TabsActive,
  Actions,
  ActionButton,
};
