import styled from 'styled-components';
import { fonts } from '@lassets/styles';

const Icon = styled.View`
  background: ${props =>
    props.active
      ? props.theme.colors.white
      : props.color || props.theme.colors.white};
  border-radius: 50px;
  width: ${props => props.size ? `${props.size}px` : '40px'};
  height: ${props => props.size ? `${props.size}px` : '40px'};
  align-items: center;
  justify-content: center;
  border-width: 5px;
  border-color: ${props =>
    props.active
      ? props.theme.colors.white
      : props.color || props.theme.colors.white};
`;

const IconText = styled.Text`
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdMedium};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
`;

const IconImage = styled.Image`
  resize-mode: cover;
  width: ${props => props.size ? `${props.size}px` : '35px'};
  height: ${props => props.size ? `${props.size}px` : '35px'};
  border-radius: 50px;
`;

export { Icon, IconText, IconImage };
