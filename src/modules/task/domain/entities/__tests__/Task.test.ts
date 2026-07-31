import { describe, it, expect } from 'vitest';
import { createTask, updateTask } from '../Task';
import type { Task } from '../Task';

describe('Task Entity', () => {
  const baseTask: Omit<Task, 'createdAt' | 'updatedAt'> = {
    id: '1',
    title: 'Test Task',
    description: 'Description',
    completed: false,
    starred: false,
    listId: '1',
  };

  describe('createTask', () => {
    it('creates task with timestamps', () => {
      const task = createTask(baseTask);

      expect(task.id).toBe('1');
      expect(task.title).toBe('Test Task');
      expect(task.completed).toBe(false);
      expect(task.starred).toBe(false);
      expect(task.createdAt).toBeInstanceOf(Date);
      expect(task.updatedAt).toBeInstanceOf(Date);
    });

    it('sets createdAt equal to updatedAt', () => {
      const task = createTask(baseTask);
      expect(task.createdAt.getTime()).toBe(task.updatedAt.getTime());
    });
  });

  describe('updateTask', () => {
    it('updates title', () => {
      const task = createTask(baseTask);
      const updated = updateTask(task, { title: 'Updated' });

      expect(updated.title).toBe('Updated');
      expect(updated.id).toBe(task.id);
    });

    it('updates completed', () => {
      const task = createTask(baseTask);
      const updated = updateTask(task, { completed: true });

      expect(updated.completed).toBe(true);
    });

    it('updates starred', () => {
      const task = createTask(baseTask);
      const updated = updateTask(task, { starred: true });

      expect(updated.starred).toBe(true);
    });

    it('bumps updatedAt', () => {
      const task = createTask(baseTask);
      const updated = updateTask(task, { title: 'New' });

      expect(updated.updatedAt.getTime()).toBeGreaterThanOrEqual(task.updatedAt.getTime());
    });

    it('preserves id', () => {
      const task = createTask(baseTask);
      const updated = updateTask(task, { title: 'X' });

      expect(updated.id).toBe(task.id);
    });
  });
});
