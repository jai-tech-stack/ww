export default function About() {
  return (
    <>
      {/* Page Hero */}
      <section className="ww-page-hero">
        <div className="ww-page-hero-inner">
          <p className="ww-page-tag">About Us</p>
          <h1 className="ww-page-title">We Build Digital Brands That Lead Markets</h1>
          <p className="ww-page-subtitle">
            Backed by 20+ years of industry leadership, White Wolf combines strategic thinking, world-class design, engineering excellence, and AI integration to create meaningful business impact.
          </p>
        </div>
      </section>

      {/* Content — add your sections below */}
      <section className="ww-section">
        <div className="ww-container">
          <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Karla',sans-serif", fontSize: "0.9rem" }}>
            — Add your About page content here —
          </p>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "About",
      description: "Backed by 20+ years of industry leadership, White Wolf combines strategic thinking, world-class design, and AI integration.",
    },
  };
}
