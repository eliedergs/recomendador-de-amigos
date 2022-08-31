export const FORMATTED_CNPJ = '35.457.725/0001-98';
export const UNFORMATTED_CNPJ = '35457725000198';
export const FORMATTED_PHONE = '(93) 2669-9545';
export const FORMATTED_CELLPHONE = '(93) 98960-4112';
export const UNFORMATTED_PHONE = '9326699545';
export const UNFORMATTED_CELLPHONE = '93989604112';

export const generateStringNumber = (size = 3) => {
    const exponentiation = Math.pow(10, size);
    const number = Math.round(Math.random() * exponentiation);
    return `${number}`;
};
