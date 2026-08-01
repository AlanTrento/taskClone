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
    getAll: async () => [...tasks],
    getById: async (id: string) => tasks.find((t) => t.id === id) || null,
    create: async (task: Task) => { tasks.push(task); return task; },
    update: async (task: Task) => {
      const idx = tasks.findIndex((t) => t.id === task.id);
      if (idx !== -1) tasks[idx] = task;
      return task;
    },
    delete: async (id: string) => {
      const idx = tasks.findIndex((t) => t.id === id);
      if (idx !== -1) tasks.splice(idx, 1);
    },
    deleteByFilter: async (predicate: (task: Task) => boolean) => {
      const indices: number[] = [];
      tasks.forEach((task, idx) => {
        if (predicate(task)) indices.push(idx);
      });
      indices.reverse().forEach((idx) => tasks.splice(idx, 1));
    },
    updateByFilter: async (predicate: (task: Task) => boolean, updates: Partial<Task>) => {
      tasks.forEach((task, idx) => {
        if (predicate(task)) {
          tasks[idx] = { ...task, ...updates, updatedAt: new Date() };
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
      expect(result.order).toBe(0);
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
      const result = await useCase.execute({ id: '1', title: 'Updated' });

      expect(result.title).toBe('Updated');
      expect(result.id).toBe('1');
    });

    it('updates dueDate', async () => {
      const useCase = new UpdateTaskUseCase(repo);
      const date = new Date('2024-06-15');
      const result = await useCase.execute({ id: '1', dueDate: date });

      expect(result.dueDate).toEqual(date);
    });

    it('updates dueTime', async () => {
      const useCase = new UpdateTaskUseCase(repo);
      const result = await useCase.execute({ id: '1', dueTime: '14:30' });

      expect(result.dueTime).toBe('14:30');
    });

    it('updates order', async () => {
      const useCase = new UpdateTaskUseCase(repo);
      const result = await useCase.execute({ id: '1', order: 3 });

      expect(result.order).toBe(3);
    });

    it('throws for non-existent task', async () => {
      const useCase = new UpdateTaskUseCase(repo);

      await expect(useCase.execute({ id: '999', title: 'X' }))
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
      await repoWithOldTask.create(createMockTask({
        id: '3',
        title: 'Old Task',
        completed: false,
        createdAt: oldDate,
      }));

      const useCase = new MarkOldTasksAsCompletedUseCase(repoWithOldTask);
      await useCase.execute('1');

      const tasks = await repoWithOldTask.getAll();
      const oldTask = tasks.find((t) => t.id === '3');
      expect(oldTask?.completed).toBe(true);
    });

    it('does not mark recent tasks as completed', async () => {
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 5);

      const repoWithRecentTask = createMockRepository();
      await repoWithRecentTask.create(createMockTask({
        id: '3',
        title: 'Recent Task',
        completed: false,
        createdAt: recentDate,
      }));

      const useCase = new MarkOldTasksAsCompletedUseCase(repoWithRecentTask);
      await useCase.execute('1');

      const tasks = await repoWithRecentTask.getAll();
      const recentTask = tasks.find((t) => t.id === '3');
      expect(recentTask?.completed).toBe(false);
    });
  });
});
