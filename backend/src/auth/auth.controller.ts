import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CriarUsuarioDto, LoginDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('cadastrar')
  cadastrar(@Body() dto: CriarUsuarioDto) {
    return this.authService.cadastrar(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.usarRefreshToken(dto.refreshToken);
  }
}
