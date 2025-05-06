/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  // Determinar o ambiente
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',') 
      : ['http://localhost:5173'];
      
    app.enableCors({
      origin: allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
    
    logger.log(`CORS configurado para origens permitidas: ${allowedOrigins.join(', ')}`);
  } else {
    app.enableCors({
      origin: '*',
      methods: '*',
      allowedHeaders: '*'
    });
    
    logger.log('CORS configurado em modo permissivo para desenvolvimento');
  }
  
  const port = process.env.PORT || 3001;
  
  await app.listen(port, '0.0.0.0');
  logger.log(`Aplicação rodando na porta ${port} em modo ${isProduction ? 'PRODUÇÃO' : 'DESENVOLVIMENTO'}`);
}

void bootstrap();