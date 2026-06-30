import React from 'react';
import type { ImageSourcePropType } from 'react-native';

import {
	FilteredEmptyImage,
	FilteredEmptyState,
	FilteredEmptySubtitle,
	FilteredEmptyTitle,
} from '../../styles';

type SummonsFilteredEmptyStateProps = {
	imageSource: ImageSourcePropType;
};

export function SummonsFilteredEmptyState({
	imageSource,
}: SummonsFilteredEmptyStateProps) {
	return (
		<FilteredEmptyState>
			<FilteredEmptyImage source={imageSource} />
			<FilteredEmptyTitle>
				Não há intimações no período selecionado.
			</FilteredEmptyTitle>
			<FilteredEmptySubtitle>Selecione um período diferente.</FilteredEmptySubtitle>
		</FilteredEmptyState>
	);
}
