export const VALIDATIONS = {
    UUID: '',
    EMPTY: '$property é obrigatório.',
    MIN_LENGTH: (characterName = 'caracteres') =>
        `$property deve ter no mínimo $constraint1 ${characterName}`,
    MAX_LENGTH: (characterName = 'caracteres') =>
        `$property deve ter no máximo $constraint1 ${characterName}`,
    EMAIL: 'Email inválido.',
};
