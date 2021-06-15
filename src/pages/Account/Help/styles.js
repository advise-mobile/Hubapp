import styled from 'styled-components';
import { fonts, colors } from 'assets/styles';

const Content = styled.ScrollView``;

const Description = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.fadedBlack};
  font-family: ${fonts.circularStdBook};
  line-height: ${fonts.big + 3};
  margin-bottom: 12px;
`;

const Option = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const OptionButton = styled.TouchableOpacity`
  padding-vertical: 12px;
`;

const Infos = styled.View`
  padding: 8px 24px 24px 24px;
`;

const Subtitle = styled.Text`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.regular};
  color: ${colors.grayDarker};
  padding-vertical: 8px;
  margin-top: 8px;
`;

const OptionText = styled.Text`
  margin-left: 12px;
  color: ${colors.adviseDarker};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
`;

const Attendance = styled.View`
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: ${colors.grayLighter};
  padding: 16px 24px 24px 24px;
`;

const AttendanceTitle = styled.Text`
  color: ${colors.fadedBlack};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

const AttendanceText = styled.Text`
  color: ${colors.fadedBlack};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBook};
`;

export {
  Content,
  Description,
  Option,
  Infos,
  Subtitle,
  OptionText,
  OptionButton,
  Attendance,
  AttendanceTitle,
  AttendanceText,
};
