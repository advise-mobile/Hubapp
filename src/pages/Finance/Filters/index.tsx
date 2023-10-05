import React, {forwardRef, useState, useCallback, useEffect, Ref} from 'react';

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
	Releases,
	ReleaseType,
	LabelItems,
	Type,
	Process,
	Person,
} from './styles';

import {FilterProps, DataFilterProps} from './types';

import {
	useKeyWordsGet,
} from '@services/hooks/MovimentsTrash/useMovementsTrash';

// Add Hook UseTheme para pegar o tema global addicionado
import {useTheme} from 'styled-components';

export default Filters = forwardRef(

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
		const [startAllChecked, setStartAllChecked] = useState<boolean>(false);

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

				<Row>
					<Title>Tipo do lançamento</Title>
				</Row>

				<Releases>
						<ReleaseType>
							<LabelItems>Despesas</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Despesas pagas</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Despesas não pagas</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Receitas recebidas</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Receitas não recebidas</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>lançamentos Fixos</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Lançamentos Parcelados</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Todos lançamentos</LabelItems>
						</ReleaseType>


				</Releases>

				<Row>
					<Title>Categorias</Title>
				</Row>

				<Type>
						<ReleaseType>
							<LabelItems>Pagamento de acessoria</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Trabalho</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Salário</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Transporte</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Todas categorias</LabelItems>
						</ReleaseType>


				</Type>

				<Row>
					<Title>Processos</Title>
				</Row>

				<Process>
						<ReleaseType>
							<LabelItems>0000503-12.2017.5.09.0014</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>0001518-...</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>0004232-...</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Trabalhista - Kam...</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Márcia Sophie...</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>0045069-...</LabelItems>
						</ReleaseType>


				</Process>

				<Row>
					<Title>Pessoas</Title>
				</Row>

				<Person>
						<ReleaseType>
							<LabelItems>Betina da Conceição</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Daniela Barros</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Allana Marli Dias</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Trabalhista - Kam...</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Márcia Sophie...</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>0045069-...</LabelItems>
						</ReleaseType>

						<ReleaseType>
							<LabelItems>Todas pessoas</LabelItems>
						</ReleaseType>



				</Person>



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
