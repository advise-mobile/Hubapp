import styled from 'styled-components';
import { fonts, colors } from 'assets/styles';


const Icon = styled.View`
    background: ${props => props.active ? colors.white : props.color || colors.white};
    border-radius: 50;
    width: ${props => props.size || '40'};
    height: ${props => props.size || '40'}
    align-items: center;
    justify-content: center;
    border-width: 5;
    border-color: ${props => props.active ? colors.white : props.color || colors.white};
`;

const IconText = styled.Text`
    font-size: ${fonts.regular};
    font-family: ${fonts.circularStdMedium};
    text-transform: uppercase;
    color: #FFF;
`;

const IconImage = styled.Image`
    resizeMode: cover;
    width: ${props => props.size || '35'};
    height: ${props => props.size || '35'};
    border-radius: 50;
`;

export { Icon, IconText, IconImage };
