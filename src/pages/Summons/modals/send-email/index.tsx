import React, { useCallback, useEffect, useState } from 'react';

import { BottomSheet } from '@components/BottomSheet';
import { Button } from '@components/Button';
import type { SummonsSendEmailModalProps } from '@models/summons-components';
import { useSendSummonsEmailMutation } from '@pages/Summons/hooks';
import {
	parseEmailDestinatarios,
	validateEmailDestinatarios,
} from '@pages/Summons/utils/parseEmailDestinatarios';

import { ButtonsFooter, FieldInput, FieldRow, HintText } from './styles';

export function SummonsSendEmailModal({
	visible,
	onClose,
	idMovProcessoCliente,
	onSuccess,
}: SummonsSendEmailModalProps) {
	const sendEmail = useSendSummonsEmailMutation();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);

	useEffect(() => {
		if (!visible) {
			return;
		}

		setEmail('');
		setEmailError(false);
	}, [visible]);

	const handleSend = useCallback(async () => {
		const isValid = validateEmailDestinatarios(email);
		setEmailError(!isValid);

		if (!isValid) {
			return;
		}

		try {
			await sendEmail.mutateAsync({
				idMovProcessoCliente,
				destinatarios: parseEmailDestinatarios(email),
			});
			onSuccess?.();
			onClose();
		} catch {
			/* toast no hook */
		}
	}, [email, idMovProcessoCliente, onClose, onSuccess, sendEmail]);

	return (
		<BottomSheet
			visible={visible}
			onClose={onClose}
			title="Enviar por email"
			maxHeightRatio={0.32}
			footer={
				<ButtonsFooter>
					<Button
						fill
						variant="outlined"
						text="Cancelar"
						onPress={onClose}
						disabled={sendEmail.isPending}
					/>
					<Button
						fill
						variant="filled"
						text={sendEmail.isPending ? 'Enviando' : 'Enviar'}
						onPress={handleSend}
						loading={sendEmail.isPending}
					/>
				</ButtonsFooter>
			}
		>
			<FieldRow $error={emailError}>
				<FieldInput
					$error={emailError}
					autoCorrect={false}
					autoCapitalize="none"
					placeholder="Informe um email"
					value={email}
					onChangeText={value => {
						setEmail(value);
						if (emailError) {
							setEmailError(false);
						}
					}}
					onSubmitEditing={handleSend}
					keyboardType="email-address"
					returnKeyType="send"
					editable={!sendEmail.isPending}
				/>
			</FieldRow>
			<HintText>Vários emails separados por &quot;;&quot;</HintText>
		</BottomSheet>
	);
}
