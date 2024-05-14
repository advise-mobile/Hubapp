import React from 'react';
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
import {CashFlowProps} from '@pages/Finance/CashFlow/types';

const CashFlowDataItem = (  { item } : { item: CashFlowProps }) => {

	return (
		<>

			<ContainerReleases>
				<ContainerItems>
					<ContainerDataReleases>
						<TextData>{item.dataSaldo}</TextData>
					</ContainerDataReleases>

					<ContainerDescriptionReleases>
						<ContainerDescriptionItems>
							<TextLabelDescription>Entrada</TextLabelDescription>
							<TextValueDescriptionProhibited>{item.totalEntradas}</TextValueDescriptionProhibited>
						</ContainerDescriptionItems>

						<ContainerDescriptionItems>
							<TextLabelDescription>Saída</TextLabelDescription>
							<TextValueDescriptionExit>{item.totalSaidas}</TextValueDescriptionExit>
						</ContainerDescriptionItems>

						<ContainerDescriptionItems>
							<TextLabelDescription>Saldo</TextLabelDescription>
							<TextValueDescriptionBalance>{item.valorSaldo}</TextValueDescriptionBalance>
						</ContainerDescriptionItems>
					</ContainerDescriptionReleases>
				</ContainerItems>
			</ContainerReleases>
		</>
	);
};

export default CashFlowDataItem;
