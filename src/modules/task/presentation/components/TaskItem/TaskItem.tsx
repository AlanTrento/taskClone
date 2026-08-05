import { memo, useState, useRef, useEffect, useCallback } from 'react';
import { Checkbox } from '../Checkbox';
import { DeleteOutlined, StarOutlined, StarFilled, HolderOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { ScheduleRow } from './ScheduleRow';
import { styles, getDisplayContainer, getTitleStyle } from './TaskItem.styles';
import { colors } from '../../../../../shared/styles/colors';

interface TaskItemProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  starred?: boolean;
  dueDate?: Date;
  dueTime?: string;
  onToggleCompleted?: (id: string) => void;
  onToggleStarred?: (id: string) => void;
  onUpdate?: (id: string, title: string) => void;
  onUpdateDetails?: (id: string, details: string) => void;
  onSetDateTime?: (id: string, dueDate: Date, dueTime: string) => void;
  onDelete?: (id: string) => void;
  onDragStart?: (e: React.DragEvent, id: string) => void;
}

export const TaskItem = memo(function TaskItem({
  id,
  title,
  description,
  completed,
  starred = false,
  dueDate,
  dueTime,
  onToggleCompleted,
  onToggleStarred,
  onUpdate,
  onUpdateDetails,
  onSetDateTime,
  onDelete,
  onDragStart,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailsValue, setDetailsValue] = useState(description || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailsValueRef = useRef(detailsValue);
  detailsValueRef.current = detailsValue;

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      if (isModalOpen) return;
      if (isEditingDetails) {
        onUpdateDetails?.(id, detailsValueRef.current);
      }
      setIsExpanded(false);
      setIsEditingDetails(false);
    }
  }, [isModalOpen, isEditingDetails, id, onUpdateDetails]);

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isExpanded, handleClickOutside, isModalOpen]);

  useEffect(() => {
    if (isEditingDetails && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditingDetails]);

  const handleSaveTitle = () => {
    if (editTitle.trim() && editTitle.trim() !== title) {
      onUpdate?.(id, editTitle.trim());
    } else {
      setEditTitle(title);
    }
    setIsEditing(false);
  };

  const handleSaveDetails = () => {
    onUpdateDetails?.(id, detailsValue);
    setIsEditingDetails(false);
  };

  const handleTitleClick = () => {
    if (!completed) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleSetToday = () => {
    const today = new Date();
    today.setHours(9, 0, 0, 0);
    onSetDateTime?.(id, today, '09:00');
  };

  const handleSetTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    onSetDateTime?.(id, tomorrow, '09:00');
  };

  const handleSetDateTimeLocal = (date: Date, time: string) => {
    onSetDateTime?.(id, date, time);
  };

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart?.(e, id);
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
          onPressEnter={handleSaveTitle}
          onBlur={handleSaveTitle}
          autoFocus
          aria-label={`Editar tarefa: ${title}`}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`task-item${completed ? ' completed-task' : ''}`}
      style={getDisplayContainer(isHovered, isExpanded)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="listitem"
      aria-label={`Tarefa: ${title}${completed ? ' (concluída)' : ''}`}
      tabIndex={0}
      onKeyDown={(e) => {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === 'TEXTAREA' || tag === 'INPUT') return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }}
    >
      <div style={styles.headerRow}>
        <div
          style={{
            ...styles.dragHandle,
            ...(isHovered ? styles.dragHandleVisible : {}),
          }}
          draggable
          onDragStart={handleDragStart}
          aria-label={`Arrastar tarefa: ${title}`}
        >
          <HolderOutlined />
        </div>

        <div style={styles.checkboxWrapper}>
          <Checkbox
            checked={completed}
            onChange={() => onToggleCompleted?.(id)}
          />
        </div>

        <div style={styles.contentWrapper}>
          <div
            className="task-item-title"
            style={getTitleStyle(completed)}
            onClick={handleTitleClick}
            onDoubleClick={(e) => {
              e.stopPropagation();
              if (!completed) {
                setIsEditing(true);
              }
            }}
          >
            {title}
          </div>
        </div>

        {isHovered && (
          <div className="no-print" style={styles.actionsContainer}>
            <Button
              type="text"
              size="small"
              icon={starred ? <StarFilled style={styles.starIconFilled} /> : <StarOutlined style={styles.starIcon} />}
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

      {isExpanded && !completed && (
        <div style={styles.expandedPanel}>
          <div
            style={styles.detailsField}
            onClick={(e) => {
              e.stopPropagation();
              setIsEditingDetails(true);
            }}
          >
            {isEditingDetails ? (
              <textarea
                ref={textareaRef}
                className="input-task"
                style={styles.detailsTextarea}
                value={detailsValue}
                onChange={(e) => setDetailsValue(e.target.value)}
                onBlur={handleSaveDetails}
                onClick={(e) => e.stopPropagation()}
                placeholder="Adicionar detalhes..."
              />
            ) : (
              <span style={detailsValue ? { color: colors.textPrimary } : styles.detailsLabel}>
                {detailsValue || 'Detalhes'}
              </span>
            )}
          </div>

          <ScheduleRow
            dueDate={dueDate}
            dueTime={dueTime}
            onSetToday={handleSetToday}
            onSetTomorrow={handleSetTomorrow}
            onSetDateTime={handleSetDateTimeLocal}
            onModalChange={setIsModalOpen}
          />
        </div>
      )}
    </div>
  );
});
