import { DateTime } from 'luxon';
import { maskCep, maskCnpj, maskNoNumbers, maskPhone } from './Regex';

export const toStringWithOnlyNumbers = (value = '') =>
    value.replace(maskNoNumbers, '');

export const toCnpj = (value = '') => value.replace(maskCnpj, '$1.$2.$3/$4-$5');

export const toPhone = (value = '') => value.replace(maskPhone, '($1) $2$3-$4');

export const toCep = (value = '') => value.replace(maskCep, '$1.$2-$3');

export const formatDateFromISO = (date) =>
    date ? DateTime.fromISO(date).toFormat('dd/MM/yyyy') : '';
