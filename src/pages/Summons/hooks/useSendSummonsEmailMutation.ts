import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';
import type { SendSummonsEmailInput } from '@models/summons-email';
import { sendSummonsEmail } from '@services/summons';

export function useSendSummonsEmailMutation() {
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: (input: SendSummonsEmailInput) => sendSummonsEmail(input),
		onSuccess: () => {
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Intimação enviada por email!',
					false,
				),
			);
		},
		onError: () => {
			dispatch(
				ToastNotifyActions.toastNotifyShow(
					'Não foi possível enviar a intimação por email.',
					true,
				),
			);
		},
	});
}
