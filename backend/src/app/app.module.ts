import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { EmpresasModule } from '../empresas/empresas.module';
import { LocaisModule } from '../locais/locais.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    EmpresasModule,
    LocaisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
