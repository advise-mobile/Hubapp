import styled from 'styled-components/native';

export const Container = styled.View`
	align-items: center;
	margin-top: 18px;
	margin-bottom: 2px;
	height: 32px;
	flex-direction: row;
	justify-content: space-between;
`;

export const ContainerItems = styled.TouchableOpacity`
	margin-left: 15px;
	max-width: 150px;
	height: 32px;
	align-items: center;
	justify-content:center ;
	flex: 1;
	border-radius: 4px;
	border: ${({ theme }) => theme.colors.BlackInactive};
`;

export const TextItems = styled.Text`
	font-size: 14px;
	margin-left: 10px;
	margin-right: 10px;
`;
