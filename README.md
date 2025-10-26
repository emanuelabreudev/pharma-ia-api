# PharmaIA API

API REST para gerenciamento de clientes
Implementada com Node.js, Express e Sequelize (Postgres). Projeto executado localmente (sem Docker).

---

## Visão geral

API responsável por operações CRUD de clientes, com documentação OpenAPI/Swagger disponível em tempo de execução. O ponto de entrada é `src/server.js` e as rotas estão agrupadas sob `/api`.

---

## Principais tecnologias

- Node.js (CommonJS)
- Express
- Sequelize (Postgres)
- swagger-jsdoc + swagger-ui-express
- dotenv, cors, express-validator

---

## Estrutura resumida do projeto

```
src/
├── config/         # database.js, swagger.js
├── controllers/    # clienteController.js
├── models/         # Cliente.js
├── routes/         # clienteRoutes.js
├── services/       # clienteService.js
├── middlewares/    # errorHandler.js
├── utils/          # logger.js, responseHandler.js
└── server.js
```

---

## Pré-requisitos

- Node.js (recomendado v18+)
- npm
- PostgreSQL acessível (local ou remoto)
- Variáveis de ambiente configuradas

---

## Instalação e execução

1. Clonar o repositório:

```bash
git clone https://github.com/emanuelabreudev/pharma-ia-api.git
cd pharma-ia-api
```

2. Instalar dependências:

```bash
npm install
```

3. Configurar variáveis de ambiente
   Copie `.env-example` para `.env` e ajuste os valores (exemplo abaixo):

```env
NODE_ENV=development
PORT=3000
API_VERSION=v1

DB_HOST=localhost
DB_PORT=5432
DB_NAME=pharma_ia_db
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui

LOG_LEVEL=info
SWAGGER_ENABLED=true
```

4. Executar:

- Desenvolvimento (hot reload):

```bash
npm run dev
```

- Produção / sem nodemon:

```bash
npm start
```

Após iniciar:

- Base da API: `http://localhost:<PORT>/api`
- Swagger (se habilitado): `http://localhost:<PORT>/api-docs`
- Health: `http://localhost:<PORT>/health`

---

## Documentação (Swagger)

A documentação dos endpoints é gerada automaticamente (swagger-jsdoc) e servida por `swagger-ui-express`. Não estão listados endpoints neste README — consulte `/api-docs` com o servidor em execução. Controle a ativação pelo `.env` (`SWAGGER_ENABLED=true|false`).

---

## Banco de dados

- Conexão e boot do Sequelize configurados em `src/config/database.js`.
- Funções disponíveis no boot:

  - `testConnection()` — valida conexão com o Postgres.
  - `syncModels()` — sincroniza modelos (usar com cautela em produção).

- Recomenda-se usar migrations (`sequelize-cli`) para alterações de schema em ambiente de produção.

---

## Logs e tratamento de erros

- Logger central em `src/utils/logger.js` (nível via `LOG_LEVEL`).
- Middleware global de erros: `src/middlewares/errorHandler.js`.
- Rota padrão 404 para caminhos não encontrados.

---

## Resolução de problemas comuns

- **Conexão Postgres falha:** verifique host, porta, usuário, senha e se o serviço está ativo.
- **Porta ocupada:** ajuste `PORT` no `.env`.
- **Swagger não disponível:** confirme `SWAGGER_ENABLED=true`.
- **Perda de dados ao sincronizar models:** evite `sync({ force: true })` em produção; prefira migrations.

---

## Contribuição

1. Fork → clone → crie branch (`feature/` ou `fix/`) → commit → PR.
2. Abra issue descrevendo bug/feature quando necessário.

---

## Contato / Bugs

Abra issues em:
`https://github.com/emanuelabreudev/pharma-ia-api/issues`

---
