import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react';
import Modal from '@components/Modal';
import Datepicker from '@components/DatePicker';
import {FormatFullDateEN} from '@helpers/DateFunctions';
import {StyleSheet, Text} from 'react-native';
import {MaskMoney, MaskMoneyForRegister} from 'helpers/Mask';

import moment from 'moment';

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

export default AddExpense = forwardRef((props, ref) => {
	const [dataFinance, setDataFinance] = useState(null);

	const {isLoadingCategories, getCategoriesData} = useGetPopulateCategories();
	const {isLoadingPeople, getPeopleData} = useGetPopulatePeople();
	const {isLoadingProcess, getProcessData} = useGetPopulateProcess();

	const [dataResume, setDataResume] = useState<CategoryProps>([]);
	const [PeopleResume, setPeopleResume] = useState<PersonProps[]>([]);
	const [ProcessResume, setProcessResume] = useState<ProcessProps[]>([]);

	const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

	const [selectedPeople, setSelectedPeople] = useState(null);
	const [selectedProcess, setSelectedProcess] = useState(null);
	const [selectedRepeat, setSelectedRepeat] = useState<number>(-1);
	const [selectedDuring, setSelectedDuring] = useState(null);
	const [dateExpiration, setDateExpiration] = useState(null);

	const [duration, setDuration] = useState([]);
	const [disableDuration, setDisableDuration] = useState(true);

	const {isLoadingFinanceID, getFinanceDataID} = useGetFinanceID();

	const {isLoadingRelease, addRelease} = useRelease();

	const valueInputRef = useRef(null);

	const handlePeopleClick = index => {
		setSelectedPeople(index);
	};

	const handleProcessClick = index => {
		setSelectedProcess(index);
	};

	useEffect(() => {
		fetchInformationAcountUser();
	}, []);

	useEffect(() => {
		fetchData();
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

	const fetchData = async () => {
		try {
			const responseCategories = await getCategoriesData();
			setDataResume(responseCategories);
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

	const data = [
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

		data.valor = MaskMoneyForRegister(data.valor);

		const {idContaFinanceiro, idFinanceiro} = dataFinance[0];
		const repeticaoFixo = data.IdTipoParcelamentoFinanceiro === -1 ? false : true;
		const dataEmissao = moment().format('YYYY-MM-DD H:mm:ss');
		const register = {
			itens: [
				{
					DebitoCredito: 'D',
					repeticaoFixo,
					dataEmissao,
					idContaFinanceiro,
					idFinanceiro,
					...data,
				},
			],
		};

		addRelease(register, () => closeModal());
	};

	const {
		control,
		handleSubmit,
		setError,
		formState: {errors},
	} = useForm({
		shouldUnregister: false,
	});

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

	const [isRepeatSelected, setIsRepeatSelected] = useState(false);

	const closeModal = useCallback(() => ref.current?.close(), props);

	const footer = () => (
		<Footer>
			<Cancel onPress={() => closeModal()}>
				<CancelText>Cancelar</CancelText>
			</Cancel>

			<Register onPress={handleSubmit(onSubmit)}>
				<RegisterText>Cadastrar</RegisterText>
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
			title="Cadastrar despesa"
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
								autoCorrect={false}
								autoCapitalize="none"
								placeholder="Título do lançamento"
								placeholderTextColor={errors.descricao ? colors.red200 : colors.grayLight}
								returnKeyType="next"
								onSubmitEditing={() => {
									valueInputRef.current?.focus();
								}}
								onChangeText={value => onChange(value)}
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
										ref={valueInputRef}
										placeholder="R$ -"
										placeholderTextColor={errors.valor ? colors.red200 : colors.grayLight}
										keyboardType="numeric"
										onChangeText={text => {
											onChange(text !== '0,0' ? MaskMoney(text) : '');
										}}
										value={value}
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
								{dataResume.map((category, index) => (
									<Items
										key={index}
										style={[
											{backgroundColor: category.corCategoria},
											errors.idCategoriaFinanceiro ? {backgroundColor: colors.red200} : {},
											selectedCategoryIndex === index
												? {borderWidth: 2, borderColor: colors.primary}
												: {},
										]}
										onPress={() => {
											setSelectedCategoryIndex(index);
											onChange(category.idCategoriaFinanceiro);
										}}>
										<LabelItems
											style={[selectedCategoryIndex === index ? {color: colors.primary} : {}]}>
											{category.nomeCategoriaFinanceiro}
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
								{PeopleResume.map((person, index) => (
									<ItemsPerson
										key={index}
										onPress={() => {
											handlePeopleClick(index);
											onChange(person.idPessoaCliente);
										}}
										style={{
											backgroundColor: colors.gray,
										}}>
										<LabelItems
											style={{
												color: selectedPeople === index ? colors.backgroundButton : colors.iconGray,
											}}>
											{person.nomePessoaCliente}
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
								{ProcessResume.map((process, index) => (
									<ItemsProcess
										key={index}
										onPress={() => {
											handleProcessClick(index);
											onChange(process.id);
											console.log('Process', process);
										}}
										style={{
											backgroundColor: colors.gray,
										}}>
										<LabelItemsProcess
											style={{
												color:
													selectedProcess === index ? colors.backgroundButton : colors.iconGray,
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

			<ContentRepeat isError={errors.IdTipoParcelamentoFinanceiro}>
				<RowCategory>
					<Label>Repetir</Label>
				</RowCategory>

				<Controller
					name="IdTipoParcelamentoFinanceiro"
					rules={{
						required: true,
					}}
					control={control}
					defaultValue={null}
					render={({onChange}) => (
						<ContainerItemsRepeat>
							{data.map(repeat => (
								<ItemsProcess
									key={repeat.value}
									onPress={() => {
										handleRepeatChange(repeat.value);
										onChange(repeat.value);
									}}
									style={[
										{
											backgroundColor: errors.IdTipoParcelamentoFinanceiro
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
								<RNPickerSelect
									placeholder={{
										label: 'Selecione',
										value: null,
									}}
									disabled={disableDuration}
									doneText="Selecionar"
									style={{
										...pickerSelectStyles,
										placeholder: {
											color: errors.quantidadeParcelas ? colors.red : colors.gray,
										},
									}}
									value={selectedDuring}
									onValueChange={value => {
										handleDuringChange(value);
										onChange(value);
									}}
									useNativeAndroidPickerStyle={false}
									items={duration}
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
							autoCorrect={false}
							autoCapitalize="none"
							placeholder="Digite uma observação"
							placeholderTextColor={errors.descricao ? colors.red200 : colors.grayLight}
							onChangeText={value => onChange(value)}
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
