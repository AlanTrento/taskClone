import { useState } from 'react';
import {
  PlusOutlined,
  CheckSquareOutlined,
  StarOutlined,
  FolderOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Input, Typography } from 'antd';
import { useTaskLists } from '../../modules/task/presentation/hooks/useTaskLists';
import { styles, getMenuItemStyle } from './Sidebar.styles';

const { Text } = Typography;

interface SidebarProps {
  activeListId: string | null;
  starredCount: number;
  onSelectList: (listId: string | null) => void;
}

export function Sidebar({ activeListId, starredCount, onSelectList }: SidebarProps) {
  const { taskLists, createTaskList, deleteTaskList } = useTaskLists();
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleCreateList = () => {
    if (newListName.trim()) {
      createTaskList(newListName.trim(), '#8ab4f8');
      setNewListName('');
    }
    setIsCreating(false);
  };

  const handleCreateBlur = () => {
    if (newListName.trim()) {
      createTaskList(newListName.trim(), '#8ab4f8');
      setNewListName('');
    }
    setIsCreating(false);
  };

  return (
    <aside style={styles.container}>
      {/* Menu Principal */}
      <nav style={styles.nav}>
        <MenuItem
          icon={<CheckSquareOutlined />}
          label="Todas as tarefas"
          active={activeListId === null}
          onClick={() => onSelectList(null)}
        />
        <MenuItem
          icon={<StarOutlined />}
          label="Com estrela"
          active={activeListId === 'starred'}
          count={starredCount}
          onClick={() => onSelectList('starred')}
        />
      </nav>

      {/* Seção Listas */}
      <div style={styles.listSection}>
        <Text style={styles.listLabel}>
          Listas
        </Text>

        {taskLists.map((list) => (
          <MenuItem
            key={list.id}
            icon={<FolderOutlined style={{ color: list.color }} />}
            label={list.name}
            active={activeListId === list.id}
            onClick={() => onSelectList(list.id)}
            onDelete={() => deleteTaskList(list.id)}
          />
        ))}

        {isCreating ? (
          <div style={styles.newListNode}>
            <Input
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onPressEnter={handleCreateList}
              onBlur={handleCreateBlur}
              placeholder="Nome da lista"
              autoFocus
              size="small"
              className="input-task"
              style={styles.newListItemInput}
            />
          </div>
        ) : (
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={() => setIsCreating(true)}
            style={styles.createListButton}
          >
            Criar nova lista
          </Button>
        )}
      </div>
    </aside>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number;
  onClick?: () => void;
  onDelete?: () => void;
}

function MenuItem({ icon, label, active = false, count, onClick, onDelete }: MenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      type="text"
      icon={icon}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={getMenuItemStyle(active)}
    >
      <span style={styles.menuItemLabel}>{label}</span>
      {count !== undefined && (
        <Text style={styles.menuItemCount}>{count}</Text>
      )}
      {onDelete && (isHovered || active) && (
        <DeleteOutlined
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          style={styles.deleteIcon}
        />
      )}
    </Button>
  );
}
