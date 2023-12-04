import React, { forwardRef,useCallback, useRef,useState,useEffect} from 'react';

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

	const revenueRef = useRef(null);
	const expenseRef = useRef(null);
	const categoryRef = useRef(null);

	const [modalCategoriesOpen, setModalCategoriesOpen] = useState(false);
	const [modalExpenseOpen, setModalExpenseOpen] = useState(false);
	const [modalRevenueOpen, setModalRevenueOpen] = useState(false);





  // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

  const closeModal = useCallback(() => ref.current?.close(), []);

	useEffect(() => {
			if(modalExpenseOpen){
				expenseRef.current?.open();
			}
  }, [modalExpenseOpen]);

	useEffect(() => {
		if(modalRevenueOpen){
			revenueRef.current?.open();
		}
}, [modalRevenueOpen]);

useEffect(() => {
	if(modalCategoriesOpen){
		categoryRef.current?.open();
	}
}, [modalCategoriesOpen]);


  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
    </Footer>
  );


	const closeExpense = ()=>{
		setModalExpenseOpen(false);
	}

	const closeRevenue = ()=>{
		setModalRevenueOpen(false);
	}

	const closeCategory = ()=>{
		setModalCategoriesOpen(false);
	}




  return (
		<>
    <Modal maxHeight={500} ref={ref} title="Cadastrar" footer={footer()} >

      <Content onPress={() => setModalExpenseOpen(true) }>
        <Row >
          <Label>Despesa</Label>
        </Row>
				<Icon>
				<FontAwesome name="chevron-right" color={colors.inactiveDetails}/>
				</Icon>

      </Content>



			<Content onPress={() => setModalRevenueOpen(true)}>
        <Row >
          <Label>Receita</Label>
        </Row>
				<Icon>
				<FontAwesome name="chevron-right" color={colors.inactiveDetails}/>
				</Icon>
      </Content>

			<Content onPress={() => setModalCategoriesOpen(true)}>
        <Row >
          <Label>Categoria</Label>
        </Row>
				<Icon>
				<FontAwesome name="chevron-right" color={colors.inactiveDetails}/>
				</Icon>
      </Content>
    </Modal >


		{modalRevenueOpen && <AddRevenue ref={revenueRef} onClose={closeRevenue}/>}
		{modalExpenseOpen && <AddExpense ref={expenseRef} onClose={closeExpense}/>
		}
		{modalCategoriesOpen && <AddCategory ref={categoryRef} onClose={closeCategory}/>}
		</>
  );
});
