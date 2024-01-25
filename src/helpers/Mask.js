import VanillaMasker from 'vanilla-masker';

export const MaskPhone = value => VanillaMasker.toPattern(value, '+99 (99) 99999-9999');

export const MaskCnpj = value => VanillaMasker.toPattern(value, '99.999.9999/9999-99');

export const MaskCpf = value => VanillaMasker.toPattern(value, '999.999.999-99');

export const MaskCep = value => VanillaMasker.toPattern(value, '99999-999');

export const MaskDate = value => VanillaMasker.toPattern(value, '99/99/9999');

export const MaskMoney = value => VanillaMasker.toMoney(value, {
	precision: 2,
	separator: ',',
	delimiter: '.',
	unit: '',
	zeroCents: false
});

export const MaskCnj = value => {
	if (value.length == 20 && !isNaN(value))
		return value.replace(/(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})/, '$1-$2.$3.$4.$5.$6');

	return value;
}
