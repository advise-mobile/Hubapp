const LOWERCASE_PARTICLES = new Set([
	'de',
	'da',
	'do',
	'dos',
	'das',
	'e',
	'em',
	'no',
	'na',
	'nos',
	'nas',
]);

export function formatTagLabel(value: string): string {
	const trimmed = value.trim();
	if (!trimmed) {
		return '';
	}

	return trimmed
		.split(/\s+/)
		.map((word, index) => {
			const lower = word.toLowerCase();
			if (index > 0 && LOWERCASE_PARTICLES.has(lower)) {
				return lower;
			}
			return lower.charAt(0).toUpperCase() + lower.slice(1);
		})
		.join(' ');
}
