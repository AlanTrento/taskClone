import { describe, it, expect, beforeEach } from 'vitest';
import { GetTasksUseCase } from '../GetTasksUseCase';
import { CreateTaskUseCase } from '../CreateTaskUseCase';
import { UpdateTaskUseCase } from '../UpdateTaskUseCase';
import { DeleteTaskUseCase } from '../DeleteTaskUseCase';
import { DeleteCompletedTasksUseCase } from '../DeleteCompletedTasksUseCase';
import { MarkOldTasksAsCompletedUseCase } from '../MarkOldTasksAsCompletedUseCase';
import type { ITaskRepository } from '../../../domain/repositories/ITaskRepository';
import type { Task } from '../../../domain/entities/Task';

function createMockTask(overrides: Partial<Task> = {}): Task {
  return {
    id: '1',
    title: 'Test',
    completed: false,
    starred: false,
    listId: '1',
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

function createMockRepository(): ITaskRepository {
  const tasks: Task[] = [
    createMockTask({ id: '1', title: 'Task 1' }),
    createMockTask({ id: '2', title: 'Task 2', completed: true }),
  ];

  return {
    getAll: async (filters?) => {
      let result = [...tasks];
      if (filters?.listId) result = result.filter((t) => t.listId === filters.listId);
      if (filters?.completed !== undefined) result = result.filter((t) => t.completed === filters.completed);
      if (filters?.starred !== undefined) result = result.filter((t) => t.starred === filters.starred);
      return result;
    },
    getById: async (id: string) => tasks.find((t) => t.id === id) || null,
    create: async (data) => {
      const now = new Date();
      const maxOrder = tasks.reduce((max, t) => Math.max(max, t.order), -1);
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description,
        completed: false,
        starred: false,
        listId: data.listId,
        createdAt: (data as Record<string, unknown>).createdAt instanceof Date ? (data as Record<string, unknown>).createdAt as Date : now,
        updatedAt: now,
        order: data.order ?? maxOrder + 1,
      };
      tasks.push(newTask);
      return newTask;
    },
    update: async (id, data) => {
      const idx = tasks.findIndex((t) => t.id === id);
      if (idx === -1) throw new Error('Task not found');
      tasks[idx] = { ...tasks[idx], ...data, updatedAt: new Date() };
      return tasks[idx];
    },
    delete: async (id: string) => {
      const idx = tasks.findIndex((t) => t.id === id);
      if (idx !== -1) tasks.splice(idx, 1);
    },
    deleteCompletedByListId: async (listId: string) => {
      for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].listId === listId && tasks[i].completed) {
          tasks.splice(i, 1);
        }
      }
    },
    markOldAsCompleted: async (listId: string, olderThanDays: number = 30) => {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - olderThanDays);
      tasks.forEach((task, idx) => {
        if (task.listId === listId && !task.completed && task.createdAt < cutoff) {
          tasks[idx] = { ...task, completed: true, updatedAt: new Date() };
        }
      });
    },
  };
}

