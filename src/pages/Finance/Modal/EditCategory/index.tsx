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

export default EditCategory = forwardRef((props, ref) => {
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const {item} = props;

	const [nomeCategoriaFinanceiro, setNomeCategoriaFinanceiro] = useState<string>();
	const [idTipoCategoriaFinanceiro, setIdTipoCategoriaFinanceiro] = useState<number>();
	const [corCategoria, setCorCategoria] = useState<string>();

	const {isSavingCategory, updateCategory} = useCategory();

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
		const updatedCategory = {
			corCategoria: data.corCategoria,
			idCategoriaFinanceiro: item.idCategoriaFinanceiro,
			idTipoCategoriaFinanceiro: data.idTipoCategoriaFinanceiro,
			nomeCategoriaFinanceiro: data.nomeCategoriaFinanceiro,
		};

		const register = {
			itens: [updatedCategory],
		};

		updateCategory(register, () => props.onClose());
	};

	const {
		control,
		handleSubmit,
		formState: {errors},
		setValue,
	} = useForm({
		shouldUnregister: false,
	});

	const RBLabel = stylesRBLabel(colors);

	const footer = () =>
		isSavingCategory ? (
			<Spinner height={15} color={colors.primary} transparent={true} />
		) : (
			<Footer>
				<Cancel onPress={() => props.onClose()}>
					<CancelText>Cancelar</CancelText>
				</Cancel>

				<Register onPress={handleSubmit(onSubmit)}>
					<RegisterText>Salvar</RegisterText>
				</Register>
			</Footer>
		);

	useEffect(() => {
		setNomeCategoriaFinanceiro(item.nomeCategoriaFinanceiro);
		setIdTipoCategoriaFinanceiro(item.tipoCategoriaFinanceiro.idTipoCategoriaFinanceiro);
		setCorCategoria(item.corCategoria);

		setValue('nomeCategoriaFinanceiro', item.nomeCategoriaFinanceiro);
		setValue('idTipoCategoriaFinanceiro', item.tipoCategoriaFinanceiro.idTipoCategoriaFinanceiro);
		setValue('corCategoria', item.corCategoria);
	}, [item]);

	return (
		<Modal maxHeight={650} ref={ref} title="Alterar categoria" footer={footer()}>
			<ContentName isError={errors.nomeCategoriaFinanceiro}>
				<Row>
					<Label>Nome</Label>
					<Controller
						name="nomeCategoriaFinanceiro"
						rules={{
							required: true,
						}}
						defaultValue={item.nomeCategoriaFinanceiro}
						control={control}
						render={({onChange}) => (
							<Input
								value={nomeCategoriaFinanceiro}
								autoCorrect={false}
								autoCapitalize="none"
								placeholder={'Nome'}
								placeholderTextColor={
									errors.nomeCategoriaFinanceiro ? colors.red200 : colors.grayLight
								}
								returnKeyType="next"
								onChangeText={value => {
									onChange(value);
									setNomeCategoriaFinanceiro(value);
								}}
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
										value={idTipoCategoriaFinanceiro}
										obj={{...obj, value: obj.value}}
										isSelected={idTipoCategoriaFinanceiro === obj.value}
										onPress={() => {
											setIdTipoCategoriaFinanceiro(obj.value);
											onChange(obj.value);
										}}
										borderWidth={1}
										buttonInnerColor={colors.primary}
										buttonOuterColor={colors.primary}
										buttonSize={12}
										buttonOuterSize={18}
									/>
									<RadioButtonLabel
										isError={errors.idTipoCategoriaFinanceiro && idTipoCategoriaFinanceiro === null}
										obj={obj}
										labelStyle={[
											RBLabel.label,
											{
												color:
													errors.idTipoCategoriaFinanceiro && idTipoCategoriaFinanceiro === null
														? colors.red200
														: colors.textPrimary,
											},
										]}
										onPress={() => {
											setIdTipoCategoriaFinanceiro(obj.value);
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
					render={({value, onChange, ...fieldProps}) => (
						<ContentColorItem>
							<ContainerColor>
								{colorData.map(({id, color}) => (
									<ColorsItem
										key={id}
										isError={errors.corCategoria}
										isSelected={corCategoria.toUpperCase() === color}
										backgroundColor={color}
										onPress={() => {
											onChange(color);
											setCorCategoria(color);
										}}></ColorsItem>
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
