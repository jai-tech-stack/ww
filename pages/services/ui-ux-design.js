export default function UIUXDesign() {
  return (
    <>
      <section className="ww-page-hero">
        <div className="ww-page-hero-inner">
          <p className="ww-page-tag">Service — UI/UX Design</p>
          <h1 className="ww-page-title">Experiences That Convert</h1>
          <p className="ww-page-subtitle">
            We design intuitive digital experiences that improve engagement, usability, and business growth.
          </p>
        </div>
      </section>
      <section className="ww-section">
        <div className="ww-container">
          <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Karla',sans-serif" }}>— Add UI/UX Design page content here —</p>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "UI/UX Design",
      description: "White Wolf designs intuitive digital experiences that improve engagement, usability, and business growth.",
    },
  };
}
