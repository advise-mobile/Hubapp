export type SwipeRowActionVariant =
	| 'default'
	| 'primary'
	| 'destructive'
	| 'neutral';

export interface SwipeRowAction<TItem = unknown> {
	id: string;
	icon: string;
	label: string;
	variant?: SwipeRowActionVariant;
	onPress: (item: TItem) => void;
}
