/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração CORS mais permissiva para desenvolvimento
  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
  });
  
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');  // Escutar em todas as interfaces
  console.log(`Aplicação rodando na porta ${port}`);
}
void bootstrap();