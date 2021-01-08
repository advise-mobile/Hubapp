import styled from 'styled-components';
import { colors } from 'assets/styles';

const Container = styled.View`
  alignItems: center;
  backgroundColor: ${props => props.transparent ? 'transparent' : colors.white};
  height: ${props => props.height || '100%'};
  marginTop: ${props => props.height ? 0 : '20%'};
`;

export { Container };
