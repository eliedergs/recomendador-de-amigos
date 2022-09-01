export const maskNoNumbers = /[^0-9]/g;

export const toStringWithOnlyNumbers = (value = '') =>
  value.replace(maskNoNumbers, '');
