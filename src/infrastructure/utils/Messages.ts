export const VALIDATIONS = {
  EMPTY: '$property é obrigatório.',
  MIN_LENGTH: (characterName = 'caracteres') =>
    `$property deve ter no mínimo $constraint1 ${characterName}`,
};
