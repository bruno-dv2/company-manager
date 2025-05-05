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
import { LocaisService } from './locais.service';
import { CriarLocalDto, AtualizarLocalDto } from '../auth/dto/local.dto';
import { AuthGuard } from '@nestjs/passport';
import { usuario as Usuario } from '@prisma/client';

interface RequestWithUser extends ExpressRequest {
  user: Usuario;
}

@Controller('locais')
@UseGuards(AuthGuard('jwt'))
export class LocaisController {
  constructor(private readonly locaisService: LocaisService) {}

  @Post()
  criar(@Body() dto: CriarLocalDto, @Request() req: RequestWithUser) {
    return this.locaisService.criar(dto, req.user.id);
  }

  @Get('empresa/:empresaId')
  listarPorEmpresa(
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Request() req: RequestWithUser,
  ) {
    return this.locaisService.listarPorEmpresa(empresaId, req.user.id);
  }

  @Get(':id')
  buscarPorId(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: RequestWithUser,
  ) {
    return this.locaisService.buscarPorId(id, req.user.id);
  }

  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AtualizarLocalDto,
    @Request() req: RequestWithUser,
  ) {
    return this.locaisService.atualizar(id, dto, req.user.id);
  }

  @Delete(':id')
  remover(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: RequestWithUser,
  ) {
    return this.locaisService.remover(id, req.user.id);
  }
}
