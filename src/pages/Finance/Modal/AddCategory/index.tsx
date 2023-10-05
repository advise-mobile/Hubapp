import React, {forwardRef, useCallback, useState} from 'react';

import Modal from 'components/Modal';
import {StyleSheet} from 'react-native';

import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from 'react-native-simple-radio-button';

import {fonts} from 'assets/styles';

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
	ContainerColor,
	ColorsItem,
	ToSaveText,
	RBRow,
} from './styles';

// Add UseTheme para pegar o tema global adicionado
import {useTheme} from 'styled-components';

export default AddCategory = forwardRef((props, ref) => {
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const [type, setType] = useState<number>(null);


	const type_props =
	[
		{label: 'Despesas -', value: false},
		{label: 'Receitas +', value: false},
	];

	const clearFilters = useCallback(() => {
		setType(0);
	}, [type]);

	const RBLabel = stylesRBLabel(colors);

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
		<Modal maxHeight={750} ref={ref} title="Cadastrar categoria" footer={footer()} clear={clearFilters}>
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


					<RadioForm animation={true} style={{flex: 1}}>
						{type_props.map((obj, i) => (
							<RBRow as={RadioButton} key={i}>
								<RadioButtonInput
									obj={obj}
									isSelected={type === i}
									onPress={value => {
										setType(i);
									}}
									borderWidth={1}
									buttonInnerColor={colors.primary}
									buttonOuterColor={colors.primary}
									buttonSize={12}
									buttonOuterSize={18}
								/>
								<RadioButtonLabel
									obj={obj}
									labelStyle={RBLabel.label}
									onPress={value => {
										setType(i);
									}}
								/>
							</RBRow>
						))}
					</RadioForm>


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

const stylesRBLabel = colors =>
	StyleSheet.create({
		label: {
			color: colors.BlackInactive,
			fontFamily: fonts.circularStdBook,
			fontSize: fonts.regular,
		},
	});
