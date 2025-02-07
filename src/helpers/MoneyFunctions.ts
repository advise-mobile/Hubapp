export const FormatReal = (price: number) => {
	try {
		const formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});

		return formatter.format(price);
	} catch (error) {
		// Fallback básico caso o Intl.NumberFormat falhe
		return `R$ ${price
			.toFixed(2)
			.replace('.', ',')
			.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
	}
};
