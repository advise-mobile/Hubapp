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

import {useGetCashFlow} from '@services/hooks/Finances/useCashFlow';

export default CashFlowSendEmail = forwardRef((props, ref) => {
	const navigation = useNavigation();

	const {filters, onClose} = props;

	// // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	// import add function hook
	const {isLoadingCashFlow, sendCashFlowEmail} = useGetCashFlow();

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
			period: filters.period,
			dataSaldo: filters.dataSaldo,
			dataFim: filters.dataFim,
			destinatarios: emails.split(';'),
		};

		sendCashFlowEmail(register, () => handleOnClose());
	};

	const handleOnClose = useCallback(() => {
		onClose();
	}, props);

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
