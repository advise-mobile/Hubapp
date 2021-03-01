import styled from 'styled-components/native';
import { fonts, colors } from 'assets/styles';

const List = styled.ScrollView`
  flex: 1;
  background-color: ${colors.white};
  border-top-width: 1px;
  margin-top: 12px;
  border-top-color: ${colors.grayLighter};
`;

const ListItem = styled.TouchableOpacity`
  padding: 12px 24px;
  background-color: ${colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grayLighter};
`;

const ListContent = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

const ListText = styled.Text`
  font-family: ${fonts.circularStdBook};
  font-size: ${fonts.small};
  color: ${colors.fadedBlack};
  flex: 1;
`;

const Title = styled.Text`
  font-family: ${fonts.circularStdBold}
  background-color: ${colors.white};
  font-size: ${fonts.regular};
  color: ${colors.grayDarker};
  line-height: 24px;
`;

const TitleContainer = styled.Text`
  padding: 12px 24px;
  flex: 1;
`;

export {
  List,
  ListItem,
  ListContent,
  ListText,
  Title,
  TitleContainer,
}
