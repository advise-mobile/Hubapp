import styled from 'styled-components';

const Container = styled.View`
  align-items: center;
  background-color: ${props =>
    props.transparent ? 'transparent' : props.theme.colors.white};
  height: ${props => props.height || '100%'};
  margin-top: ${props => (props.height ? 0 : '20%')};
  justify-content: center;
`;

export { Container };
