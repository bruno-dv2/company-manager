/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsCNPJ(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isCNPJ',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          const cnpj = value.replace(/[^\d]/g, '');

          if (cnpj.length !== 14) return false;

          if (/^(\d)\1{13}$/.test(cnpj)) return false;

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return 'CNPJ inválido';
        },
      },
    });
  };
}

export function IsCEP(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isCEP',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          return /^\d{5}-?\d{3}$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'CEP inválido';
        },
      },
    });
  };
}
