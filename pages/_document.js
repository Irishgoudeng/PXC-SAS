import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Place external fonts or stylesheets here */}
        <link rel="stylesheet" href="/fonts/feather/feather.css" />  {/* Feather Icons CSS */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
