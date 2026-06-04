import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const title = pageProps.title;
  const description = pageProps.description;

  // Homepage already has navbar from processed HTML, so hide the Header navbar
  const showNavbar = router.pathname !== "/";

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/icon.svg" type="image/svg+xml" />
      </Head>

      <div className="ww-page">
        <Header title={title} description={description} showNavbar={showNavbar} />
        <main className="ww-main">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