describe('UseCases', () => {
  let repo: ITaskRepository;

  beforeEach(() => {
    repo = createMockRepository();
  });

  describe('GetTasksUseCase', () => {
    it('returns all tasks', async () => {
      const useCase = new GetTasksUseCase(repo);
      const result = await useCase.execute();

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Task 1');
    });
  });

  describe('CreateTaskUseCase', () => {
    it('creates a task', async () => {
      const useCase = new CreateTaskUseCase(repo);
      const result = await useCase.execute({
        title: 'New Task',
        listId: '1',
      });

      expect(result.title).toBe('New Task');
      expect(result.completed).toBe(false);
      expect(result.starred).toBe(false);
      expect(result.listId).toBe('1');
      expect(result.id).toBeDefined();
    });

    it('creates a task with custom order', async () => {
      const useCase = new CreateTaskUseCase(repo);
      const result = await useCase.execute({
        title: 'Ordered Task',
        listId: '1',
        order: 5,
      });

      expect(result.order).toBe(5);
    });

    it('generates unique id', async () => {
      const useCase = new CreateTaskUseCase(repo);
      const t1 = await useCase.execute({ title: 'A', listId: '1' });
      const t2 = await useCase.execute({ title: 'B', listId: '1' });

      expect(t1.id).not.toBe(t2.id);
    });
  });

  describe('UpdateTaskUseCase', () => {
    it('updates existing task', async () => {
      const useCase = new UpdateTaskUseCase(repo);
      const result = await useCase.execute('1', { title: 'Updated' });

      expect(result.title).toBe('Updated');
      expect(result.id).toBe('1');
    });

    it('updates dueDate', async () => {
      const useCase = new UpdateTaskUseCase(repo);
      const date = new Date('2024-06-15');
      const result = await useCase.execute('1', { dueDate: date });

      expect(result.dueDate).toEqual(date);
    });

    it('updates dueTime', async () => {
      const useCase = new UpdateTaskUseCase(repo);
      const result = await useCase.execute('1', { dueTime: '14:30' });

      expect(result.dueTime).toBe('14:30');
    });

    it('updates order', async () => {
      const useCase = new UpdateTaskUseCase(repo);
      const result = await useCase.execute('1', { order: 3 });

      expect(result.order).toBe(3);
    });

    it('throws for non-existent task', async () => {
      const useCase = new UpdateTaskUseCase(repo);

      await expect(useCase.execute('999', { title: 'X' }))
        .rejects.toThrow('Task not found');
    });
  });

  describe('DeleteTaskUseCase', () => {
    it('deletes existing task', async () => {
      const useCase = new DeleteTaskUseCase(repo);

      await expect(useCase.execute('1')).resolves.toBeUndefined();
    });

    it('throws for non-existent task', async () => {
      const useCase = new DeleteTaskUseCase(repo);

      await expect(useCase.execute('999'))
        .rejects.toThrow('Task not found');
    });
  });

  describe('DeleteCompletedTasksUseCase', () => {
    it('deletes completed tasks for a list', async () => {
      const useCase = new DeleteCompletedTasksUseCase(repo);

      await useCase.execute('1');

      const remaining = await repo.getAll();
      expect(remaining).toHaveLength(1);
      expect(remaining[0].completed).toBe(false);
    });

    it('does not delete incomplete tasks', async () => {
      const useCase = new DeleteCompletedTasksUseCase(repo);

      await useCase.execute('1');

      const remaining = await repo.getAll();
      expect(remaining.every((t) => !t.completed)).toBe(true);
    });
  });

  describe('MarkOldTasksAsCompletedUseCase', () => {
    it('marks old tasks as completed', async () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 60);

      const repoWithOldTask = createMockRepository();
      const oldTask = await repoWithOldTask.create({
        title: 'Old Task',
        listId: '1',
      });
      await repoWithOldTask.update(oldTask.id, { createdAt: oldDate } as Record<string, unknown>);

      const useCase = new MarkOldTasksAsCompletedUseCase(repoWithOldTask);
      await useCase.execute('1');

      const tasks = await repoWithOldTask.getAll();
      const foundOldTask = tasks.find((t) => t.title === 'Old Task');
      expect(foundOldTask?.completed).toBe(true);
    });

    it('does not mark recent tasks as completed', async () => {
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 5);

      const repoWithRecentTask = createMockRepository();
      await repoWithRecentTask.create({
        title: 'Recent Task',
        listId: '1',
      });

      const useCase = new MarkOldTasksAsCompletedUseCase(repoWithRecentTask);
      await useCase.execute('1');

      const tasks = await repoWithRecentTask.getAll();
      const recentTask = tasks.find((t) => t.title === 'Recent Task');
      expect(recentTask?.completed).toBe(false);
    });
  });
});
