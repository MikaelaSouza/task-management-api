import { Router } from 'express';

import { TaskController } from '../controllers/task.controller.js';
import { validateBody, validateQuery } from '../middlewares/validate.middleware.js';
import { createTaskSchema, taskQuerySchema, updateTaskSchema } from '../schemas/task.schema.js';
import type { TaskParams } from '../types/task.js';

export const taskRoutes = Router();

const taskController = new TaskController();

/**
 * Rotas relacionadas às tarefas.
 */
taskRoutes.post('/', validateBody(createTaskSchema), (request, response, next) => {
  void taskController.create(request, response, next);
});

taskRoutes.get('/', validateQuery(taskQuerySchema), (request, response, next) => {
  void taskController.findAll(request, response, next);
});

taskRoutes.get<TaskParams>('/:id', (request, response, next) => {
  void taskController.findById(request, response, next);
});

taskRoutes.patch<TaskParams>(
  '/:id',

  validateBody<TaskParams>(updateTaskSchema),

  (request, response, next) => {
    void taskController.update(request, response, next);
  },
);

taskRoutes.delete<TaskParams>('/:id', (request, response, next) => {
  void taskController.delete(request, response, next);
});
