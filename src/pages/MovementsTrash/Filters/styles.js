import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

export const Title = styled.Text`
  font-size: ${fonts.big};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${fonts.circularStdBold};
`;

export const Label = styled.Text`
  font-size: ${fonts.small};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${fonts.circularStdBold};
  padding-bottom: 4px;
`;

export const Row = styled.View`
  padding: 12px 0;
  flex-direction: row;
`;

export const Column = styled.View`
  flex: 1;
`;

export const Submit = styled.TouchableOpacity`
  padding: 8px;
  background: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const SubmitText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${fonts.regular};
  font-family: ${fonts.circularStdBold};
`;

export const RBRow = styled.View`
  flex-direction: row-reverse;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

export const SpaceRow = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const SubTitleMultiSelectText = styled.Text`
  font-size: ${fonts.small};
  color: ${({ theme }) => theme.colors.inactive};
  padding-bottom: 4px;
`;

export const ContainerSubtitle = styled.TouchableOpacity`
  flex: 1;
  margin-top: 24px;
`;

export const ContainerSituation = styled.View`
  flex: 1;
`;

export const ContainerMultiSelect = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;


export const ContainerSpinner = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;

