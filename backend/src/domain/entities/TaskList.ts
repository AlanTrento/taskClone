export interface TaskList {
  id: string;
  name: string;
  color: string;
  order: number;
  userId: string;
}

export function createTaskList(data: Omit<TaskList, 'id' | 'order'> & { id?: string; order?: number }): TaskList {
  return {
    id: data.id || '',
    order: data.order ?? 0,
    ...data,
  };
}
