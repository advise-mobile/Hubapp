import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react';
import Modal from '@components/Modal';
import {StyleSheet} from 'react-native';
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from 'react-native-simple-radio-button';

// Add UseTheme para pegar o tema global adicionado
import {useTheme} from 'styled-components';

import {Controller, useForm} from 'react-hook-form';

import {CategoryProps} from '@pages/Finance/Category/types';

import Spinner from '@components/Spinner';

import {fonts} from 'assets/styles';

import {
	Footer,
	Cancel,
	CancelText,
	Row,
	Label,
	Input,
	RegisterText,
	Register,
	ContentName,
	ContentType,
	RBRow,
	ContentColorItem,
	ContainerColor,
	ContentColor,
	ColorsItem,
} from './styles';
import {useCategory} from '@services/hooks/Finances/useCategory';

export default AddCategory = forwardRef((props, ref) => {
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const {isSavingCategory, saveCategory} = useCategory();

	const type_props = [
		{label: 'Despesas -', value: -2},
		{label: 'Receitas +', value: -1},
	];

	const colorData = [
		{id: 1, color: colors.colorBackGround},
		{id: 2, color: colors.pinkRed},
		{id: 3, color: colors.pink},
		{id: 4, color: colors.pinkTag},
		{id: 5, color: colors.purple},
		{id: 6, color: colors.typecolor},
	];

	const onSubmit = (data: CategoryProps) => {
		const register = {
			itens: [data],
		};

		saveCategory(register, () => closeModal());
	};

	const {
		control,
		handleSubmit,
		formState: {errors},
	} = useForm({
		shouldUnregister: false,
	});

	const RBLabel = stylesRBLabel(colors);

	const [type, setType] = useState<number | null>(null);

	const [selectedColor, setSelectedColor] = useState(null);

	const closeModal = useCallback(() => ref.current?.close(), props);

	const footer = () =>
		isSavingCategory ? (
			<Spinner height={15} color={colors.primary} transparent={true} />
		) : (
			<Footer>
				<Cancel onPress={() => closeModal()}>
					<CancelText>Cancelar</CancelText>
				</Cancel>

				<Register onPress={handleSubmit(onSubmit)}>
					<RegisterText>Salvar</RegisterText>
				</Register>
			</Footer>
		);

	return (
		<Modal
			maxHeight={650}
			onClose={props.onClose}
			ref={ref}
			title="Cadastrar categoria"
			footer={footer()}>
			<ContentName isError={errors.nomeCategoriaFinanceiro}>
				<Row>
					<Label>Nome</Label>
					<Controller
						name="nomeCategoriaFinanceiro"
						rules={{
							required: true,
						}}
						control={control}
						defaultValue={null}
						render={({onChange}) => (
							<Input
								autoCorrect={false}
								autoCapitalize="none"
								placeholder="Nome"
								placeholderTextColor={
									errors.nomeCategoriaFinanceiro ? colors.red200 : colors.grayLight
								}
								returnKeyType="next"
								onChangeText={value => onChange(value)}
							/>
						)}
					/>
				</Row>
			</ContentName>

			<ContentType>
				<Label>Tipo da categoria</Label>

				<Controller
					name="idTipoCategoriaFinanceiro"
					rules={{
						required: true,
					}}
					control={control}
					defaultValue={null}
					render={({onChange}) => (
						<RadioForm animation={true} style={{flex: 1}}>
							{type_props.map((obj, i) => (
								<RBRow as={RadioButton} key={i}>
									<RadioButtonInput
										obj={obj}
										isSelected={type === i}
										onPress={() => {
											setType(i);
											onChange(obj.value);
										}}
										borderWidth={1}
										buttonInnerColor={colors.primary}
										buttonOuterColor={colors.primary}
										buttonSize={12}
										buttonOuterSize={18}
									/>

									<RadioButtonLabel
										isError={errors.idTipoCategoriaFinanceiro && type === null}
										obj={obj}
										labelStyle={[
											RBLabel.label,
											{
												color:
													errors.idTipoCategoriaFinanceiro && type === null
														? colors.red200
														: colors.textPrimary,
											},
										]}
										onPress={() => {
											setType(i);
											onChange(obj.value);
										}}
									/>
								</RBRow>
							))}
						</RadioForm>
					)}
				/>
			</ContentType>

			<ContentColor>
				<Label>Cor </Label>

				<Controller
					name="corCategoria"
					rules={{
						required: true,
					}}
					control={control}
					defaultValue={null}
					render={({onChange}) => (
						<ContentColorItem>
							<ContainerColor>
								{colorData.map(({id, color}) => (
									<ColorsItem
										key={id}
										isError={errors.corCategoria}
										isSelected={selectedColor === color}
										backgroundColor={color}
										onPress={() => {
											setSelectedColor(color);
											onChange(color);
										}}
									/>
								))}
							</ContainerColor>
						</ContentColorItem>
					)}
				/>
			</ContentColor>
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
