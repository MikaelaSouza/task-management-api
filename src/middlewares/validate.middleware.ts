import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { ZodType } from 'zod';

export function validateBody<P extends ParamsDictionary = ParamsDictionary>(
  schema: ZodType,
): RequestHandler<P> {
  return (request: Request<P>, _response: Response, next: NextFunction): void => {
    request.body = schema.parse(request.body);

    next();
  };
}

export function validateQuery(schema: ZodType) {
  return (request: Request, response: Response, next: NextFunction): void => {
    response.locals.validatedQuery = schema.parse(request.query);

    next();
  };
}
