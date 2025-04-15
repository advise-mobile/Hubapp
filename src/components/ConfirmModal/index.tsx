import React, {forwardRef} from 'react';

import Modal from '@components/Modal';

import Spinner from '@components/Spinner';

import {ConfirmModalProps} from './types';

import {Footer, Cancel, CancelText, Submit, SubmitText, Content, Message} from './styles';

// Add Hook UseTheme para pegar o tema global addicionado
import {useTheme} from 'styled-components';

export default ConfirmModal = forwardRef((props: ConfirmModalProps, ref) => {
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const footer = () => (
		<Footer>
			<Cancel onPress={() => props.onCancel()}>
				<CancelText>{props.cancelText}</CancelText>
			</Cancel>
			<Submit onPress={() => props.onSubmit()}>
				{props.loading ? (
					<Spinner transparent={true} color={colors.white} height="14" />
				) : (
					<SubmitText>{props.submitText}</SubmitText>
				)}
			</Submit>
		</Footer>
	);

	return (
		<Modal ref={ref} title={props.title} footer={footer()}>
			<Content>
				<Message>{props.description}</Message>
			</Content>
		</Modal>
	);
});
