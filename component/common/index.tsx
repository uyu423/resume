import { PropsWithChildren } from 'react';

export function EmptyRowCol<T = Record<string, never>>({ children }: PropsWithChildren<T>) {
  return <div>{children}</div>;
}

export function HrefTargetBlank({ url, text }: PropsWithChildren<{ url: string; text?: string }>) {
  return (
    <a href={url} target="_blank" rel="noreferrer noopener">
      {text || url}
    </a>
  );
}
