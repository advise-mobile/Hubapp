import styled from 'styled-components';
import { fonts, colors, metrics } from 'assets/styles';

const Content = styled.ScrollView`
  padding: 0 24px;
  margin-bottom: 16px;
`;

const Tags = styled.View`
  padding: 12px 0;
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
  color: rgba(0, 0, 0, .8);
  font-family: ${fonts.circularStdBlack};
  font-size: ${fonts.smaller};
`;

const Title = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBook};
  line-height: 24px;
  text-transform: uppercase;
`;

const Description = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBook};
  line-height: 24px;
`;

const Mark = styled.Text`
  font-size: ${fonts.small};
  color: rgba(0, 0, 0, .8);
  font-family: ${fonts.circularStdBook};
  background-color: ${colors.yellowLight};
`;

const Div = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBook};
  line-height: 24px;
`;

export {
  Content,
  Tags,
  Tag,
  TagText,
  Title,
  Description,
  Mark,
  Div,
}
