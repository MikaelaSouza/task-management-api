import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { AppError } from '../errors/app-error.js';

/**
 * Middleware global de tratamento de erros.
 *
 * Centraliza as respostas de erro da aplicação para manter um formato consistente na API.
 */
export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response {
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: 'Dados inválidos.',
      issues: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    message: 'Internal server error',
  });
}
