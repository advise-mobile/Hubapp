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

const people = ['Pessoa 1', 'Pessoa 2', 'Pessoa 3', 'Pessoa 4', 'Pessoa 5', 'Pessoa 6'];

const process = [
	'Nº do processo',
	'Pasta do processo',
	'Luiz José x Rafaela Zemuner',
	'Proc.: 0000846-51.2020.5.07.0016',
];

const repeat = ['Não se repete', 'Todos os dias', 'Semanal', 'Quinzenal ', 'Mensal', 'Anual'];

export default AddRevenue = forwardRef((props, ref) => {

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
    // fetchData();
  }, []);
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
		<Modal maxHeight={650} onClose={props.onClose} ref={ref} title="Cadastrar receita" footer={footer()}>
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
					<Items style={[
							{backgroundColor: colors.gray},
							selectedColor === colors.gray
								? {borderWidth: 2, borderColor: colors.primary}
								: {},
						]}
						onPress={() => setSelectedColor(colors.gray)}>
						<LabelItems>Categoria 01</LabelItems>
					</Items>

					<Items style={[
							{backgroundColor: colors.amber},
							selectedColor === colors.amber
								? {borderWidth: 2, borderColor: colors.primary}
								: {},
						]}
						onPress={() => setSelectedColor(colors.amber)}>
						<LabelItems>Categoria 02</LabelItems>
					</Items>

					<Items style={[
							{backgroundColor: colors.yellow},
							selectedColor === colors.yellow
								? {borderWidth: 2, borderColor: colors.primary}
								: {},
						]}
						onPress={() => setSelectedColor(colors.yellow)}>
						<LabelItems>Categoria 03</LabelItems>
					</Items>

					<Items style={[
							{backgroundColor: colors.purple},
							selectedColor === colors.purple
								? {borderWidth: 2, borderColor: colors.primary}
								: {},
						]}
						onPress={() => setSelectedColor(colors.purple)}>
						<LabelItems>Categoria 04</LabelItems>
					</Items>

					<Items style={[
							{backgroundColor: colors.pink},
							selectedColor === colors.pink
								? {borderWidth: 2, borderColor: colors.primary}
								: {},
						]}
						onPress={() => setSelectedColor(colors.pink)}>
						<LabelItems>Categoria 05</LabelItems>
					</Items>

					<Items style={[
							{backgroundColor: colors.pinkRed},
							selectedColor === colors.pinkRed
								? {borderWidth: 2, borderColor: colors.primary}
								: {},
						]}
						onPress={() => setSelectedColor(colors.pinkRed)}>
						<LabelItems>Categoria 06</LabelItems>
					</Items>
				</ContainerItems>
			</ContentCategory>

			<ContentCategory>
				<RowCategory>
					<Label>Pessoa</Label>
				</RowCategory>

				<ContainerItemsPerson>
					{people.map((people, index) => (
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
								{people}
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
					{process.map((process, index) => (
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
								{process}
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
					{repeat.map((repeat, index) => (
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
								{repeat}
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
