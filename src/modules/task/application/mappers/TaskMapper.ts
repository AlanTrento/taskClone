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
  };
}
