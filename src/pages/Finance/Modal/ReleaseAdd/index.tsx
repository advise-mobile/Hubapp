import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react';
import Modal from '@components/Modal';
import Datepicker from '@components/DatePicker';
import {FormatFullDateEN, FormatDateBR} from '@helpers/DateFunctions';
import {StyleSheet, Text} from 'react-native';
import {MaskMoney, MaskMoneyForRegister} from 'helpers/Mask';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import moment from 'moment';

import {
	Footer,
	Cancel,
	CancelText,
	Content,
	Row,
	Label,
	LabelError,
	Input,
	RowLabel,
	ContainerItems,
	LabelItems,
	ContainerItemsOptions,
	LabelItemsProcess,
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
	ItemsOptions,
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

import {useNavigation} from '@react-navigation/native';

export default ReleaseAdd = forwardRef((props, ref) => {
	const navigation = useNavigation();

	const {type, onClose} = props;

	// // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const valueInputRef = useRef(null);

	const [dataCategories, setDataCategoriesResume] = useState<CategoryProps[]>([]);
	const [dataPeople, setDataPeople] = useState<PersonProps[]>([]);
	const [dataProcess, setDataProcess] = useState<ProcessProps[]>([]);

	// - Loading Categories
	const {isLoadingCategories, getCategoriesData} = useGetPopulateCategories();

	// - Loading People
	const {isLoadingPeople, getPeopleData} = useGetPopulatePeople();

	// - Loading Process
	const {isLoadingProcess, getProcessData} = useGetPopulateProcess();

	// - Loading data finance
	const {isLoadingFinanceID, getFinanceDataID} = useGetFinanceID();

	// import add function hook
	const {isLoadingRelease, addRelease} = useRelease();

	// Set Durantion starting empty array
	const [duration, setDuration] = useState([]);

	const handleChangeTypeDuration = (selectedRepeat: number) => {
		let i = 2;
		switch (selectedRepeat) {
			case -1:
				setDuration([{value: null, label: ''}]);
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
				break;

			default:
				break;
		}
	};

	const pickerSelectStyles = stylesPickerSelectStyles(colors);

	useEffect(() => {
		fetchDataCategories();
		fetchPeople();
		fetchProcess();
		fetchInformationAcountUser();
	}, []);

	const fetchDataCategories = async () => {
		try {
			const responseCategories = await getCategoriesData();
			setDataCategoriesResume(responseCategories);
		} catch (error) {}
	};

	const fetchPeople = async () => {
		try {
			const responsePeople = await getPeopleData();
			setDataPeople(responsePeople);
		} catch (error) {}
	};

	const fetchProcess = async () => {
		try {
			const responseProcess = await getProcessData();
			setDataProcess(responseProcess);
		} catch (error) {}
	};

	const fetchInformationAcountUser = async () => {
		try {
			const responseFinanceData = await getFinanceDataID();
			setValue('idContaFinanceiro', responseFinanceData[0].idContaFinanceiro);
			setValue('idFinanceiro', responseFinanceData[0].idFinanceiro);
		} catch (error) {}
	};

	const dataOptionsRepeat = [
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

	const {
		control,
		handleSubmit,
		setError,
		setValue,
		getValues,
		formState: {errors},
	} = useForm({
		shouldUnregister: false,
	});

	const footer = () => (
		<Footer>
			<Cancel onPress={() => onClose()}>
				<CancelText>Cancelar</CancelText>
			</Cancel>

			<Register onPress={handleSubmit(onSubmit)}>
				<RegisterText>Cadastrar</RegisterText>
			</Register>
		</Footer>
	);

	const handleOnClose = useCallback(() => {
		onClose();
		navigation.reset({
			index: 0,
			routes: [{name: 'FinanceTab'}],
		});
	}, props);

	const onSubmit = data => {
		if (data.valor === '0,00') {
			setError('valor', {type: 'manual', message: 'Campo valor não pode ser 0,00'});
			return;
		}

		data.DataVencimento = FormatFullDateEN(data.DataVencimento);
		data.valor = MaskMoneyForRegister(data.valor);

		const repeticaoFixo = data.IdTipoParcelamentoFinanceiro === -1 ? false : true;
		const quantidadeParcelas =
			data.IdTipoParcelamentoFinanceiro === -1 ? 1 : data.quantidadeParcelas;
		const dataEmissao = moment().format('YYYY-MM-DD H:mm:ss');
		const register = {
			itens: [
				{
					...data,
					DebitoCredito: type,
					repeticaoFixo,
					dataEmissao,
					quantidadeParcelas,
				},
			],
		};

		addRelease(register, () => handleOnClose());
	};

	return (
		<Modal
			maxHeight={650}
			onClose={onClose}
			ref={ref}
			title={type === 'D' ? 'Cadastrar despesa' : 'Cadastrar Receita'}
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
						render={({onChange, value}) => (
							<Input
								value={value}
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
						render={({onChange, value}) => (
							<Datepicker
								date={value}
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
									onChange(date);
								}}
								value={value}
							/>
						)}
					/>
				</Row>
			</Content>

			<Category isError={errors.idCategoriaFinanceiro}>
				<RowLabel>
					<Label>Categoria</Label>
					{errors.idCategoriaFinanceiro && <LabelError>Selecione uma categoria</LabelError>}
				</RowLabel>

				<ContainerItems>
					<Controller
						name="idCategoriaFinanceiro"
						rules={{
							required: true,
						}}
						control={control}
						render={({onChange, value}) => (
							<>
								{dataCategories.map(category => (
									<>
										<ItemsOptions
											key={category.idCategoriaFinanceiro}
											style={[
												value === category.idCategoriaFinanceiro
													? {
															borderWidth: 2,
															borderColor: colors.primary,
															backgroundColor: category.corCategoria,
													  }
													: {backgroundColor: category.corCategoria},
											]}
											onPress={() => {
												onChange(category.idCategoriaFinanceiro);
											}}>
											<LabelItems>{category.nomeCategoriaFinanceiro}</LabelItems>
											{value === category.idCategoriaFinanceiro && (
												<MaterialIcons name={'check'} size={15} color={colors.primary} />
											)}
										</ItemsOptions>
									</>
								))}
							</>
						)}
					/>
				</ContainerItems>
			</Category>

			<People>
				<RowLabel>
					<Label>Pessoa</Label>
				</RowLabel>

				<ContainerItemsOptions>
					<Controller
						name="idPessoaCliente"
						control={control}
						defaultValue={null}
						render={({onChange, value}) => (
							<>
								{dataPeople.map(person => (
									<ItemsOptions
										key={person.idPessoaCliente}
										onPress={() => {
											onChange(person.idPessoaCliente);
										}}
										style={[
											value === person.idPessoaCliente
												? {
														borderWidth: 2,
														borderColor: colors.primary,
														backgroundColor: colors.gray,
												  }
												: {backgroundColor: colors.gray},
										]}>
										<LabelItems>{person.nomePessoaCliente}</LabelItems>

										{value === person.idPessoaCliente && (
											<MaterialIcons name={'check'} size={15} color={colors.primary} />
										)}
									</ItemsOptions>
								))}
							</>
						)}
					/>
				</ContainerItemsOptions>
			</People>

			<Process>
				<RowLabel>
					<Label>Processo</Label>
				</RowLabel>

				<ContainerItemsOptions>
					<Controller
						name="idProcesso"
						control={control}
						render={({onChange, value}) => (
							<>
								{dataProcess.map(process => (
									<ItemsOptions
										key={process.idProcesso}
										onPress={() => {
											onChange(process.idProcesso);
										}}
										style={[
											value === process.idProcesso
												? {
														borderWidth: 2,
														borderColor: colors.primary,
														backgroundColor: colors.gray,
												  }
												: {backgroundColor: colors.gray},
										]}>
										<LabelItemsProcess>{process.numeroProcesso}</LabelItemsProcess>

										{value === process.idProcesso && (
											<MaterialIcons name={'check'} size={15} color={colors.primary} />
										)}
									</ItemsOptions>
								))}
							</>
						)}
					/>
				</ContainerItemsOptions>
			</Process>

			<ContentRepeat>
				<RowLabel>
					<Label>Repetir</Label>
				</RowLabel>

				<Controller
					name="IdTipoParcelamentoFinanceiro"
					control={control}
					render={({onChange, value}) => (
						<ContainerItemsOptions>
							{dataOptionsRepeat.map(repeat => (
								<ItemsOptions
									key={repeat.value}
									onPress={() => {
										onChange(repeat.value);
										handleChangeTypeDuration(repeat.value);
									}}
									style={[
										value === repeat.value
											? {
													borderWidth: 2,
													borderColor: colors.primary,
													backgroundColor: colors.gray,
											  }
											: {backgroundColor: colors.gray},
									]}>
									<LabelItems>{repeat.label}</LabelItems>

									{value === repeat.value && (
										<MaterialIcons name={'check'} size={15} color={colors.primary} />
									)}
								</ItemsOptions>
							))}
						</ContainerItemsOptions>
					)}
				/>
			</ContentRepeat>

			<ContentDuring>
				<Row>
					<LabelDuring>Durante</LabelDuring>

					<Controller
						name="quantidadeParcelas"
						control={control}
						defaultValue={null}
						render={({onChange, value}) => (
							<ContainerInfo>
								<RNPickerSelect
									placeholder={{
										label: 'Selecione',
										value: null,
										disabled: getValues('IdTipoParcelamentoFinanceiro') === -1,
									}}
									disabled={
										getValues('IdTipoParcelamentoFinanceiro') === -1 || duration.length === 0
									}
									doneText="Selecionar"
									style={{
										...pickerSelectStyles,
										placeholder: {
											color: colors.black,
										},
										inputAndroid: {
											...pickerSelectStyles.inputAndroid,
											color:
												getValues('IdTipoParcelamentoFinanceiro') === -1
													? colors.grayLight
													: colors.fadedBlack,
										},
										inputIOS: {
											...pickerSelectStyles.inputIOS,
											color:
												getValues('IdTipoParcelamentoFinanceiro') === -1
													? colors.grayLight
													: colors.fadedBlack,
										},
									}}
									value={value}
									onValueChange={value => {
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

			<ContentComments>
				<Row>
					<LabelComments>Observações</LabelComments>
				</Row>
				<Controller
					name="observacao"
					control={control}
					defaultValue={null}
					render={({onChange}) => (
						<InputDescription
							autoCorrect={false}
							autoCapitalize="none"
							placeholder="Digite uma observação"
							placeholderTextColor={colors.grayLight}
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
