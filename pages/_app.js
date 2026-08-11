import Head from "next/head";
import Header from "../components/Header";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import ChatWidget from "../components/ChatWidget";
import { useEffect } from "react";
import "@/styles/globals.css";

const SCRIPTS = [
  "/assets/jquery-3.5.1.min.dc5e7f18c8.js",
  "/assets/gsap.min.js",
  "/assets/SplitText.min.js",
  "/assets/ScrollTrigger.min.js",
  "/assets/lenis.js",
  "/assets/whitewolf-core.js",
  "/assets/whitewolf-modules.js",
  "/assets/whitewolf-ui.js",
  "/assets/whitewolf.fonts.js",
];

export default function App({ Component, pageProps }) {
  const title = pageProps.title;
  const description = pageProps.description;
  const isHomepage = pageProps.isHomepage === true;
  const isLanding = pageProps.isLanding === true;

  useEffect(() => {
    const afterAllLoaded = () => {
      try { gsap.registerPlugin(SplitText, ScrollTrigger); } catch (e) {}

      // Footer marquee — animate only the inner track, background stays fixed
      try {
        const track = document.querySelector('.footer-marquee-track');
        if (track) {
          gsap.to(track, {
            xPercent: -50,
            duration: 15,
            ease: 'none',
            repeat: -1,
          });
        }
      } catch (e) {}

      try {
        const lenis = new Lenis({
          duration: 1.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: "vertical",
          gestureDirection: "vertical",
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });
        try {
          ScrollTrigger.scrollerProxy(window, {
            scrollTop(value) { if (arguments.length) lenis.scrollTo(value); return lenis.scroll; },
            getBoundingClientRect() { return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }; },
            pinType: "transform",
          });
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add((time) => { lenis.raf(time * 1000); });
          gsap.ticker.lagSmoothing(0);
        } catch (e) {}
      } catch (e) {}
    };

    const loadNext = (index) => {
      if (index >= SCRIPTS.length) { afterAllLoaded(); return; }
      if (document.querySelector('script[src="' + SCRIPTS[index] + '"]')) { loadNext(index + 1); return; }
      const s = document.createElement("script");
      s.src = SCRIPTS[index];
      s.type = "text/javascript";
      s.onload = () => loadNext(index + 1);
      s.onerror = () => loadNext(index + 1);
      document.body.appendChild(s);
    };

    loadNext(0);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/icon.svg" type="image/svg+xml" />
      </Head>

      <div className="ww-page">
        <Header
          title={title}
          description={description}
          noindex={pageProps.noindex === true}
          ogImage={pageProps.ogImage}
          ogImageAlt={pageProps.ogImageAlt}
          ogImageWidth={pageProps.ogImageWidth}
          ogImageHeight={pageProps.ogImageHeight}
          ogType={pageProps.ogType}
          jsonLd={pageProps.jsonLd}
        />
        {!isHomepage && !isLanding && <SiteNavbar />}
        <main className="ww-main">
          <Component {...pageProps} />
        </main>
        <SiteFooter />
        <ChatWidget />
      </div>
    </>
  );
}
