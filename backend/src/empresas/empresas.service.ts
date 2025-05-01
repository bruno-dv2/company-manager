import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CriarEmpresaDto, AtualizarEmpresaDto } from '../auth/dto/empresa.dto';

@Injectable()
export class EmpresasService {
  constructor(private prisma: PrismaService) {}

  async criar(dto: CriarEmpresaDto, usuarioId: number) {
    const empresaExistente = await this.prisma.empresa.findUnique({
      where: { cnpj: dto.cnpj },
    });

    if (empresaExistente) {
      throw new ConflictException('Já existe uma empresa com este CNPJ');
    }

    return this.prisma.empresa.create({
      data: {
        nome: dto.nome,
        website: dto.website,
        cnpj: dto.cnpj,
        usuarioId,
      },
    });
  }

  async listarTodas(usuarioId: number) {
    const empresas = await this.prisma.empresa.findMany({
      where: { usuarioId },
      include: {
        _count: {
          select: { locais: true },
        },
      },
    });

    return empresas.map((empresa) => ({
      ...empresa,
      qtDeLocais: empresa._count.locais,
      _count: undefined,
    }));
  }

  async buscarPorId(id: number, usuarioId: number) {
    const empresa = await this.prisma.empresa.findFirst({
      where: {
        id,
        usuarioId,
      },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return empresa;
  }

  async atualizar(id: number, dto: AtualizarEmpresaDto, usuarioId: number) {
    await this.buscarPorId(id, usuarioId);

    if (dto.cnpj) {
      const empresaComMesmoCnpj = await this.prisma.empresa.findFirst({
        where: {
          cnpj: dto.cnpj,
          NOT: { id },
        },
      });

      if (empresaComMesmoCnpj) {
        throw new ConflictException('Já existe uma empresa com este CNPJ');
      }
    }

    return this.prisma.empresa.update({
      where: { id },
      data: dto,
    });
  }

  async remover(id: number, usuarioId: number) {
    await this.buscarPorId(id, usuarioId);

    return this.prisma.empresa.delete({
      where: { id },
    });
  }
}
