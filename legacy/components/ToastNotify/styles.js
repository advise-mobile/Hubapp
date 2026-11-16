import styled from 'styled-components';
import { fonts, metrics } from '@lassets/styles';

const Container = styled.View`
  elevation: 9999;
  left: 0;
  position: absolute;
  right: 0;
  z-index: 9999;
`;

const Notify = styled.View`
  align-items: center;
  borderradius: ${metrics.baseRadius}px;
  flex-direction: row;
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.big};
  justify-content: space-between;
  left: ${metrics.baseMargin + 10};
  padding-horizontal: 10;
  padding-vertical: ${metrics.baseMargin + 5};
  width: ${metrics.screenWidth - metrics.basePadding - 20};
`;

const NotifyMessage = styled.Text`
  color: #111111;
  flex: 1;
  margin-left: 10;
`;

export { Container, Notify, NotifyMessage };
