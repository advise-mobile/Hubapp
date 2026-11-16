import styled from 'styled-components/native';

/** Largura máxima do painel de ações em relação à tela. */
export const MAX_ACTIONS_PANEL_WIDTH_RATIO = 0.75;

// row (não row-reverse): ordem do array = esquerda → direita no painel.
// Alinhado ao legacy Movements. row-reverse aqui invertia a ordem do RF.
export const ActionsContainer = styled.View`
	flex-direction: row;
	align-items: stretch;
`;

export const ActionButton = styled.TouchableOpacity<{ backgroundColor: string }>`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: ${({ backgroundColor }) => backgroundColor};
`;
