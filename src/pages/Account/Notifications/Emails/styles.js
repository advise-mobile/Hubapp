import styled from 'styled-components/native';
import { fonts, colors } from 'assets/styles';



const List = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  border-top-width: 1px;
  margin-top: 12px;
  border-top-color: ${colors.grayLighter};
`;

const ListItem = styled.View`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.white};
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
  color: ${({ theme }) => theme.colors.grayDarker};
  flex: 1;
  padding-right: 18px;
`;

const Title = styled.Text`
  font-family: ${fonts.circularStdBold};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${fonts.regular};
  color: ${({ theme }) => theme.colors.grayDarker};
  line-height: 24px;
`;

const TitleContainer = styled.Text`
  padding: 12px 24px;
  flex: 1;
`;

const Options = styled.View`
  flex: 1;
  margin-top: 20px;
  padding-right: 8px;

`;

const Option = styled.View`
  padding: 8px 0;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ImageHelper = styled.Image ``   

const EmailsList = styled.View`
  padding-top: 12px;
`;

const EmailContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin: 4px 0;
`;

const ActionButton = styled.TouchableOpacity`
  padding: 8px 4px;
`;

const ButtonInfo = styled.Button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 24px;
  width: 1000px !important;
  height: 40px;
  background: #2D2D2D !important;
  border-radius: 4px;
`;

export {
  List,
  ListItem,
  ListContent,
  ListText,
  Title,
  TitleContainer,
  Options,
  Option,
  EmailsList,
  EmailContent,
  ActionButton,
  ButtonInfo,
}
