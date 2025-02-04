

import { Platform } from 'react-native';

  export const FormatReal = (price: number) => {
    const parsedPrice =  price .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); 
    return Platform.OS === 'android' ? `R$ ${parsedPrice.toFixed(2) }` : parsedPrice;
 };
 
 