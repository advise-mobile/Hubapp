import React, { forwardRef,useCallback, useRef} from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'components/Modal';

import {
  Footer,
  Cancel,
  CancelText,
  Content,
  Row,
  Label,
	Icon,
} from './styles';

// Add UseTheme para pegar o tema global adicionado
import { useTheme } from 'styled-components';
import AddRevenue from '../AddRevenue';
import AddExpense from '../AddExpense';
import AddCategory from '../AddCategory';


export default Add = forwardRef((props, ref) => {

	const RevenueRef = useRef(null);
	const ExpenseRef = useRef(null);
	const CategoryRef = useRef(null);


	const renderRevenue = useCallback(() => <AddRevenue ref={RevenueRef} idAgenda={null} onAdd={() => {}} />, []);
	const renderExpense = useCallback(() => <AddExpense ref={ExpenseRef} idAgenda={null} onAdd={() => {}} />, []);
	const addCategory = useCallback(() => <AddCategory ref={CategoryRef} idAgenda={null} onAdd={() => {}} />, []);


  // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

  const closeModal = useCallback(() => ref.current?.close(), []);

  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
    </Footer>
  );


  return (
		<>
    <Modal maxHeight={500} ref={ref} title="Cadastrar" footer={footer()} >

      <Content onPress={() => ExpenseRef.current?.open()}>
        <Row >
          <Label>Despesa</Label>
        </Row>
				<Icon>
				<FontAwesome name="chevron-right" color={colors.inactiveDetails}/>
				</Icon>

      </Content>



			<Content onPress={() => RevenueRef.current?.open()}>
        <Row >
          <Label>Receita</Label>
        </Row>
				<Icon>
				<FontAwesome name="chevron-right" color={colors.inactiveDetails}/>
				</Icon>
      </Content>

			<Content onPress={() => CategoryRef.current?.open()}>
        <Row >
          <Label>Categoria</Label>
        </Row>
				<Icon>
				<FontAwesome name="chevron-right" color={colors.inactiveDetails}/>
				</Icon>
      </Content>
    </Modal >


		{renderRevenue()}
		{renderExpense()}
		{addCategory()}
		</>
  );
});
