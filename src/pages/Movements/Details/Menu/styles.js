import styled from 'styled-components/native';
import { fonts, colors } from 'assets/styles';

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Cancel = styled.TouchableOpacity`
  flex: 1;
  padding: 7px;
  margin-right: 12px;
  background: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

const CancelText = styled.Text`
  color:  ${({ theme }) => theme.colors.primary};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

const Content = styled.View`
  margin: 0 -24px;
`;

const Item = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  padding: 12px 24px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color:  ${({ theme }) => theme.colors.grayLighter};
`;

const ItemText = styled.Text`
  font-family: ${fonts.circularStdBook};
  font-size: ${fonts.small};
  color: ${({ theme }) => theme.colors.fadedBlack};
  margin-left: 12px;
`;

export {
  Footer,
  Cancel,
  CancelText,
  Content,
  Item,
  ItemText,
}
