export const hoverStates = {
  background: '#232425',
  backgroundLight: '#303134',
  backgroundDark: '#3c4043',
} as const;

export const focusStates = {
  outline: '2px solid #8ab4f8',
  outlineOffset: 2,
} as const;

export const activeStates = {
  background: '#0b57d0',
  color: '#ffffff',
} as const;

export const disabledStates = {
  opacity: 0.5,
  cursor: 'not-allowed',
} as const;

export const transitions = {
  fast: '150ms ease',
  normal: '200ms ease',
  slow: '300ms ease',
} as const;
