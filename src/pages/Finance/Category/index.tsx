import {SwipeListView} from 'react-native-swipe-list-view';
import React, {useCallback, useEffect, useRef, useState } from 'react';
import {Actions, ActionButton} from 'assets/styles/global';
import {useTheme} from 'styled-components';
import {Animated} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useGetCategory} from '@services/hooks/Finances/useCategory';
import {CategoryProps,DataFiltersCategory} from './types';

import {useNavigation} from '@react-navigation/native';

import Spinner from '@components/Spinner';
import {
	Container,
	ContainerIcon,
	ContainerItems,
	ContainerSubtitle,
	ContainerTitle,
	SubTitle,
	TextTitle,
	ContainerSpinner
} from './styles';
import EditCategory from '../Modal/EditCategory';

export default function Category(props:DataFiltersCategory ) {

	const {isLoadingCategory, getCategoryData} = useGetCategory();

	const [dataResume, setDataResume] = useState<CategoryProps[] | undefined>([]);

	const [categoryEdit,setCategoryEdit] = useState<CategoryProps>();

	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

	const editCategoryRef = useRef();

	// const closeCategory = ()=>{
	// 	alert('fechar');
	// 	editCategoryRef.current?.close();
	// }		

	// const navigation = useNavigation();

	useEffect(() => {
		fetchData();
	}, [props]);


	const fetchData = async () => {
		try {
			const responseCategories = await getCategoryData(props.dataFiltersCategory);
			setDataResume(responseCategories);
		} catch (error) {}
	};

	const listRef = useRef(null);


	const handleEditCategory = (item:CategoryProps) => {
		setCategoryEdit(item);
		editCategoryRef.current?.open();
	}

	const handleModalEditCategory = useCallback(() => editCategoryRef.current?.close(),[]);

	const renderHiddenItem = useCallback(
		({item}: {item: CategoryProps}) => (
			<Actions
				as={Animated.View}
				style={{
					overflow: 'hidden',
				}}>
				<ActionButton onPress={() => handleEditCategory(item)}>
					<MaterialIcons name="edit" size={24} color={colors.fadedBlack} />
				</ActionButton>
				<ActionButton>
					<MaterialIcons name="block" size={24} color={colors.fadedBlack} />
				</ActionButton>
			</Actions>
		),
		[],
	);

	const openRow = useCallback(
		(item: CategoryProps) => {
			!listRef.current?._rows[item.idCategoriaFinanceiro].isOpen
				? listRef.current?._rows[item.idCategoriaFinanceiro].manuallySwipeRow(-150)
				: closeOpenedRow(item);
		},
		[listRef],
	);

	const closeOpenedRow = useCallback(
		(item: CategoryProps) => listRef.current?._rows[item.idCategoriaFinanceiro].closeRow(),
		[],
	);

	const renderItem = useCallback(
		({item}: {item: CategoryItemProps}) => (
		 
			<Animated.View>
				<Container>
					<ContainerItems>
						<ContainerIcon>
							<MaterialIcons name="label" color={item.corCategoria} size={24} />
						</ContainerIcon>

						<ContainerTitle
							onPress={() => openRow(item)}
							underlayColor={colors.white}
							activeOpacity={1}>
							<TextTitle>{item.nomeCategoriaFinanceiro.substr(0,14)}</TextTitle>
						</ContainerTitle>

						<ContainerSubtitle>
							<SubTitle
								onPress={() => openRow(item)}
								underlayColor={colors.white}
								activeOpacity={1}>
								{item.tipoCategoriaFinanceiro.nomeTipoCategoriaFinanceiro}
							</SubTitle>
						</ContainerSubtitle>
					</ContainerItems>
				</Container>
			</Animated.View>
			
		),
		[dataResume, colors],
	);

	return (
		<>
		{ isLoadingCategory ? (
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
				closeOnRowOpen={false}
				renderItem={renderItem}
				previewOpenValue={-150}
				previewOpenDelay={2000}
				useNativeDriver={false}
				renderHiddenItem={renderHiddenItem}
				keyExtractor={(item: CategoryProps) => item.idCategoriaFinanceiro.toString()}
				removeClippedSubviews={true}
				maxToRenderPerBatch={5}
				updateCellsBatchingPeriod={100}
				initialNumToRender={20}
			/>)
		}

			<EditCategory item={categoryEdit} ref={editCategoryRef} onClose={handleModalEditCategory}/>

		</>
	);
}
