import React, {forwardRef, useCallback, useEffect, useState} from 'react';
import Modal from 'components/Modal';
import {StyleSheet} from 'react-native';
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

import RNPickerSelect from 'react-native-picker-select';
import {Controller, useForm} from 'react-hook-form';

export default AddExpense = forwardRef((props, ref) => {
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

	const [duration, setDuration] = useState([]);
	const [disableDuration, setDisableDuration] = useState(true);

	const handlePeopleClick = index => {
		setSelectedPeople(index);
	};

	const handleProcessClick = index => {
		setSelectedProcess(index);
	};

	const handleRepeatClick = index => {
		setSelectedRepeatValue(value);
		setIsRepeatSelected(value !== -1);
		handleChangeTypeDuration(value);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		fetchPeople();
	}, []);

	useEffect(() => {
		fetchProcess();
	}, []);

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
		console.log('===', data);
	};

	const {control, handleSubmit, setValue, getValues, register,watch} = useForm({
		shouldUnregister: false,
	});

	const watchRepeat = watch('repetir', false);
  const watchDuring = watch('durante', null);

	const handleRepeatChange = (value) => {
		// console.log('Repetir', value !== -1);
		setSelectedRepeat(value);
		setIsRepeatSelected(value !== -1);
		handleChangeTypeDuration(value);
	};

	const handleDuringChange = (value) => {
		// console.log('Durante', value);
		setSelectedDuring(value);  // Correção
		setValue('durante', value);
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
			<ContentDescription>
				<Row>
					<Label>Descrição</Label>

					<Controller
						name="descricao"
						control={control}
						defaultValue={null}
						render={({onChange}) => (
							<Input
								autoCorrect={false}
								autoCapitalize="none"
								placeholder="Título do lançamento"
								placeholderTextColor={colors.grayLight}
								returnKeyType="next"
								onChangeText={value => onChange(value)}
							/>
						)}
					/>
				</Row>
			</ContentDescription>
			<Content>
				<Row>
					<Label>Valor</Label>

					<Controller
						name="valor"
						control={control}
						defaultValue={null}
						render={({onChange}) => (
							<Input
								placeholder="R$ -"
								placeholderTextColor={colors.grayLight}
								keyboardType="numeric"
								onChangeText={value => onChange(value)}
							/>
						)}
					/>
				</Row>
			</Content>
			<Content>
				<Row>
					<Label>Vencimento</Label>
					<Controller
						name="dataVencimento"
						control={control}
						defaultValue={null}
						render={({onChange}) => (
							<Input
								autoCorrect={false}
								autoCapitalize="none"
								placeholder="dd/mm/aaaa"
								placeholderTextColor={colors.grayLight}
								returnKeyType="next"
								keyboardType="numeric"
								onChangeText={value => onChange(value)}
							/>
						)}
					/>
				</Row>
			</Content>

			<Category>
				<RowCategory>
					<Label>Categoria</Label>
				</RowCategory>

				<ContainerItems>
					<Controller
						name="idCategoria"
						control={control}
						defaultValue={null}
						render={({onChange}) => (
							<>
								{dataResume.map((category, index) => (
									<Items
										key={index}
										style={[
											{backgroundColor: category.corCategoria},
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

			<People>
				<RowCategory>
					<Label>Pessoa</Label>
				</RowCategory>

				<ContainerItemsPerson>
					<Controller
						name="idPessoa"
						control={control}
						defaultValue={null}
						render={({onChange}) => (
							<>
								{PeopleResume.map((person, index) => (
									<ItemsPerson
										key={index}
										onPress={() => {
											handlePeopleClick(index);
											onChange(person.id);
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

			<ContentRepeat>
        <RowCategory>
          <Label>Repetir</Label>
        </RowCategory>

        <ContainerItemsRepeat>
          {data.map((repeat) => (
            <ItemsProcess
              key={repeat.value}
              onPress={() => handleRepeatChange(repeat.value)}
              style={{
                backgroundColor: colors.gray,
              }}
            >
              <LabelItemsProcess
                style={{
                  color:
                    selectedRepeat === repeat.value
                      ? colors.backgroundButton
                      : colors.iconGray,
                }}
              >
                {repeat.label}
              </LabelItemsProcess>
            </ItemsProcess>
          ))}
        </ContainerItemsRepeat>
      </ContentRepeat>

			<ContentDuring>
        <Row>
          <LabelDuring>Durante</LabelDuring>

          <ContainerInfo>
            <RNPickerSelect
              placeholder={{
                label: 'Selecione',
                value: null,
              }}
              disabled={disableDuration}
              doneText="Selecionar"
              style={pickerSelectStyles}
              value={selectedDuring}
              onValueChange={(value) => handleDuringChange(value)}
              useNativeAndroidPickerStyle={false}
              items={duration}
            />
          </ContainerInfo>
        </Row>
      </ContentDuring>

			<ContentComments>
				<Row>
					<LabelComments>Observações</LabelComments>
				</Row>
				<Controller
					name="obs"
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
			//fontFamily: fonts.circularStdBook,
		},
		inputAndroid: {
			flex: 1,
			height: 22,
			marginTop: 5,
			lineHeight: 1,
			padding: 0,
			fontSize: 14,
			color: colors.fadedBlack,
			//fontFamily: fonts.circularStdBook,
			minWidth: 400,
		},
	});
