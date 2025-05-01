import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CriarUsuarioDto, LoginDto } from '../auth/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async cadastrar(dto: CriarUsuarioDto) {
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (usuarioExistente) {
      throw new ConflictException('Email já está em uso');
    }

    const hash = await bcrypt.hash(dto.senha, 10);

    const usuario = await this.prisma.usuario.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        senha: hash,
      },
    });

    const token = this.gerarToken(usuario.id, usuario.email);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...usuarioSemSenha } = usuario;

    return { usuario: usuarioSemSenha, token };
  }

  async login(dto: LoginDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaCorreta = await bcrypt.compare(dto.senha, usuario.senha);

    if (!senhaCorreta) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = this.gerarToken(usuario.id, usuario.email);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...usuarioSemSenha } = usuario;

    return { usuario: usuarioSemSenha, token };
  }

  private gerarToken(usuarioId: number, email: string) {
    const payload = { sub: usuarioId, email };
    return this.jwtService.sign(payload);
  }
}
