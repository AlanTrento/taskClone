export interface TaskList {
  id: string;
  name: string;
  color: string;
  order: number;
}

export function createTaskList(data: Omit<TaskList, 'order'>): TaskList {
  return {
    ...data,
    order: 0,
  };
}

export function updateTaskList(taskList: TaskList, updates: Partial<Omit<TaskList, 'id'>>): TaskList {
  return {
    ...taskList,
    ...updates,
  };
}
