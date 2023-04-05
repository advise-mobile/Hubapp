import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

const PickerContainer = styled.View`
  padding: 12px 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grayLighter}; 
`;

const Picker = styled.Text`
  color: ${({ theme }) => theme.colors.fadedBlack};
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
  background-color: ${props => props.active ? props.theme.colors.white : props.theme.colors.iconGray};
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
  color:  ${({ theme }) => theme.colors.grayDarker};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBold};
  margin-right: 12;
`;

const InfoCustomValue = styled.View`
  flex: 1;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.editable ? props.theme.colors.grayLighter : props.theme.colors.white};
`;

const InfoValue = styled.TextInput`
  padding: 0;
  height: 20px;
  color: ${({ theme }) => theme.colors.fadedBlack};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBook};
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.editable ? props.theme.colors.grayLighter : props.theme.colors.white};
  flex: 1;
`;

const InfoText = styled.Text`
  color: ${({ theme }) => theme.colors.fadedBlack};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBook};
  flex-wrap: wrap;
  flex-shrink: 1;
  max-width: 225;
`;

const InfoContent = styled.View`
  flex-direction: row;
  max-width: 200;
  flex-wrap: wrap;
`;

const InfoLink = styled.TouchableOpacity`
  flex-direction: row;
`;

const InfoLinkText = styled.Text`
  color: ${({ theme }) => theme.colors.forgetLink};
  font-size: ${fonts.small};
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
  color: ${({ theme }) => theme.colors.red};
`;


const DateStyle = (props) => {
  return ({
    dateInput: {
      flex: 1,
      marginTop: 2,
      height: 20,
      paddingBottom: 0,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: props.editable ? props.colors.grayLighter : props.colors.white,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    disabled: {
      backgroundColor: props.colors.white,
    },
    dateText: {
      marginTop: 2,
      fontSize: 13,
      color: props.colors.fadedBlack,
      fontFamily: fonts.circularStdBook,
    },
  });
};

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
  InfoContent,
  ButtonLogout,
  LogoutText,
  DateStyle
}
