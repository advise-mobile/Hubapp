import React, {forwardRef, useState, useCallback, useEffect} from 'react';
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {StyleSheet, Dimensions} from 'react-native';

import {useForm, Controller} from 'react-hook-form';

import Modal from '@components/Modal';
import Datepicker from '@components/DatePicker';

import {FormatFullDateEN} from '@helpers/DateFunctions';

import {ItemProps} from '@components/MultiSelectCheckBox/types';

import {fonts} from 'assets/styles';

import {
	Title,
	Row,
	Footer,
	Cancel,
	CancelText,
	ToSave,
	ToSaveText,
	RBRow,
} from './styles';

import {FilterProps, DataFilterProps} from './types';

import {useKeyWordsGet} from '@services/hooks/MovimentsTrash/useMovementsTrash';

// Add Hook UseTheme para pegar o tema global addicionado
import {useTheme} from 'styled-components';

export default CategoryFilter = forwardRef(
	({handleSubmitFilters, handleClearFilters}: FilterProps, ref) => {
		// Variavel para usar o hook
		const colorUseTheme = useTheme();
		const {colors} = colorUseTheme;

		// - Key Words from hook called api
		const {dataKeyWords} = useKeyWordsGet();

		// - Key Words states

		const [keyWords, setKeyWords] = useState<ItemProps[]>();
		const [keyWordsCheckeds, setKeyWordsCheckeds] = useState<number[]>([]);
		const [quantitySelected, setQuantitySelected] = useState<number>(0);
		const [startAllChecked] = useState<boolean>(false);

		// - Diaries  states
		const [quantityDiariesSelected, setQuantityDiariesSelected] = useState<number>(0);

		const [dataDiariesCheckeds, setDataDiariesCheckeds] = useState<number[]>([]);

		// - Journals  states
		const [dataJournalsCheckeds, setDataJournalsCheckeds] = useState<number[]>([]);

		const [situation, setSituation] = useState<number>(0);
		const [situationtype, setSituationtype] = useState<number>(0);
		const [idTipoMovProcesso, setIdTipoMovProcesso] = useState<number | null>(null);
		const [minDate, setMinDate] = useState<string | null>(null);
		const [maxDate, setMaxDate] = useState<string | null>(null);

		const {control, handleSubmit, setValue, getValues} = useForm({
			shouldUnregister: false,
		});

		const onSubmit = (data: DataFilterProps) => {
			handleSubmitFilters(data);
		};

		const countFilters = useCallback(
			() =>
				checkNull([
					situation,
					situationtype,
					minDate,
					maxDate,
					idTipoMovProcesso,
					keyWordsCheckeds,
					dataDiariesCheckeds,
					dataJournalsCheckeds,
				]),
			[
				situation,
				situationtype,
				minDate,
				maxDate,
				idTipoMovProcesso,
				keyWordsCheckeds,
				dataDiariesCheckeds,
				dataJournalsCheckeds,
			],
		);

		const checkNull = useCallback(
			states => states.filter(state => state != null && state != 0).length,
			[],
		);

		useEffect(() => {
			setKeyWords(dataKeyWords);

			setQuantitySelected(startAllChecked ? dataKeyWords.length : 0);

			if (startAllChecked) {
				const dataChecked = dataKeyWords.map((item: ItemProps) => {
					return item.id;
				});

				setKeyWordsCheckeds(dataChecked);
				setValue('idPalavraChave', dataChecked);
			} else {
				setKeyWordsCheckeds([]);
			}
		}, [dataKeyWords]);

		const radio_props = [
			{label: 'Todos os tipos', value: null},
			{label: 'Receitas', value: true},
			{label: 'Despesas', value: true},
		];

		const radio_props_situation = [
			{label: 'Todas situações', value: true},
			{label: 'Ativo', value: true},
			{label: 'Inativo', value: true},
		];

		const clearFilters = useCallback(() => {
			setSituation(0);
			setSituationtype(0);
			setMinDate(null);
			setMaxDate(null);
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
					<RadioForm animation={true} style={{flex: 1}}>
						{radio_props.map((obj, i) => (
							<RBRow as={RadioButton} key={i}>
								<RadioButtonInput
									obj={obj}
									isSelected={situationtype == i}
									onPress={value => {
										setSituationtype(i);
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
										setSituationtype(i);
									}}
								/>
							</RBRow>
						))}
					</RadioForm>
				</Row>

				<Row>
						<Title>Situação</Title>
					</Row>

				<Row>
				<RadioForm animation={true} style={{flex: 1}}>
						{radio_props_situation.map((obj, a) => (
							<RBRow as={RadioButton} key={a}>
								<RadioButtonInput
									obj={obj}
									isSelected={situation == a}
									onPress={value => {
										setSituation(a);
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
										setSituation(a);
									}}
								/>
							</RBRow>
						))}
					</RadioForm>
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
