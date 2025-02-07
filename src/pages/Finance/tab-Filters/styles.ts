import styled from 'styled-components/native';

export const Container = styled.View`
	align-items: center;
	min-width: 160px;
	margin-bottom: 2px;
	height: 32px;
	flex-direction: row;
`;

export const ContainerItems = styled.TouchableOpacity`
	margin-left: 10px;
	margin-right: 10px;
	/*  */
	height: 32px;
	align-items: center;
	justify-content: center;
	flex: 1;
	border-radius: 4px;
	border: ${({theme}) => theme.colors.BlackInactive};
`;

export const TextItems = styled.Text`
	font-size: 14px;
`;
