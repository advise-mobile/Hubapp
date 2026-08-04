import React, { memo, useCallback } from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

import type { SummonsListItemViewModel } from '@models/summons-list';

import {
	Card,
	CardActionButton,
	CardDescription,
	CardHeader,
	CardTitle,
	CardTitleTouchable,
	CardTouchable,
	Tag,
	TagsRow,
	TagText,
} from './styles';

export interface SummonsListItemCardProps {
	item: SummonsListItemViewModel;
	onPress?: (item: SummonsListItemViewModel) => void;
	onOpenActions?: (item: SummonsListItemViewModel) => void;
}

function SummonsListItemCardComponent({
	item,
	onPress,
	onOpenActions,
}: SummonsListItemCardProps) {
	const { colors } = useTheme();

	const handlePress = useCallback(() => {
		onPress?.(item);
	}, [item, onPress]);

	const handleOpenActions = useCallback(() => {
		onOpenActions?.(item);
	}, [item, onOpenActions]);

	return (
		<Card>
			<CardHeader>
				<CardTitleTouchable
					onPress={handlePress}
					activeOpacity={0.7}
					accessibilityRole="button"
				>
					<CardTitle numberOfLines={1}>{item.title}</CardTitle>
				</CardTitleTouchable>
				<CardActionButton
					onPress={handleOpenActions}
					activeOpacity={0.7}
					accessibilityRole="button"
					accessibilityLabel="Abrir ações da intimação"
					hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
				>
					<MaterialIcons
						name="more-horiz"
						size={24}
						color={colors.fadedBlack}
					/>
				</CardActionButton>
			</CardHeader>

			<CardTouchable
				onPress={handlePress}
				activeOpacity={0.7}
				accessibilityRole="button"
			>
				{item.description ? (
					<CardDescription numberOfLines={4} ellipsizeMode="tail">
						{item.description}
					</CardDescription>
				) : null}

				<TagsRow>
					{item.badges.map(badge => (
						<Tag
							key={`${item.id}-${badge.label}`}
							background={badge.backgroundColor}
						>
							<TagText>{badge.label}</TagText>
						</Tag>
					))}
				</TagsRow>
			</CardTouchable>
		</Card>
	);
}

export const SummonsListItemCard = memo(SummonsListItemCardComponent);
