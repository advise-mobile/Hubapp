import React, {forwardRef, useState, useCallback, useEffect} from 'react';
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {StyleSheet, Dimensions} from 'react-native';

import {useForm, Controller} from 'react-hook-form';

import Modal from '@components/Modal';

import {fonts} from 'assets/styles';

import {Title, Row, Footer, Cancel, CancelText, ToSave, ToSaveText, RBRow} from './styles';

import {FilterProps, DataFilterProps, TypesCategoryFilterProps} from './types';

// Add Hook UseTheme para pegar o tema global adicionado
import {useTheme} from 'styled-components';
import {useGetFilterCategory} from '@services/hooks/Finances/useFilterCategory';

export default CategoryFilter = forwardRef( ({handleSubmitFilters, handleClearFilters}: FilterProps, ref) => {
		
		// Variavel para usar o hook theme
		const colorUseTheme = useTheme();
		const {colors} = colorUseTheme;

		const [situation, setSituation] = useState<boolean | null>(null);
		const [type, setType] = useState<number | null>(null);

		const {control, handleSubmit, setValue} = useForm({
			shouldUnregister: false,
		});

		const onSubmit = async (data: DataFilterProps) => {
			handleSubmitFilters(data);
		};

		const countFilters = useCallback(() => checkNull([situation, type]), [situation, type]);

		const checkNull = useCallback(
			states => states.filter(state => state != null && state != 0).length,
			[],
		);

		// chamando o hook
		const {isLoadingFilterCategory, getFilterCategoryData} = useGetFilterCategory();

		const typesCategoryAllOption = {
			value: null,
			label: 'Todos os tipos',
		};

		const [typesCategory, setTypeCategory] = useState<TypesCategoryFilterProps[]>([
			typesCategoryAllOption,
		]);

		useEffect(() => {
		fetchFilterCategory();
		}, []);

		const fetchFilterCategory = async () => {
			try {
				const responseFilterCategory = await getFilterCategoryData();
				const typesCategoryOptimized = responseFilterCategory.map(obj => {
					return {
						value: obj.idTipoCategoriaFinanceiro,
						label: obj.nomeTipoCategoriaFinanceiro,
					};
				});
				setTypeCategory([typesCategoryAllOption, ...typesCategoryOptimized]);
			} catch (error) {}
		};

		const radio_props_situation = [
			{label: 'Todas situações', value: null},
			{label: 'Ativo', value: true},
			{label: 'Inativo', value: false},
		];

		const clearFilters = useCallback(() => {
			handleClearFilters();
			setSituation(null);
			setType(null);

			setValue("type",null);
			setValue("situation",null);
		}, []);

		const RBLabel = stylesRBLabel(colors);

		const closeModal = useCallback(() => ref.current?.close(), []);

		const footer = () => (
			<Footer>
				<Cancel onPress={() => closeModal()}>
					<CancelText>Cancelar</CancelText>
				</Cancel>

				<ToSave onPress={handleSubmit(onSubmit)}>
					<ToSaveText>Ver resultados</ToSaveText>
				</ToSave>
			</Footer>
		);

		const heightScreen = Dimensions.get('window').height;

		const modalHeight = (heightScreen * 70) / 100;

		return (
			<Modal
				maxHeight={modalHeight}
				ref={ref}
				footer={footer()}
				title="Filtros"
				filters={countFilters()}
				clear={clearFilters}>
					<Row>
						<Title>Tipo</Title>
					</Row>
					
					<Row>
						<Controller
							name="type"
							control={control}
							defaultValue={null}
							render={({ onChange }) => (
							<RadioForm animation={true} style={{ flex: 1 }}>
								{
								typesCategory.map((obj, i) => (
									<RBRow as={RadioButton} key={i}>
									<RadioButtonInput
										obj={obj}
										isSelected={type == obj.value}
										onPress={value => {
											setType(value);
										onChange(value);
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
											setType(value);
										onChange(value);
										}}
									/>
									</RBRow>
								))
								}
							</RadioForm>
							)}>
						</Controller>
					</Row>

					<Row>
						<Title>Situação</Title>
					</Row>

					<Row>
						<Controller
							name="situation"
							control={control}
							defaultValue={null}
							render={({ onChange }) => (
							<RadioForm animation={true} style={{flex: 1}}>
								{radio_props_situation.map((obj, i) => (
									<RBRow as={RadioButton} key={i}>
										<RadioButtonInput
											obj={obj}
											isSelected={situation == obj.value}
											onPress={value => {
												onChange(value);
												setSituation(value);
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
												onChange(value);
												setSituation(value);
											}}
										/>
									</RBRow>
								))}
							</RadioForm>
							)}>
						</Controller>
					</Row>
			</Modal>
		);
	},
);

const stylesRBLabel = colors =>
	StyleSheet.create({
		label: {
			color: colors.grayDarker,
			fontFamily: fonts.circularStdBook,
			fontSize: fonts.regular,
		},
	});
