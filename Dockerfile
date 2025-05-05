FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos de package primeiro para aproveitar o cache de camadas do Docker
COPY backend/package*.json ./
RUN npm install

# Agora copiar o resto do código
COPY backend/ ./

# Compilar a aplicação
RUN npm run build

# Expor a porta
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]