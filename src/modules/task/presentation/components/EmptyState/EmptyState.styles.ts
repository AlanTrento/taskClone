import type { CSSProperties } from 'react';
import { colors } from '../../../../../shared/styles/colors';
import { typography } from '../../../../../shared/styles/typography';
import { spacing } from '../../../../../shared/styles/spacing';

export const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 64,
    gap: spacing.md,
  },
  icon: {
    fontSize: 48,
    color: colors.primaryBlue,
    opacity: 0.4,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
};
