import styled from 'styled-components';

const IconContainer = styled.View`
  display: flex;
`;

const AddIcon = styled.View`
  position: absolute;
  bottom: -5px;
  right: -10px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.white};
`;


export {
  IconContainer,
  AddIcon
};
