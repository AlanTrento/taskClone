import { describe, it, expect } from 'vitest';
import { toTaskDTO, toTask } from '../TaskMapper';
import { toTaskListDTO, toTaskList } from '../TaskListMapper';
import type { Task } from '../../../domain/entities/Task';
import type { TaskList } from '../../../domain/entities/TaskList';

describe('TaskMapper', () => {
  const task: Task = {
    id: '1',
    title: 'Test',
    description: 'Desc',
    completed: true,
    starred: false,
    listId: '1',
    createdAt: new Date('2024-01-15T00:00:00.000Z'),
    updatedAt: new Date('2024-01-16T00:00:00.000Z'),
  };

  it('toTaskDTO converts dates to strings', () => {
    const dto = toTaskDTO(task);

    expect(dto.id).toBe('1');
    expect(dto.title).toBe('Test');
    expect(dto.description).toBe('Desc');
    expect(dto.completed).toBe(true);
    expect(dto.listId).toBe('1');
    expect(typeof dto.createdAt).toBe('string');
    expect(typeof dto.updatedAt).toBe('string');
  });

  it('toTask converts strings to dates', () => {
    const dto = toTaskDTO(task);
    const result = toTask(dto);

    expect(result.id).toBe(task.id);
    expect(result.title).toBe(task.title);
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
    expect(result.createdAt.getTime()).toBe(task.createdAt.getTime());
  });

  it('roundtrip preserves data', () => {
    const dto = toTaskDTO(task);
    const result = toTask(dto);

    expect(result).toEqual(task);
  });
});

describe('TaskListMapper', () => {
  const list: TaskList = {
    id: '1',
    name: 'My List',
    color: '#8ab4f8',
    order: 2,
  };

  it('toTaskListDTO maps correctly', () => {
    const dto = toTaskListDTO(list);

    expect(dto).toEqual({ id: '1', name: 'My List', color: '#8ab4f8', order: 2 });
  });

  it('toTaskList maps correctly', () => {
    const dto = toTaskListDTO(list);
    const result = toTaskList(dto);

    expect(result).toEqual(list);
  });

  it('roundtrip preserves data', () => {
    const dto = toTaskListDTO(list);
    const result = toTaskList(dto);

    expect(result).toEqual(list);
  });
});
