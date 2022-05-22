import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,400;8..144,700&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <script defer src="https://www.paypal.com/sdk/js?client-id=AeiwSgb_kVCY7spRA18zoF6tiT25WM8JHTntIYGnrnx2Ah8acZ9ntgO-wgFk5eASDufRAKBHrbj_Qhus&currency=USD"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}