FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache openssl

# Desenvolvimento
FROM base AS development
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate
COPY . .
CMD ["npm", "run", "start:dev"]

FROM base AS build
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# Produção
FROM base AS production
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install --only=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Criar script de inicialização
RUN echo '#!/bin/sh' > /app/start.sh
RUN echo 'set -e' >> /app/start.sh
RUN echo 'npx prisma migrate deploy' >> /app/start.sh
RUN echo 'node dist/src/main.js' >> /app/start.sh
RUN chmod +x /app/start.sh
EXPOSE 3001
CMD ["/app/start.sh"]