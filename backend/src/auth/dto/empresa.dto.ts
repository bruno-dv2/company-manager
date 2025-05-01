import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CriarEmpresaDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
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
