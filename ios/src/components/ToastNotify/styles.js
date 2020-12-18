import styled from 'styled-components';
import { Platform } from 'react-native';
import { fonts, colors, metrics } from 'assets/styles';

const Container = styled.View`
  bottom: ${Platform.OS === 'android' ? metrics.baseMargin : metrics.baseMargin + 20};
  position: absolute;
`;

const Notify = styled.View`
  alignItems: center;
  borderRadius: ${metrics.baseRadius};
  flexDirection: row;
  fontFamily: ${fonts.circularStdBold};
  fontSize: ${fonts.big};
  justifyContent: space-between;
  left: ${metrics.baseMargin};
  paddingHorizontal: 10;
  paddingVertical: ${metrics.baseMargin + 5};
  width: ${metrics.screenWidth - metrics.basePadding};
`;

const NotifyMessage = styled.Text`
  color: ${colors.white};
  flex: 1;
  marginLeft: 10;
`;

export { Container, Notify, NotifyMessage };
