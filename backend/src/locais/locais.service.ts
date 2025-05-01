import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CriarLocalDto, AtualizarLocalDto } from '../auth/dto/local.dto';

@Injectable()
export class LocaisService {
  constructor(private prisma: PrismaService) {}

  async criar(dto: CriarLocalDto, usuarioId: number) {
    const empresa = await this.prisma.empresa.findFirst({
      where: {
        id: dto.empresaId,
        usuarioId,
      },
    });

    if (!empresa) {
      throw new NotFoundException(
        'Empresa não encontrada ou não pertence ao usuário',
      );
    }

    return this.prisma.local.create({
      data: {
        nome: dto.nome,
        cep: dto.cep,
        rua: dto.rua,
        numero: dto.numero,
        bairro: dto.bairro,
        cidade: dto.cidade,
        estado: dto.estado,
        empresaId: dto.empresaId,
      },
    });
  }

  async listarPorEmpresa(empresaId: number, usuarioId: number) {
    const empresa = await this.prisma.empresa.findFirst({
      where: {
        id: empresaId,
        usuarioId,
      },
    });

    if (!empresa) {
      throw new NotFoundException(
        'Empresa não encontrada ou não pertence ao usuário',
      );
    }

    return this.prisma.local.findMany({
      where: { empresaId },
    });
  }

  async buscarPorId(id: number, usuarioId: number) {
    const local = await this.prisma.local.findUnique({
      where: { id },
      include: { empresa: true },
    });

    if (!local || local.empresa.usuarioId !== usuarioId) {
      throw new NotFoundException(
        'Local não encontrado ou não pertence ao usuário',
      );
    }

    return local;
  }

  async atualizar(id: number, dto: AtualizarLocalDto, usuarioId: number) {
    await this.buscarPorId(id, usuarioId);

    return this.prisma.local.update({
      where: { id },
      data: dto,
    });
  }

  async remover(id: number, usuarioId: number) {
    await this.buscarPorId(id, usuarioId);

    return this.prisma.local.delete({
      where: { id },
    });
  }
}
