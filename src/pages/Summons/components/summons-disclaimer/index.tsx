import React from 'react';

import { DisclaimerContainer, DisclaimerText } from '../../styles';

const DISCLAIMER_TEXT =
	'A captura de intimações é feita através de login e senha de\nacesso aos tribunais. Os dados são confidenciais e nosso\nsistema não inicia os prazos.';

export function SummonsDisclaimer() {
	return (
		<DisclaimerContainer>
			<DisclaimerText>{DISCLAIMER_TEXT}</DisclaimerText>
		</DisclaimerContainer>
	);
}
