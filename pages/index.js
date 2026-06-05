export default function Home({ bodyHtml, inlineStyles }) {
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
      isHomepage: true,
      title: "White Wolf — Digital Transformation Agency",
      description: "Branding, UI/UX Design, Web Development, AI Solutions",
    },
  };
}
