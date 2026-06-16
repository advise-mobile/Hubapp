import type { ImageSourcePropType } from 'react-native';

import type { SummonsDetailViewModel } from './summons-detail';
import type { SummonsFilters } from './summons-hooks-types';

export interface SummonsUIProps {
	imageNotFound: ImageSourcePropType;
	onPress: () => void;
}

export interface SummonsDetailUIProps {
	viewModel: SummonsDetailViewModel;
}

export interface SummonsFilterModalProps {
	visible: boolean;
	onClose: () => void;
	onApply: (filters: SummonsFilters) => void;
	initialFilters?: SummonsFilters;
}

export interface SummonsDetailActionsModalProps {
	visible: boolean;
	onClose: () => void;
	onModalHide?: () => void;
	showRegisterDeadline?: boolean;
	onRegisterDeadline?: () => void;
	onSendEmail?: () => void;
	onDownload?: () => void;
	onShare?: () => void;
	onDelete?: () => void;
}

export interface SummonsAddDeadlineModalProps {
	visible: boolean;
	onClose: () => void;
	idMovProcessoCliente: number;
}

export interface SummonsSendEmailModalProps {
	visible: boolean;
	onClose: () => void;
	idMovProcessoCliente: number;
	onSuccess?: () => void;
}

export interface SummonsMarkAsReadConfirmModalProps {
	loading: boolean;
	onCancel: () => void;
	onSubmit: () => void;
}

export interface SummonsDeleteConfirmModalProps {
	loading: boolean;
	onCancel: () => void;
	onSubmit: () => void;
}
