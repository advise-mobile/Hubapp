import React from 'react';

import Spinner from '@lcomponents/Spinner';

import { Root } from './styles';

export interface LoadingViewProps {
	height?: string | number;
	color?: string | null;
	transparent?: boolean;
	size?: number;
}

export function LoadingView({
	height,
	color = null,
	transparent = false,
	size,
}: LoadingViewProps) {
	return (
		<Root>
			<Spinner
				height={height}
				color={color}
				transparent={transparent}
				size={size}
			/>
		</Root>
	);
}
