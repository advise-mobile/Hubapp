import React, { forwardRef } from 'react';

import ConfirmModal from '@components/ConfirmModal';

import type { SummonsDeleteConfirmModalProps } from '@models/summons-components';

export const SummonsDeleteConfirmModal = forwardRef<
	{ open: () => void; close: () => void },
	SummonsDeleteConfirmModalProps
>(function SummonsDeleteConfirmModal(
	{ loading, onCancel, onSubmit },
	ref,
) {
	return (
		<ConfirmModal
			ref={ref}
			onCancel={onCancel}
			onSubmit={onSubmit}
			cancelText="Cancelar"
			submitText="Sim, quero excluir"
			title="Deseja excluir?"
			description="Ao excluir uma intimação, você elimina todas as informações referentes a este documento. A ação de excluir é definitiva e irreversível."
			loading={loading}
			maxHeight={250}
		/>
	);
});
