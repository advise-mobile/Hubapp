import React, { memo, useCallback } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

import type { SummonsListItemViewModel } from '@models/summons-list';

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
	MenuButton,
	Tag,
	TagsRow,
	TagText,
} from './styles';

export interface SummonsListItemCardProps {
	item: SummonsListItemViewModel;
	onMenuPress?: (item: SummonsListItemViewModel) => void;
}

function SummonsListItemCardComponent({
	item,
	onMenuPress,
}: SummonsListItemCardProps) {
	const { colors } = useTheme();

	const handleMenuPress = useCallback(() => {
		onMenuPress?.(item);
	}, [item, onMenuPress]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{item.title}</CardTitle>
				<MenuButton onPress={handleMenuPress} accessibilityLabel="Mais opções">
					<MaterialIcons
						name="more-horiz"
						size={24}
						color={colors.fadedBlack ?? colors.primary}
					/>
				</MenuButton>
			</CardHeader>

			{item.description ? (
				<CardDescription numberOfLines={4} ellipsizeMode="tail">
					{item.description}
				</CardDescription>
			) : null}

			<TagsRow>
				{item.badges.map(badge => (
					<Tag key={`${item.id}-${badge.label}`} background={badge.backgroundColor}>
						<TagText>{badge.label}</TagText>
					</Tag>
				))}
			</TagsRow>
		</Card>
	);
}

export const SummonsListItemCard = memo(SummonsListItemCardComponent);
