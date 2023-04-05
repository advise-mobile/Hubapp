import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

const List = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ListItem = styled.TouchableOpacity`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grayLighter};
`;

const ListContent = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

const ListText = styled.Text`
  font-family: ${fonts.circularStdBook};
  font-size: ${fonts.small};
  color: ${({ theme }) => theme.colors.fadedBlack};
  margin-left: 14px;
  flex: 1;
`;

const Title = styled.Text`
  font-family: ${fonts.circularStdBold};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${fonts.regular};
  color: ${({ theme }) => theme.colors.grayDarker};
  line-height: 24px;
  padding: 12px 24px; 
`;

export {
  List,
  ListItem,
  ListContent,
  ListText,
  Title
}
