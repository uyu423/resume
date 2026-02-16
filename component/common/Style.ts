import { CSSProperties } from 'react';

/** Style 추론을 위하여.. */
type TStyleKey =
  | 'blue'
  | 'gray'
  | 'global'
  | 'sign'
  | 'profileImg'
  | 'footerCover'
  | 'footer'
  | 'skillKeywordBadge';

export const Style: Record<TStyleKey, CSSProperties> = {
  blue: {
    color: 'var(--color-accent)',
  },

  gray: {
    color: 'var(--color-text-secondary)',
  },

  global: {
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-light)' as any,
    wordWrap: 'break-word',
    wordBreak: 'keep-all',
    lineHeight: 1.8,
  },

  sign: {
    fontFamily: 'var(--font-signature)',
    fontSize: '1.5em',
  },

  profileImg: {
    maxHeight: '320px',
  },

  footerCover: {
    backgroundColor: 'var(--color-bg-subtle)',
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: '50px',
    height: '80px',
  },

  footer: {
    // paddingTop: '10px',
  },

  skillKeywordBadge: {
    fontWeight: 'var(--fw-regular)' as any,
  },
};
