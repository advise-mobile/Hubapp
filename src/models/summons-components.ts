import type { ImageSourcePropType } from 'react-native';

import type { SummonsFilters } from './summons-hooks-types';

export interface SummonsUIProps {
	imageNotFound: ImageSourcePropType;
	onPress: () => void;
}

export interface SummonsFilterModalProps {
	visible: boolean;
	onClose: () => void;
	onApply: (filters: SummonsFilters) => void;
	initialFilters?: SummonsFilters;
}
