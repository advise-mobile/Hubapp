import React, { useState, useRef, useCallback,useMemo } from 'react';
import CustomScrollableTabBar from '../../components/CustomScrollableTabBar';
import { Container, Warp } from '../../assets/styles/global';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { useTheme } from 'styled-components';

import CashFlow from './CashFlow';
import Finance from '../Finance/Releases'
import Category from './Category';

import Add from './Modal/Add';


import HeaderGlobals from '../../components/HeaderGlobals';

import Filters from './Filters';
import CashFlowFilter from '../Finance/Modal/CashFlowFilter'
import { DataFilterProps } from './Filters/types';
import CategoryFilter from './Modal/CategoryFilter';


export default FinanceTab = props => {

  const scrollRef = useRef();

  const filtersRef = useRef(null);
	const FilterCash = useRef(null);
	const FilterCategoryRef = useRef(null);

  const addRef = useRef(null);

  const [setFiltering] = useState<Boolean>(false);

  const [formattedData] = useState({});

  const [selectedTab, setSelectedTab] = useState(0);

  const [customActions, setCustomActions] = useState();

  const colorUseTheme = useTheme();

  const renderTabs = useCallback(() =>
    <ScrollableTabView ref={scrollRef} initialPage={0} renderTabBar={() => <CustomScrollableTabBar theme={colorUseTheme} />} onChangeTab={tab => setSelectedTab(tab.i)}>
			<Finance tabLabel='Lançamentos' setCustomActions={setCustomActions} navigation={props.navigation} selected={selectedTab == 0}/>
			<CashFlow tabLabel='Fluxo de caixa' setCustomActions={setCustomActions} navigation={props.navigation} selected={selectedTab == 1} />
			<Category tabLabel='Categoria' setCustomActions={setCustomActions} navigation={props.navigation} selected={selectedTab == 2} />
    </ScrollableTabView >, [selectedTab]
  );

  const renderAddOptions = useCallback(() => <Add ref={addRef} idAgenda={null} onAdd={() => {}} />, []);




  const handleClearFilters = useCallback( () => {
		setFiltering(false);
	}, []);

	const handleSubmitFilters = useCallback(async (data: DataFilterProps) => {

		setFiltering(true);
		filtersRef.current?.close();

		await getData({
			page:1,
			itens:data
		})
	}, []);

	/** RENDER FILTERS */
	const renderFilters = useMemo(
		() => (
			<Filters ref={filtersRef} handleSubmitFilters={handleSubmitFilters} handleClearFilters={handleClearFilters}/>
		),
		[formattedData],
	);

	const FilterCashFlow = useMemo(
		() => (
			<CashFlowFilter ref={FilterCash} handleSubmitFilters={handleSubmitFilters} handleClearFilters={handleClearFilters}/>
		),
		[formattedData],
	);

	const renderFilterCategory = useMemo(
		() => (
			<CategoryFilter ref={FilterCategoryRef} handleSubmitFilters={handleSubmitFilters} handleClearFilters={handleClearFilters}/>
		),
		[formattedData],
	);

	/** RENDER FILTERS */
	const renderFilterVerify = () => {

			if (selectedTab === 0 ) {
				filtersRef.current?.open();
			}

			if (selectedTab === 1 ) {
				FilterCash.current?.open();
			}

			if (selectedTab === 2 ) {
				FilterCategoryRef.current?.open();
			}

			// if(selectedTab === 1){
			// 	addRef.current?.open();
			// }
			//console.log("=== cheguei", selectedTab)

	};

  return (
    <Container>
      <Warp>
			<HeaderGlobals
				title={'Financeiro'}
				filter={() => renderFilterVerify()}
        add={() => addRef.current?.open()}
				lower={true}
				customActions={customActions}
			/>
        {renderTabs()}
        {renderAddOptions()}
        {renderFilters}
				{FilterCashFlow}
				{renderFilterCategory}

      </Warp>
    </Container>
  );
}
