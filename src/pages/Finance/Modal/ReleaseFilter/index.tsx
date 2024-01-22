import React, {forwardRef, useState, useCallback, useEffect} from 'react';

import {Dimensions} from 'react-native';

import {useForm, Controller} from 'react-hook-form';

import Modal from '@components/Modal';

import Datepicker from '@components/DatePicker';

import {FormatFullDateEN,FormatFinalDateEN} from '@helpers/DateFunctions';

import { removeNull } from '@helpers/functions';


import Spinner from '@components/Spinner';

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
	ContainerCategories,
	Process,
	Person,
} from './styles';

import {FilterProps, DataFilterProps} from './types';

// Add Hook UseTheme para pegar o tema global addicionado
import {useTheme} from 'styled-components';
import { useGetPopulateCategories } from '@services/hooks/Finances/useCategories';
import { useGetPopulateProcess } from '@services/hooks/Finances/useProcess';
import { useGetPopulatePeople } from '@services/hooks/Finances/usePeople';


const launch = [
	{
		id:0,
		label:'Todos os lançamentos',
		debitoCredito:"null"
	},
	{
		id:1,
		label:"Despesas",
		debitoCredito:"D"
	},
	{
		id:2,
		label:'Despesas pagas',
		debitoCredito:"D"
	},
	{
		id:3,
		label:'Despesas não pagas',
		debitoCredito:"D"
	},
	{
		id:8,
		label:'Receitas ',
		debitoCredito:"C"
	},
	{
		id:4,
		label:'Receitas recebidas',
		debitoCredito:"C"
	},
	{
		id:5,
		label:'Receitas não recebidas',
		debitoCredito:"C"
	},
	{
		id:6,
		label:'Lançamentos Fixos',
		debitoCredito:"D"
	},
	{
		id:7,
		label:'Lançamentos Parcelados',
		debitoCredito:"D"
	}
];

