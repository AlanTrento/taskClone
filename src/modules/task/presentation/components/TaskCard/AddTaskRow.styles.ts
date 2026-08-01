import type { CSSProperties } from 'react';
import { colors } from '../../../../../shared/styles/colors';

export const styles: Record<string, CSSProperties> = {
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    height: 40,
    padding: '0 8px',
    color: colors.primaryGreen,
    width: '100%',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  icon: {
    color: colors.primaryGreen,
    fontSize: 18,
  },
  inputRow: {
    display: 'flex',
    padding: '6px 8px',
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.backgroundInput,
    borderColor: colors.primaryBlue,
    color: colors.textPrimary,
  },
};
