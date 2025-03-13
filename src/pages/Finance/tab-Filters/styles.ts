import styled from 'styled-components/native';

export const ContainerItems = styled.TouchableOpacity`
	padding: 4px 16px;
	margin-left: 6px;
	margin-right: 6px;

	height: 32px;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	border: ${({theme}) => theme.colors.BlackInactive};
`;

export const TextItems = styled.Text`
	font-size: 14px;
	font-weight: 700;
`;
