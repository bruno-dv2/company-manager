/**
 * Regras de validação para formulários
 */

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
export const cepRegex = /^\d{5}-\d{3}$/;

export const loginValidationRules = {
  email: {
    required: true,
    pattern: emailRegex,
    message: 'Email inválido',
  },
  senha: {
    required: true,
    minLength: 6,
    message: 'A senha deve ter pelo menos 6 caracteres',
  },
};

export const cadastroValidationRules = {
  nome: {
    required: true,
    minLength: 3,
    message: 'O nome deve ter pelo menos 3 caracteres',
  },
  email: {
    required: true,
    pattern: emailRegex,
    message: 'Email inválido',
  },
  senha: {
    required: true,
    minLength: 6,
    message: 'A senha deve ter pelo menos 6 caracteres',
  },
  repetirSenha: {
    required: true,
    validate: (value, values) =>
      value === values.senha ? '' : 'As senhas não coincidem',
  },
};

export const empresaValidationRules = {
  nome: {
    required: true,
    minLength: 2,
    message: 'O nome deve ter pelo menos 2 caracteres',
  },
  cnpj: {
    required: true,
    pattern: cnpjRegex,
    message: 'CNPJ inválido (formato: 00.000.000/0000-00)',
  },
  website: {
    pattern: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/,
    message: 'Website inválido'
  }
};

export const localValidationRules = {
  nome: {
    required: true,
    minLength: 2,
    message: 'O nome deve ter pelo menos 2 caracteres',
  },
  cep: {
    required: true,
    pattern: cepRegex,
    message: 'CEP inválido (formato: 00000-000)',
  },
  rua: {
    required: true,
    message: 'A rua é obrigatória',
  },
  numero: {
    required: true,
    message: 'O número é obrigatório',
  },
  bairro: {
    required: true,
    message: 'O bairro é obrigatório',
  },
  cidade: {
    required: true,
    message: 'A cidade é obrigatória',
  },
  estado: {
    required: true,
    message: 'O estado é obrigatório',
    validate: (value) => value.length === 2 ? '' : 'O estado deve ter 2 caracteres',
  },
};