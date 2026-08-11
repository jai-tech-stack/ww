export default function Insights() {
  return (
    <>
      <section className="ww-page-hero">
        <div className="ww-page-hero-inner">
          <p className="ww-page-tag">Insights</p>
          <h1 className="ww-page-title">Perspectives & Ideas</h1>
          <p className="ww-page-subtitle">
            Thinking on branding, design, technology, and AI from the White Wolf team.
          </p>
        </div>
      </section>
      <section className="ww-section">
        <div className="ww-container">
          <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Karla',sans-serif" }}>— Add blog posts / articles here —</p>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Branding, Design & AI Insights | White Wolf",
      description: "Explore practical perspectives from White Wolf on brand strategy, UI/UX design, web development, digital products and applied AI for modern businesses.",
    },
  };
}
