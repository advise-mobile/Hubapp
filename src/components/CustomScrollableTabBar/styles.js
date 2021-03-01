import styled from 'styled-components';
import { colors, fonts } from 'assets/styles';

const TabsContainer = styled.View`
  height: 50;
  border-bottom-Width: 1;
  border-bottom-color: ${colors.grayLighter};
`;

const Tabs = styled.View`
  height: 49;
  padding-bottom: 12px;
  background: ${colors.white};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Tab = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`;

const TabButton = styled.TouchableOpacity``;

const TabText = styled.Text`
  font-family: ${fonts.circularStdMedium};
  font-size: ${(props) => (props.active ? fonts.big + 2 : fonts.regular)};
  color: ${(props) => (props.active ? colors.primary : colors.inactive)};
`;

const UndelineTab = styled.View`
  position: absolute;
  max-width: 40;
  height: 2;
  left: 0;
  right: 0;
  background-color: ${colors.primary};
  bottom: 15;
`;

export { TabsContainer, Tabs, Tab, TabButton, TabText, UndelineTab };
