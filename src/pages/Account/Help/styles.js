import styled from 'styled-components';
import { fonts } from 'assets/styles';

const Content = styled.ScrollView``;

const Description = styled.Text`
  font-size: ${fonts.regular};
  color:  ${({ theme }) => theme.colors.fadedBlack};
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
  color: ${({ theme }) => theme.colors.grayDarker};
  padding-vertical: 8px;
  margin-top: 8px;
`;

const OptionText = styled.Text`
  margin-left: 12px;
  color: ${({ theme }) => theme.colors.adviseDarker};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
`;

const Attendance = styled.View`
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grayLighter};
  padding: 16px 24px 24px 24px;
`;

const AttendanceTitle = styled.Text`
  color: ${({ theme }) => theme.colors.fadedBlack};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

const AttendanceText = styled.Text`
  color: ${({ theme }) => theme.colors.fadedBlack};
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
