import type { NextFunction, Request, Response } from 'express';

import { TaskService } from '../services/task.service.js';

import type { TaskParams } from '../types/task.js';

import type { TaskQueryInput } from '../schemas/task.schema.js';

const taskService = new TaskService();

// Recebe as requisições HTTP e delega as regras de negócio para a camada de Service.
export class TaskController {
  async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const task = await taskService.create(request.body);

      return response.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  async findAll(
    _request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const query = response.locals.validatedQuery as TaskQueryInput;

      const result = await taskService.findAll(query);

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findById(
    request: Request<TaskParams>,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const task = await taskService.findById(request.params.id);

      return response.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async update(
    request: Request<TaskParams>,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const task = await taskService.update(request.params.id, request.body);

      return response.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async delete(
    request: Request<TaskParams>,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      await taskService.delete(request.params.id);

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
