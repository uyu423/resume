import 'bootstrap/dist/css/bootstrap.min.css';

import { NextComponentType } from 'next';

export default function YosumeApp({
  Component,
  pageProps,
}: {
  Component: NextComponentType;
  pageProps: any;
}) {
  return <Component {...pageProps} />;
}
