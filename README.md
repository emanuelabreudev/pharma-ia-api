# 🏥 FarmaUP - API de Gerenciamento de Clientes

API REST desenvolvida em Node.js para gerenciamento de clientes, utilizando PostgreSQL e Sequelize ORM.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **Sequelize** - ORM para Node.js
- **dotenv** - Gerenciamento de variáveis de ambiente
- **CORS** - Controle de acesso entre domínios

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 16 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

## 🔧 Instalação

### 1. Clone o repositório ou crie a estrutura de pastas

```bash
mkdir farmaup-api
cd farmaup-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados PostgreSQL

Crie um banco de dados no PostgreSQL:

```sql
CREATE DATABASE farmaup_db;
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=farmaup_db
DB_USER=postgres
DB_PASSWORD=sua_senha

NODE_ENV=development
```

### 5. Inicie o servidor

**Modo desenvolvimento (com auto-reload):**

```bash
npm run dev
```

**Modo produção:**

```bash
npm start
```

O servidor estará rodando em: `http://localhost:3000`

## 📡 Endpoints da API

### Base URL

```
http://localhost:3000/api
```

### 1. Listar todos os clientes

```http
GET /api/clientes
```

**Resposta (200 OK):**

```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "id": 1,
      "nome": "Ana Souza",
      "email": "ana@email.com",
      "telefone": "85999999999",
      "cidade": "Fortaleza",
      "created_at": "2025-01-15T10:30:00.000Z",
      "updated_at": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

### 2. Buscar cliente por ID

```http
GET /api/clientes/:id
```

**Resposta (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "Ana Souza",
    "email": "ana@email.com",
    "telefone": "85999999999",
    "cidade": "Fortaleza"
  }
}
```

**Erro (404 Not Found):**

```json
{
  "success": false,
  "message": "Cliente não encontrado"
}
```

### 3. Criar novo cliente

```http
POST /api/clientes
Content-Type: application/json
```

**Body:**

```json
{
  "nome": "Ana Souza",
  "email": "ana@email.com",
  "telefone": "85999999999",
  "cidade": "Fortaleza"
}
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
    "cidade": "Fortaleza"
  }
}
```

**Erro (409 Conflict) - E-mail já existe:**

```json
{
  "success": false,
  "message": "E-mail já cadastrado"
}
```

### 4. Atualizar cliente

```http
PUT /api/clientes/:id
Content-Type: application/json
```

**Body:**

```json
{
  "nome": "Ana Silva",
  "telefone": "85988888888"
}
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
    "telefone": "85988888888",
    "cidade": "Fortaleza"
  }
}
```

### 5. Excluir cliente

```http
DELETE /api/clientes/:id
```

**Resposta (200 OK):**

```json
{
  "success": true,
  "message": "Cliente excluído com sucesso"
}
```

## 🔍 Filtros e Buscas

### Filtrar por cidade

```http
GET /api/clientes?cidade=Fortaleza
```

### Buscar por nome (parcial)

```http
GET /api/clientes?nome=ana
```

### Combinar filtros

```http
GET /api/clientes?cidade=Fortaleza&nome=silva
```

## 📊 Códigos de Status HTTP

| Código | Descrição                   |
| ------ | --------------------------- |
| 200    | Sucesso                     |
| 201    | Criado com sucesso          |
| 400    | Requisição inválida         |
| 404    | Recurso não encontrado      |
| 409    | Conflito (e-mail duplicado) |
| 500    | Erro interno do servidor    |

## 🏗️ Arquitetura do Projeto

```
farmaup-api/
├── src/
│   ├── config/
│   │   └── database.js          # Configuração do Sequelize
│   ├── models/
│   │   └── Cliente.js            # Model do Cliente
│   ├── controllers/
│   │   └── clienteController.js  # Lógica de negócio
│   ├── routes/
│   │   └── clienteRoutes.js      # Definição das rotas
│   └── server.js                 # Arquivo principal
├── .env                          # Variáveis de ambiente
├── .gitignore
├── package.json
└── README.md
```

## ✅ Validações Implementadas

- **Nome**: Obrigatório, entre 3 e 100 caracteres
- **E-mail**: Obrigatório, formato válido, único no banco
- **Telefone**: Obrigatório, apenas números, 10 ou 11 dígitos
- **Cidade**: Obrigatória

## 🧪 Testando a API

### Usando cURL

**Criar cliente:**

```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Souza",
    "email": "ana@email.com",
    "telefone": "85999999999",
    "cidade": "Fortaleza"
  }'
```

**Listar clientes:**

```bash
curl http://localhost:3000/api/clientes
```

### Usando Postman ou Insomnia

Importe a coleção de requisições com os exemplos acima.

## 🤝 Autor

Desenvolvido para o teste técnico da **FarmaUP** - Vaga de Estagiário de Desenvolvimento.

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais e de avaliação técnica.
