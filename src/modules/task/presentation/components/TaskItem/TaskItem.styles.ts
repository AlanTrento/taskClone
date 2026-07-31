import type { CSSProperties } from 'react';
import { colors } from '../../../../../shared/styles/colors';
import { typography } from '../../../../../shared/styles/typography';
import { hoverStates, transitions } from '../../../../../shared/styles/states';

export const styles: Record<string, CSSProperties> = {
  editingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '6px 8px',
    borderRadius: 8,
    minHeight: 44,
  },
  checkboxWrapper: {
    marginTop: 2,
  },
  displayContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '6px 8px',
    borderRadius: 8,
    minHeight: 44,
    cursor: 'pointer',
    transition: `background-color ${transitions.fast}`,
  },
  contentWrapper: {
    flex: 1,
  },
  title: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    color: colors.textPrimary,
  },
  titleCompleted: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    color: colors.textPrimary,
    textDecoration: 'line-through',
    opacity: 0.6,
  },
  description: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    marginTop: 2,
  },
  actionsContainer: {
    display: 'flex',
    gap: 4,
  },
  starIcon: {
    color: colors.starGold,
  },
  actionButton: {
    color: colors.textSecondary,
  },
};

export const getDisplayContainer = (isHovered: boolean): CSSProperties => ({
  ...styles.displayContainer,
  backgroundColor: isHovered ? hoverStates.background : 'transparent',
});

export const getTitleStyle = (completed: boolean): CSSProperties =>
  completed ? styles.titleCompleted : styles.title;

export const getCheckboxStyle = (disabled: boolean): CSSProperties =>
  disabled ? styles.buttonDisabled : styles.button;

export const buttonDisabled = {
  cursor: 'not-allowed' as const,
  opacity: 0.5,
};

export const button = {
  cursor: 'pointer' as const,
  opacity: 1,
};
