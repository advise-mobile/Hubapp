import React, {forwardRef, useCallback} from 'react';
import Modal from 'components/Modal';

import {
	Footer,
	Cancel,
	CancelText,
	Row,
	Label,
	Input,
	ToSave,
	ContentDescription,
	ContentType,
	LabelType,
	ContainerIcon,
	ContainerColor,
	ColorsItem,
	ToSaveText,
} from './styles';

// Add UseTheme para pegar o tema global adicionado
import {useTheme} from 'styled-components';

export default AddCategory = forwardRef((props, ref) => {
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const closeModal = useCallback(() => ref.current?.close(), []);
	const footer = () => (
		<Footer>
			<Cancel onPress={() => closeModal()}>
				<CancelText>Cancelar</CancelText>
			</Cancel>

			<ToSave onPress={() => closeModal()}>
				<ToSaveText>Salvar</ToSaveText>
			</ToSave>
		</Footer>
	);

	return (
		<Modal maxHeight={650} ref={ref} title="Cadastrar categoria" footer={footer()}>
			<ContentDescription>
				<Row>
					<Label>Nome</Label>
					<Input
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Nome"
						placeholderTextColor={colors.grayLight}
						returnKeyType="next"
					/>
				</Row>
			</ContentDescription>

			<ContentType>
				<Row>
					<Label>Tipo da Categoria</Label>
				</Row>
			</ContentType>

			<ContentType>
				<Row>
					<LabelType>Despesa -</LabelType>

					<ContainerIcon></ContainerIcon>
				</Row>
			</ContentType>

			<ContentType>
				<Row>
					<LabelType>Receita +</LabelType>
				</Row>
			</ContentType>

			<ContentType>
				<Row>
					<Label>Cor</Label>
				</Row>
			</ContentType>

			<ContentType>
				<ContainerColor>
					<ColorsItem style={[{backgroundColor: colors.colorBackGround}]} />
					<ColorsItem style={[{backgroundColor: colors.pinkRed}]} />
					<ColorsItem style={[{backgroundColor: colors.pink}]} />
					<ColorsItem style={[{backgroundColor: colors.pinkTag}]} />
					<ColorsItem style={[{backgroundColor: colors.purple}]} />
					<ColorsItem style={[{backgroundColor: colors.typecolor}]} />
				</ContainerColor>
			</ContentType>
		</Modal>
	);
});
