import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import env from 'lib/environment'

const ANALYTICS_CODE = `
  var Countly = Countly || {};
  Countly.q = Countly.q || [];
  //provide countly initialization parameters
  Countly.app_key = 'ddabbc3c7ccc61575c7014e8b5d481561c7ee770';
  Countly.url = 'https://analytics.nova.org/';
  Countly.inactivity_time = 10;
  Countly.q.push(['track_sessions']);
  Countly.q.push(['track_pageview']);
  Countly.q.push(['track_clicks']);
  Countly.q.push(['track_errors']);
  (function() {
    var cly = document.createElement('script'); cly.type = 'text/javascript';
    cly.async = true;
    cly.src = 'https://analytics.nova.org/sdk/web/countly.min.js';
    cly.onload = function(){Countly.init()};
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cly, s);
  })();
`

function AnalyticsScript() {
  return process.env.NODE_ENV !== 'production' ? null : (
    <script dangerouslySetInnerHTML={{ __html: ANALYTICS_CODE }} />
  )
}

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await NextDocument.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossOrigin="anonymous"
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@Nova Mining TokenProject" />
          <meta name="twitter:description" content={env('SITE_DESCRIPTION')} />
          <meta name="twitter:title" content={env('SITE_TITLE')} />
          <meta name="twitter:image" content="/twitter-card-icon.png" />

          <meta property="og:title" content={env('SITE_TITLE')} />
          <meta property="og:description" content={env('SITE_DESCRIPTION')} />
          <meta property="og:url" content={env('SITE_URL')} />
          <meta property="og:site_name" content={env('SITE_TITLE')} />
          <meta property="og:image" content="/twitter-card-icon.png" />
          <meta
            property="og:image:secure_url"
            content="/twitter-card-icon.png"
          />
          <meta property="og:image:width" content="300" />
          <meta property="og:image:height" content="300" />

          <meta name="description" content={env('SITE_DESCRIPTION')} />
          <style>{`
            html, body {
            min-height: 100vh;
            background: no-repeat center/170px url(/splash_1.svg),
            linear-gradient(289.78deg, #875fcc 18.35%, #673AB7 80.68%); !important
s            mix-blend-mode: multiply;
            overflow: auto;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
          <AnalyticsScript />
        </body>
      </Html>
    )
  }
}
