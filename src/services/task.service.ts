import { AppError } from '../errors/app-error.js';
import { prisma } from '../lib/prisma.js';
import type { Prisma } from '../generated/prisma/client.js';
import type { CreateTaskInput, TaskQueryInput, UpdateTaskInput } from '../schemas/task.schema.js';

/**
 * Task Service
 *
 * Responsável pelas regras de negócio relacionadas às tarefas e pela comunicação com o bd por meio do Prisma.
 */
export class TaskService {
  async create(input: CreateTaskInput) {
    return prisma.task.create({
      data: {
        title: input.title,
        description: input.description ?? null,
        priority: input.priority ?? 'MEDIUM',
        dueDate: input.dueDate ? new Date(input.dueDate) : null,
      },
    });
  }

  async findAll(query: TaskQueryInput) {
    const { page, limit, status, priority, search } = query;

    const where: Prisma.TaskWhereInput = {
      status,
      priority,

      ...(search && {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }),
    };

    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.task.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: tasks,

      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async findById(id: string) {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new AppError('Tarefa não encontrada.', 404);
    }

    return task;
  }

  async update(id: string, input: UpdateTaskInput) {
    // Verifica primeiro se a tarefa existe.
    await this.findById(id);

    return prisma.task.update({
      where: {
        id,
      },
      data: {
        title: input.title,
        description: input.description,
        status: input.status,
        priority: input.priority,
        dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
      },
    });
  }

  async delete(id: string) {
    // Evita retornar erro generico do Prisma quando o ID não existe.
    await this.findById(id);

    await prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
