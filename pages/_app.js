import Head from "next/head";
import Header from "../components/Header";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import { useRouter } from "next/router";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const title = pageProps.title;
  const description = pageProps.description;
  const router = useRouter();
  const isHomepage = router.pathname === "/";

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/icon.svg" type="image/svg+xml" />
      </Head>

      <div className="ww-page">
        <Header title={title} description={description} />
        {!isHomepage && <SiteNavbar />}
        <main className="ww-main">
          <Component {...pageProps} />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
