import type { Task } from '../../domain/entities/Task';
import type { TaskDTO } from '../dto/TaskDTO';

export function toTaskDTO(task: Task): TaskDTO {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    completed: task.completed,
    starred: task.starred,
    listId: task.listId,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
    dueDate: task.dueDate?.toISOString(),
    dueTime: task.dueTime,
    starredAt: task.starredAt?.toISOString(),
    order: task.order,
  };
}

export function toTask(dto: TaskDTO): Task {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    completed: dto.completed,
    starred: dto.starred,
    listId: dto.listId,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
    dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
    dueTime: dto.dueTime,
    starredAt: dto.starredAt ? new Date(dto.starredAt) : undefined,
    order: dto.order,
  };
}
