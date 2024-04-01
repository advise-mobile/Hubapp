import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react';
import Modal from '@components/Modal';
import Datepicker from '@components/DatePicker';
import {FormatFullDateEN,FormatDateBR} from '@helpers/DateFunctions';
import {toCamelCase} from '@helpers/functions';
import {StyleSheet, Text} from 'react-native';
import {MaskMoney, MaskMoneyForRegister} from '@helpers/Mask';

import { NavigationActions, StackActions,NavigationNavigateAction } from 'react-navigation';

import {useNavigation} from '@react-navigation/native';

import {
	Footer,
	Cancel,
	CancelText,
	Content,
	Row,
	Label,
	Input,
	RowCategory,
	ContainerItems,
	Items,
	LabelItems,
	ContainerItemsPerson,
	ItemsPerson,
	ContainerItemsProcess,
	ItemsProcess,
	LabelItemsProcess,
	ContainerItemsRepeat,
	ContentDuring,
	LabelDuring,
	ContentComments,
	LabelComments,
	InputDescription,
	RegisterText,
	Register,
	ContentDescription,
	ContentRepeat,
	ContainerInfo,
	People,
	Category,
	Process,
} from './styles';

// Add UseTheme para pegar o tema global adicionado
import {useTheme} from 'styled-components';
import {useGetPopulateCategories} from '@services/hooks/Finances/useCategories';
import {useGetPopulatePeople} from '@services/hooks/Finances/usePeople';
import {CategoryProps, PersonProps, ProcessProps} from '@pages/Finance/Category/types';
import {useGetPopulateProcess} from '@services/hooks/Finances/useProcess';
import {useGetFinanceID, useRelease} from '@services/hooks/Finances/useReleases';

import RNPickerSelect from 'react-native-picker-select';
import {Controller, useForm} from 'react-hook-form';

interface ReleaseEditProps {
	onClose: () => void;
	item:any
}