export default Filters = forwardRef(
	({handleSubmitFilters, handleClearFilters}: FilterProps, ref) => {

		const {isLoading, getCategoriesData} = useGetPopulateCategories();
		const {isLoadingProcess, getProcessData} = useGetPopulateProcess();
		const {isLoadingPeople, getPeopleData} = useGetPopulatePeople();
		
		const [idDebitCredit, setIdDebitCredit] = useState<number | null>(null);
		const [idCategory, setIdCategory] = useState<number | null >(null);
		const [idProcess, setIdProcess] = useState<number | null>(null);
		const [idPeople, setIdPeople] = useState<number | null >(null);
		const [minDate, setMinDate] = useState<string | null>(null);
		const [maxDate, setMaxDate] = useState<string | null>(null);

		

		const [categories, setCategories] = useState<DataPopulateCategoriesProps[]>([]);
		const [process, setProcess] = useState<DataPopulateProcessProps[]>([]);
		const [people, setPeople] = useState<DataPopulatePeopleProps[]>([]);

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
				setPeople(responsePeople);
			} catch (error) {}
		};

		const handleLaunchClick = (idLaunch:number) => {
		
			// busca o debitCredit pelo id
			const currentDebitCredit = launch.find(item => item.id === idLaunch);
			setIdDebitCredit(idLaunch);

			setValue('repeticaoFixa', false);	
			setValue('parcelado', false);

			if(idLaunch === 6){
				setValue('repeticaoFixa', true);	
				return
			}
			if(idLaunch === 7){
				setValue('parcelado', true);	
				return
			}

		
			setValue('DebitoCredito', currentDebitCredit?.debitoCredito);
		};

		const handleCategoryClick = (idCategory:number) => {
			setIdCategory(idCategory);
		};

		const handleProcessClick = (idProcess:number | null) => {	
			setIdProcess(idProcess);
		};

		const handlePeopleClick = (idPeople: number | null) => {
			setIdPeople(idPeople);
		};

		const {control, handleSubmit, setValue, getValues} = useForm({
			shouldUnregister: false,
		});

		const onSubmit = (data: DataFilterProps) => {
			handleSubmitFilters(removeNull(data));
		};

		const countFilters = useCallback(
			() =>
				checkNull([
					minDate,
					maxDate,
					idDebitCredit,
					idCategory,
					idProcess,
					idPeople,
				]),
			[
				minDate,
				maxDate,
				idDebitCredit,
				idCategory,
				idProcess,
				idPeople,
			],
		);

		const checkNull = useCallback(
			states => states.filter(state => state != null && state != 0).length,
			[],
		);

		const clearFilters = useCallback(() => {
			handleClearFilters();

			setMinDate(null);
			setMaxDate(null);
			setValue('dataVencimento', null);
			setValue('dataVencimentoFim', null);

			setValue('DebitoCredito', null);
			setIdDebitCredit(null);

			setIdProcess(null);
			setValue('idProcesso', null);

			setIdCategory(null);
			setValue('idCategoria', null);

			setIdPeople(null);
			setValue('idPessoaCliente', null);

			setValue('parcelado', null);	
			setValue('repeticaoFixa', null);	

		}, []);

		const closeModal = useCallback(() => ref.current?.close(), []);

		const footer = () => 
			
				
			<Footer>
				<Cancel onPress={() => closeModal()}>
					<CancelText>Cancelar</CancelText>
				</Cancel>

				<ToSave onPress={handleSubmit(onSubmit)}>
					<ToSaveText>Ver resultados</ToSaveText>
				</ToSave>
				
				
			</Footer>
		;

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
							name="dataVencimento"
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
							name="dataVencimentoFim"
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
										setMaxDate(date), onChange(FormatFinalDateEN(date));
									}}
								/>
							)}></Controller>
					</Column>
				</Row>

				<Row>
					<Title>Tipo do lançamento</Title>
				</Row>

				<Releases>
					<Controller
							name="DebitoCredito"
							control={control}
							defaultValue={null}
							render={({onChange}) => (
							<>
								{launch.map((item) => (
									<ReleaseType
										key={item.id}
										onPress={() => handleLaunchClick(item.id)}
										style={{
											backgroundColor: colors.gray,
										}}>
										<LabelItems style={{color: idDebitCredit === item.id ? colors.backgroundButton : colors.iconGray}}>
											{item.label}
										</LabelItems>
									</ReleaseType>
								))}
							</>

							)}>
					</Controller>
				</Releases>

				<Row>
					<Title>Categorias</Title>
				</Row>

				{ isLoading ? (
					<Spinner height={50} color={colors.primary} transparent={true} />

				) : 
				(
				<ContainerCategories>
				<Controller
							name="idCategoria"
							control={control}
							defaultValue={null}
							render={({onChange}) => (
								<>
									{categories.map((category, index) => (
										<ReleaseType
											key={index}
											onPress={() => {
												handleCategoryClick(category.idCategoriaFinanceiro)
												onChange(category.idCategoriaFinanceiro);
											}}
											style={{
												backgroundColor: colors.gray,
											}}>
											<LabelItems style={{color: idCategory === category.idCategoriaFinanceiro ? colors.backgroundButton : colors.iconGray}}>
												{category.nomeCategoriaFinanceiro}
											</LabelItems>
										</ReleaseType>
									))}
								</>

						)}>
								</Controller>

					
				</ContainerCategories>
				)}


				<Row>
					<Title>Processos</Title>
				</Row>

				{ isLoadingProcess ? (
					<Spinner height={50} color={colors.primary} transparent={true} />
					
				) : (
				<Process>
				<Controller
							name="idProcesso"
							control={control}
							defaultValue={null}
							render={({onChange}) => (
								<>
								{process.map((process, index) => (
									<ReleaseType
										key={index}
										onPress={() => {
											handleProcessClick(process.idProcesso),
											onChange(process.idProcesso)
										}}
										style={{
											backgroundColor: colors.gray,
										}}>
										<LabelItems style={{color: idProcess === process.idProcesso ? colors.backgroundButton : colors.iconGray}}>
											{process.numeroProcesso}
										</LabelItems>
									</ReleaseType>
								))}
					</>

					)}>
							</Controller>
				</Process>
				)}

				<Row>
					<Title>Pessoas</Title>
				</Row>

				{ isLoadingPeople ? (
					<Spinner height={50} color={colors.primary} transparent={true} />
					
				) : (
				<Person>
				<Controller
							name="idPessoaCliente"
							control={control}
							defaultValue={null}
							render={({onChange}) => (
								<>
							{people.map((person) => (
								<ReleaseType
									key={person.idPessoaCliente}
									onPress={() => {
										handlePeopleClick(person.idPessoaCliente),
										onChange(person.idPessoaCliente)
									}}
									style={{
										backgroundColor: colors.gray,
									}}>
									<LabelItems style={{color: idPeople === person.idPessoaCliente ? colors.backgroundButton : colors.iconGray}}>
										{person.nomePessoaCliente}
									</LabelItems>
								</ReleaseType>
							))}
					</>

				)}>
				</Controller>

				</Person>
				)}
			</Modal>
		);
	},
);
