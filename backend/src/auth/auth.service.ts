/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CriarUsuarioDto, LoginDto } from '../auth/dto/auth.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async cadastrar(dto: CriarUsuarioDto) {
    try {
      console.log('Iniciando processo de cadastro de usuário');
      
      // Verificando se usuário já existe
      const usuarioExistente = await this.prisma.usuario.findUnique({
        where: { email: dto.email },
      });
      
      if (usuarioExistente) {
        console.log('Email já está em uso:', dto.email);
        throw new ConflictException('Email já está em uso');
      }
      
      // Gerando hash da senha
      console.log('Gerando hash da senha');
      const hash = await bcrypt.hash(dto.senha, 6);
      
      // Criando usuário no banco
      console.log('Criando usuário no banco de dados');
      const usuario = await this.prisma.usuario.create({
        data: {
          nome: dto.nome,
          email: dto.email,
          senha: hash,
        },
      });
      
      console.log('Usuário criado com sucesso');
      
      // Gerando tokens
      console.log('Gerando tokens de autenticação');
      const token = this.gerarToken(usuario.id, usuario.email);
      const refreshToken = await this.gerarRefreshToken(usuario.id);
      
      console.log('Tokens gerados com sucesso');
      
      // Removendo a senha do objeto retornado
      const { senha, ...usuarioSemSenha } = usuario;
      
      return { usuario: usuarioSemSenha, token, refreshToken };
    } catch (error) {
      console.error('Erro durante o cadastro de usuário:', error);
      
      if (error instanceof ConflictException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Erro ao processar o cadastro. Por favor, tente novamente mais tarde.');
    }
  }

  async login(dto: LoginDto) {
    try {
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
      const refreshToken = await this.gerarRefreshToken(usuario.id);
      
      const { senha, ...usuarioSemSenha } = usuario;
      return { usuario: usuarioSemSenha, token, refreshToken };
    } catch (error) {
      console.error('Erro durante o login:', error);
      
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Erro ao processar o login. Por favor, tente novamente mais tarde.');
    }
  }

  private gerarToken(usuarioId: number, email: string) {
    const payload = { sub: usuarioId, email };
    return this.jwtService.sign(payload);
  }

  async gerarRefreshToken(usuarioId: number) {
    try {
      // Limpar tokens antigos
      await this.prisma.refreshToken.deleteMany({
        where: {
          usuarioId,
          expiresAt: {
            lt: new Date(),
          },
        },
      });
      
      const refreshToken = uuidv4();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      
      await this.prisma.refreshToken.create({
        data: {
          token: refreshToken,
          usuarioId,
          expiresAt,
        },
      });
      
      return refreshToken;
    } catch (error) {
      console.error('Erro ao gerar refresh token:', error);
      throw new InternalServerErrorException('Erro ao gerar token de autenticação');
    }
  }

  async usarRefreshToken(refreshToken: string) {
    try {
      const token = await this.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { usuario: true },
      });
      
      if (!token || token.expiresAt < new Date()) {
        throw new UnauthorizedException('Refresh token inválido ou expirado');
      }
      
      const accessToken = this.gerarToken(token.usuario.id, token.usuario.email);
      
      const { senha, ...usuarioSemSenha } = token.usuario;
      return {
        usuario: usuarioSemSenha,
        token: accessToken,
      };
    } catch (error) {
      console.error('Erro ao usar refresh token:', error);
      
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Erro ao processar o refresh token');
    }
  }
}