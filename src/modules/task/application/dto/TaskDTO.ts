export interface TaskDTO {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  starred: boolean;
  listId: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  dueTime?: string;
  starredAt?: string;
  order: number;
}

export interface TaskListDTO {
  id: string;
  name: string;
  color: string;
  order: number;
}
