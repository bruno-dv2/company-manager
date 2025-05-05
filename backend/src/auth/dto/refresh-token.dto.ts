import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty({ message: 'O token de refresh é obrigatório' })
  refreshToken: string;
}
