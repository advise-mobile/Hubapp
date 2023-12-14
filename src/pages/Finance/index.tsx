import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Animated} from 'react-native';


import { useSelector } from 'react-redux';

import { PermissionsGroups, checkPermission, getLoggedUser } from 'helpers/Permissions';

import Spinner from 'components/Spinner';
import HasNotPermission from 'components/HasNotPermission';

import Add from './Modal/Add';

import {
  Filters,
  FiltersButton,
  FiltersText,
  FiltersActive,

  NotFound,
  Image,
  Content,
} from './styles';

import { Container, Warp } from 'assets/styles/global';

const tabs = [{
  id: 'release',
  name: 'Lançamento',
  params: {}
},
{
  id: 'cash-flow',
  name: 'Fluxo de caixa',
  params: {}
},
{
  id: 'category',
  name: 'Categoria',
  params: {}
}];

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

import CashFlow from './CashFlow';
import Release from '../Finance/Releases'
import Category from './Category';

//import Category from '@pages/MovementsTrash';

import ReleaseFilters from './Filters';
import CashFlowFilter from '../Finance/Modal/CashFlowFilter'
import CategoryFilter from './Modal/CategoryFilter';


import HeaderGlobals from '@components/HeaderGlobals';

export default function Finance(props) {

  // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

	const filterCash = useRef(null);
	const filterCategoryRef = useRef(null);
	const filtersReleaseRef = useRef(null);


  const image = (colorUseTheme.name == 'dark') ? require('assets/images/permissions/deadlines_white.png') : require('assets/images/permissions/deadlines.png');

  const addRef = useRef(null);

  const headerFiltersRef = useRef(null);

  const loading = useSelector(state => state.deadlines.loading);

  const [currentTab, setCurrentTab] = useState('release');

  const [trigger, setTrigger] = useState(false);
  const [page, setPage] = useState(1);
  const [havePermission, setPermission] = useState(false);
	const [filtering, setFiltering] = useState<Boolean>(false);

  const [formattedData] = useState({});

  useEffect(() => {
    const isFocused = props.navigation.isFocused();

    if ( !isFocused) return;

    setPage(1);
    setTrigger(!trigger);
  }, [props.navigation.isFocused()])


  useEffect(() => { checkPermission(PermissionsGroups.SCHEDULE).then(permission => setPermission(permission)) }, [props]);



  const handleFilter = useCallback((id, index) => {
    headerFiltersRef.current?.scrollToIndex({ animated: true, index: index });

    setPage(1);
    setCurrentTab(id);
  }, []);


  const renderTabs = useCallback(({ item, index }) => (
    <FiltersButton onPress={() => handleFilter(item.id, index)}>
      <FiltersText active={currentTab == item.id}>
        {item.name}
      </FiltersText>
      <FiltersActive active={currentTab == item.id} />
    </FiltersButton>
  ), [currentTab]);


  /** RENDER FILTERS */
	const renderFilterVerify = () => {

		if (currentTab === "release" ) {
		filtersReleaseRef.current?.open();
		}

		if (currentTab === "cash-flow" ) {
			filterCash.current?.open();
		}

		if (currentTab === "category" ) {
			filterCategoryRef.current?.open();
		}

	};


	const handleClearFilters = useCallback( () => {
		setFiltering(false);
	}, []);

	const handleSubmitFilters = useCallback(async (data: DataFilterProps) => {

		//setFiltering(true);
		//filtersRef.current?.close();

		// await getData({
		// 	page:1,
		// 	itens:data
		// })
	}, []);

  const renderAddOptions = useCallback(() => <Add ref={addRef} idAgenda={null} onAdd={() => {}} />, []);

	/** RENDER FILTERS */
	const renderReleaseFilters = useMemo(
		() => (
			<ReleaseFilters ref={filtersReleaseRef} handleSubmitFilters={handleSubmitFilters} handleClearFilters={handleClearFilters}/>
		),
		[formattedData],
	);

	const renderFilterCashFlow = useMemo(
		() => (
			<CashFlowFilter ref={filterCash} handleSubmitFilters={handleSubmitFilters} handleClearFilters={handleClearFilters}/>
		),
		[formattedData],
	);

	const renderFilterCategory = useMemo(
		() => (
			<CategoryFilter ref={filterCategoryRef} handleSubmitFilters={handleSubmitFilters} handleClearFilters={handleClearFilters}/>
		),
		[formattedData],
	);

  return (
    <Container>

          {havePermission ?
            <Warp>
              <HeaderGlobals
                title={'Financeiro'}
                filter={() => renderFilterVerify()}
                add={() => addRef.current?.open()}
				      />

              <Filters
                ref={headerFiltersRef}
                contentContainerStyle={{ alignItems: 'center', paddingRight: 16 }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={tabs}
                scrollEnabled
                renderItem={renderTabs}
                keyExtractor={(item, _) => item.id.toString()}
              />
              <Content>
                {
                loading && page == 1 ? <Spinner height={'auto'} /> :
                  <>
                    {currentTab === "release" && <Release /> }
                    {currentTab === "cash-flow" && <CashFlow /> }
                    {currentTab === "category" && <Category /> }
                  </>
		  		    }
              </Content>

      {renderAddOptions()}
			{renderReleaseFilters}
			{renderFilterCashFlow}
			{renderFilterCategory}

            </Warp>
            :
            <HasNotPermission
              image={image}
              title="A sua rotina totalmente organizada!"
              body="Tenha a facilidade de cadastrar um prazo judicial, uma audiência ou uma reunião diretamente na sua ferramenta de monitoramento de informações jurídicas"
            />}

    </Container>
  );
};
