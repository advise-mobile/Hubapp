import styled from 'styled-components/native';
import { fonts, colors } from 'assets/styles';

const PickerContainer = styled.View`
  padding: 12px 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grayLighter};
`;

const Picker = styled.Text`
  color: ${colors.fadedBlack};
  font-size: ${fonts.big};
  font-family: ${fonts.circularStdBook}
`;

const ProfileContainer = styled.ScrollView`
  padding: 8px 24px;
  margin-bottom: 16px;
  flex: 2;
`;

const ProfileImageContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const ProfileImageButton = styled.TouchableOpacity`
  background-color: ${props => props.active ? colors.white : colors.iconGray};
  border-radius: 50;
`;

const ProfileImage = styled.Image`
  width: 100;
  height: 100;
  border-radius: 50;
  background-color: #fff;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  padding: 8px 0;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1;

`;

const InfoTitle = styled.Text`
  color: ${colors.grayDarker};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBold};
  margin-right: 12;
`;

const InfoCustomValue = styled.View`
  flex: 1;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.editable ? colors.grayLighter : colors.white};
`;

const InfoValue = styled.TextInput`
  padding: 0;
  height: 20px;
  color: ${colors.fadedBlack};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.editable ? colors.grayLighter : colors.white};
  flex: 1;
`;

const InfoText = styled.Text`
  color: ${colors.fadedBlack};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
  flex-wrap: wrap;
  flex-shrink: 1;
  max-width: 225;
`;

const InfoLink = styled.TouchableOpacity`
  flex-direction: row;
`;

const InfoLinkText = styled.Text`
  color: ${colors.forgetLink};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBook};
`;

const ButtonLogout = styled.TouchableOpacity`
  flex: 1;
  padding: 8px 0;
  margin: 8px 0;
`;

const LogoutText = styled.Text`
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBold};
  color: ${colors.red};
`;

export {
  PickerContainer,
  Picker,
  ProfileContainer,
  ProfileImageButton,
  ProfileImageContainer,
  ProfileImage,
  InfoContainer,
  InfoTitle,
  InfoCustomValue,
  InfoValue,
  InfoLink,
  InfoLinkText,
  InfoText,
  ButtonLogout,
  LogoutText
}
