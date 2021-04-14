import styled from 'styled-components';
import { colors, fonts } from 'assets/styles';

const Tabs = styled.View`
  height: 54;
  margin-horizontal: 36px;
  background: ${colors.white};
  overflow: scroll;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Tab = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
`;

const TabText = styled.Text`
  font-family: ${(props) => (props.active ? fonts.circularStdBold : fonts.circularStdBook)};
  font-size: ${(props) => (props.active ? fonts.big + 2 : fonts.regular)};
  color: ${(props) => (props.active ? colors.primary : colors.inactive)};
`;

const UndelineTab = styled.View`
  position: absolute;
  width: 50;
  height: 2;
  left: 0;
  right: 0;
  background-color: ${colors.primary};
  bottom: 12;
  margin-horizontal: ${props => props.marginSize / 2};
`;

export { Tabs, Tab, TabButton, TabText, UndelineTab };
