# Sistema de Gerenciamento de Empresas e Locais

Este repositório contém um sistema **full-stack** para gerenciamento de empresas e seus respectivos locais, desenvolvido como parte de um teste técnico para a HubLocal.

---

## Tecnologias Utilizadas

### Backend

- **NestJS** – Framework Node.js para construção de APIs eficientes e escaláveis  
- **Prisma** – ORM para trabalhar com banco de dados  
- **JWT** – Autenticação baseada em tokens  
- **PostgreSQL** – Banco de dados relacional  
- **Bcrypt** – Criptografia de senhas  

### Frontend

- **React** – Biblioteca para construção de interfaces  
- **Redux Toolkit** – Gerenciamento de estado  
- **Redux Persist** – Persistência de estado  
- **React Router** – Navegação entre páginas  
- **Material-UI** – Componentes visuais  
- **React-Toastify** – Notificações toast  
- **Axios** – Cliente HTTP para comunicação com a API  

---

## Requisitos

- **Node.js** v18 ou superior  
- **npm** ou **yarn**  
- **PostgreSQL**  

---

## Instalação e Configuração

### Clone o repositório

```bash
git clone https://github.com/seu-usuario/hublocal-teste.git
cd hublocal-teste
```

---

## Backend

### 1. Acesse a pasta `backend`

```bash
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/hublocal_db"
JWT_SECRET="seu_segredo_jwt"
JWT_REFRESH_SECRET="seu_segredo_refresh"
```

### 4. Execute as migrações do banco de dados

```bash
npx prisma migrate dev
```

### 5. Inicie o servidor backend

```bash
npm run start:dev
```

---

## Frontend

### 1. Acesse a pasta `frontend`

```bash
cd ../frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` com o seguinte conteúdo:

```env
REACT_APP_API_URL=http://localhost:3001
```

### 4. Inicie a aplicação frontend

```bash
npm start
```

---

## Estrutura do Projeto

### Backend (`/backend`)

```
backend/
├── prisma/              # Configurações e modelos do Prisma
├── src/
│   ├── app/             # Módulo principal
│   ├── auth/            # Autenticação (login, cadastro, refresh token)
│   ├── empresas/        # CRUD de empresas
│   ├── locais/          # CRUD de locais
│   ├── validators/      # Validadores personalizados
│   └── main.ts          # Ponto de entrada da aplicação
```

### Frontend (`/frontend`)

```
frontend/
├── public/              # Arquivos estáticos
│   └── images/          # Imagens da aplicação
├── src/
│   ├── components/      # Componentes React reutilizáveis
│   ├── hooks/           # Hooks personalizados
│   ├── pages/           # Páginas da aplicação
│   ├── services/        # Comunicação com a API
│   ├── store/           # Configuração do Redux
│   ├── styles/          # Estilos e temas
│   └── utils/           # Funções utilitárias
```

---

## Funcionalidades

### Autenticação

- Cadastro de usuário  
- Login  
- Refresh token automático  

### Empresas

- Listagem de empresas  
- Criação de empresa  
- Edição de empresa  
- Exclusão de empresa  

### Locais

- Listagem de locais por empresa  
- Criação de local  
- Edição de local  
- Exclusão de local  

---

## Como Usar o Sistema

1. Acesse a aplicação no navegador  
2. Crie uma conta usando o formulário de **cadastro**  
3. Faça **login** com suas credenciais  
4. Vá para a tela de **Empresas** para cadastrar novas empresas  
5. Clique no ícone de visualização para acessar os **Locais** da empresa selecionada  
6. Na tela de Locais, você pode adicionar, editar e remover locais relacionados  

---

