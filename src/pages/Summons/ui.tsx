import React from 'react';

import {
	Content,
	DisclaimerContainer,
	DisclaimerText,
	EmptyState,
	EmptyStateMessage,
	ImageNotFound,
	ImageNotFoundWrap,
} from './styles';
import { ImageSourcePropType } from 'react-native';
import { ButtonIcon } from '@components/ButtonIcon';
import { useTheme } from 'styled-components';

export interface SummonsUIProps {
	imageNotFound: ImageSourcePropType;
}

export function SummonsUI({ imageNotFound }: SummonsUIProps) {
	const colorUseTheme = useTheme();
	const colors = colorUseTheme.colors;

	return (
		<Content>
			<DisclaimerContainer>
				<DisclaimerText>
					{
						'A captura de intimações é feita através de login e senha de\nacesso aos tribunais. Os dados são confidenciais e nosso\nsistema não inicia os prazos.'
					}
				</DisclaimerText>
			</DisclaimerContainer>

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
					onPress={() => {}}
				/>
			</EmptyState>
		</Content>
	);
}
