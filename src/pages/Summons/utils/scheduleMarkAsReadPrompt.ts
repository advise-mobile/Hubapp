import type { MutableRefObject } from 'react';

import { MARK_AS_READ_PROMPT_DELAY_MS } from '@constants/toast';

export function clearScheduledMarkAsReadPrompt(
	timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null>,
) {
	if (timeoutRef.current != null) {
		clearTimeout(timeoutRef.current);
		timeoutRef.current = null;
	}
}

export function scheduleMarkAsReadPrompt(
	open: () => void,
	timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null>,
) {
	clearScheduledMarkAsReadPrompt(timeoutRef);
	timeoutRef.current = setTimeout(() => {
		timeoutRef.current = null;
		open();
	}, MARK_AS_READ_PROMPT_DELAY_MS);
}
