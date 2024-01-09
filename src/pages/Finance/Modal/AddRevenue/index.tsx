import React, {forwardRef, useCallback, useEffect, useState} from 'react';
import Modal from 'components/Modal';
import {
	Footer,
	Cancel,
	CancelText,
	Content,
	Row,
	Label,
	Input,
	ContentCategory,
	RowCategory,
	ContainerItems,
	Items,
	LabelItems,
	ContainerItemsPerson,
	ItemsPerson,
	ContainerItemsProcess,
	ContentProcess,
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
	LabelDuringInfo,
} from './styles';

// Add UseTheme para pegar o tema global adicionado
import {useTheme} from 'styled-components';
import {useGetCategories} from '@services/hooks/Finances/useCategories';
import {CategoryProps, PersonProps, ProcessProps} from '@pages/Finance/Category/types';
import { useGetPeople } from '@services/hooks/Finances/usePeople';
import { useGetProcess } from '@services/hooks/Finances/useProcess';

const people = ['Pessoa 1', 'Pessoa 2', 'Pessoa 3', 'Pessoa 4', 'Pessoa 5', 'Pessoa 6'];

const process = [
	'Nº do processo',
	'Pasta do processo',
	'Luiz José x Rafaela Zemuner',
	'Proc.: 0000846-51.2020.5.07.0016',
];

const repeat = ['Não se repete', 'Todos os dias', 'Semanal', 'Quinzenal ', 'Mensal', 'Anual'];

export default AddRevenue = forwardRef((props, ref) => {
	const {isLoadingCategories, getCategoriesData} = useGetCategories();
	const {isLoadingPeople, getPeopleData} = useGetPeople();
	const {isLoadingProcess, getProcessData} = useGetProcess();

	const [dataResume, setDataResume] = useState<CategoryProps>([]);
	const [PeopleResume, setPeopleResume] = useState<PersonProps[]>([]);
	const [ProcessResume, setProcessResume] = useState<ProcessProps[]>([]);

	const [selectedColor, setSelectedColor] = useState(null);

	const [selectedPeople, setSelectedPeople] = useState(null);
	const [selectedProcess, setSelectedProcess] = useState(null);
	const [selectedRepeat, setSelectedRepeat] = useState(null);

	const handlePeopleClick = index => {
		setSelectedPeople(index);
	};

	const handleProcessClick = index => {
		setSelectedProcess(index);
	};

	const handleRepeatClick = index => {
		setSelectedRepeat(index);
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
			label: `Não se repete`,
			value: '-1',
		},
		{
			label: `Todos os dias`,
			value: '-9',
		},
		{
			label: `Semanal`,
			value: '-8',
		},
		{
			label: `Quinzenal`,
			value: '-7',
		},
		{
			label: `Mensal`,
			value: '-6',
		},
		{
			label: `Anual`,
			value: '-2',
		},
	];

	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const closeModal = useCallback(() => ref.current?.close(), props);
	const footer = () => (
		<Footer>
			<Cancel onPress={() => closeModal()}>
				<CancelText>Cancelar</CancelText>
			</Cancel>

			<Register onPress={() => closeModal()}>
				<RegisterText>Cadastrar</RegisterText>
			</Register>
		</Footer>
	);

	return (
		<Modal
			maxHeight={650}
			onClose={props.onClose}
			ref={ref}
			title="Cadastrar receita"
			footer={footer()}>
			<ContentDescription>
				<Row>
					<Label>Descrição</Label>
					<Input
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Título do lançamento"
						placeholderTextColor={colors.grayLight}
						returnKeyType="next"
					/>
				</Row>
			</ContentDescription>
			<Content>
				<Row>
					<Label>Valor</Label>
					<Input
						placeholder="R$ +"
						placeholderTextColor={colors.grayLight}
						keyboardType="numeric"
					/>
				</Row>
			</Content>
			<Content>
				<Row>
					<Label>Vencimento</Label>
					<Input
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="dd/mm/aaaa"
						placeholderTextColor={colors.grayLight}
						returnKeyType="next"
						keyboardType="numeric"
					/>
				</Row>
			</Content>

			<ContentCategory>
				<RowCategory>
					<Label>Categoria</Label>
				</RowCategory>

				<ContainerItems>
					{dataResume.map((category, index) => (
						<Items
							key={index}
							style={[
								{backgroundColor: category.corCategoria},
								selectedColor === colors.gray ? {borderWidth: 2, borderColor: colors.primary} : {},
							]}
							onPress={() => setSelectedColor(colors.gray)}>
							<LabelItems style={[selectedColor === colors.gray ? {color: colors.primary} : {}]}>
								{category.nomeCategoriaFinanceiro}
							</LabelItems>
						</Items>
					))}
				</ContainerItems>
			</ContentCategory>

			<ContentCategory>
				<RowCategory>
					<Label>Pessoa</Label>
				</RowCategory>

				<ContainerItemsPerson>
					{PeopleResume.map((person, index) => (
						<ItemsPerson
							key={index}
							onPress={() => handlePeopleClick(index)}
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
				</ContainerItemsPerson>
			</ContentCategory>

			<ContentProcess>
				<RowCategory>
					<Label>Processo</Label>
				</RowCategory>

				<ContainerItemsProcess>
					{ProcessResume.map((process, index) => (
						<ItemsProcess
							key={index}
							onPress={() => handleProcessClick(index)}
							style={{
								backgroundColor: colors.gray,
							}}>
							<LabelItemsProcess
								style={{
									color: selectedProcess === index ? colors.backgroundButton : colors.iconGray,
								}}>
								{process.numeroProcesso}
							</LabelItemsProcess>
						</ItemsProcess>
					))}
				</ContainerItemsProcess>
			</ContentProcess>

			<ContentRepeat>
				<RowCategory>
					<Label>Repetir</Label>
				</RowCategory>

				<ContainerItemsRepeat>
					{data.map((repeat, index) => (
						<ItemsProcess
							key={index}
							onPress={() => handleRepeatClick(index)}
							style={{
								backgroundColor: colors.gray,
							}}>
							<LabelItemsProcess
								style={{
									color: selectedRepeat === index ? colors.backgroundButton : colors.iconGray,
								}}>
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
						<LabelDuringInfo>02 semanas</LabelDuringInfo>
					</ContainerInfo>
				</Row>
			</ContentDuring>

			<ContentComments>
				<Row>
					<LabelComments>Observações</LabelComments>
				</Row>
				<InputDescription
					autoCorrect={false}
					autoCapitalize="none"
					placeholder="Digite uma observação"
					placeholderTextColor={colors.grayLight}
					returnKeyType="next"
				/>
			</ContentComments>
		</Modal>
	);
});
