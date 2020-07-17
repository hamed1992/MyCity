import Document, { Head, Main, NextScript } from "next/document";
// import Manifest from "next-manifest/manifest";
export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charSet="iso-8859-2" className="next-head" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
          {/* <link rel="icon" type="image/png" href="images/favicon.png" /> */}
          {/* <link rel="manifest" href="/manifest.json" /> */}
          {/* <link href="/logo.png" rel="icon" type="image/png" sizes="16x16" /> */}
          
          
          {/* <Manifest
            href="/static/manifest/manifest.json"
            // color for theme-color
            themeColor="#F0F0F0"
            // scale for viewport meta tag
            initialScale="1"
          /> */}
         
          {/* <link rel="apple-touch-icon" href="/apple-icon.png"></link> */}
          <meta name="theme-color" content="#317EFB" />
        </Head>
        <body>
          <Main />
          <NextScript />
     
        </body>
      </html>
    );
  }
}