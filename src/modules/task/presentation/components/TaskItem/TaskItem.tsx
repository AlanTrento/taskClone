import { memo, useState } from 'react';
import { Checkbox } from '../Checkbox';
import { DeleteOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { styles, getDisplayContainer, getTitleStyle } from './TaskItem.styles';

interface TaskItemProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  starred?: boolean;
  onToggleCompleted?: (id: string) => void;
  onToggleStarred?: (id: string) => void;
  onUpdate?: (id: string, title: string) => void;
  onDelete?: (id: string) => void;
}

export const TaskItem = memo(function TaskItem({
  id,
  title,
  description,
  completed,
  starred = false,
  onToggleCompleted,
  onToggleStarred,
  onUpdate,
  onDelete,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [isHovered, setIsHovered] = useState(false);

  const handleSave = () => {
    if (editTitle.trim() && editTitle.trim() !== title) {
      onUpdate?.(id, editTitle.trim());
    } else {
      setEditTitle(title);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div
        className="task-item"
        style={styles.editingContainer}
        role="listitem"
      >
        <div style={styles.checkboxWrapper}>
          <Checkbox checked={completed} onChange={() => {}} />
        </div>
        <Input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onPressEnter={handleSave}
          onBlur={handleSave}
          autoFocus
          aria-label={`Editar tarefa: ${title}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`task-item${completed ? ' completed-task' : ''}`}
      style={getDisplayContainer(isHovered)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={() => setIsEditing(true)}
      role="listitem"
      aria-label={`Tarefa: ${title}${completed ? ' (concluída)' : ''}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsEditing(true);
        }
      }}
    >
      <div style={styles.checkboxWrapper}>
        <Checkbox
          checked={completed}
          onChange={() => onToggleCompleted?.(id)}
        />
      </div>
      <div style={styles.contentWrapper}>
        <div className="task-item-title" style={getTitleStyle(completed)}>
          {title}
        </div>
        {description && (
          <div className="task-item-description" style={styles.description}>
            {description}
          </div>
        )}
      </div>
      {isHovered && (
        <div className="no-print" style={styles.actionsContainer}>
          <Button
            type="text"
            size="small"
            icon={starred ? <StarFilled style={styles.starIcon} /> : <StarOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onToggleStarred?.(id);
            }}
            aria-label={starred ? 'Remover estrela' : 'Adicionar estrela'}
            style={styles.actionButton}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(id);
            }}
            aria-label={`Excluir tarefa: ${title}`}
            style={styles.actionButton}
          />
        </div>
      )}
    </div>
  );
});
