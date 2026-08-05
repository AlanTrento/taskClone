import { describe, it, expect } from 'vitest';
import { CreateTaskListUseCase } from '../../../src/application/usecases/taskList/CreateTaskListUseCase.js';
import { DeleteTaskListUseCase } from '../../../src/application/usecases/taskList/DeleteTaskListUseCase.js';
import { NotFoundError, ValidationError } from '../../../src/shared/errors/AppError.js';
import type { ITaskListRepository } from '../../../src/application/interfaces/ITaskListRepository.js';
import type { ITaskRepository } from '../../../src/application/interfaces/ITaskRepository.js';
import type { TaskList } from '../../../src/domain/entities/TaskList.js';
import type { Task } from '../../../src/domain/entities/Task.js';

function createMockTaskListRepository(): ITaskListRepository & { lists: TaskList[] } {
  const lists: TaskList[] = [];
  let idCounter = 1;

  return {
    lists,
    async findAll(userId) {
      return lists.filter((l) => l.userId === userId);
    },
    async findById(id, userId) {
      return lists.find((l) => l.id === id && l.userId === userId) || null;
    },
    async create(data) {
      const list: TaskList = { ...data, id: String(idCounter++) };
      lists.push(list);
      return list;
    },
    async update(id, userId, updates) {
      const list = lists.find((l) => l.id === id && l.userId === userId);
      if (!list) throw new Error('Task list not found');
      Object.assign(list, updates);
      return list;
    },
    async delete(id, userId) {
      const idx = lists.findIndex((l) => l.id === id && l.userId === userId);
      if (idx !== -1) lists.splice(idx, 1);
    },
    async getMaxOrder(userId) {
      const userLists = lists.filter((l) => l.userId === userId);
      return userLists.length > 0 ? Math.max(...userLists.map((l) => l.order)) : -1;
    },
  };
}

function createMockTaskRepository(): ITaskRepository & { tasks: Task[] } {
  const tasks: Task[] = [];
  return {
    tasks,
    async findAll() { return tasks; },
    async findById() { return null; },
    async create(data) {
      const task = { ...data, id: String(tasks.length + 1), createdAt: new Date(), updatedAt: new Date() };
      tasks.push(task);
      return task;
    },
    async update() { throw new Error('Not implemented'); },
    async delete() {},
    async deleteByListId(listId) {
      const toRemove = tasks.filter((t) => t.listId === listId);
      toRemove.forEach((t) => {
        const idx = tasks.indexOf(t);
        if (idx !== -1) tasks.splice(idx, 1);
      });
    },
    async deleteCompletedByListId() {},
    async markOldAsCompleted() {},
    async getMaxOrder() { return -1; },
  };
}

describe('CreateTaskListUseCase', () => {
  it('should create a task list', async () => {
    const repo = createMockTaskListRepository();
    const useCase = new CreateTaskListUseCase(repo);

    const list = await useCase.execute('user1', { name: 'New List', color: '#8ab4f8' });

    expect(list.name).toBe('New List');
    expect(list.color).toBe('#8ab4f8');
    expect(list.userId).toBe('user1');
  });

  it('should throw on missing name', async () => {
    const repo = createMockTaskListRepository();
    const useCase = new CreateTaskListUseCase(repo);

    await expect(
      useCase.execute('user1', { name: '', color: '#8ab4f8' }),
    ).rejects.toThrow('Nome é obrigatório');
  });
});

describe('DeleteTaskListUseCase', () => {
  it('should delete a task list and its tasks', async () => {
    const listRepo = createMockTaskListRepository();
    const taskRepo = createMockTaskRepository();
    const createUseCase = new CreateTaskListUseCase(listRepo);
    const deleteUseCase = new DeleteTaskListUseCase(listRepo, taskRepo);

    const list = await createUseCase.execute('user1', { name: 'To Delete', color: '#ff0000' });
    await deleteUseCase.execute('user1', list.id);

    const found = await listRepo.findById(list.id, 'user1');
    expect(found).toBeNull();
  });

  it('should throw on non-existent list', async () => {
    const listRepo = createMockTaskListRepository();
    const taskRepo = createMockTaskRepository();
    const useCase = new DeleteTaskListUseCase(listRepo, taskRepo);

    await expect(
      useCase.execute('user1', 'nonexistent'),
    ).rejects.toThrow('Task list not found');
  });
});
