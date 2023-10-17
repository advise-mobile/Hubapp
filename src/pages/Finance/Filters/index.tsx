import React, {forwardRef, useState, useCallback, useEffect} from 'react';

import {Dimensions} from 'react-native';

import {useForm, Controller} from 'react-hook-form';

import Modal from '@components/Modal';
import Datepicker from '@components/DatePicker';

import {FormatFullDateEN} from '@helpers/DateFunctions';

import {ItemProps} from '@components/MultiSelectCheckBox/types';

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

import {useKeyWordsGet} from '@services/hooks/MovimentsTrash/useMovementsTrash';

// Add Hook UseTheme para pegar o tema global addicionado
import {useTheme} from 'styled-components';


const launch = [
'Despesas',
'Despesas pagas',
'Despesas não pagas',
'Receitas recebidas',
'Receitas não recebidas',
'lançamentos Fixos',
'Lançamentos Parcelados',
'Todos lançamentos'
];

const category =[
'Pagamento de acessoria',
'Trabalho',
'Salário',
'Transporte',
'Todas as categorias'
];

const process = [
'0000503-12.2017.5.09.0014',
'0001518-...',
'0004232-...',
'Trabalhista - Kam...',
'Márcia Sophie...',
'0045069-...',
];

const person = [
'Betina da Conceição',
'Daniela Barros',
'Allana Marli Dias',
'Trabalhista - Kam...',
'Márcia Sophie...',
'0045069-...',
'Todas as pessoas',
];


export default Filters = forwardRef(
	({handleSubmitFilters, handleClearFilters}: FilterProps, ref) => {

		const [selectedLaunch, setSelectedLaunch] = useState(null);
		const [selectedCategory, setSelectedCategory] = useState(null);
		const [selectedProcess, setSelectedProcess] = useState(null);
		const [selectedPerson, setSelectedPerson] = useState(null);

		const handleLaunchClick = index => {
			setSelectedLaunch(index);
		};

		const handleCategoryClick = index => {
			setSelectedCategory(index);
		};

		const handleProcessClick = index => {
			setSelectedProcess(index);
		};

		const handlePersonClick = index => {
			setSelectedPerson(index);
		};


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
					{launch.map((launch, index) => (
						<ReleaseType
							key={index}
							onPress={() => handleLaunchClick(index)}
							style={{
								backgroundColor: colors.gray,
							}}>
							<LabelItems style={{color: selectedLaunch === index ? colors.backgroundButton : colors.iconGray}}>
								{launch}
							</LabelItems>
						</ReleaseType>
					))}
				</Releases>

				<Row>
					<Title>Categorias</Title>
				</Row>

				<Type>
					{category.map((category, index) => (
						<ReleaseType
							key={index}
							onPress={() => handleCategoryClick(index)}
							style={{
								backgroundColor: colors.gray,
							}}>
							<LabelItems style={{color: selectedCategory === index ? colors.backgroundButton : colors.iconGray}}>
								{category}
							</LabelItems>
						</ReleaseType>
					))}
				</Type>

				<Row>
					<Title>Processos</Title>
				</Row>

				<Process>
					{process.map((process, index) => (
						<ReleaseType
							key={index}
							onPress={() => handleProcessClick(index)}
							style={{
								backgroundColor: colors.gray,
							}}>
							<LabelItems style={{color: selectedProcess === index ? colors.backgroundButton : colors.iconGray}}>
								{process}
							</LabelItems>
						</ReleaseType>
					))}
				</Process>

				<Row>
					<Title>Pessoas</Title>
				</Row>

				<Person>
					{person.map((person, index) => (
						<ReleaseType
							key={index}
							onPress={() => handlePersonClick(index)}
							style={{
								backgroundColor: colors.gray,
							}}>
							<LabelItems style={{color: selectedPerson === index ? colors.backgroundButton : colors.iconGray}}>
								{person}
							</LabelItems>
						</ReleaseType>
					))}
				</Person>
			</Modal>
		);
	},
);
