import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { fonts } from 'assets/styles';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width * 90 /100;

export const Image = styled.Image`
  width:${width}px;
  height:450px;
  resize-mode: stretch;
`;

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width:${width}px;
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
 export const CancelText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;

export const WhatsAppCall = styled.TouchableOpacity`
  flex: 1;
  padding: 7px;
  margin-right: 9px;
  background: ${({ theme }) => theme.colors.success};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const WhatsAppCallText = styled.Text`
  color: ${({ theme }) => theme.colors.realWhite};
  font-size: ${fonts.small};
  font-family: ${fonts.circularStdBold};
`;