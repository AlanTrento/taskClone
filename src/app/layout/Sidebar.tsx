import { useState } from 'react';
import { PlusOutlined, UnorderedListOutlined, StarOutlined, FolderOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Typography } from 'antd';
import { spacing, borderRadius } from '../../shared/styles/spacing';
import { useTaskLists } from '../../modules/task/presentation/hooks/useTaskLists';

const { Text } = Typography;

interface SidebarProps {
  activeListId: string | null;
  onSelectList: (listId: string | null) => void;
}

export function Sidebar({ activeListId, onSelectList }: SidebarProps) {
  const { taskLists, createTaskList, deleteTaskList } = useTaskLists();
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleCreateList = () => {
    if (newListName.trim()) {
      createTaskList(newListName.trim(), '#8ab4f8');
      setNewListName('');
      setIsCreating(false);
    }
  };

  return (
    <aside style={{
      width: 280,
      height: 'calc(100vh - 64px)',
      backgroundColor: '#202124',
      display: 'flex',
      flexDirection: 'column',
      padding: `${spacing.lg}px ${spacing.sm}px ${spacing.lg}px ${spacing.sm}px`,
      gap: spacing.xxl,
      overflowY: 'auto',
    }}>
      {/* Botão Criar */}
      <Button
        icon={<PlusOutlined />}
        style={{
          width: 104,
          height: 54,
          borderRadius: borderRadius.lg,
          backgroundColor: '#303134',
          borderColor: 'transparent',
          color: '#e8eaed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing.md,
        }}
      >
        Criar
      </Button>

      {/* Menu Principal */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
        <MenuItem
          icon={<UnorderedListOutlined />}
          label="Todas as tarefas"
          active={activeListId === null}
          onClick={() => onSelectList(null)}
        />
        <MenuItem icon={<StarOutlined />} label="Com estrela" />
      </nav>

      {/* Seção Listas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
        <Text style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#bdc1c6',
          padding: `0 ${spacing.lg}px`,
        }}>
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
          <div style={{ display: 'flex', gap: 4, padding: `0 ${spacing.lg}px` }}>
            <Input
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onPressEnter={handleCreateList}
              onBlur={() => { if (!newListName.trim()) setIsCreating(false); }}
              placeholder="Nome da lista"
              autoFocus
              size="small"
              style={{
                backgroundColor: '#232425',
                borderColor: '#8ab4f8',
                color: '#e8eaed',
              }}
            />
            <Button size="small" type="primary" onClick={handleCreateList}>
              OK
            </Button>
          </div>
        ) : (
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={() => setIsCreating(true)}
            style={{
              justifyContent: 'flex-start',
              color: '#8ab4f8',
              height: 40,
              padding: `0 ${spacing.lg}px`,
            }}
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
  return (
    <Button
      type="text"
      icon={icon}
      onClick={onClick}
      style={{
        justifyContent: 'flex-start',
        backgroundColor: active ? '#0b57d0' : 'transparent',
        color: active ? '#ffffff' : '#e8eaed',
        height: 40,
        borderRadius: borderRadius.xl,
        padding: `0 ${spacing.lg}px`,
        gap: spacing.md,
        width: '100%',
      }}
    >
      <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
      {count !== undefined && (
        <Text style={{ color: '#9aa0a6', fontSize: 12 }}>{count}</Text>
      )}
      {onDelete && (
        <DeleteOutlined
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          style={{ color: '#9aa0a6', fontSize: 12 }}
        />
      )}
    </Button>
  );
}
