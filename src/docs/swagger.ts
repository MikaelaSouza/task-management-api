/**
 * Configuração OpenAPI da aplicação.
 *
 * Centraliza as informações utilizadas pelo Swagger UI para documentar e testar os endpoints da API.
 */
export const swaggerDocument = {
  openapi: '3.0.3',

  info: {
    title: 'Task Management API',
    version: '1.0.0',
    description:
      'API REST para gerenciamento de tarefas desenvolvida com Node.js, TypeScript, Express, Prisma e PostgreSQL.',
  },

  servers: [
    {
      url: 'http://localhost:3333',
      description: 'Servidor local',
    },
  ],

  tags: [
    {
      name: 'Health',
      description: 'Verificação de disponibilidade da API',
    },
    {
      name: 'Tasks',
      description: 'Operações relacionadas ao gerenciamento de tarefas',
    },
  ],

  components: {
    schemas: {
      Task: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: '550e8400-e29b-41d4-a716-446655440000',
          },

          title: {
            type: 'string',
            example: 'Criar documentação Swagger',
          },

          description: {
            type: 'string',
            nullable: true,
            example: 'Documentar os endpoints da API.',
          },

          status: {
            type: 'string',
            enum: ['OPEN', 'IN_PROGRESS', 'COMPLETED'],
            example: 'OPEN',
          },

          priority: {
            type: 'string',
            enum: ['LOW', 'MEDIUM', 'HIGH'],
            example: 'HIGH',
          },

          dueDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
            example: '2026-07-25T00:00:00.000Z',
          },

          createdAt: {
            type: 'string',
            format: 'date-time',
          },

          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },

      CreateTask: {
        type: 'object',
        required: ['title'],

        properties: {
          title: {
            type: 'string',
            minLength: 3,
            maxLength: 120,
            example: 'Criar documentação Swagger',
          },

          description: {
            type: 'string',
            maxLength: 500,
            example: 'Documentar todos os endpoints da aplicação.',
          },

          priority: {
            type: 'string',
            enum: ['LOW', 'MEDIUM', 'HIGH'],
            default: 'MEDIUM',
          },

          dueDate: {
            type: 'string',
            format: 'date',
            example: '2026-07-25',
          },
        },
      },

      UpdateTask: {
        type: 'object',

        properties: {
          title: {
            type: 'string',
            minLength: 3,
            maxLength: 120,
          },

          description: {
            type: 'string',
            maxLength: 500,
          },

          status: {
            type: 'string',
            enum: ['OPEN', 'IN_PROGRESS', 'COMPLETED'],
          },

          priority: {
            type: 'string',
            enum: ['LOW', 'MEDIUM', 'HIGH'],
          },

          dueDate: {
            type: 'string',
            format: 'date',
          },
        },
      },

      ValidationError: {
        type: 'object',

        properties: {
          message: {
            type: 'string',
            example: 'Dados inválidos.',
          },

          issues: {
            type: 'array',

            items: {
              type: 'object',

              properties: {
                field: {
                  type: 'string',
                  example: 'title',
                },

                message: {
                  type: 'string',
                  example: 'O título deve possuir pelo menos 3 caracteres.',
                },
              },
            },
          },
        },
      },

      NotFoundError: {
        type: 'object',

        properties: {
          message: {
            type: 'string',
            example: 'Tarefa não encontrada.',
          },
        },
      },
    },
  },

  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Verifica se a API está disponível',

        responses: {
          200: {
            description: 'API disponível',
          },
        },
      },
    },

    '/tasks': {
      get: {
        tags: ['Tasks'],
        summary: 'Lista tarefas',

        parameters: [
          {
            name: 'page',
            in: 'query',
            schema: {
              type: 'integer',
              default: 1,
            },
          },

          {
            name: 'limit',
            in: 'query',
            schema: {
              type: 'integer',
              default: 10,
              maximum: 100,
            },
          },

          {
            name: 'status',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['OPEN', 'IN_PROGRESS', 'COMPLETED'],
            },
          },

          {
            name: 'priority',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['LOW', 'MEDIUM', 'HIGH'],
            },
          },

          {
            name: 'search',
            in: 'query',
            schema: {
              type: 'string',
            },
          },
        ],

        responses: {
          200: {
            description: 'Lista de tarefas retornada com sucesso',
          },

          400: {
            description: 'Parâmetros inválidos',
          },
        },
      },

      post: {
        tags: ['Tasks'],
        summary: 'Cria uma nova tarefa',

        requestBody: {
          required: true,

          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateTask',
              },
            },
          },
        },

        responses: {
          201: {
            description: 'Tarefa criada com sucesso',

            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Task',
                },
              },
            },
          },

          400: {
            description: 'Dados inválidos',

            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ValidationError',
                },
              },
            },
          },
        },
      },
    },

    '/tasks/{id}': {
      get: {
        tags: ['Tasks'],
        summary: 'Busca uma tarefa pelo ID',

        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,

            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],

        responses: {
          200: {
            description: 'Tarefa encontrada',

            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Task',
                },
              },
            },
          },

          404: {
            description: 'Tarefa não encontrada',

            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundError',
                },
              },
            },
          },
        },
      },

      patch: {
        tags: ['Tasks'],
        summary: 'Atualiza parcialmente uma tarefa',

        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,

            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],

        requestBody: {
          required: true,

          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateTask',
              },
            },
          },
        },

        responses: {
          200: {
            description: 'Tarefa atualizada com sucesso',

            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Task',
                },
              },
            },
          },

          400: {
            description: 'Dados inválidos',
          },

          404: {
            description: 'Tarefa não encontrada',
          },
        },
      },

      delete: {
        tags: ['Tasks'],
        summary: 'Exclui uma tarefa',

        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,

            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],

        responses: {
          204: {
            description: 'Tarefa excluída com sucesso',
          },

          404: {
            description: 'Tarefa não encontrada',
          },
        },
      },
    },
  },
};
