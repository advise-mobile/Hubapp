const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseEmailDestinatarios(raw: string): string[] {
	return raw
		.split(';')
		.map(part => part.trim())
		.filter(Boolean);
}

export function validateEmailDestinatarios(raw: string): boolean {
	const destinatarios = parseEmailDestinatarios(raw);
	if (destinatarios.length === 0) {
		return false;
	}

	return destinatarios.every(email => EMAIL_REGEX.test(email));
}
