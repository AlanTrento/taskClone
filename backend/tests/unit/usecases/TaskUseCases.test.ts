import { describe, it, expect } from 'vitest';
import { CreateTaskUseCase } from '../../../src/application/usecases/task/CreateTaskUseCase.js';
import { UpdateTaskUseCase } from '../../../src/application/usecases/task/UpdateTaskUseCase.js';
import { DeleteTaskUseCase } from '../../../src/application/usecases/task/DeleteTaskUseCase.js';
import { NotFoundError, ValidationError } from '../../../src/shared/errors/AppError.js';
import type { ITaskRepository } from '../../../src/application/interfaces/ITaskRepository.js';
import type { Task } from '../../../src/domain/entities/Task.js';

function createMockTaskRepository(): ITaskRepository & { tasks: Task[] } {
  const tasks: Task[] = [];
  let idCounter = 1;

  return {
    tasks,
    async findAll(userId, filters) {
      let result = tasks.filter((t) => t.userId === userId);
      if (filters?.listId) result = result.filter((t) => t.listId === filters.listId);
      if (filters?.completed !== undefined) result = result.filter((t) => t.completed === filters.completed);
      if (filters?.starred !== undefined) result = result.filter((t) => t.starred === filters.starred);
      return result;
    },
    async findById(id, userId) {
      return tasks.find((t) => t.id === id && t.userId === userId) || null;
    },
    async create(data) {
      const task: Task = { ...data, id: String(idCounter++), createdAt: new Date(), updatedAt: new Date() };
      tasks.push(task);
      return task;
    },
    async update(id, userId, updates) {
      const task = tasks.find((t) => t.id === id && t.userId === userId);
      if (!task) throw new Error('Task not found');
      Object.assign(task, updates, { updatedAt: new Date() });
      return task;
    },
    async delete(id, userId) {
      const idx = tasks.findIndex((t) => t.id === id && t.userId === userId);
      if (idx !== -1) tasks.splice(idx, 1);
    },
    async deleteByListId(listId, userId) {
      const toRemove = tasks.filter((t) => t.listId === listId && t.userId === userId);
      toRemove.forEach((t) => {
        const idx = tasks.indexOf(t);
        if (idx !== -1) tasks.splice(idx, 1);
      });
    },
    async deleteCompletedByListId(listId, userId) {
      const toRemove = tasks.filter((t) => t.listId === listId && t.userId === userId && t.completed);
      toRemove.forEach((t) => {
        const idx = tasks.indexOf(t);
        if (idx !== -1) tasks.splice(idx, 1);
      });
    },
    async markOldAsCompleted(listId, userId, olderThanDays) {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - olderThanDays);
      tasks
        .filter((t) => t.listId === listId && t.userId === userId && !t.completed && t.createdAt < cutoff)
        .forEach((t) => { t.completed = true; });
    },
    async getMaxOrder(userId) {
      const userTasks = tasks.filter((t) => t.userId === userId);
      return userTasks.length > 0 ? Math.max(...userTasks.map((t) => t.order)) : -1;
    },
  };
}

describe('CreateTaskUseCase', () => {
  it('should create a task', async () => {
    const repo = createMockTaskRepository();
    const useCase = new CreateTaskUseCase(repo);

    const task = await useCase.execute('user1', {
      title: 'Test Task',
      description: 'Description',
      listId: 'list1',
    });

    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('Description');
    expect(task.listId).toBe('list1');
    expect(task.userId).toBe('user1');
    expect(task.completed).toBe(false);
    expect(task.starred).toBe(false);
  });

  it('should throw on missing title', async () => {
    const repo = createMockTaskRepository();
    const useCase = new CreateTaskUseCase(repo);

    await expect(
      useCase.execute('user1', { title: '', listId: 'list1' }),
    ).rejects.toThrow('Título é obrigatório');
  });
});

describe('UpdateTaskUseCase', () => {
  it('should update a task', async () => {
    const repo = createMockTaskRepository();
    const createUseCase = new CreateTaskUseCase(repo);
    const updateUseCase = new UpdateTaskUseCase(repo);

    const created = await createUseCase.execute('user1', { title: 'Original', listId: 'list1' });
    const updated = await updateUseCase.execute('user1', created.id, { title: 'Updated' });

    expect(updated.title).toBe('Updated');
  });

  it('should throw on non-existent task', async () => {
    const repo = createMockTaskRepository();
    const useCase = new UpdateTaskUseCase(repo);

    await expect(
      useCase.execute('user1', 'nonexistent', { title: 'Test' }),
    ).rejects.toThrow('Task not found');
  });
});

describe('DeleteTaskUseCase', () => {
  it('should delete a task', async () => {
    const repo = createMockTaskRepository();
    const createUseCase = new CreateTaskUseCase(repo);
    const deleteUseCase = new DeleteTaskUseCase(repo);

    const created = await createUseCase.execute('user1', { title: 'To Delete', listId: 'list1' });
    await deleteUseCase.execute('user1', created.id);

    const found = await repo.findById(created.id, 'user1');
    expect(found).toBeNull();
  });

  it('should throw on non-existent task', async () => {
    const repo = createMockTaskRepository();
    const useCase = new DeleteTaskUseCase(repo);

    await expect(
      useCase.execute('user1', 'nonexistent'),
    ).rejects.toThrow('Task not found');
  });
});
