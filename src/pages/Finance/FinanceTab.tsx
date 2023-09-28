import React, { useState, useRef, useCallback } from 'react';
import CustomScrollableTabBar from '../../components/CustomScrollableTabBar';
import { Container, Warp } from '../../assets/styles/global';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { useTheme } from 'styled-components';

import CashFlow from './CashFlow';
import Finance from '../Finance/Releases'
import Category from './Category';

import Add from './Modal/Add';
import AddExpense from './Modal/AddExpense';


import HeaderGlobals from '../../components/HeaderGlobals';
import AddRevenue from './Modal/AddRevenue';
import AddCategory from './Modal/AddCategory';


export default FinanceTab = props => {

  const scrollRef = useRef();

  const addRef = useRef(null);

  const [selectedTab, setSelectedTab] = useState(0);

  const [customActions, setCustomActions] = useState();

  const colorUseTheme = useTheme();

  const renderTabs = useCallback(() =>
    <ScrollableTabView ref={scrollRef} initialPage={0} renderTabBar={() => <CustomScrollableTabBar theme={colorUseTheme} />} onChangeTab={tab => setSelectedTab(tab.i)}>
			<Finance tabLabel='Lançamentos' setCustomActions={setCustomActions} navigation={props.navigation} selected={selectedTab == 0} />
			<CashFlow tabLabel='Fluxo de caixa' setCustomActions={setCustomActions} navigation={props.navigation} selected={selectedTab == 1} />
			<Category tabLabel='Categoria' setCustomActions={setCustomActions} navigation={props.navigation} selected={selectedTab == 2} />
    </ScrollableTabView >, [selectedTab]
  );

  const renderAddOptions = useCallback(() => <Add ref={addRef} idAgenda={null} onAdd={() => {}} />, []);


  return (
    <Container>
      <Warp>
			<HeaderGlobals
				title={'Financeiro'}
				filter={() => openFilters()}
        add={() => addRef.current?.open()}
				lower={true}
				customActions={customActions}
			/>
        {renderTabs()}
        {renderAddOptions()}

      </Warp>
    </Container>
  );
}
