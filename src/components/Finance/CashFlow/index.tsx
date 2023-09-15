import React from 'react';
import {DataItemProps} from './types';
import {
	ContainerDataReleases,
	ContainerDescriptionItems,
	ContainerDescriptionReleases,
	ContainerItems,
	ContainerReleases,
	TextData,
	TextLabelDescription,
	TextValueDescriptionBalance,
	TextValueDescriptionExit,
	TextValueDescriptionProhibited,
} from './styles';

const CashFlowDataItem = ({item}: DataItemProps) => {
	return (
		<>
			<ContainerReleases>
				<ContainerItems>
					<ContainerDataReleases>
						<TextData WeightTextProps>{item.date}</TextData>
					</ContainerDataReleases>

					<ContainerDescriptionReleases>
						<ContainerDescriptionItems>
							<TextLabelDescription>Entrada</TextLabelDescription>

							<TextValueDescriptionProhibited>{item.valueProhibited}</TextValueDescriptionProhibited>
						</ContainerDescriptionItems>

						<ContainerDescriptionItems>
							<TextLabelDescription>Saída</TextLabelDescription>

							<TextValueDescriptionExit>{item.valueExit}</TextValueDescriptionExit>
						</ContainerDescriptionItems>

						<ContainerDescriptionItems>
							<TextLabelDescription>Saldo</TextLabelDescription>

							<TextValueDescriptionBalance>{item.valueBalance}</TextValueDescriptionBalance>
						</ContainerDescriptionItems>
					</ContainerDescriptionReleases>
				</ContainerItems>
			</ContainerReleases>
		</>
	);
};

export default CashFlowDataItem;
