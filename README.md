# Task Management API

API REST para gerenciamento de tarefas desenvolvida com **Node.js, TypeScript, Express, Prisma e PostgreSQL**.

O projeto possui uma estrutura organizada em camadas, validação de dados, persistência em banco de dados, tratamento centralizado de erros, testes automatizados e documentação interativa dos endpoints.

## Tecnologias

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- Zod
- Vitest
- Supertest
- Swagger / OpenAPI
- ESLint
- Prettier

## Funcionalidades

- Criar tarefas
- Listar tarefas
- Buscar tarefa por ID
- Atualizar tarefas parcialmente
- Excluir tarefas
- Filtrar por status e prioridade
- Buscar por título ou descrição
- Paginar resultados
- Validar dados de entrada
- Tratar erros de forma centralizada
- Documentar e testar endpoints com Swagger
- Executar testes automatizados

## Estrutura do projeto

```text
src/
├── controllers/   # Recebimento e resposta das requisições
├── docs/          # Documentação Swagger
├── errors/        # Erros customizados
├── lib/           # Configurações compartilhadas
├── middlewares/   # Validação e tratamento de erros
├── routes/        # Definição dos endpoints
├── schemas/       # Schemas de validação Zod
├── services/      # Regras de negócio e acesso aos dados
├── tests/         # Testes automatizados
└── types/         # Tipagens da aplicação
```

O fluxo principal das requisições segue a separação de responsabilidades:

```text
Request
   ↓
Route
   ↓
Middleware / Validação
   ↓
Controller
   ↓
Service
   ↓
Prisma ORM
   ↓
PostgreSQL
```

## Endpoints

| Método | Endpoint     | Descrição                        |
| ------ | ------------ | -------------------------------- |
| GET    | `/health`    | Verifica o status da API         |
| POST   | `/tasks`     | Cria uma nova tarefa             |
| GET    | `/tasks`     | Lista tarefas                    |
| GET    | `/tasks/:id` | Busca uma tarefa por ID          |
| PATCH  | `/tasks/:id` | Atualiza parcialmente uma tarefa |
| DELETE | `/tasks/:id` | Exclui uma tarefa                |

A listagem de tarefas também suporta filtros, busca e paginação:

```http
GET /tasks?status=OPEN
GET /tasks?priority=HIGH
GET /tasks?search=prisma
GET /tasks?page=1&limit=10
```

Os filtros também podem ser combinados:

```http
GET /tasks?status=OPEN&priority=HIGH&page=1&limit=10
```

## Como executar

### Pré-requisitos

Antes de iniciar, é necessário ter instalado:

- Node.js
- PostgreSQL
- Git

### Instalação

Clone o repositório:

```bash
git clone https://github.com/MikaelaSouza/task-management-api.git
```

Acesse a pasta do projeto:

```bash
cd task-management-api
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` com base no `.env.example` e configure a conexão com o PostgreSQL.

Exemplo:

```env
PORT=3333
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/task_management?schema=public"
```

Execute as migrations:

```bash
npx prisma migrate deploy
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Inicie a aplicação em ambiente de desenvolvimento:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3333
```

## Documentação da API

Com a aplicação em execução, a documentação interativa pode ser acessada pelo Swagger UI:

```text
http://localhost:3333/docs
```

Por meio da documentação é possível visualizar os endpoints, parâmetros, estruturas de dados e testar as operações disponíveis na API.

## Testes automatizados

Os testes de integração utilizam **Vitest** e **Supertest**, com um banco PostgreSQL separado do ambiente de desenvolvimento para manter o isolamento dos dados.

Crie um arquivo `.env.test` com base no `.env.test.example` e configure um banco PostgreSQL exclusivo para os testes.

Exemplo:

```env
PORT=3333
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/task_management_test?schema=public"
```

Aplique as migrations no banco de testes:

```bash
npx dotenv -e .env.test -- prisma migrate deploy
```

Para executar os testes:

```bash
npm run test
```

Outras verificações disponíveis:

```bash
npm run lint
npm run typecheck
npm run build
```
