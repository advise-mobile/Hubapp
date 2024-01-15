import React, {forwardRef, useState, useCallback, useEffect} from 'react';

import {Dimensions} from 'react-native';

import {useForm, Controller} from 'react-hook-form';

import Modal from '@components/Modal';
import Datepicker from '@components/DatePicker';

import {FormatFullDateEN} from '@helpers/DateFunctions';

import {ItemProps} from '@components/MultiSelectCheckBox/types';

import { DataPopulateCategoriesProps, DataPopulateProcessProps, DataPopulatePeopleProps } from './types';

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
	ContainerCategories,
	Process,
	Person,
} from './styles';

import {FilterProps, DataFilterProps} from './types';

import {useKeyWordsGet} from '@services/hooks/MovimentsTrash/useMovementsTrash';

// Add Hook UseTheme para pegar o tema global addicionado
import {useTheme} from 'styled-components';
import { useGetPopulateCategories } from '@services/hooks/Finances/useCategories';
import { useGetPopulateProcess } from '@services/hooks/Finances/useProcess';
import { useGetPopulatePeople } from '@services/hooks/Finances/usePeople';


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



export default Filters = forwardRef(
	({handleSubmitFilters, handleClearFilters}: FilterProps, ref) => {


		const {isLoading, getCategoriesData} = useGetPopulateCategories();
		const {isLoadingProcess, getProcessData} = useGetPopulateProcess();
		const {isLoadingPeople, getPeopleData} = useGetPopulatePeople();
		

		const [selectedLaunch, setSelectedLaunch] = useState(null);
		const [selectedCategory, setSelectedCategory] = useState(null);
		const [selectedProcess, setSelectedProcess] = useState(null);
		const [selectedPerson, setSelectedPerson] = useState(null);

		const [categories, setCategories] = useState<DataPopulateCategoriesProps[]>([]);
		const [process, setProcess] = useState<DataPopulateProcessProps[]>([]);
		const [people, setPeople] = useState<DataPopulatePeopleProps[]>([]);

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


		// Categories from hook called api
		useEffect(() => {
			fetchDataCategories();
			fetchDataProcess();
			fetchDataPeople();
		}, []);
	
		const fetchDataCategories = async () => {
			try {
				const responseCategories = await getCategoriesData();
				setCategories(responseCategories);
			} catch (error) {}
		};

		const fetchDataProcess = async () => {
			try {
				const responseProcess = await getProcessData();
				setProcess(responseProcess);
			} catch (error) {}
		};

		const fetchDataPeople = async () => {
			try {
				const responsePeople = await getPeopleData();
				console.log("=== responsePeople",responsePeople);
				setPeople(responsePeople);
			} catch (error) {}
		};
		


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
			console.log("===",data);
			//handleSubmitFilters(data);
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

				<ContainerCategories>
					{categories.map((category, index) => (
						<ReleaseType
							key={index}
							onPress={() => handleCategoryClick(category.idCategoriaFinanceiro)}
							style={{
								backgroundColor: colors.gray,
							}}>
							<LabelItems style={{color: selectedCategory === category.idCategoriaFinanceiro ? colors.backgroundButton : colors.iconGray}}>
								{category.nomeCategoriaFinanceiro}
							</LabelItems>
						</ReleaseType>
					))}
				</ContainerCategories>

				<Row>
					<Title>Processos</Title>
				</Row>

				<Process>
					{process.map((process, index) => (
						<ReleaseType
							key={index}
							onPress={() => handleProcessClick(process.id)}
							style={{
								backgroundColor: colors.gray,
							}}>
							<LabelItems style={{color: selectedProcess === process.id ? colors.backgroundButton : colors.iconGray}}>
								{process.numeroProcesso}
							</LabelItems>
						</ReleaseType>
					))}
				</Process>

				<Row>
					<Title>Pessoas</Title>
				</Row>

				<Person>
					{people.map((person) => (
						<ReleaseType
							key={person.idPessoaCliente}
							onPress={() => handlePersonClick(person.idPessoaCliente)}
							style={{
								backgroundColor: colors.gray,
							}}>
							<LabelItems style={{color: selectedPerson === person.idPessoaCliente ? colors.backgroundButton : colors.iconGray}}>
								{person.nomePessoaCliente}
							</LabelItems>
						</ReleaseType>
					))}
				</Person>
			</Modal>
		);
	},
);
