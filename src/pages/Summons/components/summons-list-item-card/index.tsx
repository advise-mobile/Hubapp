import React, { memo, useCallback } from 'react';

import type { SummonsListItemViewModel } from '@models/summons-list';

import {
	Card,
	CardDescription,
	CardTitle,
	CardTouchable,
	Tag,
	TagsRow,
	TagText,
} from './styles';

export interface SummonsListItemCardProps {
	item: SummonsListItemViewModel;
	onPress?: (item: SummonsListItemViewModel) => void;
}

function SummonsListItemCardComponent({
	item,
	onPress,
}: SummonsListItemCardProps) {
	const handlePress = useCallback(() => {
		onPress?.(item);
	}, [item, onPress]);

	return (
		<Card>
			<CardTouchable
				onPress={handlePress}
				activeOpacity={0.7}
				accessibilityRole="button"
			>
				<CardTitle>{item.title}</CardTitle>

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
