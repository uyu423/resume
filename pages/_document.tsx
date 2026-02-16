import { Head, Html, Main, NextScript } from 'next/document';

export default function ResumeDocument() {
  return (
    <Html lang="ko-KR">
      <Head>
        <meta charSet="utf-8" />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Parisienne&family=Sora:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        {/* FOUC prevention: this string MUST remain static — never interpolate user data */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})();",
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
