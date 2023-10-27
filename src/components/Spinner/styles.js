import styled from 'styled-components';

const Container = styled.View`
  alignItems: center;
  backgroundColor: ${props => props.transparent ? 'transparent' : props.theme.colors.white};
  height: ${props => props.height || '100%'};
  marginTop: ${props => props.height ? 0 : '20%'};
  justify-content: center;
`;

export { Container };
