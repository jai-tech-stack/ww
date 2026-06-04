import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      className="w-mod-js w-mod-ix w-mod-ix3"
      data-wf-domain="whitewolf.vercel.app"
      data-wf-page="6925368d84535d51ca629726"
      data-wf-site="6925368c84535d51ca6296ea"
    >
      <Head>
        {/* Font detection and focus reset */}
        <style>{`.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}`}</style>

        {/* White Wolf styles */}
        <link
          href="/assets/whitewolf.css"
          rel="stylesheet"
          type="text/css"
        />

        {/* Karla body font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />

        {/* Module detection (runs before paint) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`,
          }}
        />

        {/* Initial animation states - keeps elements hidden until JS runs */}
        <style>{`
html.w-mod-js:not(.w-mod-ix3) :is(.cta-top-wrapper-1,.cta-top-wrapper-2,.about-right-box,.service-tag-description-wrap){visibility:hidden!important;}
        `}</style>

        {/* White Wolf icon */}
        <link rel="icon" href="/assets/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/assets/icon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
