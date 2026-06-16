import React, { forwardRef } from 'react';

import ConfirmModal from '@components/ConfirmModal';

import type { SummonsMarkAsReadConfirmModalProps } from '@models/summons-components';

export const SummonsMarkAsReadConfirmModal = forwardRef<
	{ open: () => void; close: () => void },
	SummonsMarkAsReadConfirmModalProps
>(function SummonsMarkAsReadConfirmModal(
	{ loading, onCancel, onSubmit },
	ref,
) {
	return (
		<ConfirmModal
			ref={ref}
			onCancel={onCancel}
			onSubmit={onSubmit}
			cancelText="Não"
			submitText="Sim"
			title="Deseja marcar a intimação como lida?"
			description=""
			loading={loading}
			maxHeight={200}
		/>
	);
});
