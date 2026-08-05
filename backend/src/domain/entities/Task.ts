export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  starred: boolean;
  listId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  dueTime?: string;
  starredAt?: Date;
  order: number;
}

export function createTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Task {
  const now = new Date();
  return {
    id: data.id || '',
    ...data,
    createdAt: now,
    updatedAt: now,
  };
}
