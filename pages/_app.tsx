import '../styles/globals.css';

import { NextComponentType } from 'next';

export default function YosumeApp({
  Component,
  pageProps,
}: {
  Component: NextComponentType;
  pageProps: Record<string, unknown>;
}) {
  return <Component {...pageProps} />;
}
