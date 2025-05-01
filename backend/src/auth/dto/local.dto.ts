import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CriarLocalDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'O CEP é obrigatório' })
  cep: string;

  @IsString()
  @IsNotEmpty({ message: 'A rua é obrigatória' })
  rua: string;

  @IsString()
  @IsNotEmpty({ message: 'O número é obrigatório' })
  numero: string;

  @IsString()
  @IsNotEmpty({ message: 'O bairro é obrigatório' })
  bairro: string;

  @IsString()
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  cidade: string;

  @IsString()
  @IsNotEmpty({ message: 'O estado é obrigatório' })
  estado: string;

  @IsNotEmpty({ message: 'A empresa é obrigatória' })
  empresaId: number;
}

export class AtualizarLocalDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  cep?: string;

  @IsString()
  @IsOptional()
  rua?: string;

  @IsString()
  @IsOptional()
  numero?: string;

  @IsString()
  @IsOptional()
  bairro?: string;

  @IsString()
  @IsOptional()
  cidade?: string;

  @IsString()
  @IsOptional()
  estado?: string;
}
