import React, {forwardRef, useCallback} from 'react';
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
} from './styles';

// Add UseTheme para pegar o tema global adicionado
import {useTheme} from 'styled-components';

export default AddExpense = forwardRef((props, ref) => {
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const closeModal = useCallback(() => ref.current?.close(), []);
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
		<Modal maxHeight={650} ref={ref} title="Cadastrar despesa" footer={footer()}>
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
						placeholder="R$ -"
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
					<Items style={[{backgroundColor: colors.gray}]}>
						<LabelItems>Categoria 01</LabelItems>
					</Items>

					<Items style={[{backgroundColor: colors.amber}]}>
						<LabelItems>Categoria 02</LabelItems>
					</Items>

					<Items style={[{backgroundColor: colors.yellow}]}>
						<LabelItems>Categoria 03</LabelItems>
					</Items>

					<Items style={[{backgroundColor: colors.purple}]}>
						<LabelItems>Categoria 04</LabelItems>
					</Items>

					<Items style={[{backgroundColor: colors.pink}]}>
						<LabelItems>Categoria 05</LabelItems>
					</Items>

					<Items style={[{backgroundColor: colors.pinkRed}]}>
						<LabelItems>Categoria 06</LabelItems>
					</Items>
				</ContainerItems>
			</ContentCategory>

			<ContentCategory>
				<RowCategory>
					<Label>Pessoa</Label>
				</RowCategory>

				<ContainerItemsPerson>

					<ItemsPerson>
						<LabelItems>Pessoa 1</LabelItems>
					</ItemsPerson>

					<ItemsPerson>
						<LabelItems>Pessoa 2</LabelItems>
					</ItemsPerson>

					<ItemsPerson>
						<LabelItems>Pessoa 3</LabelItems>
					</ItemsPerson>

					<ItemsPerson>
						<LabelItems>Pessoa 4</LabelItems>
					</ItemsPerson>

					<ItemsPerson>
						<LabelItems>Pessoa 5</LabelItems>
					</ItemsPerson>

					<ItemsPerson>
						<LabelItems>Pessoa 6</LabelItems>
					</ItemsPerson>
				</ContainerItemsPerson>
			</ContentCategory>

			<ContentProcess>
				<RowCategory>
					<Label>Processo</Label>
				</RowCategory>

				<ContainerItemsProcess>
					<ItemsProcess>
						<LabelItemsProcess>Nº do processo</LabelItemsProcess>
					</ItemsProcess>

					<ItemsProcess>
						<LabelItemsProcess>Pasta do processo</LabelItemsProcess>
					</ItemsProcess>

					<ItemsProcess>
						<LabelItemsProcess>Luiz José x Rafaela Zemuner</LabelItemsProcess>
					</ItemsProcess>

					<ItemsProcess>
						<LabelItemsProcess>Proc.: 0000846-51.2020.5.07.0016</LabelItemsProcess>
					</ItemsProcess>
				</ContainerItemsProcess>
			</ContentProcess>

			<ContentRepeat>
				<RowCategory>
					<Label>Repetir</Label>
				</RowCategory>

				<ContainerItemsRepeat>
					<ItemsProcess>
						<LabelItemsProcess>Não se repete</LabelItemsProcess>
					</ItemsProcess>

					<ItemsProcess>
						<LabelItemsProcess>Todos os dias</LabelItemsProcess>
					</ItemsProcess>

					<ItemsProcess>
						<LabelItemsProcess>Semanal</LabelItemsProcess>
					</ItemsProcess>

					<ItemsProcess>
						<LabelItemsProcess>Quinzenal</LabelItemsProcess>
					</ItemsProcess>

					<ItemsProcess>
						<LabelItemsProcess>Mensal</LabelItemsProcess>
					</ItemsProcess>

					<ItemsProcess>
						<LabelItemsProcess>Anual</LabelItemsProcess>
					</ItemsProcess>
				</ContainerItemsRepeat>
			</ContentRepeat>

			<ContentDuring>
				<Row>
					<LabelDuring>Durante</LabelDuring>
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
