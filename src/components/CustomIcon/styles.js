import styled from 'styled-components';
import { colors } from 'assets/styles';

const IconContainer = styled.View`
  display: flex;
`;

const AddIcon = styled.View`
  position: absolute;
  bottom: -5px;
  right: -10px;
  background: ${colors.white};
  border-radius: 16px;
  border-width: 1px;
  border-color: ${colors.white};
`;


export {
  IconContainer,
  AddIcon
};
