import styled from 'styled-components';
import { fonts, colors, metrics } from 'assets/styles';

const Content = styled.ScrollView`
  padding: 0 24px;
`;

const Tags = styled.TouchableOpacity`
  padding: 24px 24px 12px 24px;
  margin-top: ${metrics.baseMargin + 5};
  flex-flow: row wrap;
`;

const Tag = styled.View`
  background-color: ${(props) => props.background || colors.gray};
  border-radius: 22;
  padding: 2px 8px;
  margin-right: 8;
  margin-bottom: 10;
  text-align: center;
`;

const TagText = styled.Text`
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBlack};
  font-size: ${fonts.smaller};
`;

const Description = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBook};
  line-height: 24px;
`;

const Mark = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBook};
  background-color: ${colors.yellowLight};
`;

export {
  Content,
  Tags,
  Tag,
  TagText,
  Description,
  Mark,
}
