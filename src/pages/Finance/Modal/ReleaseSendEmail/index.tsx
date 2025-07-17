import React, {forwardRef, useCallback, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

import Modal from '@components/Modal';

import {
	Footer,
	Cancel,
	CancelText,
	Label,
	LabelInfo,
	RowLabel,
	ContentEmail,
	InputDescription,
	RegisterText,
	Register,
} from './styles';

// Add UseTheme para pegar o tema global adicionado
import {useTheme} from 'styled-components';

import {useRelease} from '@services/hooks/Finances/useReleases';

export default ReleaseSendEmail = forwardRef((props, ref) => {
	const navigation = useNavigation();

	const {item, onClose} = props;

	// // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	// import add function hook
	const {isLoadingRelease, sendReleaseEmail} = useRelease();

	// Set Durantion starting empty array
	const [emails, setEmails] = useState('');

	const footer = () => (
		<Footer>
			<Cancel onPress={() => handleOnClose()}>
				<CancelText>Cancelar</CancelText>
			</Cancel>

			<Register onPress={() => handleSubmit()}>
				<RegisterText>Enviar</RegisterText>
			</Register>
		</Footer>
	);

	const handleSubmit = () => {
		const register = {
			idParcela: item.idParcelaFinanceiro,
			destinatarios: emails.split(';'),
		};
		sendReleaseEmail(register, () => handleOnClose());
	};

	const handleOnClose = useCallback(() => {
		onClose();
	}, [onClose]);

	return (
		<Modal
			maxHeight={650}
			onClose={handleOnClose}
			ref={ref}
			title={'Destinatários'}
			footer={footer()}>
			<ContentEmail>
				<RowLabel>
					<Label>Emails</Label>
					<LabelInfo>(separados por ";")</LabelInfo>
				</RowLabel>

				<InputDescription
					value={emails}
					autoCorrect={false}
					autoCapitalize="none"
					placeholder="Digite os emails separados por ';'"
					placeholderTextColor={colors.grayLight}
					onChangeText={value => setEmails(value)}
					returnKeyType="next"
					onSubmitEditing={() => handleSubmit()}
				/>
			</ContentEmail>
		</Modal>
	);
});
