export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  starred: boolean;
  listId: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  starredAt?: Date;
}

export function createTask(data: Omit<Task, 'createdAt' | 'updatedAt'>): Task {
  const now = new Date();
  return {
    ...data,
    createdAt: now,
    updatedAt: now,
  };
}

export function updateTask(task: Task, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task {
  return {
    ...task,
    ...updates,
    updatedAt: new Date(),
  };
}
