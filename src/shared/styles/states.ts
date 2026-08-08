export const hoverStates = {
  background: 'rgba(255, 255, 255, 0.04)',
  backgroundLight: 'rgba(255, 255, 255, 0.06)',
  backgroundDark: 'rgba(255, 255, 255, 0.08)',
} as const;

export const focusStates = {
  outline: '2px solid #8ab4f8',
  outlineOffset: 2,
} as const;

export const activeStates = {
  background: 'rgba(138, 180, 248, 0.15)',
  color: '#8ab4f8',
} as const;

export const disabledStates = {
  opacity: 0.5,
  cursor: 'not-allowed',
} as const;

export const transitions = {
  fast: '150ms ease',
  normal: '200ms ease',
  slow: '300ms ease-in-out',
} as const;
