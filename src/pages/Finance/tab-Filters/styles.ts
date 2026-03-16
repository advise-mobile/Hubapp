import styled from 'styled-components/native';

export const ContainerItems = styled.TouchableOpacity`
  padding: 6px 12px;
  margin-right: 8px;

  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.BlackInactive};
`;

export const TextItems = styled.Text`
  font-size: 13px;
  font-weight: 700;
`;
