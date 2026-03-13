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

export const RadioOption = styled.TouchableOpacity`
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const RadioCircle = styled.View<{ $selected?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : 'transparent'};
`;

export const RadioLabel = styled.Text`
  font-size: ${fonts.small}px;
  font-family: ${fonts.circularStdBook};
  color: ${({ theme }) => theme.colors.grayDarker};
`;

export const PickerTouch = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.grayLighter};
  border-radius: 4px;
  padding: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PickerLabel = styled.Text`
  font-size: ${fonts.small}px;
  font-family: ${fonts.circularStdBook};
  color: ${({ theme }) => theme.colors.grayLight};
`;
