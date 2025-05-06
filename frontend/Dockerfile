FROM node:20-alpine AS base
WORKDIR /app

# Estágio de desenvolvimento
FROM base AS development
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# Estágio de compilação
FROM base AS build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls -la /app/build

# Estágio de produção
FROM nginx:alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]