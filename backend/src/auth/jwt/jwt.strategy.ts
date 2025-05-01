import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'chave_secreta',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!usuario) {
      throw new UnauthorizedException('Acesso não autorizado');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha: _senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }
}
