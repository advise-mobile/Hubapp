import styled from 'styled-components';


export const Container = styled.View`
	align-items: center;
	margin-top: 20px;
	margin-bottom: 10px;
`;

export const ContainerItems = styled.View`
	flex: 1;
	border: 1px solid ${({ theme }) => theme.colors.backgroundButton};
	margin-left: 14px;
	height: 38px;
	border-radius: 5px;
`;

export const TextItems = styled.Text`
	font-size: 14px;
	font-weight: bold;
`;
