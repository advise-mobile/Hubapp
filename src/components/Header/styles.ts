import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const HeaderContainer = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  justify-content: space-between;
  min-height: 0;
  padding-top: 0;
  padding-left: 12px;
  padding-right: 12px;
  z-index: 10;
`;

export const HeaderAction = styled.TouchableOpacity`
  margin-top: 6px;
  margin-left: 8px;
  margin-right: 8px;
  min-height: 25px;
  align-items: center;
  justify-content: center;
`;

export const HeaderActionPlaceholder = styled(HeaderAction)`
  opacity: 0;
`;

export const HeaderActionsLeft = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  min-width: 65px;
  height: 20px;
`;

export const HeaderActionsRight = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  min-width: 65px;
`;

export const HeaderTitle = styled.Text<{ lower?: boolean }>`
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.bigger}px;
  text-transform: ${({ lower }) => (lower ? 'none' : 'capitalize')};
  flex: 1;
`;
