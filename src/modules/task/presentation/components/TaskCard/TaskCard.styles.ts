import type { CSSProperties } from 'react';
import { colors } from '../../../../../shared/styles/colors';
import { spacing, borderRadius } from '../../../../../shared/styles/spacing';

export const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: colors.backgroundContainer,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)',
  },
  containerDesktop: {
    width: 680,
    minWidth: 620,
    maxWidth: 720,
  },
  containerTablet: {
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
  },
};
