import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Root, Title, IconWrap } from './styles';
import type { ButtonIconProps } from './types';

export type { ButtonIconProps, ButtonIconPosition } from './types';

export function ButtonIcon({
	iconPosition,
	title,
	backgroundColor,
	titleColor,
	icon,
	iconColor,
	onPress,
	iconSize = 20,
	disabled = false,
	activeOpacity = 0.7,
}: ButtonIconProps) {
	return (
		<Root
			$backgroundColor={backgroundColor}
			$iconPosition={iconPosition}
			onPress={onPress}
			disabled={disabled}
			activeOpacity={activeOpacity}
			accessibilityRole="button"
		>
			<IconWrap>
				<MaterialIcons
					name={icon as React.ComponentProps<typeof MaterialIcons>['name']}
					size={iconSize}
					color={iconColor}
				/>
			</IconWrap>
			<Title $titleColor={titleColor}>{title}</Title>
		</Root>
	);
}
