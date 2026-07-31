import type { CSSProperties } from 'react';
import { colors } from '../../../../../shared/styles/colors';
import { typography } from '../../../../../shared/styles/typography';
import { transitions } from '../../../../../shared/styles/states';

export const styles: Record<string, CSSProperties> = {
  container: {
    marginTop: 16,
  },
  expandButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    height: 40,
    padding: '0 8px',
    color: colors.textSecondary,
    width: '100%',
    justifyContent: 'flex-start',
    transition: `background-color ${transitions.fast}`,
  },
  label: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
  },
  expandedContent: {
    marginTop: 8,
  },
};
