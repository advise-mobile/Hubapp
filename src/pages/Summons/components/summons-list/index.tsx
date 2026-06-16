import React, { useCallback, useMemo } from 'react';
import {
	ActivityIndicator,
	FlatList,
	ListRenderItem,
	Text,
	View,
} from 'react-native';
import { useTheme } from 'styled-components';
import { fonts } from '@lassets/styles';
import { SwipeRow, SwipeRowProvider } from '@components/SwipeRow';
import type { SummonsListItemViewModel } from '@models/summons-list';

import { getSummonsSwipeActions } from '../../config/summonsSwipeActions';
import { useToggleSummonsReadMutation } from '../../hooks';
import { SummonsDisclaimer } from '../summons-disclaimer';
import { SummonsListItemCard } from '../summons-list-item-card';

export interface SummonsListProps {
	items: SummonsListItemViewModel[];
	isFetchingNextPage: boolean;
	hasNextPage: boolean;
	onEndReached: () => void;
	onItemPress?: (item: SummonsListItemViewModel) => void;
	showEmptyMessage?: boolean;
}

function SummonsListRow({
	item,
	onItemPress,
	onToggleRead,
}: {
	item: SummonsListItemViewModel;
	onItemPress?: (item: SummonsListItemViewModel) => void;
	onToggleRead: (item: SummonsListItemViewModel) => void;
}) {
	const actions = useMemo(
		() => getSummonsSwipeActions(item, { onToggleRead }),
		[item, onToggleRead],
	);

	return (
		<SwipeRow item={item} itemKey={item.id} rightActions={actions}>
			<SummonsListItemCard item={item} onPress={onItemPress} />
		</SwipeRow>
	);
}

export function SummonsList({
	items,
	isFetchingNextPage,
	hasNextPage,
	onEndReached,
	onItemPress,
	showEmptyMessage = false,
}: SummonsListProps) {
	const { colors } = useTheme();
	const { mutate: toggleRead } = useToggleSummonsReadMutation();

	const handleToggleRead = useCallback(
		(item: SummonsListItemViewModel) => {
			toggleRead(item);
		},
		[toggleRead],
	);

	const keyExtractor = useCallback(
		(item: SummonsListItemViewModel) => item.id,
		[],
	);

	const renderItem: ListRenderItem<SummonsListItemViewModel> = useCallback(
		({ item }) => (
			<SummonsListRow
				item={item}
				onItemPress={onItemPress}
				onToggleRead={handleToggleRead}
			/>
		),
		[handleToggleRead, onItemPress],
	);

	const listHeader = useMemo(() => <SummonsDisclaimer />, []);

	const itemSeparator = useMemo(
		() => (
			<View
				style={{
					height: 1,
					width: '100%',
					backgroundColor: colors.borderLight,
				}}
			/>
		),
		[colors.borderLight],
	);

	const listFooter = useMemo(
		() =>
			isFetchingNextPage ? (
				<ActivityIndicator
					style={{ paddingVertical: 20 }}
					color={colors.primary}
				/>
			) : null,
		[isFetchingNextPage, colors.primary],
	);

	const handleEndReached = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage) {
			onEndReached();
		}
	}, [hasNextPage, isFetchingNextPage, onEndReached]);

	const listEmpty = useMemo(
		() =>
			showEmptyMessage ? (
				<View
					style={{
						flex: 1,
						paddingVertical: 48,
						paddingHorizontal: 24,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text
						style={{
							fontFamily: String(fonts.circularStdBook),
							fontSize: Number(fonts.regular),
							color: colors.grayLight,
							textAlign: 'center',
						}}
					>
						Nenhuma intimação encontrada.
					</Text>
				</View>
			) : null,
		[colors.grayLight, showEmptyMessage],
	);

	return (
		<SwipeRowProvider>
			<FlatList
				data={items}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				ListHeaderComponent={listHeader}
				ItemSeparatorComponent={itemSeparator}
				ListFooterComponent={listFooter}
				ListEmptyComponent={listEmpty}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.35}
				contentContainerStyle={{
					paddingBottom: 32,
					flexGrow: 1,
				}}
				showsVerticalScrollIndicator={false}
			/>
		</SwipeRowProvider>
	);
}
