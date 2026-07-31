import { describe, it, expect } from 'vitest';
import { createTaskList, updateTaskList } from '../TaskList';
import type { TaskList } from '../TaskList';

describe('TaskList Entity', () => {
  const baseList: Omit<TaskList, 'order'> = {
    id: '1',
    name: 'My List',
    color: '#8ab4f8',
  };

  describe('createTaskList', () => {
    it('creates list with default order 0', () => {
      const list = createTaskList(baseList);

      expect(list.id).toBe('1');
      expect(list.name).toBe('My List');
      expect(list.color).toBe('#8ab4f8');
      expect(list.order).toBe(0);
    });
  });

  describe('updateTaskList', () => {
    it('updates name', () => {
      const list = createTaskList(baseList);
      const updated = updateTaskList(list, { name: 'New Name' });

      expect(updated.name).toBe('New Name');
      expect(updated.id).toBe(list.id);
    });

    it('updates color', () => {
      const list = createTaskList(baseList);
      const updated = updateTaskList(list, { color: '#ff0000' });

      expect(updated.color).toBe('#ff0000');
    });

    it('updates order', () => {
      const list = createTaskList(baseList);
      const updated = updateTaskList(list, { order: 5 });

      expect(updated.order).toBe(5);
    });

    it('preserves untouched fields', () => {
      const list = createTaskList(baseList);
      const updated = updateTaskList(list, { name: 'X' });

      expect(updated.color).toBe(list.color);
      expect(updated.order).toBe(list.order);
    });
  });
});
