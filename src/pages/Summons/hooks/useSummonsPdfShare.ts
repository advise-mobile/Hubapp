import { useMutation } from '@tanstack/react-query';
import { Platform } from 'react-native';
import RNShareFile from 'react-native-share-pdf';
import { useDispatch } from 'react-redux';

import { requestStoragePermission } from '@helpers/requestStoragePermission';
import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import { downloadSummonsPdf } from '@services/summons-download';

export interface UseSummonsPdfShareOptions {
	promptMarkAsReadIfUnread?: boolean;
	onMarkAsReadPrompt?: () => void;
}

export function useSummonsPdfShare(options: UseSummonsPdfShareOptions = {}) {
	const dispatch = useDispatch();
	const { promptMarkAsReadIfUnread = false, onMarkAsReadPrompt } = options;

	const mutation = useMutation({
		mutationFn: async (idMovProcessoCliente: number) => {
			const hasPermission =
				Platform.OS === 'ios' || (await requestStoragePermission());

			if (!hasPermission) {
				throw new Error('Storage permission denied');
			}

			const result = await downloadSummonsPdf(idMovProcessoCliente, 'share');

			if (!result) {
				throw new Error('Missing summons PDF for share.');
			}

			await RNShareFile(result.file, result.fileName);
		},
		onSuccess: () => {
			if (promptMarkAsReadIfUnread) {
				onMarkAsReadPrompt?.();
			}
		},
		onError: () => {
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Erro ao compartilhar a intimação, tente novamente mais tarde.',
					true,
				),
			);
		},
	});

	return {
		sharePdf: mutation.mutate,
		isSharing: mutation.isPending,
	};
}
