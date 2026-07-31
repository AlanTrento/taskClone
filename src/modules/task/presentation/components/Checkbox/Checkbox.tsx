import { memo } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { styles } from './Checkbox.styles';

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = memo(function Checkbox({ checked = false, disabled = false, onChange }: CheckboxProps) {
  const getButtonStyle = () => {
    if (disabled && checked) return styles.buttonCheckedDisabled;
    if (disabled) return styles.buttonDisabled;
    if (checked) return styles.buttonChecked;
    return styles.button;
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      aria-checked={checked}
      aria-label={checked ? 'Desmarcar tarefa' : 'Marcar tarefa como concluída'}
      role="checkbox"
      style={getButtonStyle()}
    >
      {checked && (
        <CheckOutlined style={styles.checkIcon} />
      )}
    </button>
  );
});
