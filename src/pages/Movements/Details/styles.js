import styled from 'styled-components/native';
import { fonts, colors, metrics } from 'assets/styles';

const Movement = styled.ScrollView`
  background-color: ${colors.white};
  padding: 12px 10px 48px 12px;
`;

const MovementTags = styled.View`
  margin-top: ${metrics.baseMargin + 5};
  flex-flow: row wrap;
`;

const Tag = styled.View`
  background-color: ${(props) => props.background};
  border-radius: 22;
  padding: 2px 8px;
  margin-right: 8;
  margin-bottom: 10;
  text-align: center;
`;

const TagText = styled.Text`
  color: rgba(0, 0, 0, 0.8);
  font-family: ${fonts.circularStdBlack};
  font-size: ${fonts.smaller};
`;

const ProcessNumber = styled.View`
  flex-direction: row;
  margin: 24px 0;
`;

const ProcessNumberText = styled.Text`
  font-family: ${fonts.circularStdBlack};
  font-size: ${fonts.big};
  color: ${props => props.color || colors.grayDarker};
  margin-right: 14;
  margin-left: 8px;
`;

const MovementContent = styled.Text`
  font-family: ${fonts.circularStdMedium};
  font-size: ${fonts.regular};
  line-height: ${fonts.big + 5};
  margin-bottom: 24;
  margin-horizontal: 8px;
  color: ${colors.primary};
`;

const MovementDispatch = styled.Text`
  font-family: ${fonts.circularStdBook};
  font-size: ${fonts.small};
  line-height: ${fonts.big + 5};
  margin-horizontal: 8px;
  margin-bottom: 24;
  color: ${colors.grayDarker};
`;

export {
  Movement,
  MovementTags,
  Tag,
  TagText,
  ProcessNumber,
  ProcessNumberText,
  MovementContent,
  MovementDispatch
}
