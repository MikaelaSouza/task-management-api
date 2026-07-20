import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

import { app } from '../app.js';
import { prisma } from '../lib/prisma.js';

describe('Task routes', () => {
  // Garante que cada teste comece com um banco limpo,
  beforeEach(async () => {
    await prisma.task.deleteMany();
  });

  it('should return the task list', async () => {
    const response = await request(app).get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('pagination');
    expect(response.body.data).toHaveLength(0);
  });

  it('should create a new task', async () => {
    const response = await request(app).post('/tasks').send({
      title: 'Criar testes automatizados',
      description: 'Adicionar testes com Vitest e Supertest',
      priority: 'HIGH',
    });

    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      title: 'Criar testes automatizados',
      description: 'Adicionar testes com Vitest e Supertest',
      priority: 'HIGH',
      status: 'OPEN',
    });

    expect(response.body).toHaveProperty('id');
  });

  it('should not create a task with invalid data', async () => {
    const response = await request(app).post('/tasks').send({
      title: '',
      priority: 'INVALID',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Dados inválidos.');
    expect(response.body).toHaveProperty('issues');
  });

  it('should find a task by id', async () => {
    const createdTask = await request(app).post('/tasks').send({
      title: 'Buscar tarefa por ID',
      priority: 'MEDIUM',
    });

    const response = await request(app).get(`/tasks/${createdTask.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdTask.body.id);
    expect(response.body.title).toBe('Buscar tarefa por ID');
  });

  it('should return 404 when task does not exist', async () => {
    const response = await request(app).get('/tasks/00000000-0000-0000-0000-000000000000');

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      message: 'Tarefa não encontrada.',
    });
  });

  it('should update a task', async () => {
    const createdTask = await request(app).post('/tasks').send({
      title: 'Implementar documentação',
      priority: 'MEDIUM',
    });

    const response = await request(app).patch(`/tasks/${createdTask.body.id}`).send({
      status: 'COMPLETED',
      priority: 'HIGH',
    });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      title: 'Implementar documentação',
      status: 'COMPLETED',
      priority: 'HIGH',
    });
  });

  it('should delete a task', async () => {
    const createdTask = await request(app).post('/tasks').send({
      title: 'Tarefa que será excluída',
    });

    const deleteResponse = await request(app).delete(`/tasks/${createdTask.body.id}`);

    expect(deleteResponse.status).toBe(204);

    const findResponse = await request(app).get(`/tasks/${createdTask.body.id}`);

    expect(findResponse.status).toBe(404);
  });
});
