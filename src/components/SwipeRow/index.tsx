import React, { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

import { useSwipeRowRegistry } from './SwipeRowContext';
import {
	ActionButton,
	ActionsContainer,
	MAX_ACTIONS_PANEL_WIDTH_RATIO,
} from './styles';
import type { SwipeRowAction, SwipeRowActionVariant } from './types';

export type { SwipeRowAction, SwipeRowActionVariant } from './types';
export { SwipeRowProvider, useSwipeRowRegistry } from './SwipeRowContext';

export interface SwipeRowProps<TItem> {
	item: TItem;
	itemKey: string;
	children: ReactNode;
	rightActions?: SwipeRowAction<TItem>[];
	leftActions?: SwipeRowAction<TItem>[];
}

function getActionColors(
	variant: SwipeRowActionVariant,
	colors: ReturnType<typeof useTheme>['colors'],
) {
	switch (variant) {
		case 'neutral':
			return {
				backgroundColor: colors.white,
				iconColor: colors.primary,
			};
		case 'primary':
			return {
				backgroundColor: colors.green200 ?? colors.advise,
				iconColor: colors.realWhite ?? colors.white,
			};
		case 'destructive':
			return {
				backgroundColor: colors.red ?? colors.red200,
				iconColor: colors.realWhite ?? colors.white,
			};
		default:
			return {
				backgroundColor: colors.gray ?? colors.primary,
				iconColor: colors.realWhite ?? colors.white,
			};
	}
}

function SwipeRowComponent<TItem>({
	item,
	itemKey,
	children,
	rightActions = [],
	leftActions = [],
}: SwipeRowProps<TItem>) {
	const { colors } = useTheme();
	const { width: screenWidth } = useWindowDimensions();
	const swipeableRef = useRef<Swipeable>(null);
	const { register, notifyOpen, notifyClose } = useSwipeRowRegistry();

	const getActionsPanelWidth = useCallback(
		(actionCount: number) => {
			if (actionCount === 0) {
				return 0;
			}

			return screenWidth * MAX_ACTIONS_PANEL_WIDTH_RATIO;
		},
		[screenWidth],
	);

	useEffect(() => {
		return register(itemKey, {
			openRight: () => swipeableRef.current?.openRight(),
			close: () => swipeableRef.current?.close(),
		});
	}, [itemKey, register]);

	const handleSwipeableOpen = useCallback(
		(direction: 'left' | 'right') => {
			if (
				(direction === 'right' && rightActions.length > 0) ||
				(direction === 'left' && leftActions.length > 0)
			) {
				notifyOpen(itemKey);
			}
		},
		[itemKey, leftActions.length, notifyOpen, rightActions.length],
	);

	const handleSwipeableClose = useCallback(() => {
		notifyClose(itemKey);
	}, [itemKey, notifyClose]);

	const renderActions = useCallback(
		(actions: SwipeRowAction<TItem>[]) =>
			(
				_progress: Animated.AnimatedInterpolation<number>,
				dragX: Animated.AnimatedInterpolation<number>,
			) => {
				const panelWidth = getActionsPanelWidth(actions.length);
				const actionWidth = panelWidth / actions.length;
				const iconSize = actionWidth < 36 ? 20 : 24;

				const scale = dragX.interpolate({
					inputRange: [-panelWidth, 0],
					outputRange: [1, 0.85],
					extrapolate: 'clamp',
				});

				return (
					<ActionsContainer style={{ width: panelWidth }}>
						{actions.map(action => {
							const variant = action.variant ?? 'default';
							const { backgroundColor, iconColor } = getActionColors(
								variant,
								colors,
							);

							return (
								<ActionButton
									key={action.id}
									backgroundColor={backgroundColor}
									onPress={() => {
										swipeableRef.current?.close();
										action.onPress(item);
									}}
									accessibilityRole="button"
									accessibilityLabel={action.label}
								>
									<Animated.View style={{ transform: [{ scale }] }}>
										<MaterialIcons
											name={action.icon}
											size={iconSize}
											color={iconColor}
										/>
									</Animated.View>
								</ActionButton>
							);
						})}
					</ActionsContainer>
				);
			},
		[colors, getActionsPanelWidth, item],
	);

	const renderRightActions = useCallback(
		(
			progress: Animated.AnimatedInterpolation<number>,
			dragX: Animated.AnimatedInterpolation<number>,
		) =>
			rightActions.length > 0 ? renderActions(rightActions)(progress, dragX) : null,
		[renderActions, rightActions],
	);

	const renderLeftActions = useCallback(
		(
			progress: Animated.AnimatedInterpolation<number>,
			dragX: Animated.AnimatedInterpolation<number>,
		) =>
			leftActions.length > 0 ? renderActions(leftActions)(progress, dragX) : null,
		[leftActions, renderActions],
	);

	return (
		<Swipeable
			ref={swipeableRef}
			renderRightActions={rightActions.length > 0 ? renderRightActions : undefined}
			renderLeftActions={leftActions.length > 0 ? renderLeftActions : undefined}
			onSwipeableOpen={handleSwipeableOpen}
			onSwipeableClose={handleSwipeableClose}
			activeOffsetX={[-20, 20]}
			failOffsetY={[-12, 12]}
			overshootRight={false}
			overshootLeft={false}
		>
			{children}
		</Swipeable>
	);
}

export const SwipeRow = SwipeRowComponent;
