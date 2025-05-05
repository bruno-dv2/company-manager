import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { EmpresasService } from './empresas.service';
import { CriarEmpresaDto, AtualizarEmpresaDto } from '../auth/dto/empresa.dto';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from '@prisma/client';

interface RequestWithUser extends ExpressRequest {
  user: Usuario;
}

@Controller('empresas')
@UseGuards(AuthGuard('jwt'))
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post()
  criar(@Body() dto: CriarEmpresaDto, @Request() req: RequestWithUser) {
    return this.empresasService.criar(dto, req.user.id);
  }

  @Get()
  listarTodas(@Request() req: RequestWithUser) {
    return this.empresasService.listarTodas(req.user.id);
  }

  @Get(':id')
  buscarPorId(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: RequestWithUser,
  ) {
    return this.empresasService.buscarPorId(id, req.user.id);
  }

  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AtualizarEmpresaDto,
    @Request() req: RequestWithUser,
  ) {
    return this.empresasService.atualizar(id, dto, req.user.id);
  }

  @Delete(':id')
  remover(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: RequestWithUser,
  ) {
    return this.empresasService.remover(id, req.user.id);
  }
}
