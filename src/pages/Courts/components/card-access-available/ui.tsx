import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import type { CardAccessAvailableProps } from '@models/courts-components';

import {
	Row,
	RowLabel,
	RowValue,
	RowValueLoading,
	Title,
	Wrapper,
} from './styles';

export function CardAccessAvailable({
	contractedCountDisplayText,
	usedCountDisplayText,
	isValuesLoading,
}: CardAccessAvailableProps) {
	const { colors } = useTheme();

	return (
		<Wrapper>
			<Title>Acessos disponíveis</Title>
			<Row>
				<RowLabel>Contratados</RowLabel>
				{isValuesLoading ? (
					<RowValueLoading>
						<ActivityIndicator size="small" color={colors.primary} />
					</RowValueLoading>
				) : (
					<RowValue>{contractedCountDisplayText}</RowValue>
				)}
			</Row>
			<Row>
				<RowLabel>Utilizados</RowLabel>
				{isValuesLoading ? (
					<RowValueLoading>
						<ActivityIndicator size="small" color={colors.primary} />
					</RowValueLoading>
				) : (
					<RowValue>{usedCountDisplayText}</RowValue>
				)}
			</Row>
		</Wrapper>
	);
}
