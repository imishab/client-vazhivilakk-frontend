import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="VazhiVilakk" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#3c736b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        {/* Title */}
        <title>VazhiVilakk - We Provide The Best Knowledge</title>
        {/* Favicon */}
        <link rel="icon" href="/assets/images/logo.png" />
        <link rel="apple-touch-icon" href="/assets/images/logo.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/images/logo.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/assets/images/logo.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/images/logo.png"
        />
        <link rel="stylesheet" href="/assets/css/style.css" />
        {/* <link rel="manifest" href="manifest.json" /> */}
      </>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
