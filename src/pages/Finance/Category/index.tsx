import {SwipeListView} from 'react-native-swipe-list-view';
import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	useMemo,
	forwardRef,
	useImperativeHandle,
} from 'react';
import {Actions, ActionButton} from 'assets/styles/global';
import {useTheme} from 'styled-components';
import {Animated, TouchableHighlight} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useGetCategory, useCategory} from '@services/hooks/Finances/useCategory';
import {CategoryProps, DataFiltersCategory, CategoryRef, PaginatedCategoryResult} from './types';

import ConfirmModal from '@components/ConfirmModal';

import Spinner from '@components/Spinner';
import {
	Container,
	ContainerIcon,
	ContainerItems,
	ContainerSubtitle,
	ContainerTitle,
	SubTitle,
	TextTitle,
	ContainerSpinner,
} from './styles';
import EditCategory from '../Modal/EditCategory';

const Category = forwardRef<CategoryRef, DataFiltersCategory>((props, ref) => {
	const {isLoadingCategory, getCategoryData} = useGetCategory();
	const {isSavingCategory, inactivateCategory, activateCategory} = useCategory();

	const [dataResume, setDataResume] = useState<CategoryProps[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const [categoryEdit, setCategoryEdit] = useState<CategoryProps | null>(null);

	const [currentItem, setCurrentItem] = useState<CategoryProps>();

	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const confirmationInativationModalRef = useRef<any>();
	const editCategoryRef = useRef<any>();
	const listRef = useRef<any>(null);

	useEffect(() => {
		fetchData(true);
	}, [props]);

	useImperativeHandle(ref, () => ({
		refresh: () => {
			return fetchData(true);
		},
	}));

	const fetchData = async (resetData = false) => {
		try {
			const pageToLoad = resetData ? 1 : currentPage;
			const responseCategories: PaginatedCategoryResult = await getCategoryData(
				props.dataFiltersCategory,
				pageToLoad,
				100,
			);

			if (responseCategories) {
				if (resetData) {
					setDataResume(responseCategories.items);
					setCurrentPage(2);
				} else {
					setDataResume(prev => [...prev, ...responseCategories.items]);
					setCurrentPage(prev => prev + 1);
				}
				setHasMore(responseCategories.hasMore);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const loadMore = async () => {
		if (isLoadingMore || !hasMore || isLoadingCategory) return;

		setIsLoadingMore(true);
		try {
			await fetchData(false);
		} finally {
			setIsLoadingMore(false);
		}
	};

	const handleEditCategory = (item: CategoryProps) => {
		setCategoryEdit(item);
		setTimeout(() => {
			editCategoryRef.current?.open();
		}, 300);
	};

	const handleModalEditCategory = useCallback(() => {
		fetchData(true);
		editCategoryRef.current?.close();
	}, []);

	const handleInativation = useCallback((item: CategoryProps) => {
		setCurrentItem(item);
		confirmationInativationModalRef.current?.open();
	}, []);

	const handleReactivate = useCallback((item: CategoryProps) => {
		setCurrentItem(item);
		confirmationInativationModalRef.current?.open();
	}, []);

	const renderHiddenItem = useCallback(
		({item}: {item: CategoryProps}) => (
			<Actions
				as={Animated.View}
				style={{
					overflow: 'hidden',
					backgroundColor: colors.white,
				}}>
				<ActionButton onPress={() => handleEditCategory(item)}>
					<MaterialIcons name="edit" size={24} color={colors.fadedBlack} />
				</ActionButton>
				{item.ativo ? (
					<ActionButton onPress={() => handleInativation(item)}>
						<MaterialIcons name="block" size={24} color={colors.fadedBlack} />
					</ActionButton>
				) : (
					<ActionButton onPress={() => handleReactivate(item)} style={{marginLeft: 'auto'}}>
						<MaterialIcons name="check" size={24} color={colors.green200} />
					</ActionButton>
				)}
			</Actions>
		),
		[],
	);

	const openRow = useCallback(
		(item: CategoryProps) => {
			const itemId = item.idCategoriaFinanceiro;
			if (listRef.current && itemId) {
				!listRef.current._rows[itemId]?.isOpen
					? listRef.current._rows[itemId]?.manuallySwipeRow(-150)
					: closeOpenedRow(item);
			}
		},
		[listRef],
	);

	const closeOpenedRow = useCallback((item: CategoryProps) => {
		const itemId = item.idCategoriaFinanceiro;
		if (listRef.current && itemId) {
			listRef.current._rows[itemId]?.closeRow();
		}
	}, []);

	const renderItem = useCallback(
		({item}: {item: CategoryProps}) => (
			<Animated.View>
				<TouchableHighlight
					onPress={() => openRow(item)}
					underlayColor={colors.white}
					activeOpacity={1}>
					<Container active={item.ativo}>
						<ContainerItems>
							<ContainerIcon>
								<MaterialIcons name="label" color={item.corCategoria} size={24} />
							</ContainerIcon>

							<ContainerTitle>
								<TextTitle>{item.nomeCategoriaFinanceiroShow}</TextTitle>
							</ContainerTitle>

							<ContainerSubtitle>
								<SubTitle>{item.tipoCategoriaFinanceiro.nomeTipoCategoriaFinanceiro}</SubTitle>
								<MaterialIcons
									name="fiber-manual-record"
									size={12}
									color={item.ativo ? colors.green200 : colors.red200}
									style={{marginLeft: 4}}
								/>
							</ContainerSubtitle>
						</ContainerItems>
					</Container>
				</TouchableHighlight>
			</Animated.View>
		),
		[dataResume, colors],
	);

	const renderFooter = useCallback(() => {
		if (!isLoadingMore) return null;
		return (
			<ContainerSpinner>
				<Spinner height={30} color={colors.primary} transparent={true} />
			</ContainerSpinner>
		);
	}, [isLoadingMore, colors]);

	const handleModalCancel = useCallback(() => confirmationInativationModalRef.current?.close(), []);

	const handleModalInativationSubmit = useCallback(async () => {
		if (currentItem) {
			const inativation = await inactivateCategory(currentItem, handleModalCancel);
			if (inativation) {
				await fetchData(true);
			}
		}
	}, [currentItem]);

	const handleModalActivateSubmit = useCallback(async () => {
		if (currentItem) {
			const trash = await activateCategory(currentItem, handleModalCancel);
			if (trash) {
				await fetchData(true);
			}
		}
	}, [currentItem]);

	const renderConfirmationInativation = useMemo(
		() => (
			<ConfirmModal
				ref={confirmationInativationModalRef}
				onCancel={handleModalCancel}
				onSubmit={currentItem?.ativo ? handleModalInativationSubmit : handleModalActivateSubmit}
				cancelText="Cancelar"
				submitText={currentItem?.ativo ? 'Sim, quero inativar ' : 'Sim, quero ativar'}
				title={currentItem?.ativo ? 'Deseja inativar?' : 'Deseja ativar?'}
				description={
					currentItem?.ativo
						? 'Ao inativar uma categoria, ela não poderá ser mais usada até ser reativada.'
						: 'Ao ativar uma categoria, ela voltará a poder ser usada novamente.'
				}
				loading={isSavingCategory}
			/>
		),
		[currentItem, isSavingCategory],
	);

	return (
		<>
			{isLoadingCategory && dataResume.length === 0 ? (
				<ContainerSpinner>
					<Spinner height={50} color={colors.primary} transparent={true} />
				</ContainerSpinner>
			) : (
				<SwipeListView
					ref={listRef}
					data={dataResume}
					disableRightSwipe
					rightOpenValue={-120}
					stopRightSwipe={-120}
					closeOnRowOpen={true}
					renderItem={renderItem}
					previewOpenValue={-150}
					previewOpenDelay={2000}
					useNativeDriver={false}
					renderHiddenItem={renderHiddenItem}
					keyExtractor={(item: CategoryProps) => item.idCategoriaFinanceiro?.toString() || ''}
					removeClippedSubviews={true}
					maxToRenderPerBatch={10}
					updateCellsBatchingPeriod={100}
					initialNumToRender={20}
					onEndReached={loadMore}
					onEndReachedThreshold={0.1}
					ListFooterComponent={renderFooter}
				/>
			)}

			{categoryEdit && (
				<EditCategory item={categoryEdit} ref={editCategoryRef} onClose={handleModalEditCategory} />
			)}

			{renderConfirmationInativation}
		</>
	);
});

export default Category;
