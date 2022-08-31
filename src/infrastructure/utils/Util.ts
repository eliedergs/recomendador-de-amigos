import bcrypt from 'bcrypt';

const validaCPFCNPJ = (cpfCnpj: string): boolean => {
  const isNumber = Number(cpfCnpj);

  if (isNaN(isNumber)) {
    return false;
  }

  if (cpfCnpj.length === 11) {
    return validaCPF(cpfCnpj);
  }

  if (cpfCnpj.length === 14) {
    return validaCNPJ(cpfCnpj);
  }

  return false;
};

const validaCPF = (cpf: string): boolean => {
  if (cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999') {
    return false;
  }

  let sum = 0;

  for (let k = 0; k < 9; k++) {
    sum += Number(cpf[k]) * (10 - k);
  }

  let aux = 11 - (sum % 11);

  if (aux > 9) {
    if (Number(cpf[9]) !== 0) {
      return false;
    }
  } else {
    if (Number(cpf[9]) !== aux) {
      return false;
    }
  }

  sum = 0;

  for (let k = 0; k < 10; k++) {
    sum += Number(cpf[k]) * (11 - k);
  }

  aux = 11 - (sum % 11);

  if (aux > 9) {
    if (Number(cpf[10]) !== 0) {
      return false;
    }
  } else {
    if (Number(cpf[10]) !== aux) {
      return false;
    }
  }

  return true;
};

const validaCNPJ = (cnpj: string): boolean => {
  if (cnpj == '00000000000000' ||
    cnpj == '11111111111111' ||
    cnpj == '22222222222222' ||
    cnpj == '33333333333333' ||
    cnpj == '44444444444444' ||
    cnpj == '55555555555555' ||
    cnpj == '66666666666666' ||
    cnpj == '77777777777777' ||
    cnpj == '88888888888888' ||
    cnpj == '99999999999999') {
    return false;
  }

  let sum = 0;
  let pos = cnpj.length - 9;

  for (let k = 0; k < 12; k++) {
    sum += Number(cnpj[k]) * pos--;

    if (pos < 2) {
      pos = 9;
    }
  }

  let aux = sum % 11 < 2 ? 0 : 11 - sum % 11;

  if (Number(cnpj[12]) !== aux) {
    return false;
  }

  sum = 0;
  pos = cnpj.length - 8;

  for (let k = 0; k < 13; k++) {
    sum += Number(cnpj[k]) * pos--;

    if (pos < 2) {
      pos = 9;
    }
  }

  aux = sum % 11 < 2 ? 0 : 11 - sum % 11;

  if (Number(cnpj[13]) !== aux) {
    return false;
  }

  return true;
};

const validatePasswordStrength = (password: string): boolean => {
  if (password.length < 8) {
    return false;
  }

  const numbers = /([0-9])/;
  const lowerCase = /([a-z])/;
  const upperCase = /([A-Z])/;
  const specialChars = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

  if (
    !(
      password.match(numbers) &&
      password.match(lowerCase) &&
      password.match(upperCase) &&
      password.match(specialChars))
  ) {
    return false;
  }

  return true;
};

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 8;

  return await bcrypt.hash(password, saltRounds);
};

const flattenObject = (data: object, arrayModifier: number = 0) => {
  const result = {};

  const recurse = (cur, prop) => {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      const len = cur.length;

      for (let k = 0; k < len; k++) {
        recurse(cur[k], prop + `[${k + arrayModifier}]`);
      }

      if (len == 0) {
        result[prop] = [];
      }
    } else {
      let isEmpty = true;

      // eslint-disable-next-line guard-for-in
      for (const p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? `${prop}.${p}` : p);
      }

      if (isEmpty && prop) {
        result[prop] = {};
      }
    }
  };

  recurse(data, '');

  return result;
};

const unflattenObject = (data: object) => {
  'use strict';
  if (Object(data) !== data || Array.isArray(data)) {
    return data;
  }

  const regex = /\.?([^.\[\]]+)|\[(\d+)\]/g;
  const resultholder = {};
  // eslint-disable-next-line guard-for-in
  for (const p in data) {
    let cur = resultholder;
    let prop = '';
    let m;

    while (m = regex.exec(p)) {
      cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
      prop = m[2] || m[1];
    }
    cur[prop] = data[p];
  }
  return resultholder[''] || resultholder;
};

export {
  validaCPFCNPJ,
  validatePasswordStrength,
  hashPassword,
  flattenObject,
  unflattenObject,
};
