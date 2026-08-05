import { useState } from 'react';
import {
  PlusOutlined,
  CheckSquareOutlined,
  StarOutlined,
  FolderOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Input, Modal, Typography } from 'antd';
import type { TaskList } from '../../modules/task/domain/entities/TaskList';
import { styles, getMenuItemStyle } from './Sidebar.styles';

const { Text } = Typography;

interface SidebarProps {
  activeListId: string | null;
  starredCount: number;
  taskLists?: TaskList[];
  onSelectList: (listId: string | null) => void;
  onCreateList?: (name: string, color: string) => void;
  onConfirmDelete?: (listId: string) => void;
}

export function Sidebar({ activeListId, starredCount, taskLists = [], onSelectList, onCreateList, onConfirmDelete }: SidebarProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [listToDelete, setListToDelete] = useState<{ id: string; name: string } | null>(null);

  const handleCreateList = () => {
    if (newListName.trim()) {
      onCreateList?.(newListName.trim(), '#8ab4f8');
      setNewListName('');
    }
    setIsCreating(false);
  };

  const handleCreateBlur = () => {
    if (newListName.trim()) {
      onCreateList?.(newListName.trim(), '#8ab4f8');
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
            onDelete={() => setListToDelete({ id: list.id, name: list.name })}
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

      <Modal
        title="Excluir lista"
        open={!!listToDelete}
        onOk={() => {
          if (listToDelete) {
            onConfirmDelete?.(listToDelete.id);
            setListToDelete(null);
          }
        }}
        onCancel={() => setListToDelete(null)}
        okText="Excluir"
        cancelText="Cancelar"
        okButtonProps={{ danger: true }}
      >
        <p>
          Deseja excluir a lista <strong>{listToDelete?.name}</strong> e todas as suas tarefas?
        </p>
      </Modal>
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
