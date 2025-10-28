# 💊 PharmaIA API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.37-orange.svg)](https://sequelize.org/)
[![Swagger](https://img.shields.io/badge/Swagger-3.0-green.svg)](https://swagger.io/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

> API REST robusta e escalável para gerenciamento de clientes, desenvolvida com Node.js, Express, PostgreSQL e Sequelize ORM, seguindo as melhores práticas de Clean Code e arquitetura MVC.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Rodar](#-como-rodar)
- [Documentação da API](#-documentação-da-api)
- [Endpoints](#-endpoints)
- [Exemplos de Uso](#-exemplos-de-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Boas Práticas](#-boas-práticas)
- [Contribuindo](#-contribuindo)
- [Autor](#-autor)

---

## 🎯 Sobre o Projeto

A **PharmaIA API** é uma aplicação backend. O projeto demonstra habilidades em:

- Desenvolvimento de APIs RESTful
- Arquitetura MVC com Service Layer
- Integração com banco de dados relacional
- Documentação técnica com Swagger
- Clean Code e SOLID principles
- Tratamento de erros e validações

---

## ✨ Funcionalidades

- ✅ **CRUD Completo** de clientes (Create, Read, Update, Delete)
- ✅ **Validação robusta** de dados com Sequelize
- ✅ **Filtros avançados** por nome, cidade, email e status
- ✅ **Busca case-insensitive** e parcial
- ✅ **Documentação interativa** com Swagger UI
- ✅ **Validação de email único** (409 Conflict)
- ✅ **Logs estruturados** com cores
- ✅ **Tratamento centralizado** de erros
- ✅ **Health check** endpoint
- ✅ **Respostas padronizadas** em JSON
- ✅ **CORS habilitado**

---

## 🚀 Tecnologias

### Core

- **[Node.js](https://nodejs.org/)** v18+ - Runtime JavaScript
- **[Express](https://expressjs.com/)** v5.1 - Framework web minimalista
- **[PostgreSQL](https://www.postgresql.org/)** v16 - Banco de dados relacional
- **[Sequelize](https://sequelize.org/)** v6.37 - ORM para Node.js

### Documentação

- **[Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express)** - Interface de documentação
- **[Swagger JSDoc](https://www.npmjs.com/package/swagger-jsdoc)** - Geração de especificação OpenAPI

### Utilitários

- **[dotenv](https://www.npmjs.com/package/dotenv)** - Gerenciamento de variáveis de ambiente
- **[CORS](https://www.npmjs.com/package/cors)** - Cross-Origin Resource Sharing
- **[Express Validator](https://express-validator.github.io/)** - Validação de requisições

### Desenvolvimento

- **[Nodemon](https://nodemon.io/)** - Auto-reload durante desenvolvimento

---

## 🏗️ Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)** com **Service Layer** adicional para separação de responsabilidades:

```
┌──────────────────────────────────────────┐
│           HTTP Request                    │
└──────────────┬───────────────────────────┘
               │
┌──────────────▼───────────────────────────┐
│  Routes (clienteRoutes.js)               │
│  - Define endpoints                       │
│  - Mapeia rotas para controllers         │
└──────────────┬───────────────────────────┘
               │
┌──────────────▼───────────────────────────┐
│  Controllers (clienteController.js)      │
│  - Recebe requisições HTTP               │
│  - Valida entrada                        │
│  - Chama services                        │
│  - Retorna respostas formatadas          │
└──────────────┬───────────────────────────┘
               │
┌──────────────▼───────────────────────────┐
│  Services (clienteService.js)            │
│  - Lógica de negócio                     │
│  - Regras de validação                   │
│  - Operações no banco de dados           │
└──────────────┬───────────────────────────┘
               │
┌──────────────▼───────────────────────────┐
│  Models (Cliente.js)                     │
│  - Esquema do banco de dados             │
│  - Validações de campo                   │
│  - Relacionamentos                       │
└──────────────┬───────────────────────────┘
               │
┌──────────────▼───────────────────────────┐
│  Database (PostgreSQL)                   │
│  - Armazenamento persistente             │
└──────────────────────────────────────────┘
```

### Camadas e Responsabilidades

| Camada          | Responsabilidade                            | Localização         |
| --------------- | ------------------------------------------- | ------------------- |
| **Routes**      | Definir endpoints e mapear para controllers | `src/routes/`       |
| **Controllers** | Gerenciar requisições HTTP e respostas      | `src/controllers/`  |
| **Services**    | Implementar lógica de negócio               | `src/services/`     |
| **Models**      | Definir esquema e validações do banco       | `src/models/`       |
| **Middlewares** | Interceptar e processar requisições         | `src/middlewares/`  |
| **Utils**       | Funções auxiliares reutilizáveis            | `src/utils/`        |
| **Config**      | Configurações (DB, Swagger)                 | `src/config/`       |
| **Docs**        | Documentação Swagger separada               | `src/docs/swagger/` |

---

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- **[Node.js](https://nodejs.org/)** v18 ou superior
- **[PostgreSQL](https://www.postgresql.org/download/)** v12 ou superior
- **[Git](https://git-scm.com/)** (para clonar o repositório)
- **npm** ou **yarn** (gerenciador de pacotes)

**Verificar instalações:**

```bash
node --version    # v18.0.0 ou superior
npm --version     # 9.0.0 ou superior
psql --version    # psql 12.0 ou superior
```

---

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/emanuelabreudev/pharma-ia-api.git
cd pharma-ia-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados PostgreSQL

**Opção 1 - Linha de comando:**

```bash
# Acesse o PostgreSQL
psql -U postgres

# Crie o banco de dados
CREATE DATABASE pharma_ia_db;

# Saia
\q
```

**Opção 2 - Comando direto:**

```bash
createdb -U postgres pharma_ia_db
```

**Opção 3 - pgAdmin:**

1. Abra o pgAdmin
2. Clique com botão direito em "Databases"
3. Selecione "Create" → "Database"
4. Nome: `pharma_ia_db`
5. Clique em "Save"

### 4. Configure as variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env-example .env
```

Ou crie manualmente o arquivo `.env` na raiz do projeto:

```env
# Servidor
NODE_ENV=development
PORT=3000
API_VERSION=v1

# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pharma_ia_db
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui

# Logs
LOG_LEVEL=info

# Swagger
SWAGGER_ENABLED=true
```

**⚠️ IMPORTANTE:** Substitua `sua_senha_aqui` pela senha do seu PostgreSQL!

---

## 🚀 Como Rodar

### Modo Desenvolvimento (Recomendado)

Com **auto-reload** usando nodemon:

```bash
npm run dev
```

### Modo Produção

```bash
npm start
```

### Saída Esperada

Se tudo estiver correto, você verá:

```
[INFO] 2025-01-28T... ✅ Conexão com banco de dados estabelecida com sucesso!
[INFO] 2025-01-28T... ✅ Modelos sincronizados com o banco de dados
[INFO] 2025-01-28T... 🚀 Servidor rodando na porta 3000
[INFO] 2025-01-28T... 📍 API: http://localhost:3000/api
[INFO] 2025-01-28T... 📚 Swagger: http://localhost:3000/api-docs
[INFO] 2025-01-28T... ❤️  Health: http://localhost:3000/health
```

---

## 📚 Documentação da API

### Swagger UI (Interativo)

Acesse a documentação completa e interativa:

```
http://localhost:3000/api-docs
```

A interface Swagger permite:

- ✅ Visualizar todos os endpoints disponíveis
- ✅ Ver schemas de dados e exemplos
- ✅ Testar requisições diretamente no navegador
- ✅ Ver códigos de resposta HTTP
- ✅ Copiar exemplos de cURL

### Health Check

Verifique o status da API:

```
http://localhost:3000/health
```

**Resposta:**

```json
{
  "status": "OK",
  "timestamp": "2025-01-28T12:00:00.000Z",
  "uptime": 120.5
}
```

---

## 🛣️ Endpoints

### Base URL

```
http://localhost:3000/api
```

### Recursos Disponíveis

| Método   | Endpoint        | Descrição                             |
| -------- | --------------- | ------------------------------------- |
| `GET`    | `/clientes`     | Lista todos os clientes (com filtros) |
| `GET`    | `/clientes/:id` | Busca um cliente específico           |
| `POST`   | `/clientes`     | Cria um novo cliente                  |
| `PUT`    | `/clientes/:id` | Atualiza um cliente existente         |
| `DELETE` | `/clientes/:id` | Exclui um cliente                     |

### Filtros Disponíveis

Na rota `GET /api/clientes`, você pode usar:

| Parâmetro | Tipo    | Descrição                        | Exemplo                |
| --------- | ------- | -------------------------------- | ---------------------- |
| `nome`    | string  | Busca parcial por nome           | `?nome=ana`            |
| `cidade`  | string  | Filtrar por cidade               | `?cidade=Fortaleza`    |
| `email`   | string  | Buscar por email                 | `?email=ana@email.com` |
| `status`  | boolean | Filtrar por status ativo/inativo | `?status=true`         |

**Exemplos de URLs:**

```
GET /api/clientes?cidade=Fortaleza
GET /api/clientes?nome=silva&status=true
GET /api/clientes?email=joao@email.com
```

---

## 💡 Exemplos de Uso

### 1. Criar um Cliente

**Requisição:**

```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Souza",
    "email": "ana@email.com",
    "telefone": "85999999999",
    "cidade": "Fortaleza",
    "status": true
  }'
```

**Resposta (201 Created):**

```json
{
  "success": true,
  "message": "Cliente criado com sucesso",
  "data": {
    "id": 1,
    "nome": "Ana Souza",
    "email": "ana@email.com",
    "telefone": "85999999999",
    "cidade": "Fortaleza",
    "status": true,
    "created_at": "2025-01-28T10:00:00.000Z",
    "updated_at": "2025-01-28T10:00:00.000Z"
  },
  "timestamp": "2025-01-28T10:00:00.000Z"
}
```

### 2. Listar Todos os Clientes

**Requisição:**

```bash
curl http://localhost:3000/api/clientes
```

**Resposta (200 OK):**

```json
{
  "success": true,
  "message": "Clientes listados com sucesso",
  "data": {
    "total": 2,
    "clientes": [
      {
        "id": 1,
        "nome": "Ana Souza",
        "email": "ana@email.com",
        "telefone": "85999999999",
        "cidade": "Fortaleza",
        "status": true,
        "created_at": "2025-01-28T10:00:00.000Z",
        "updated_at": "2025-01-28T10:00:00.000Z"
      },
      {
        "id": 2,
        "nome": "João Silva",
        "email": "joao@email.com",
        "telefone": "85988888888",
        "cidade": "Fortaleza",
        "status": true,
        "created_at": "2025-01-28T11:00:00.000Z",
        "updated_at": "2025-01-28T11:00:00.000Z"
      }
    ]
  },
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

### 3. Buscar Cliente por ID

**Requisição:**

```bash
curl http://localhost:3000/api/clientes/1
```

**Resposta (200 OK):**

```json
{
  "success": true,
  "message": "Cliente encontrado",
  "data": {
    "id": 1,
    "nome": "Ana Souza",
    "email": "ana@email.com",
    "telefone": "85999999999",
    "cidade": "Fortaleza",
    "status": true,
    "created_at": "2025-01-28T10:00:00.000Z",
    "updated_at": "2025-01-28T10:00:00.000Z"
  },
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

### 4. Atualizar Cliente

**Requisição:**

```bash
curl -X PUT http://localhost:3000/api/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Silva",
    "telefone": "85977777777"
  }'
```

**Resposta (200 OK):**

```json
{
  "success": true,
  "message": "Cliente atualizado com sucesso",
  "data": {
    "id": 1,
    "nome": "Ana Silva",
    "email": "ana@email.com",
    "telefone": "85977777777",
    "cidade": "Fortaleza",
    "status": true,
    "created_at": "2025-01-28T10:00:00.000Z",
    "updated_at": "2025-01-28T13:00:00.000Z"
  },
  "timestamp": "2025-01-28T13:00:00.000Z"
}
```

### 5. Excluir Cliente

**Requisição:**

```bash
curl -X DELETE http://localhost:3000/api/clientes/1
```

**Resposta (200 OK):**

```json
{
  "success": true,
  "message": "Cliente excluído com sucesso",
  "data": null,
  "timestamp": "2025-01-28T14:00:00.000Z"
}
```

### 6. Filtrar Clientes por Cidade

**Requisição:**

```bash
curl "http://localhost:3000/api/clientes?cidade=Fortaleza"
```

### 7. Buscar por Nome (Parcial)

**Requisição:**

```bash
curl "http://localhost:3000/api/clientes?nome=ana"
```

---

## 📊 Códigos de Status HTTP

| Código | Significado           | Quando Ocorre                                   |
| ------ | --------------------- | ----------------------------------------------- |
| `200`  | OK                    | Requisição bem-sucedida (GET, PUT, DELETE)      |
| `201`  | Created               | Recurso criado com sucesso (POST)               |
| `400`  | Bad Request           | Dados inválidos ou campos obrigatórios ausentes |
| `404`  | Not Found             | Cliente não encontrado                          |
| `409`  | Conflict              | E-mail já cadastrado no sistema                 |
| `500`  | Internal Server Error | Erro interno do servidor                        |

---

## 📁 Estrutura do Projeto

```
pharma-ia-api/
├── src/
│   ├── config/
│   │   ├── database.js           # Configuração do Sequelize
│   │   └── swagger.js            # Configuração do Swagger
│   ├── controllers/
│   │   └── clienteController.js  # Controllers HTTP
│   ├── docs/
│   │   └── swagger/
│   │       ├── paths.js          # Documentação dos endpoints
│   │       └── schemas.js        # Schemas Swagger
│   ├── middlewares/
│   │   └── errorHandler.js       # Tratamento global de erros
│   ├── models/
│   │   └── Cliente.js            # Model Sequelize
│   ├── routes/
│   │   └── clienteRoutes.js      # Definição de rotas
│   ├── services/
│   │   └── clienteService.js     # Lógica de negócio
│   ├── utils/
│   │   ├── logger.js             # Sistema de logs
│   │   └── responseHandler.js    # Padronização de respostas
│   └── server.js                 # Arquivo principal
├── .env                          # Variáveis de ambiente (não versionado)
├── .env-example                  # Exemplo de configuração
├── .gitignore                    # Arquivos ignorados pelo Git
├── package.json                  # Dependências do projeto
├── package-lock.json             # Lock de versões
└── README.md                     # Este arquivo
```

### Descrição dos Diretórios

| Diretório/Arquivo   | Descrição                                 |
| ------------------- | ----------------------------------------- |
| `src/config/`       | Configurações de banco de dados e Swagger |
| `src/controllers/`  | Lógica de controle das requisições HTTP   |
| `src/docs/swagger/` | Documentação Swagger separada             |
| `src/middlewares/`  | Interceptadores de requisição/resposta    |
| `src/models/`       | Definições de modelos Sequelize           |
| `src/routes/`       | Mapeamento de rotas da API                |
| `src/services/`     | Camada de lógica de negócio               |
| `src/utils/`        | Funções auxiliares reutilizáveis          |
| `src/server.js`     | Ponto de entrada da aplicação             |

---

## 🔐 Variáveis de Ambiente

Configure o arquivo `.env` com as seguintes variáveis:

| Variável          | Descrição              | Exemplo                       |
| ----------------- | ---------------------- | ----------------------------- |
| `NODE_ENV`        | Ambiente de execução   | `development` ou `production` |
| `PORT`            | Porta do servidor      | `3000`                        |
| `API_VERSION`     | Versão da API          | `v1`                          |
| `DB_HOST`         | Host do PostgreSQL     | `localhost`                   |
| `DB_PORT`         | Porta do PostgreSQL    | `5432`                        |
| `DB_NAME`         | Nome do banco de dados | `pharma_ia_db`                |
| `DB_USER`         | Usuário do PostgreSQL  | `postgres`                    |
| `DB_PASSWORD`     | Senha do PostgreSQL    | `sua_senha`                   |
| `LOG_LEVEL`       | Nível de log           | `info`, `debug`, `error`      |
| `SWAGGER_ENABLED` | Habilitar Swagger      | `true` ou `false`             |

---

## 📜 Scripts Disponíveis

| Script  | Comando       | Descrição                                  |
| ------- | ------------- | ------------------------------------------ |
| `start` | `npm start`   | Inicia o servidor em modo produção         |
| `dev`   | `npm run dev` | Inicia em modo desenvolvimento com nodemon |

### Exemplos de Uso

```bash
# Desenvolvimento com auto-reload
npm run dev

# Produção
npm start
```

---

## 🎯 Boas Práticas Implementadas

### Clean Code

- ✅ Nomes descritivos e autoexplicativos
- ✅ Funções pequenas com responsabilidade única
- ✅ Comentários apenas quando necessário
- ✅ DRY (Don't Repeat Yourself)
- ✅ Formatação consistente

### SOLID Principles

- ✅ **S**ingle Responsibility - Cada classe/função tem uma responsabilidade
- ✅ **O**pen/Closed - Aberto para extensão, fechado para modificação
- ✅ **L**iskov Substitution - Classes derivadas substituíveis
- ✅ **I**nterface Segregation - Interfaces específicas
- ✅ **D**ependency Inversion - Dependências de abstrações

### Arquitetura

- ✅ Separation of Concerns (SoC)
- ✅ Service Layer Pattern
- ✅ Repository Pattern (via Sequelize)
- ✅ Error Handling centralizado
- ✅ Response Standardization

### Segurança

- ✅ Variáveis de ambiente para dados sensíveis
- ✅ Validação de entrada de dados
- ✅ Sanitização de email (lowercase, trim)
- ✅ CORS configurado
- ✅ Proteção contra SQL Injection (ORM)

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 👨‍💻 Autor

**Emanuel Abreu**

- GitHub: [@emanuelabreudev](https://github.com/emanuelabreudev)
- LinkedIn: [Emanuel Abreu](https://www.linkedin.com/in/emanuelabreu)
- Email: emanuelabreudev@gmail.com

---

<div align="center">

**⭐ Se este projeto te ajudou, deixe uma estrela no repositório!**

Desenvolvido com ❤️ por [Emanuel Abreu](https://github.com/emanuelabreudev)

</div>
