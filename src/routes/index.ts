import { Router } from 'express';

import { taskRoutes } from './task.routes.js';

export const routes = Router();

routes.use('/tasks', taskRoutes);
