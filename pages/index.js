import { useEffect } from "react";

export default function Home({ bodyHtml, inlineStyles }) {

  useEffect(() => {
    const SCRIPTS = [
      "/assets/jquery-3.5.1.min.dc5e7f18c8.js",
      "/assets/gsap.min.js",
      "/assets/SplitText.min.js",
      "/assets/ScrollTrigger.min.js",
      "/assets/lenis.js",
    ];

    const afterAllLoaded = () => {
      try {
        gsap.registerPlugin(SplitText, ScrollTrigger);
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

        ScrollTrigger.scrollerProxy(window, {
          scrollTop(value) {
            if (arguments.length) {
              lenis.scrollTo(value);
            }
            return lenis.scroll;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: "transform",
        });

        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } catch (e) {}
    };

    const loadNext = (index) => {
      if (index >= SCRIPTS.length) {
        afterAllLoaded();
        return;
      }
      if (document.querySelector('script[src="' + SCRIPTS[index] + '"]')) {
        loadNext(index + 1);
        return;
      }
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
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}

export async function getStaticProps() {
  const { bodyHtml, inlineStyles } = require("../lib/processed-html.js");
  return {
    props: {
      bodyHtml,
      inlineStyles,
      title: "White Wolf — Digital Transformation Agency",
      description: "Branding, UI/UX Design, Web Development, AI-Integrated Solutions",
    },
  };
}
