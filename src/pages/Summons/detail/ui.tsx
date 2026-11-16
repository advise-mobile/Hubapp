import React from 'react';

import type { SummonsDetailUIProps } from '@models/summons-components';

import {
	DetailBody,
	DetailContent,
	DetailDescription,
	ProcessNumber,
	Tag,
	TagsRow,
	TagText,
} from './styles';

export function SummonsDetailUI({ viewModel }: SummonsDetailUIProps) {
	return (
		<DetailContent>
			<DetailBody>
				{viewModel.badges.length > 0 ? (
					<TagsRow>
						{viewModel.badges.map(badge => (
							<Tag key={badge.label} background={badge.backgroundColor}>
								<TagText>{badge.label}</TagText>
							</Tag>
						))}
					</TagsRow>
				) : null}

				{viewModel.processNumber ? (
					<ProcessNumber>{`Proc.: ${viewModel.processNumber}`}</ProcessNumber>
				) : null}

				{viewModel.description ? (
					<DetailDescription>{viewModel.description}</DetailDescription>
				) : null}
			</DetailBody>
		</DetailContent>
	);
}
