import { memo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { styles } from './AddTaskRow.styles';

interface AddTaskRowProps {
  onAddTask?: (title: string) => void;
}

export const AddTaskRow = memo(function AddTaskRow({ onAddTask }: AddTaskRowProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAddTask?.(title.trim());
      setTitle('');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setIsAdding(false);
  };

  const handleBlur = () => {
    if (title.trim()) {
      handleSubmit();
    } else {
      handleCancel();
    }
  };

  return (
    <>
      <Button
        type="text"
        icon={<PlusOutlined style={styles.icon} />}
        onClick={() => setIsAdding(true)}
        style={styles.addButton}
      >
        Adicionar uma tarefa
      </Button>
      {isAdding && (
        <div style={styles.inputRow}>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onPressEnter={handleSubmit}
            onBlur={handleBlur}
            placeholder="Nome da tarefa"
            autoFocus
          />
        </div>
      )}
    </>
  );
});
