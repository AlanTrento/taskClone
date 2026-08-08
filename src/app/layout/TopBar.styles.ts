import type { CSSProperties } from 'react';
import { colors } from '../../shared/styles/colors';
import { transitions } from '../../shared/styles/states';

export const styles: Record<string, CSSProperties> = {
  header: {
    height: 64,
    backgroundColor: colors.backgroundDark,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    borderBottom: `1px solid ${colors.border}`,
  },
  logoIcon: {
    fontSize: 28,
    color: colors.primaryBlue,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 600,
    backgroundImage: 'linear-gradient(135deg, #8ab4f8, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: `box-shadow ${transitions.normal}`,
  },
  avatarHover: {
    boxShadow: '0 0 0 2px rgba(138, 180, 248, 0.6)',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  avatarInitial: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.backgroundDarkest,
  },
  hamburgerButton: {
    color: colors.textSecondary,
    fontSize: 20,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 8,
    display: 'flex',
    alignItems: 'center',
  },
};
