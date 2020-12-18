import styled from 'styled-components/native';
import { fonts, colors, metrics } from 'assets/styles';

const Heading = styled.View`
  align-items: center;
  flex-direction: row;
  background-color: ${colors.white};
  padding: 12px 18px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grayLighter};
`;

const FolderTitle = styled.Text`
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdMedium};
  font-size: ${fonts.regular};
`;

const FolderSelected = styled.View`
  align-items: center;
  flex-direction: row;
`;

const FolderSelectedTitleHighlight = styled.Text`
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdMedium};
  font-size: ${fonts.small};
`;

const FolderSelectedTitle = styled.Text`
  color: ${colors.grayLight};
  font-family: ${fonts.circularStdMedium};
  font-size: ${fonts.small};
  flex: 1;
`;

const FolderSelectedActions = styled.View`
  top: 0;
  flex: 1;
  right: 0;
  bottom: 0;
  position: absolute;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const FolderSelectedActionButton = styled.TouchableOpacity`
  padding-left: 16px;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 16;
`;

const Movement = styled.View`
  background-color: ${colors.white};
  padding: 12px 18px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grayLighter};
`;

const MovementHeader = styled.View`
  flex-wrap: nowrap;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

const MovementHeading = styled.Text`
  font-family: ${fonts.circularStdMedium};
  font-size: 16px;
  flex: 1;
`;

const MovementResume = styled.Text`
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBook};
`;

const MovementAction = styled.TouchableOpacity`
  padding: 4px;
  margin-left: 16px;
`;

const MovementTags = styled.TouchableOpacity`
  margin-top: ${metrics.baseMargin + 5};
  flex-flow: row wrap;
`;

const Tag = styled.View`
  background-color: ${(props) => props.background};
  border-radius: 22;
  padding: 2px 8px;
  margin-right: 10;
  margin-bottom: 10;
  text-align: center;
`;

const TagText = styled.Text`
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBlack};
  font-size: ${fonts.smaller};
`;

export {
  Heading,
  FolderTitle,
  FolderSelected,
  FolderSelectedTitle,
  FolderSelectedTitleHighlight,
  FolderSelectedActions,
  FolderSelectedActionButton,
  BackButton,
  Movement,
  MovementHeader,
  MovementHeading,
  MovementResume,
  MovementAction,
  MovementTags,
  Tag,
  TagText,
}
