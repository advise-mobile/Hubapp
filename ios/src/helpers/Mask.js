import VanillaMasker from 'vanilla-masker';

export const MaskPhone = value => VanillaMasker.toPattern(value, '+99 (99) 99999-9999');

export const MaskCnpj = value => VanillaMasker.toPattern(value, '99.999.9999/9999-99');

export const MaskCpf = value => VanillaMasker.toPattern(value, '999.999.999-99');

export const MaskCep = value => VanillaMasker.toPattern(value, '99999-999');
