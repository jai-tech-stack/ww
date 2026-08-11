export default function Home({ bodyHtml, inlineStyles }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
      <h1 className="ww-visually-hidden">Digital Transformation Agency for Branding, UI/UX, Development and AI</h1>
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
      isHomepage: true,
      title: "White Wolf | Digital Transformation Agency in Bangalore",
      description: "White Wolf is a Bangalore digital transformation agency delivering brand strategy, UI/UX design, web development and practical AI solutions for businesses.",
    },
  };
}
