import React, {forwardRef, useCallback, useRef, useState} from 'react';

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
	ContentName,
	ContentType,
	ContainerColor,
	ColorsItem,
	ToSaveText,
	RBRow,
	Color,
	ContentColor,
} from './styles';

// Add UseTheme para pegar o tema global adicionado
import {useTheme} from 'styled-components';
import {useForm, Controller} from 'react-hook-form';
import {useCategory} from '@services/hooks/Finances/useCategory';

export default AddCategory = forwardRef((props, ref) => {
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const [type, setType] = useState<number>(null);
	const [selectedColor, setSelectedColor] = useState(null);
	const {isLoadingCategory, addcategorylaunch} = useCategory();

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

	const clearFilters = useCallback(() => {
		setType(0);
	}, [type]);

	const {
		control,
		handleSubmit,
		setError,
		formState: {errors},
	} = useForm({
		shouldUnregister: false,
	});


	const RBLabel = stylesRBLabel(colors);

	const onSubmit = (data:any) => {
		console.log("=== onSubmit", data);
    // const register = {
    //     itens: [
    //         {
    //             nomeCategoriaFinanceiro: data.nomeCategoriaFinanceiro,
    //             idTipoCategoriaFinanceiro: type_props[type].value,
    //             corCategoria: selectedColor,
    //         },
    //     ],
    // };

    // if (!Object.keys(errors).length) {
    //     console.log('=== register category', register);
    //     addcategorylaunch(register, () => closeModal());
    // }

};



	const closeModal = useCallback(() => ref.current?.close(), props);

	const footer = () => (
		<Footer>
			<Cancel onPress={() => closeModal()}>
				<CancelText>Cancelar</CancelText>
			</Cancel>

{/* <ToSave onPress={()=> alert("teu cu")}> */}
			<ToSave onPress={()=> handleSubmit(onSubmit)}>
				<ToSaveText>Salvar</ToSaveText>
			</ToSave>
		</Footer>
	);

	return (
		<Modal
			maxHeight={750}
			ref={ref}
			title="Cadastrar categoria"
			footer={footer()}
			clear={clearFilters}
			onClose={props.onClose}>
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
				<Row>
					<Label>Tipo da Categoria</Label>
				</Row>
			</ContentType>

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
													: colors.grayLight,
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

			<Color>
				<Row>
					<Label>Cor </Label>
				</Row>
			</Color>

			<Controller
				name="corCategoria"
				rules={{
					required: true,
				}}
				control={control}
				defaultValue={null}
				render={({onChange}) => (
					<ContentColor>
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
					</ContentColor>
				)}
			/>
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
