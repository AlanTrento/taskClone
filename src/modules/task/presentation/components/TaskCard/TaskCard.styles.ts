import type { CSSProperties } from 'react';
import { colors } from '../../../../../shared/styles/colors';
import { spacing, borderRadius } from '../../../../../shared/styles/spacing';

export const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: colors.backgroundDarkest,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  },
};
