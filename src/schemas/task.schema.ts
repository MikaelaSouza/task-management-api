import { z } from 'zod';

// Schema de criação de tarefas. Responsável por validar os dados recebidos antes que eles cheguem ao Service.
export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'O título deve possuir pelo menos 3 caracteres.')
    .max(120, 'O título deve possuir no máximo 120 caracteres.'),

  description: z
    .string()
    .trim()
    .max(500, 'A descrição deve possuir no máximo 500 caracteres.')
    .optional(),

  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),

  dueDate: z
    .string()
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: 'A data informada é inválida.',
    })
    .optional(),
});

// Schema de atualização de tarefas. Partial() torna todos os campos opcionais.
export const updateTaskSchema = createTaskSchema
  .extend({
    status: z.enum(['OPEN', 'IN_PROGRESS', 'COMPLETED']).optional(),
  })
  .partial();

// Schema utilizado para validar filtros, busca e paginação recebidos através dos query parameters.
export const taskQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(10),

  status: z.enum(['OPEN', 'IN_PROGRESS', 'COMPLETED']).optional(),

  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),

  search: z.string().trim().min(1).optional(),
});

export type TaskQueryInput = z.infer<typeof taskQuerySchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
