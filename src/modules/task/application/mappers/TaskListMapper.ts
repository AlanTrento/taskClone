import type { TaskList } from '../../domain/entities/TaskList';
import type { TaskListDTO } from '../dto/TaskDTO';

export function toTaskListDTO(taskList: TaskList): TaskListDTO {
  return {
    id: taskList.id,
    name: taskList.name,
    color: taskList.color,
    order: taskList.order,
  };
}

export function toTaskList(dto: TaskListDTO): TaskList {
  return {
    id: dto.id,
    name: dto.name,
    color: dto.color,
    order: dto.order,
  };
}