export default ReleaseEdit = forwardRef((props, ref) => {

	const navigation = useNavigation();

	const closeModal = useCallback(() => {
		ref.current?.close();
		navigation.reset({
			index:0,
			routes:[{name:'FinanceTab'}]
		})
	}, props);


	const {item} = props;
	

	const [titleModal, setTitleModal] = useState(item.debitoCredito === "C" ? "Editar Receita":"Editar Despesa");

	const [descriptionRelease, setDescriptionRelease] = useState(null);
	const [valueRelease, setValueRelease] = useState(null);
	const [dateExpiration, setDateExpiration] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedPeople, setSelectedPeople] = useState(null);
	const [selectedProcess, setSelectedProcess] = useState(null);
	const [observation, setObservation] = useState<number>(-1);
	
	
	const [selectedRepeat, setSelectedRepeat] = useState<number>(-1);
	const [selectedDuring, setSelectedDuring] = useState(item.quantidadeParcelas);
	

	const [dataFinance, setDataFinance] = useState(null);

	const {isLoadingCategories, getCategoriesData} = useGetPopulateCategories();
	const {isLoadingPeople, getPeopleData} = useGetPopulatePeople();
	const {isLoadingProcess, getProcessData} = useGetPopulateProcess();

	const [categoryResume, setCategoryResume] = useState<CategoryProps>([]);
	const [peopleResume, setPeopleResume] = useState<PersonProps[]>([]);
	const [processResume, setProcessResume] = useState<ProcessProps[]>([]);
	
	

	const [duration, setDuration] = useState([]);
	const [disableDuration, setDisableDuration] = useState(true);

	const {isLoadingFinanceID, getFinanceDataID} = useGetFinanceID();

	const {isLoadingRelease, updateRelease} = useRelease();

	const valueInputRef = useRef(null);

	const handlePeopleClick = index => {
		setSelectedPeople(index);
	};

	const handleProcessClick = idProcesso => {
		setSelectedProcess(idProcesso);
	};

	useEffect(() => {
		fetchInformationAcountUser();
	}, []);

	useEffect(() => {
		fetchDataCategory();
	}, []);

	useEffect(() => {
		fetchPeople();
	}, []);

	useEffect(() => {
		fetchProcess();
	}, []);

	const fetchInformationAcountUser = async () => {
		try {
			const responseFinanceID = await getFinanceDataID();
			setDataFinance(responseFinanceID);
		} catch (error) {}
	};

	const fetchDataCategory = async () => {
		try {
			const responseCategories = await getCategoriesData();
			setCategoryResume(responseCategories);
		} catch (error) {}
	};

	const fetchPeople = async () => {
		try {
			const responsePeople = await getPeopleData();
			setPeopleResume(responsePeople);
		} catch (error) {}
	};

	const fetchProcess = async () => {
		try {
			const responseProcess = await getProcessData();
			setProcessResume(responseProcess);
		} catch (error) {}
	};

	const dataRepeatOption = [
		{
			label: 'Não se repete',
			value: -1,
		},
		{
			label: 'Todos os dias',
			value: -9,
		},
		{
			label: 'Semanal',
			value: -8,
		},
		{
			label: 'Quinzenal',
			value: -7,
		},
		{
			label: 'Mensal',
			value: -6,
		},
		{
			label: 'Anual',
			value: -2,
		},
	];

	const onSubmit = data => {

		
		if (data.valor === '0,00') {
			setError('valor', {type: 'manual', message: 'Campo valor não pode ser 0,00'});
			return;
		}

		 data.valor = MaskMoneyForRegister(MaskMoney(data.valor));

		const {idContaFinanceiro, idFinanceiro} = dataFinance[0];
		const repeticaoFixo = data.idTipoParcelamentoFinanceiro === -1 ? false : true;
		
		const register = {
			"itens": [
				{
					idProcesso: data.idProcesso,
					alterarEsteEProximosLancamentos: "true",
					dataEmissao:item.dataEmissaofull,
					dataVencimento:data.DataVencimento,
					debitoCredito: item.debitoCredito,
					descricao: data.descricao,
					idCategoriaFinanceiro:data.idCategoriaFinanceiro,
					idContaFinanceiro,
					idFinanceiro,
					idLancamentoFinanceiro:item.idLancamentoFinanceiro,
					idParcelaFinanceiro:item.idParcelaFinanceiro,
					idPessoaCliente: data.idPessoaCliente,
					idTipoParcelamentoFinanceiro:data.idTipoParcelamentoFinanceiro,
					observacao:data.observacao,
					quantidadeParcelas:data.quantidadeParcelas,
					repeticaoFixo,
							
					
					valorOriginal:data.valor,
					valor:data.valor
				},
			],
		};	
		
		updateRelease(register, () => closeModal());
	};

	const {
		control,
		handleSubmit,
		setError,
		formState: {errors},
		setValue
	} = useForm({
		shouldUnregister: false,
	});

	useEffect(() => {
		handleChangeTypeDuration(item.idTipoParcelamentoFinanceiro)

		setDescriptionRelease(item.descricaoLancamento);
		setValueRelease(item.value);
		setDateExpiration(FormatDateBR(item.dataVencimento));
		setSelectedCategory(item.categoriaFinanceiro.idCategoriaFinanceiro)
		setSelectedPeople(item.idPessoaCliente)
		setSelectedProcess(item.idProcesso)		
		setSelectedRepeat(item.idTipoParcelamentoFinanceiro)
		setDisableDuration(item.idTipoParcelamentoFinanceiro === -1)
		setSelectedDuring(item.quantidadeParcelas)
		setObservation(item.observacao)
		

		// pass props value to controller react hook form
		setValue('descricao', item.descricaoLancamento);
		setValue('valor', item.value);
		setValue('DataVencimento', item.dataVencimento);
		setValue('idCategoriaFinanceiro', item.categoriaFinanceiro.idCategoriaFinanceiro);
		setValue('idPessoaCliente', item.idPessoaCliente);
		setValue('idProcesso', item.idProcesso);
		setValue('idTipoParcelamentoFinanceiro', item.idTipoParcelamentoFinanceiro);
		setValue('quantidadeParcelas', item.quantidadeParcelas);
		setValue('observacao', item.observacao);
		

	},[item])


	const handleRepeatChange = value => {
		setSelectedRepeat(value);
		handleChangeTypeDuration(value);
	};

	const handleDuringChange = value => {
		setSelectedDuring(value);
	};

	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const pickerSelectStyles = stylesPickerSelectStyles(colors);

	const footer = () => (
		<Footer>
			<Cancel onPress={() => closeModal()}>
				<CancelText>Cancelar</CancelText>
			</Cancel>

			<Register onPress={handleSubmit(onSubmit)}>
				<RegisterText>Alterar</RegisterText>
			</Register>
		</Footer>
	);

	const handleChangeTypeDuration = (selectedRepeat: number) => {
		let i = 2;
		switch (selectedRepeat) {
			case -1:
				setDuration([{value: null, label: ''}]);
				setDisableDuration(true);
				break;
			case -9:
				const days = [
					{
						value: '1',
						label: 'Diariamente',
					},
				];
				while (i < 1827) {
					days.push({
						value: `${i}`,
						label: `${i} dias`,
					});

					i++;
				}
				setDuration(days);
				setDisableDuration(false);
				break;
			case -7:
				const fortnight = [
					{
						value: '1',
						label: 'Quinzenalmente',
					},
				];
				while (i < 122) {
					fortnight.push({
						value: `${i}`,
						label: `${i} quinzenas`,
					});

					i++;
				}
				setDuration(fortnight);
				setDisableDuration(false);
				break;
			case -8:
				const weekly = [
					{
						value: '1',
						label: 'Semanalmente',
					},
				];
				while (i < 261) {
					weekly.push({
						value: `${i}`,
						label: `${i} semanas`,
					});

					i++;
				}
				setDuration(weekly);
				setDisableDuration(false);
				break;
			case -6:
				const monthly = [
					{
						value: '1',
						label: 'Mensalmente',
					},
				];
				while (i < 61) {
					monthly.push({
						value: `${i}`,
						label: `${i} meses`,
					});

					i++;
				}
				setDuration(monthly);
				setDisableDuration(false);
				break;
			case -2:
				const annually = [
					{
						value: '1',
						label: 'Anualmente',
					},
				];
				while (i < 6) {
					annually.push({
						value: `${i}`,
						label: `${i} anos`,
					});

					i++;
				}
				setDuration(annually);
				setDisableDuration(false);
				break;

			default:
				break;
		}
	};

	return (
		<Modal
			maxHeight={650}
			onClose={props.onClose}
			ref={ref}
			title={titleModal}
			footer={footer()}>
			<ContentDescription isError={errors.descricao}>
				<Row>
					<Label>Descrição</Label>
					<Controller
						name="descricao"
						rules={{
							required: true,
						}}
						control={control}
						defaultValue={null}
						render={({onChange}) => (
							<Input
								value={descriptionRelease}
								autoCorrect={false}
								autoCapitalize="none"
								placeholder="Título do lançamento"
								placeholderTextColor={errors.descricao ? colors.red200 : colors.grayLight}
								returnKeyType="next"
								onSubmitEditing={() => {
									valueInputRef.current?.focus();
								}}
								onChangeText={value => {
									onChange(value);
									setDescriptionRelease(value);
								}}
							/>
						)}
					/>
				</Row>
			</ContentDescription>

			<Content isError={errors.valor}>
				<Row>
					<Label>Valor</Label>
					<Controller
						name="valor"
						rules={{
							required: true,
						}}
						control={control}
						defaultValue={null}
						render={({onChange, value}) => (
							<Controller
								name="valor"
								rules={{
									required: true,
								}}
								control={control}
								defaultValue={null}
								render={({onChange, value}) => (
									<Input
										value={valueRelease}
										ref={valueInputRef}
										placeholder="R$ -"
										placeholderTextColor={errors.valor ? colors.red200 : colors.grayLight}
										keyboardType="numeric"
										onChangeText={text => {
											onChange(text !== '0,0' ? MaskMoney(text) : '');
											setValueRelease(text !== '0,0' ? MaskMoney(text) : '')
										}}
										
									/>
								)}
							/>
						)}
					/>
				</Row>
			</Content>

			<Content isError={errors.DataVencimento}>
				<Row>
					<Label>Vencimento</Label>
					<Controller
						name="DataVencimento"
						rules={{
							required: true,
						}}
						control={control}
						defaultValue={null}
						render={({onChange, value}) => (
							<Datepicker
								date={dateExpiration}
								enabled={true}
								title={
									<Text style={{color: errors.DataVencimento ? colors.red200 : colors.black}}>
										Selecione uma data
									</Text>
								}
								style={{
									marginTop: -2,
									flexGrow: 1,
									maxWidth: 200,
									height: 22,
								}}
								onDateChange={date => {
									setDateExpiration(date);
									onChange(FormatFullDateEN(date));
								}}
								value={value}
							/>
						)}
					/>
				</Row>
			</Content>

			<Category isError={errors.idCategoriaFinanceiro}>
				<RowCategory>
					<Label>Categoria</Label>
				</RowCategory>

				<ContainerItems>
					<Controller
						name="idCategoriaFinanceiro"
						rules={{
							required: true,
						}}
						control={control}
						defaultValue={null}
						render={({onChange}) => (
							<>
								{categoryResume.map((category) => (
									<Items
										key={category.idCategoriaFinanceiro}
										style={[
											{backgroundColor: category.corCategoria},
											errors.idCategoriaFinanceiro ? {backgroundColor: colors.red200} : {},
											selectedCategory === category.idCategoriaFinanceiro
												? {borderWidth: 2, borderColor: colors.primary}
												: {},
										]}
										onPress={() => {
											setSelectedCategory(category.idCategoriaFinanceiro);
											onChange(category.idCategoriaFinanceiro);
										}}>
										<LabelItems
											style={[selectedCategory === category.idCategoriaFinanceiro ? {color: colors.primary} : {}]}>
											{toCamelCase(category.nomeCategoriaFinanceiro)}
										</LabelItems>
									</Items>
								))}
							</>
						)}
					/>
				</ContainerItems>
			</Category>

			<People isError={errors.idPessoaCliente}>
				<RowCategory>
					<Label>Pessoa</Label>
				</RowCategory>

				<ContainerItemsPerson>
					<Controller
						name="idPessoaCliente"
						control={control}
						defaultValue={null}
						render={({onChange}) => (
							<>
								{peopleResume.map((person) => (
									<ItemsPerson
										key={person.idPessoaCliente}
										onPress={() => {
											handlePeopleClick(person.idPessoaCliente);
											onChange(person.idPessoaCliente);
										}}
										style={{
											backgroundColor: colors.gray,
										}}>
										<LabelItems
											style={{
												color: selectedPeople === person.idPessoaCliente ? colors.backgroundButton : colors.iconGray,
											}}>
											{
												person.nomePessoaCliente !== undefined 
											 ? toCamelCase(person.nomePessoaCliente) : 'N/I'}
										</LabelItems>
									</ItemsPerson>
								))}
							</>
						)}
					/>
				</ContainerItemsPerson>
			</People>

			<Process>
				<RowCategory>
					<Label>Processo</Label>
				</RowCategory>

				<ContainerItemsProcess>
					<Controller
						name="idProcesso"
						control={control}
						defaultValue={null}
						render={({onChange}) => (
							<>
								{processResume.map((process) => (
									<ItemsProcess
										key={process.id}
										onPress={() => {
											handleProcessClick(process.idProcesso);
											onChange(process.idProcesso);
										}}
										style={{
											backgroundColor: colors.gray,
										}}>
										<LabelItemsProcess
											style={{
												color:
													selectedProcess === process.idProcesso ? colors.backgroundButton : colors.iconGray,
											}}>
											{process.numeroProcesso}
										</LabelItemsProcess>
									</ItemsProcess>
								))}
							</>
						)}
					/>
				</ContainerItemsProcess>
			</Process>

			<ContentRepeat isError={errors.idTipoParcelamentoFinanceiro}>
				<RowCategory>
					<Label>Repetir</Label>
				</RowCategory>

				<Controller
					name="idTipoParcelamentoFinanceiro"
					rules={{
						required: true,
					}}
					control={control}
					defaultValue={null}
					render={({onChange}) => (
						<ContainerItemsRepeat>
							{dataRepeatOption.map(repeat => (
								<ItemsProcess
									key={repeat.value}
									onPress={() => {
										handleRepeatChange(repeat.value);
										onChange(repeat.value);
									}}
									style={[
										{
											backgroundColor: errors.idTipoParcelamentoFinanceiro
												? colors.red
												: colors.gray,
										},
									]}>
									<LabelItemsProcess
										style={{
											color:
												selectedRepeat === repeat.value ? colors.backgroundButton : colors.iconGray,
										}}>
										{repeat.label}
									</LabelItemsProcess>
								</ItemsProcess>
							))}
						</ContainerItemsRepeat>
					)}
				/>
			</ContentRepeat>

			<ContentDuring isError={errors.quantidadeParcelas}>
				<Row>
					<LabelDuring>Durante</LabelDuring>

					<Controller
						name="quantidadeParcelas"
						rules={{
							required: true,
						}}
						control={control}
						defaultValue={null}
						render={({onChange}) => (
							<ContainerInfo>
								{/* {renderRNPickerSelect(onChange)} */}
								<RNPickerSelect
															
									placeholder={{
										label: 'Selecione',
										value: null,
									}}
									// disabled={disableDuration}
									doneText="Selecionar"
									style={{
										...pickerSelectStyles,
										placeholder: {
											color: errors.quantidadeParcelas ? colors.red : colors.black,
										},
									}}
									
									onValueChange={value => {
										handleDuringChange(value);
										onChange(value);
									}}
									useNativeAndroidPickerStyle={false}
									items={duration}
									value={selectedDuring.toString()}
								/>
								
							</ContainerInfo>
						)}
					/>
				</Row>
			</ContentDuring>

			<ContentComments isError={errors.observacao}>
				<Row>
					<LabelComments>Observações</LabelComments>
				</Row>
				<Controller
					name="observacao"
					rules={{
						required: true,
					}}
					control={control}
					defaultValue={null}
					render={({onChange}) => (
						<InputDescription
							value={observation}
							autoCorrect={false}
							autoCapitalize="none"
							placeholder="Digite uma observação"
							placeholderTextColor={errors.descricao ? colors.red200 : colors.grayLight}
							onChangeText={value => {
								onChange(value);
								setObservation(value)
							}}
							returnKeyType="next"
							onSubmitEditing={handleSubmit(onSubmit)}
						/>
					)}
				/>
			</ContentComments>
		</Modal>
	);
});

const stylesPickerSelectStyles = colors =>
	StyleSheet.create({
		inputIOS: {
			fontSize: 14,
			color: colors.fadedBlack,
			marginTop: 2,
		},
		inputAndroid: {
			flex: 1,
			height: 22,
			marginTop: 5,
			lineHeight: 1,
			padding: 0,
			fontSize: 14,
			color: colors.fadedBlack,

			minWidth: 400,
		},
	});
