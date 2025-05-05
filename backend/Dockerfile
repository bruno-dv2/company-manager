FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache openssl

# Copiar arquivos de configuração primeiro
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Gerar cliente Prisma
RUN npx prisma generate

# Criar script de inicialização
RUN echo '#!/bin/sh' > /app/start.sh
RUN echo 'set -e' >> /app/start.sh
RUN echo 'npx prisma migrate deploy' >> /app/start.sh
RUN echo 'node dist/src/main.js' >> /app/start.sh
RUN chmod +x /app/start.sh

# Compilar a aplicação
RUN npm run build

EXPOSE 3001
CMD ["/app/start.sh"]