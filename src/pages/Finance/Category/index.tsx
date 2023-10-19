import {SwipeListView} from 'react-native-swipe-list-view';
import React, {useCallback, useRef, useState} from 'react';
import {Actions, ActionButton} from 'assets/styles/global';

import {useTheme} from 'styled-components';
import {Animated} from 'react-native';
import {
	ContainerIcon,
	ContainerItems,
	ContainerText,
	ContainerTextTitle,
	SubTitle,
	TextTitle,
} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CategoryItemProps} from './types';

export default function Category(props) {
	const dataItem = [
		{
			id: 1,
			title: 'Sálarios',
			SubTitle: 'Receitas',
		},
		{
			id: 2,
			title: 'Viagem',
			SubTitle: 'Despesas',
		},
	];

	const [categories, setCategories] = useState<CategoryItemProps[]>(dataItem);

	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const confirmationModalRef = useRef();
	const [iconOpacity, setIconOpacity] = useState(new Animated.Value(0));

	const confirmationModalRecoverRef = useRef();
	const [currentItem, setCurrentItem] = useState<ItemProps>();

	const iconDelete =
		colorUseTheme.name === 'dark'
			? require('assets/images/movements-trash-delete-dark.png')
			: require('assets/images/movements-trash-delete-white.png');

	const iconRestore =
		colorUseTheme.name === 'dark'
			? require('assets/images/movements-trash-restore-dark.png')
			: require('assets/images/movements-trash-restore-white.png');

	const listRef = useRef(null);

	const handleDelete = useCallback((item: ItemProps) => {
		setCurrentItem(item);
		confirmationModalRef.current?.open();
	}, []);

	const handleRecover = useCallback((item: ItemProps) => {
		setCurrentItem(item);
		confirmationModalRecoverRef.current?.open();
	}, []);

	const renderHiddenItem = useCallback(
		({ item }: { item: CategoryItemProps }) => (
			<Actions
				as={Animated.View}
				style={{
					overflow: 'hidden',
					opacity: item.id === currentItem?.id ? iconOpacity : 0,
				}}
			>
				<ActionButton onPress={() => handleRecover(item)}>
				<MaterialIcons name="edit" size={24} color={colors.fadedBlack} />
				</ActionButton>
				<ActionButton onPress={() => handleDelete(item)}>
				<MaterialIcons name="block" size={24} color={colors.fadedBlack} />
				</ActionButton>
			</Actions>
		),
		[iconRestore, iconDelete, iconOpacity, currentItem]
	);



	const openRow = useCallback(
		(item: CategoryItemProps) => {
			const row = listRef.current?._rows[item.id];

			if (!row || row.isOpen) {
				closeOpenedRow(item);
				return;
			}

			setCurrentItem(item);

			row.manuallySwipeRow(-130);

			Animated.timing(iconOpacity, {
				toValue: 1,
				duration: 30,
				useNativeDriver: false,
			}).start();
		},
		[listRef, iconOpacity]
	);


	const closeOpenedRow = useCallback(
		(item: CategoryItemProps) => {
			const row = listRef.current?._rows[item.id];

			if (row && !row.isOpen) {
				setCurrentItem(null);
				return;
			}

			row.closeRow();

			Animated.timing(iconOpacity, {
				toValue: 0,
				duration: 50,
				useNativeDriver: false,
			}).start();
		},
		[listRef, iconOpacity]
	);


	const renderItem = useCallback(
		({item}: {item: CategoryItemProps}) => (
			<Animated.View>
				<ContainerItems onPress={() => openRow(item)}>
					<ContainerTextTitle>
						<ContainerIcon>
						<MaterialIcons name="label" color={item.id === 1 ? colors.pinkTag : colors.greenTag } size={24} />
						</ContainerIcon>
						<ContainerText>
							<TextTitle>{item.title}</TextTitle>
						</ContainerText>
						<SubTitle>{item.SubTitle}</SubTitle>
					</ContainerTextTitle>
				</ContainerItems>
			</Animated.View>
		),
		[categories, colors],
	);

	return (
		<SwipeListView
			ref={listRef}
			data={categories}
			disableRightSwipe
			rightOpenValue={-120}
			stopRightSwipe={-120}
			closeOnRowOpen={false}
			renderItem={renderItem}
			previewOpenValue={-150}
			previewOpenDelay={2000}
			useNativeDriver={false}
			renderHiddenItem={renderHiddenItem}
			keyExtractor={(item: CategoryItemProps) => item.id.toString()}
			removeClippedSubviews={true}
			maxToRenderPerBatch={5}
			updateCellsBatchingPeriod={100}
			initialNumToRender={20}
		/>
	);
}
