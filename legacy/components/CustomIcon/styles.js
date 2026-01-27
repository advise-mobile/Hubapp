import styled from 'styled-components';

const IconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddIcon = styled.View`
  position: absolute;
  bottom: -5px;
  right: -10px;
  background: ${({ theme }) => theme.colors.white};
  borderradius: 16;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.white};
`;

export { IconContainer, AddIcon };
