import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

export const Section = styled.View`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.Text`
  font-family: ${fonts.circularStdBold};
  font-size: ${fonts.big}px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

export const DateRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const DateField = styled.View`
  flex: 1;
`;

export const DateLabel = styled.Text`
  font-size: ${fonts.small}px;
  font-family: ${fonts.circularStdBold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 4px;
`;

export const DateInput = styled.TextInput`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.grayLighter};
  border-radius: 4px;
  padding: 10px 12px;
  font-size: ${fonts.small}px;
  font-family: ${fonts.circularStdBook};
  color: ${({ theme }) => theme.colors.primary};
`;

export const RBRow = styled.View`
	flex-direction: row-reverse;
	flex: 1;
	justify-content: space-between;
	align-items: center;
	padding: 8px 0;
`;

export const PickerTouch = styled.TouchableOpacity`
  padding: 10px 2px 8px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PickerLabel = styled.Text`
  font-size: ${fonts.regular}px;
  font-family: ${fonts.circularStdBook};
  color: ${({ theme }) => theme.colors.grayDarker};
`;

export const PickerRow = styled.View`
  flex-direction: row;
  align-items: center;
  min-height: 36px;
`;

export const PickerField = styled.View`
  flex: 1;
`;
