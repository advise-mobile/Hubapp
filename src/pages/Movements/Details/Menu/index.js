import React, {forwardRef, useState, useCallback, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';
import RNShareFile from 'react-native-share-pdf';

import {Footer, Cancel, CancelText, Content, Item, ItemText} from './styles';

// Add Hook UseTheme para pegar o tema global addicionado
import {useTheme} from 'styled-components';

export default Menu = forwardRef((props, ref) => {
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const [movement, setMovement] = useState(props.movement);
	const [type, setType] = useState(props.type);

	useEffect(() => {
		setMovement(props.movement);
		setType(props.type);
	}, [props]);

	const share = useCallback(async () => {
		closeModal();
		setTimeout(() => props.share(), 200);
	}, [props.share]);

	const download = useCallback(() => {
		if (props.isDownloading) return;

		closeModal();

		setTimeout(() => props.download(movement), 200);
	}, [props.isDownloading, movement]);

	const openDeadline = useCallback(() => {
		closeModal();

		setTimeout(() => props.openDeadline(), 200);
	}, [colors]);

	const openConfirmation = useCallback(() => {
		closeModal();

		setTimeout(() => props.openConfirmation(), 200);
	});

	const openEmail = useCallback(() => {
		closeModal();

		setTimeout(() => props.openEmail(), 200);
	});

	const closeModal = useCallback(() => ref.current?.close(), []);

	const footer = () => (
		<Footer>
			<Cancel onPress={() => closeModal()}>
				<CancelText>Cancelar</CancelText>
			</Cancel>
		</Footer>
	);

	return (
		<Modal ref={ref} title="O que deseja?" footer={footer()}>
			<Content>
				<Item onPress={() => openDeadline()}>
					<MaterialIcons name={'event'} size={22} color={colors.fadedBlack} />
					<ItemText>Cadastrar prazo</ItemText>
				</Item>
				<Item onPress={() => openEmail()}>
					<MaterialIcons name={'mail'} size={22} color={colors.fadedBlack} />
					<ItemText>Enviar por email</ItemText>
				</Item>
				<Item onPress={() => download()}>
					{props.isDownloading ? (
						<Spinner height={22} />
					) : (
						<MaterialIcons name={'file-download'} size={22} color={colors.fadedBlack} />
					)}
					<ItemText>Baixar movimentação</ItemText>
				</Item>
				<Item onPress={() => share()}>
					<MaterialIcons name={'share'} size={22} color={colors.fadedBlack} />
					<ItemText>Compartilhar</ItemText>
				</Item>
				<Item onPress={() => openConfirmation()}>
					<MaterialIcons name={'delete'} size={22} color={colors.fadedBlack} />
					<ItemText>Excluir</ItemText>
				</Item>
			</Content>
		</Modal>
	);
});
