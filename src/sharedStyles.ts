import { css } from '@emotion/css';

export const minimalInput = css({
  flexShrink: 0,
  width: 60,
  backgroundColor: '#ffffff',
  fontSize: 12,
  border: 'none',
  padding: '1px 8px',
  borderRadius: 4,
  fontFamily: 'monospace',
});

export const minimalButton = css({
  border: 'none',
  borderRadius: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4px 0',
  marginRight: 2,
  flex: 1,
  background: '#c6c6c6',
  cursor: 'pointer',
  '&:hover': {
    background: '#dddddd',
  },
});

export const redButtonWithIcon = css({
  backgroundColor: 'red',
  padding: '4px 8px',
  borderRadius: 4,
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  border: 'none',
  cursor: 'pointer',
  '& span': {
    marginRight: 4,
  },
});
