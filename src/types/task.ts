import type { ParamsDictionary } from 'express-serve-static-core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskParams extends ParamsDictionary {
  id: string;
}
