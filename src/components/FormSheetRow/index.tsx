import React, { type ReactNode } from 'react';

import {
	RowOuter,
	RowInner,
	LabelShell,
	LabelText,
	Control,
	RowError,
} from './styles';

export { SHEET_H_PADDING } from './styles';

export interface FormSheetRowProps {
	label: ReactNode;
	children: ReactNode;
	error?: string | null;
	longLabel?: boolean;
	hideBottomBorder?: boolean;
	labelMinWidth?: number;
}

export function FormSheetRow({
	label,
	children,
	error,
	longLabel = false,
	hideBottomBorder = false,
	labelMinWidth,
}: FormSheetRowProps) {
	const labelContent =
		typeof label === 'string' || typeof label === 'number' ? (
			<LabelText>{label}</LabelText>
		) : (
			label
		);

	return (
		<RowOuter $hideBottomBorder={hideBottomBorder}>
			<RowInner>
				<LabelShell
					$long={longLabel}
					$labelMinWidth={labelMinWidth}
				>
					{labelContent}
				</LabelShell>
				<Control>{children}</Control>
			</RowInner>
			{error != null && error !== '' ? <RowError>{error}</RowError> : null}
		</RowOuter>
	);
}
