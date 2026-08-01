import { memo, useState, useCallback } from 'react';
import { TaskItem } from '../TaskItem';
import { styles } from './TaskList.styles';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  starred?: boolean;
  dueDate?: Date;
  dueTime?: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggleCompleted?: (id: string) => void;
  onToggleStarred?: (id: string) => void;
  onUpdate?: (id: string, title: string) => void;
  onUpdateDetails?: (id: string, details: string) => void;
  onSetDateTime?: (id: string, dueDate: Date, dueTime: string) => void;
  onDelete?: (id: string) => void;
  onReorder?: (taskId: string, targetIndex: number) => void;
}

export const TaskList = memo(function TaskList({
  tasks,
  onToggleCompleted,
  onToggleStarred,
  onUpdate,
  onUpdateDetails,
  onSetDateTime,
  onDelete,
  onReorder,
}: TaskListProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    
    if (taskId && draggedId) {
      onReorder?.(taskId, targetIndex);
    }
    
    setDraggedId(null);
    setDragOverIndex(null);
  }, [draggedId, onReorder]);

  return (
    <div style={styles.container}>
      {tasks.map((task, index) => (
        <div
          key={task.id}
          draggable={false}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          style={draggedId === task.id ? styles.taskItemWrapperDragging : styles.taskItemWrapper}
        >
          <TaskItem
            id={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
            starred={task.starred}
            dueDate={task.dueDate}
            dueTime={task.dueTime}
            onToggleCompleted={onToggleCompleted}
            onToggleStarred={onToggleStarred}
            onUpdate={onUpdate}
            onUpdateDetails={onUpdateDetails}
            onSetDateTime={onSetDateTime}
            onDelete={onDelete}
            onDragStart={handleDragStart}
          />
        </div>
      ))}
    </div>
  );
});
