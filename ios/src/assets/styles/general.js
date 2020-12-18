import { Platform } from 'react-native';

import styled from 'styled-components';
import { metrics, fonts, colors } from './index';

const Container = styled.SafeAreaView`
  background-color: ${colors.gray};
  flex: 1;
`;

const Warp = styled.View`
  flex: 1;
`;

const Header = styled.View`
  align-items: center;
  background-color: ${colors.white};
  border-bottom-width: 0.5px;
  border-bottom-color: ${colors.iconGray};
  flex-direction: row;
  height: 80;
  justify-content: space-between;
  padding-horizontal: 20;
`;

const HeaderEmpty = styled.TouchableOpacity`
  align-items: flex-start;
`;

const HeaderAction = styled.TouchableOpacity`
  align-items: flex-end;
`;

const HeaderActions = styled.View`
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
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
  font-family: ${fonts.circularStdBook};
  font-size: ${fonts.big + 4};
`;

const HeaderSubtitle = styled(HeaderTitle)`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.big};
`;

const HeaderButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.background ? props.background : colors.secondary};
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

export {
  Container,
  Warp,
  Header,
  HeaderEmpty,
  HeaderAction,
  HeaderActions,
  HeaderActionsLink,
  HeaderTitle,
  HeaderSubtitle,
  HeaderButton,
  HeaderButtonText,
  Content,
  Message,
  MessageTitle,
  MessageSubtitle,
  MessageLink,
  MessageLinkText,
};
