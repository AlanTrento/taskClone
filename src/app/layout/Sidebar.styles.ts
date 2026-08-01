import type { CSSProperties } from 'react';
import { colors } from '../../shared/styles/colors';
import { spacing, borderRadius } from '../../shared/styles/spacing';
import { typography } from '../../shared/styles/typography';

export const styles: Record<string, CSSProperties> = {
  container: {
    width: 280,
    height: 'calc(100vh - 64px)',
    backgroundColor: colors.backgroundDark,
    display: 'flex',
    flexDirection: 'column',
    padding: `${spacing.lg}px ${spacing.sm}px`,
    gap: spacing.xxl,
    overflowY: 'auto',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  },
  listSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  listLabel: {
    fontSize: typography.caption.fontSize,
    fontWeight: typography.caption.fontWeight,
    color: colors.textSecondary,
    padding: `0 ${spacing.lg}px`,
  },
  newListNode: {
    display: 'flex',
    gap: spacing.xs,
    padding: `0 ${spacing.lg}px`,
  },
  newListItemInput: {
    flex: 1,
    backgroundColor: colors.backgroundInput,
    borderColor: colors.primaryBlue,
    color: colors.textPrimary,
  },
  createListButton: {
    justifyContent: 'flex-start',
    color: colors.primaryGreen,
    height: 40,
    padding: `0 ${spacing.lg}px`,
    width: '100%',
  },
  menuItem: {
    justifyContent: 'flex-start',
    height: 40,
    borderRadius: borderRadius.xl,
    padding: `0 ${spacing.lg}px`,
    gap: spacing.md,
    width: '100%',
  },
  menuItemLabel: {
    flex: 1,
    textAlign: 'left' as const,
  },
  menuItemCount: {
    color: colors.textSecondary,
    fontSize: typography.caption.fontSize,
  },
  deleteIcon: {
    color: colors.textSecondary,
    fontSize: 12,
  },
};

export const getMenuItemStyle = (isActive: boolean): CSSProperties => ({
  ...styles.menuItem,
  backgroundColor: isActive ? colors.primaryBlueDark : 'transparent',
  color: isActive ? colors.textWhite : colors.textPrimary,
});
