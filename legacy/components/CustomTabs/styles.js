import styled from 'styled-components';
import { fonts } from '@lassets/styles';

const Tabs = styled.View`
  height: 54;
  background: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`;

const Tab = styled.View`
  min-width: 120;
  padding-horizontal: 18;
  align-items: center;
  justify-content: center;
  height: 54;
`;

const TabButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 70%;
`;

const TabText = styled.Text`
  font-family: ${props =>
    props.active ? fonts.circularStdBold : fonts.circularStdBook};
  font-size: ${props => (props.active ? fonts.big + 2 : fonts.regular)};
  color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.inactive};
`;

const UndelineTab = styled.View`
  position: absolute;
  width: ${props => props.width || 50};
  height: ${props => (props.active ? 2 : 1)};
  background-color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.grayLight};
  bottom: 0;
  left: 50%;
  margin-left: ${props => -(props.width || 50) / 2};
  opacity: ${props => (props.active ? 1 : 0.5)};
`;

export { Tabs, Tab, TabButton, TabText, UndelineTab };
