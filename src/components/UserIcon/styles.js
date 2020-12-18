import styled from 'styled-components';
import { fonts, colors } from 'assets/styles';


const Icon = styled.View`
    background: ${props => props.active ? '#fff' : props.color || '#fff'};
    border-radius: 50;
    width: ${props => props.size || '44'};
    height: ${props => props.size || '44'}
    align-items: center;
    justify-content: center;
`;

const IconText = styled.Text`
    font-size: ${fonts.regular};
    font-family: ${fonts.circularStdMedium};
    text-transform: uppercase;
    color: #FFF;
`;

const IconImage = styled.Image`
    resizeMode: cover;
    width: ${props => props.size || '44'};
    height: ${props => props.size || '44'};
    border-radius: 50;

`;


export { Icon, IconText, IconImage };
