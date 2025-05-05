import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsCNPJ } from '../../validators/custom-validator';

export class CriarEmpresaDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsCNPJ({ message: 'CNPJ inválido' })
  @IsNotEmpty({ message: 'O CNPJ é obrigatório' })
  cnpj: string;
}

export class AtualizarEmpresaDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  cnpj?: string;
}
