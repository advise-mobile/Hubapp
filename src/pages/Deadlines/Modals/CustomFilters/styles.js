import styled from 'styled-components/native';
import { fonts, colors } from 'assets/styles';

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Cancel = styled.TouchableOpacity`
  flex: 1;
  padding: 7px;
  margin-right: 12px;
  background: ${colors.white};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${colors.primary};
`;

const CancelText = styled.Text`
  color: ${colors.primary};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

const Submit = styled.TouchableOpacity`
  flex: 1;
  padding: 8px;
  background: ${colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${colors.primary};
`;

const SubmitText = styled.Text`
  color: ${colors.white};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

const Content = styled.View`
  margin: 0 -24px;
`;

const Title = styled.Text`
  font-size: ${fonts.big};
  color: ${colors.primary};
  font-family: ${fonts.circularStdBold};
  flex-grow: 1;
  padding-bottom: 12px;
`;

const Label = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.primary};
  font-family: ${fonts.circularStdBold};
  padding-bottom: 4px;
`;

const Row = styled.View`
  padding: 12px 24px;
  flex-wrap: wrap;
`;

const Column = styled.View`
  flex-grow: 1;
`;

const Badges = styled.View`
  flex-direction: row;
  flex-grow: 0;
  flex-wrap: wrap;
`;

const Badge = styled.TouchableOpacity`
  background: ${props => props.error ? colors.redLight : props.active ? colors.grayDarker : colors.gray};
  border-radius: 16;
  padding: 4px 8px;
  margin-right: 8px;
  margin-top: 16px;
`;

const BadgeText = styled.Text`
  font-family: ${fonts.circularStdBold};
  color: ${props => props.error ? colors.red : props.active ? colors.white : 'rgba(0, 0, 0, 0.38)'};
  font-size: ${fonts.smaller};
`;

const ReadBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const FormControl = styled.View`
  flex: 1;
  flex-direction: row;
  flex-grow: 1;
  padding: 12px 0;
`;

const ClearFilters = styled.TouchableOpacity`
  position: absolute;
  top: -8px;
  right: 16px;
  z-index: 10;
  elevation: 5;
`;

const ClearText = styled.Text`
  font-size: ${fonts.smaller};
  color: ${colors.grayDarker};
  font-family: ${fonts.circularStdBold};
`;

export {
  Footer,
  Cancel,
  CancelText,
  Submit,
  SubmitText,
  Content,
  Row,
  Label,
  Badges,
  Badge,
  BadgeText,
  ReadBox,
  Column,
  Title,
  FormControl,
  ClearFilters,
  ClearText,
}
