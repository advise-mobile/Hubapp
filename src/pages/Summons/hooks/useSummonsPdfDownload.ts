import { useMutation } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';

import { requestStoragePermission } from '@helpers/requestStoragePermission';
import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import { downloadSummonsPdf } from '@services/summons-download';

export interface UseSummonsPdfDownloadOptions {
	promptMarkAsReadIfUnread?: boolean;
	onMarkAsReadPrompt?: () => void;
}

export function useSummonsPdfDownload(
	options: UseSummonsPdfDownloadOptions = {},
) {
	const dispatch = useDispatch();
	const { promptMarkAsReadIfUnread = false, onMarkAsReadPrompt } = options;

	const mutation = useMutation({
		mutationFn: async (idMovProcessoCliente: number) => {
			const hasPermission =
				Platform.OS === 'ios' || (await requestStoragePermission());

			if (!hasPermission) {
				throw new Error('Storage permission denied');
			}

			Toast.show('Download da intimação iniciado, por favor, aguarde.');

			await downloadSummonsPdf(idMovProcessoCliente, 'save');
		},
		onSuccess: () => {
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Intimação baixada com sucesso!',
					false,
				),
			);

			if (promptMarkAsReadIfUnread) {
				onMarkAsReadPrompt?.();
			}
		},
		onError: () => {
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Erro ao baixar a intimação, tente novamente mais tarde.',
					true,
				),
			);
		},
	});

	const downloadingIdRef = useRef<number | null>(null);

	const downloadPdf = useCallback(
		(id: number, callbackOptions?: Parameters<typeof mutation.mutate>[1]) => {
			downloadingIdRef.current = id;
			mutation.mutate(id, callbackOptions);
		},
		[mutation],
	);

	return {
		downloadPdf,
		isDownloading: mutation.isPending,
		downloadingId: mutation.isPending ? downloadingIdRef.current : null,
	};
}
