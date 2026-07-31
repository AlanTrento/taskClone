import { memo, useState } from 'react';
import { Dropdown, Menu, Input, Modal } from 'antd';
import { MoreOutlined, CheckOutlined, DeleteOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons';
import type { SortOption } from '../../viewmodels/TasksViewModel';
import { styles } from './ListMenu.styles';

interface ListMenuProps {
  sortOption: SortOption;
  isDefaultList: boolean;
  onSort: (by: SortOption) => void;
  onRename: (name: string) => void;
  onDelete: () => void;
  onDeleteCompleted: () => void;
  onMarkOldAsCompleted: () => void;
  onPrint: () => void;
}

export const ListMenu = memo(function ListMenu({
  sortOption,
  isDefaultList,
  onSort,
  onRename,
  onDelete,
  onDeleteCompleted,
  onMarkOldAsCompleted,
  onPrint,
}: ListMenuProps) {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [renameValue, setRenameValue] = useState('');

  const handleRename = () => {
    if (renameValue.trim()) {
      onRename(renameValue.trim());
      setIsRenameModalOpen(false);
      setRenameValue('');
    }
  };

  const handleDelete = () => {
    onDelete();
    setIsDeleteModalOpen(false);
  };

  const sortOptions: { key: SortOption; label: string }[] = [
    { key: 'order', label: 'Minha ordem' },
    { key: 'date', label: 'Data' },
    { key: 'dueDate', label: 'Prazo' },
    { key: 'starred', label: 'Marcadas com estrela recentemente' },
    { key: 'title', label: 'Título' },
  ];

  const menu = (
    <Menu
      theme="dark"
      style={styles.menu}
    >
      {/* Ordenar por */}
      <Menu.SubMenu
        key="sort"
        title="Ordenar por"
      >
        {sortOptions.map((option) => (
          <Menu.Item
            key={option.key}
            onClick={() => onSort(option.key)}
            icon={sortOption === option.key ? <CheckOutlined style={styles.checkIcon} /> : undefined}
          >
            {option.label}
          </Menu.Item>
        ))}
      </Menu.SubMenu>

      <Menu.Divider />

      {/* Renomear lista */}
      <Menu.Item
        key="rename"
        icon={<EditOutlined />}
        onClick={() => {
          setIsRenameModalOpen(true);
        }}
      >
        Renomear lista
      </Menu.Item>

      {/* Excluir lista */}
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        disabled={isDefaultList}
        onClick={() => {
          if (!isDefaultList) {
            setIsDeleteModalOpen(true);
          }
        }}
      >
        Excluir lista
      </Menu.Item>

      <Menu.Divider />

      {/* Imprimir lista */}
      <Menu.Item
        key="print"
        icon={<PrinterOutlined />}
        onClick={onPrint}
      >
        Imprimir lista
      </Menu.Item>

      <Menu.Divider />

      {/* Excluir todas as tarefas concluídas */}
      <Menu.Item
        key="delete-completed"
        onClick={onDeleteCompleted}
      >
        Excluir todas as tarefas concluídas
      </Menu.Item>

      <Menu.Divider />

      {/* Marcar as tarefas antigas como concluídas */}
      <Menu.Item
        key="mark-old"
        onClick={onMarkOldAsCompleted}
      >
        Marcar as tarefas antigas como concluídas
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        placement="bottomRight"
        dropdownRender={(originNode) => (
          <div style={styles.dropdownWrapper}>
            {originNode}
          </div>
        )}
      >
        <button
          type="button"
          className="no-print"
          style={styles.trigger}
        >
          <MoreOutlined />
        </button>
      </Dropdown>

      {/* Rename Modal */}
      <Modal
        title="Renomear lista"
        open={isRenameModalOpen}
        onOk={handleRename}
        onCancel={() => {
          setIsRenameModalOpen(false);
          setRenameValue('');
        }}
        okText="Salvar"
        cancelText="Cancelar"
        okButtonProps={{ style: styles.okButton }}
        cancelButtonProps={{ style: styles.cancelButton }}
        styles={{
          header: styles.modalHeader,
          content: styles.modalContent,
          body: styles.modalBody,
        }}
      >
        <Input
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onPressEnter={handleRename}
          placeholder="Nome da lista"
          autoFocus
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Excluir lista"
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Excluir"
        cancelText="Cancelar"
        okButtonProps={{ style: styles.deleteOkButton }}
        cancelButtonProps={{ style: styles.cancelButton }}
        styles={{
          header: styles.modalHeader,
          content: styles.modalContent,
          body: styles.modalBody,
        }}
      >
        <p>
          Tem certeza que deseja excluir esta lista? Esta ação não pode ser desfeita.
        </p>
      </Modal>
    </>
  );
});
