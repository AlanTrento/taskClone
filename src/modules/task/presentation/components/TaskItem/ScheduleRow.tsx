import { memo, useState, useMemo, useEffect } from 'react';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Modal, DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { styles } from './ScheduleRow.styles';
import { colors } from '../../../../../shared/styles/colors';

dayjs.locale('pt-br');

interface ScheduleRowProps {
  dueDate?: Date;
  dueTime?: string;
  onSetToday: () => void;
  onSetTomorrow: () => void;
  onSetDateTime: (date: Date, time: string) => void;
  onModalChange?: (open: boolean) => void;
}

function formatDisplayDate(date: Date, time?: string): string {
  const d = dayjs(date);
  const today = dayjs().startOf('day');
  const tomorrow = today.add(1, 'day');

  if (d.isSame(today, 'day')) {
    return time ? `Hoje às ${time}` : 'Hoje';
  }
  if (d.isSame(tomorrow, 'day')) {
    return time ? `Amanhã às ${time}` : 'Amanhã';
  }

  const weekday = d.format('ddd');
  const dayNum = d.format('D');
  const month = d.format('MMM');
  const display = `${weekday}., ${dayNum} de ${month}`;
  return time ? `${display} às ${time}` : display;
}

/* ── ScheduleRow principal ──────────────────────────────────── */

export const ScheduleRow = memo(function ScheduleRow({
  dueDate,
  dueTime,
  onSetToday,
  onSetTomorrow,
  onSetDateTime,
  onModalChange,
}: ScheduleRowProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [tempValue, setTempValue] = useState<Dayjs | null>(dueDate ? dayjs(dueDate) : dayjs());

  const hasDate = !!dueDate;

  const isToday = useMemo(() => {
    if (!dueDate) return false;
    return dayjs(dueDate).isSame(dayjs().startOf('day'), 'day');
  }, [dueDate]);

  const isTomorrow = useMemo(() => {
    if (!dueDate) return false;
    return dayjs(dueDate).isSame(dayjs().startOf('day').add(1, 'day'), 'day');
  }, [dueDate]);

  useEffect(() => {
    onModalChange?.(modalOpen);
  }, [modalOpen, onModalChange]);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTempValue(dueDate ? dayjs(dueDate) : dayjs());
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleConfirm = (value?: Dayjs) => {
    const val = value || tempValue;
    if (val) {
      const dateOnly = val.toDate();
      const time = val.format('HH:mm');
      onSetDateTime(dateOnly, time);
    }
    setModalOpen(false);
  };

  const handleQuickSetToday = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSetToday();
  };

  const handleQuickSetTomorrow = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSetTomorrow();
  };

  const modalContent = (
    <div style={styles.modalContent}>
      <DatePicker
        className="schedule-datepicker"
        showTime
        format="DD/MM/YYYY HH:mm"
        value={tempValue}
        onChange={(val) => setTempValue(val as Dayjs | null)}
        open
        onOk={(value) => handleConfirm(value as Dayjs)}
        getPopupContainer={(trigger) => trigger.parentElement || document.body}
        panelRender={(panel) => <div className="schedule-datepicker-panel">{panel}</div>}
      />

      <div style={styles.modalFooter}>
        <button type="button" style={styles.cancelButton} onClick={handleCancel}>
          Cancelar
        </button>
        <button type="button" style={styles.confirmButton} onClick={handleConfirm}>
          Concluir
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {!hasDate && (
        <>
          <button type="button" style={styles.button} onClick={handleQuickSetToday}>
            <CheckCircleOutlined />
            Hoje
          </button>

          <button type="button" style={styles.button} onClick={handleQuickSetTomorrow}>
            <ClockCircleOutlined />
            Amanhã
          </button>

          <button type="button" style={styles.button} onClick={handleOpenModal}>
            <CalendarOutlined />
            Data e hora
          </button>
        </>
      )}

      {hasDate && (
        <button
          type="button"
          style={{
            ...styles.button,
            ...(isToday || isTomorrow ? styles.buttonActive : {}),
          }}
          onClick={handleOpenModal}
        >
          <ClockCircleOutlined />
          {formatDisplayDate(dueDate, dueTime)}
        </button>
      )}

      <Modal
        open={modalOpen}
        onCancel={handleCancel}
        footer={null}
        mask={false}
        closable={false}
        width={360}
        styles={{
          body: { padding: 0, backgroundColor: colors.backgroundElevated },
          content: { backgroundColor: colors.backgroundElevated, borderRadius: 12 },
        }}
        destroyOnClose={false}
        modalRender={(dom) => dom}
      >
        {modalContent}
      </Modal>
    </div>
  );
});
