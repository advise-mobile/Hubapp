import styled from 'styled-components';
import { fonts } from 'assets/styles';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fefefe;
`;

const Warp = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const HeaderLogo = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 80px;
`;

const Slide = styled.View`
    flex: 1;
    background-color: #fefefe;
    align-items: center;
    justify-content: center;
`;

const Icon = styled.Image`
    padding: 18px;
    flex: 1;
    width: 24px;
    height: 24px;
`;

const Image = styled.Image`
    margin: 0 32px 32px 32px;
    flex: 4;
`;

const Title = styled.Text`
    font-size: 24px;
    font-family: ${fonts.circularStdBold};
    color: #2D2D2D;
    margin-bottom: 16px;
    text-align: center;
`;

const Text = styled.Text`
    font-size: 16px;
    font-family: ${fonts.circularStdMedium};
    color: #2D2D2D;
    text-align: center;
    max-width: 75%;
    margin-bottom: 16px;
`;

const NextButton = styled.View`
  background: #2D2D2D;
  padding: 16px;
  border-radius: 4px;

`;

const ButtonText = styled.Text`
    font-size: 16px;
    font-family: ${fonts.circularStdMedium};
    color: #fefefe;
    text-align: center;
`;

const SlideContainer = styled.View`
  flex: 3;
`;

export {
  Container,
  Warp,
  HeaderLogo,
  Slide,
  Title,
  Text,
  Icon,
  Image,
  NextButton,
  ButtonText,
  SlideContainer
}
