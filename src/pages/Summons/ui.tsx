import React from 'react';

import type { SummonsUIProps } from '@models/summons-components';
import { ButtonIcon } from '@components/ButtonIcon';
import { useTheme } from 'styled-components';

import { SummonsDisclaimer } from './components/SummonsDisclaimer';
import {
	Content,
	EmptyState,
	EmptyStateMessage,
	ImageNotFound,
	ImageNotFoundWrap,
} from './styles';

export function SummonsUI({ imageNotFound, onPress }: SummonsUIProps) {
	const { colors } = useTheme();

	return (
		<Content>
			<SummonsDisclaimer />

			<EmptyState>
				<ImageNotFoundWrap>
					<ImageNotFound source={imageNotFound} />
				</ImageNotFoundWrap>

				<EmptyStateMessage>
					Você ainda não possui intimações. Para recebê-las, cadastre um login e
					senha de acesso ao tribunal.
				</EmptyStateMessage>

				<ButtonIcon
					iconPosition="start"
					title="Cadastrar um novo acesso"
					backgroundColor={colors.green200}
					titleColor={colors.white}
					icon="add-circle"
					iconColor={colors.white}
					onPress={onPress}
				/>
			</EmptyState>
		</Content>
	);
}
