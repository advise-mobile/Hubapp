import styled from 'styled-components/native';
import { fonts } from 'assets/styles';

export const List = styled.FlatList``;

export const Card = styled.View`
    height: 45px;
    padding: 10px;
    margin-bottom: 5px;
    flex-direction: row;
    border-bottom-width: 0.2px;
    border-bottom-color: ${({ theme }) => theme.colors.inactive};
    align-items: center;
    
`;

export const Label = styled.Text`
    font-size: ${fonts.small};
    color: ${({ theme }) => theme.colors.primary};
    padding-bottom: 4px;
`;

export const  Container = styled.View `
    flex: 1;
    justify-content:center;
    background-color: ${({ theme }) => theme.colors.white};
    max-height: 400px;

`