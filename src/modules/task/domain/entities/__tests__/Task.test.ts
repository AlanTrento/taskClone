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
    order: 0,
  };

  describe('createTask', () => {
    it('creates task with timestamps', () => {
      const task = createTask(baseTask);

      expect(task.id).toBe('1');
      expect(task.title).toBe('Test Task');
      expect(task.completed).toBe(false);
      expect(task.starred).toBe(false);
      expect(task.order).toBe(0);
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

    it('updates dueDate', () => {
      const task = createTask(baseTask);
      const date = new Date('2024-06-15');
      const updated = updateTask(task, { dueDate: date });

      expect(updated.dueDate).toEqual(date);
    });

    it('updates dueTime', () => {
      const task = createTask(baseTask);
      const updated = updateTask(task, { dueTime: '14:30' });

      expect(updated.dueTime).toBe('14:30');
    });

    it('updates order', () => {
      const task = createTask(baseTask);
      const updated = updateTask(task, { order: 5 });

      expect(updated.order).toBe(5);
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
