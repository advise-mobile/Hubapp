import React, {forwardRef, useState, useCallback, useEffect} from 'react';

import {StyleSheet, Dimensions} from 'react-native';

import {useForm, Controller} from 'react-hook-form';

import Modal from '@components/Modal';
import Datepicker from '@components/DatePicker';

import {FormatFullDateEN} from '@helpers/DateFunctions';

import {ItemProps} from '@components/MultiSelectCheckBox/types';

import {fonts} from 'assets/styles';

import {
	Title,
	Label,
	Row,
	Column,
	Footer,
	Cancel,
	CancelText,
	ToSave,
	ToSaveText,
	PeriodItemsContainer,
	PeriodItems,
	LabelPeriod,
} from './styles';

import {FilterProps, DataFilterProps} from './types';

import {useKeyWordsGet} from '@services/hooks/MovimentsTrash/useMovementsTrash';

// Add Hook UseTheme para pegar o tema global addicionado
import {useTheme} from 'styled-components';

export default CashFlowFilter = forwardRef(
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
					minDate,
					maxDate,
					idTipoMovProcesso,
					keyWordsCheckeds,
					dataDiariesCheckeds,
					dataJournalsCheckeds,
				]),
			[
				situation,
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

		const clearFilters = useCallback(() => {
			handleClearFilters();
			setSituation(0);
			setMinDate(null);
			setMaxDate(null);

			setValue('DataMovimentoInicio', null);
			setValue('DataMovimentoFim', null);

			setValue('idTipoMovProcesso', null);

			setValue('Lido', null);

			setIdTipoMovProcesso(null);

			// - reset diaries
			setDataDiariesCheckeds([]);
			setQuantityDiariesSelected(0);
			setValue('idDiario', []);

			// - reset keywords
			setQuantitySelected(0);
			setKeyWordsCheckeds([]);
			setValue('idPalavraChave', []);

			// - reset journals
			setDataJournalsCheckeds([]);
			setQuantityDiariesSelected(0);
			setValue('idJournals', []);
		}, []);

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
					<Title>Período</Title>
				</Row>

				<PeriodItemsContainer>
					<PeriodItems>
					<LabelPeriod>Hoje</LabelPeriod>
					</PeriodItems>

					<PeriodItems>
					<LabelPeriod>Esta semana</LabelPeriod>
					</PeriodItems>

					<PeriodItems>
					<LabelPeriod>Este mês</LabelPeriod>
					</PeriodItems>

					<PeriodItems>
					<LabelPeriod>Este ano</LabelPeriod>
					</PeriodItems>
				</PeriodItemsContainer>



				<Row>
					<Column>
						<Label>De</Label>
						<Controller
							name="DataMovimentoInicio"
							control={control}
							defaultValue={null}
							render={({onChange}) => (
								<Datepicker
									date={minDate}
									enabled={true}
									title="dd/mm/aaaa"
									style={{maxWidth: 100}}
									maxDate={maxDate || undefined}
									onDateChange={date => {
										setMinDate(date), onChange(FormatFullDateEN(date));
									}}
								/>
							)}></Controller>
					</Column>
					<Column>
						<Label>Até</Label>
						<Controller
							name="DataMovimentoFim"
							control={control}
							defaultValue={null}
							render={({onChange}) => (
								<Datepicker
									date={maxDate}
									enabled={true}
									title="dd/mm/aaaa"
									style={{maxWidth: 100}}
									minDate={minDate || undefined}
									onDateChange={date => {
										setMaxDate(date), onChange(FormatFullDateEN(date));
									}}
								/>
							)}></Controller>
					</Column>
				</Row>
			</Modal>
		);
	},
);

const stylePickerSelectStyles = colors =>
	StyleSheet.create({
		inputIOS: {
			fontSize: 16,
			flex: 1,
			color: colors.fadedBlack,
			fontFamily: fonts.circularStdBook,
			borderBottomWidth: 1,
			borderBottomColor: colors.grayLighter,
		},
		inputAndroid: {
			height: 20,
			fontSize: 16,
			color: colors.fadedBlack,
			fontFamily: fonts.circularStdBook,
			flex: 1,
			borderBottomWidth: 1,
			borderBottomColor: colors.grayLighter,
		},
	});

const stylesRBLabel = colors =>
	StyleSheet.create({
		label: {
			color: colors.grayDarker,
			fontFamily: fonts.circularStdBook,
			fontSize: fonts.regular,
		},
	});
