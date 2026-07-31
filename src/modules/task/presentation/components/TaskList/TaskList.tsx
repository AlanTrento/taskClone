import { memo } from 'react';
import { TaskItem } from '../TaskItem';
import { styles } from './TaskList.styles';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  starred?: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleCompleted?: (id: string) => void;
  onToggleStarred?: (id: string) => void;
  onUpdate?: (id: string, title: string) => void;
  onDelete?: (id: string) => void;
}

export const TaskList = memo(function TaskList({ tasks, onToggleCompleted, onToggleStarred, onUpdate, onDelete }: TaskListProps) {
  return (
    <div style={styles.container}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          completed={task.completed}
          starred={task.starred}
          onToggleCompleted={onToggleCompleted}
          onToggleStarred={onToggleStarred}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
});
