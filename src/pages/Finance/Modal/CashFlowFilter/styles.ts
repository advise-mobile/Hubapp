import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Cancel = styled.TouchableOpacity`
  flex: 1;
  padding: 7px;
  margin-right: 12px;
  background: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const ToSave = styled.TouchableOpacity`
  flex: 1;
  padding: 7px;
  margin-right: 12px;
  background: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const CancelText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

export const ToSaveText = styled.Text`
  color: ${({ theme }) => theme.colors.realWhite};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

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

export const LabelPeriod = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.realWhite};
  font-family: ${fonts.circularStdBold};
	margin-left: 10px;
	margin-right: 10px;
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

export const PeriodItemsContainer = styled.View`
	width: 414px;
	height: 44px;
	flex-direction: row;
	align-items: center;
`;

export const PeriodItems = styled.TouchableOpacity`
	max-width: 300px;
	min-width: 50px;
	height: 20px;
	border-radius: 17px;
	align-items: center;
	align-items: center;
	margin-right: 10px;
	background: ${({ theme }) => theme.colors.gray};
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


export const ClearButtom = styled.TouchableOpacity`
  padding: 3px;
  justify-content: center;
  align-items: center;
`;

export const ClearButtomText = styled.Text`
  font-size: ${fonts.smaller};
	color:  ${({ theme }) => theme.colors.grayLight};
	font-family: ${fonts.circularStdBold};
`;




