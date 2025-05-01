import { Module } from '@nestjs/common';
import { LocaisController } from './locais.controller';
import { LocaisService } from './locais.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LocaisController],
  providers: [LocaisService],
  exports: [LocaisService],
})
export class LocaisModule {}
