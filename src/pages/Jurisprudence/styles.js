import styled from 'styled-components';
import { fonts, colors } from 'assets/styles';

const Image = styled.Image`
  width: 170px;
  height: 170px;
  resize-mode: contain;
`;

const Content = styled.View`
  padding: 24px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Title = styled.Text`
  margin-bottom: 8px;
  color: ${colors.grayDarker};
  font-size: ${fonts.big + 2};
  font-family: ${fonts.circularStdBold};
`;

const Subtitle = styled.Text`
  text-align: center;
  margin-bottom: 18px;
  color: ${colors.fadedBlack};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
`;

const SearchBar = styled.View`
  margin-bottom: 16px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grayLighter};
`;

const SearchInput = styled.TextInput`
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdMedium};
  padding: 8px;
  flex: 1;
  color: ${colors.grayLight};
`;

const SearchButton = styled.TouchableOpacity`
  padding: 12px 24px;
  align-items: center;
`;

const ActionButton = styled.TouchableOpacity`
  padding: 12px 24px;
  background: ${colors.primary};
  border-radius: 4px;
`;

const ActionButtonText = styled.Text`
  font-family: ${fonts.circularStdBold};
  color: ${colors.realWhite};
  font-size: ${fonts.small};
`;

export {
  Content,
  Image,
  Title,
  Subtitle,
  SearchBar,
  SearchInput,
  SearchButton,
  ActionButton,
  ActionButtonText,
}
