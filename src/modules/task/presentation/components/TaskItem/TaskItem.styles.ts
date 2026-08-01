import type { CSSProperties } from 'react';
import { colors } from '../../../../../shared/styles/colors';
import { typography } from '../../../../../shared/styles/typography';
import { spacing, borderRadius } from '../../../../../shared/styles/spacing';
import { hoverStates, transitions } from '../../../../../shared/styles/states';

export const styles: Record<string, CSSProperties> = {
  editingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.sm}px ${spacing.sm}px`,
    borderRadius: borderRadius.sm,
    minHeight: 44,
  },
  checkboxWrapper: {
    marginTop: 2,
    flexShrink: 0,
  },
  displayContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: `${spacing.sm}px ${spacing.sm}px`,
    borderRadius: borderRadius.sm,
    minHeight: 44,
    cursor: 'pointer',
    transition: `background-color ${transitions.fast}`,
  },
  headerRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.md,
    minHeight: 32,
  },
  dragHandle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 24,
    color: colors.textDisabled,
    cursor: 'grab',
    fontSize: 14,
    flexShrink: 0,
    opacity: 0,
    transition: `opacity ${transitions.fast}`,
    marginTop: 2,
  },
  dragHandleVisible: {
    opacity: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  title: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    color: colors.textPrimary,
    cursor: 'pointer',
    lineHeight: typography.body.lineHeight,
  },
  titleCompleted: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    color: colors.textPrimary,
    textDecoration: 'line-through',
    opacity: 0.6,
    cursor: 'pointer',
    lineHeight: typography.body.lineHeight,
  },
  description: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  actionsContainer: {
    display: 'flex',
    gap: spacing.xs,
  },
  starIcon: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  starIconFilled: {
    color: colors.starGold,
    fontSize: 16,
  },
  actionButton: {
    color: colors.textSecondary,
  },
  expandedPanel: {
    paddingLeft: spacing.xxxl + spacing.sm,
    paddingRight: spacing.sm,
    paddingBottom: spacing.sm,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  detailsField: {
    padding: `${spacing.sm}px ${spacing.sm}px`,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.backgroundInput,
    cursor: 'text',
    minHeight: 32,
  },
  detailsLabel: {
    fontSize: typography.body.fontSize,
    color: colors.textDisabled,
    fontStyle: 'italic',
  },
  detailsTextarea: {
    width: '100%',
    minHeight: 60,
    padding: spacing.sm,
    backgroundColor: colors.backgroundInput,
    border: `1px solid ${colors.primaryBlue}`,
    borderRadius: borderRadius.sm,
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontFamily: 'inherit',
    resize: 'vertical',
    outline: 'none',
  },
};

export const getDisplayContainer = (isHovered: boolean, isExpanded: boolean): CSSProperties => ({
  ...styles.displayContainer,
  backgroundColor: isHovered || isExpanded ? hoverStates.background : 'transparent',
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
