import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

const Content = styled.TouchableOpacity`
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grayLighter};
  padding: 16px 24px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grayLighter};
`;

const Title = styled.Text`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.big};
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.grayDarker};
`;

const Description = styled.Text`
  font-family: ${fonts.circularStdBook};
  font-size: ${fonts.regular};
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.grayLight};
  line-height: ${fonts.bigger};
`;

const Info = styled.View`

`;

const Icon = styled.View`

`;

export {
  Content,
  Title,
  Description,
  Info,
  Icon
}
