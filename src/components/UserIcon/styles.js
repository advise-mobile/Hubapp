import styled from 'styled-components';
import { fonts } from 'assets/styles';


const Icon = styled.View`
    background: ${props => props.active ? props.theme.colors.white : props.color || props.theme.colors.white};
    border-radius: 50;
    width: ${props => props.size || '40'};
    height: ${props => props.size || '40'};
    align-items: center;
    justify-content: center;
    border-width: 5;
    border-color: ${props => props.active ? props.theme.colors.white : props.color || props.theme.colors.white};
`;

const IconText = styled.Text`
    font-size: ${fonts.regular};
    font-family: ${fonts.circularStdMedium};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.white};
`;

const IconImage = styled.Image`
    resizeMode: cover;
    width: ${props => props.size || '35'};
    height: ${props => props.size || '35'};
    border-radius: 50;
`;

export { Icon, IconText, IconImage };
