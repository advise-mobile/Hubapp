import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';

import {PermissionsGroups, checkPermission} from 'helpers/Permissions';

import Spinner from 'components/Spinner';

import HasNotPermission from 'components/HasNotPermission';

import Add from './Modal/Add';

import {Filters, FiltersButton, FiltersText, FiltersActive, Content} from './styles';

import {Container, Warp} from 'assets/styles/global';

const tabs = [
	{
		id: 'release',
		name: 'Lançamentos',
		params: {},
	},
	{
		id: 'cash-flow',
		name: 'Fluxo de caixa',
		params: {},
	},
	{
		id: 'category',
		name: 'Categoria',
		params: {},
	},
];

// Add Hook UseTheme para pegar o tema global addicionado
import {useTheme} from 'styled-components';

import CashFlow from './CashFlow';
import Release from '../Finance/Releases';
import Category from './Category';

import ReleaseFilters from './Modal/ReleaseFilter';
import CashFlowFilter from '../Finance/Modal/CashFlowFilter';
import CategoryFilter from './Modal/CategoryFilter';

import {GetMonthPeriod} from '@helpers/DateFunctions';

const {startOfMonth, endOfMonth} = GetMonthPeriod(true);

import HeaderGlobals from '@components/HeaderGlobals';

export default function Finance(props) {
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	//const { colors } = colorUseTheme;

	const filterCash = useRef(null);
	const filterCategoryRef = useRef(null);
	const filtersReleaseRef = useRef(null);

	const image =
		colorUseTheme.name == 'dark'
			? require('assets/images/permissions/deadlines_white.png')
			: require('assets/images/permissions/deadlines.png');

	const addRef = useRef(null);
	const categoryRef = useRef(null);

	const headerFiltersRef = useRef(null);

	const [loading, setLoading] = useState<boolean>(false);

	const [currentTab, setCurrentTab] = useState('release');

	const [trigger, setTrigger] = useState(false);

	const [havePermission, setPermission] = useState(false);

	const [dataFiltersCategory, setDataFiltersCategory] = useState();

	const [dataFiltersRelease, setDataFiltersRelease] = useState();

	// period = 3 = mensal filtro inicial conforme doc solicitada
	const [dataFiltersCashFlow, setDataFiltersCashFlow] = useState({
		dataSaldo: startOfMonth,
		dataFim: endOfMonth,
		period: 3,
	});

	const [formattedData] = useState({});

	useEffect(() => {
		const isFocused = props.navigation.isFocused();

		if (!isFocused) return;

		setTrigger(!trigger);

		// Adiciona função de limpeza
		return () => {
			// Limpa qualquer atualização de estado pendente
			setTrigger(false);
		};
	}, [props.navigation.isFocused()]);

	useEffect(() => {
		let mounted = true;

		const verificarPermissao = async () => {
			const permission = await checkPermission(PermissionsGroups.SCHEDULE);
			if (mounted) {
				setPermission(permission);
			}
		};

		verificarPermissao();

		// Adiciona função de limpeza
		return () => {
			mounted = false;
		};
	}, [props]);

	const handleFilter = useCallback((id, index) => {
		headerFiltersRef.current?.scrollToIndex({animated: true, index: index});
		setCurrentTab(id);
	}, []);

	const renderTabs = useCallback(
		({item, index}) => (
			<FiltersButton onPress={() => handleFilter(item.id, index)}>
				<FiltersText active={currentTab == item.id}>{item.name}</FiltersText>
				<FiltersActive active={currentTab == item.id} />
			</FiltersButton>
		),
		[currentTab],
	);

	/** RENDER FILTERS */
	const renderFilterVerify = () => {
		if (currentTab === 'release') {
			filtersReleaseRef.current?.open();
		}

		if (currentTab === 'cash-flow') {
			filterCash.current?.open();
		}

		if (currentTab === 'category') {
			filterCategoryRef.current?.open();
		}
	};

	const handleClearFilters = useCallback(() => {
		//setFiltering(false);
	}, []);

	const handleSubmitFiltersCategory = useCallback(async data => {
		setDataFiltersCategory(data);
		filterCategoryRef.current?.close();
	}, []);

	const handleSubmitFiltersRelease = useCallback(async data => {
		setDataFiltersRelease(data);
		filtersReleaseRef.current?.close();
	}, []);

	const handleSubmitFiltersCashFlow = useCallback(async data => {
		setDataFiltersCashFlow(data);
		filterCash.current?.close();
	}, []);

	const handleRefresh = () => {
		if (currentTab === 'category') {
			categoryRef.current?.refresh();
		}
	};

	const renderAddOptions = useCallback(
		() => <Add ref={addRef} onClose={() => handleRefresh()} onAdd={() => {}} />,
		[],
	);

	/** RENDER FILTERS */
	const renderReleaseFilters = useMemo(
		() => (
			<ReleaseFilters
				ref={filtersReleaseRef}
				handleSubmitFilters={handleSubmitFiltersRelease}
				handleClearFilters={handleClearFilters}
			/>
		),
		[formattedData],
	);

	const renderFilterCashFlow = useMemo(
		() => (
			<CashFlowFilter
				ref={filterCash}
				handleSubmitFilters={handleSubmitFiltersCashFlow}
				handleClearFilters={handleClearFilters}
			/>
		),
		[formattedData],
	);

	const renderFilterCategory = useMemo(
		() => (
			<CategoryFilter
				ref={filterCategoryRef}
				handleSubmitFilters={handleSubmitFiltersCategory}
				handleClearFilters={handleClearFilters}
			/>
		),
		[formattedData],
	);

	return (
		<Container>
			{havePermission ? (
				<Warp>
					<HeaderGlobals
						title={'Financeiro'}
						filter={() => renderFilterVerify()}
						add={() => addRef.current?.open()}
					/>

					<Filters
						ref={headerFiltersRef}
						contentContainerStyle={{alignItems: 'center', paddingRight: 16}}
						showsHorizontalScrollIndicator={false}
						horizontal
						data={tabs}
						scrollEnabled
						renderItem={renderTabs}
						keyExtractor={(item, _) => item.id.toString()}
					/>
					<Content>
						{loading ? (
							<Spinner height={'auto'} />
						) : (
							<>
								{currentTab === 'release' && <Release dataFiltersRelease={dataFiltersRelease} />}
								{currentTab === 'cash-flow' && (
									<CashFlow dataFiltersCashFlow={dataFiltersCashFlow} />
								)}
								{currentTab === 'category' && (
									<Category ref={categoryRef} dataFiltersCategory={dataFiltersCategory} />
								)}
							</>
						)}
					</Content>

					{renderAddOptions()}
					{currentTab === 'release' && renderReleaseFilters}
					{currentTab === 'cash-flow' && renderFilterCashFlow}
					{currentTab === 'category' && renderFilterCategory}
				</Warp>
			) : (
				<HasNotPermission
					image={image}
					title="A sua rotina totalmente organizada!"
					body="Tenha a facilidade de cadastrar um prazo judicial, uma audiência ou uma reunião diretamente na sua ferramenta de monitoramento de informações jurídicas"
				/>
			)}
		</Container>
	);
}
