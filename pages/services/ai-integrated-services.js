export default function AIIntegratedServices() {
  return (
    <>
      <section className="ww-page-hero">
        <div className="ww-page-hero-inner">
          <p className="ww-page-tag">Service — AI Services</p>
          <h1 className="ww-page-title">Intelligence Embedded in Everything</h1>
          <p className="ww-page-subtitle">
            We help businesses integrate AI into products, workflows, customer experiences, and operations.
          </p>
        </div>
      </section>
      <section className="ww-section">
        <div className="ww-container">
          <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Karla',sans-serif" }}>— Add AI Services content here —</p>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "AI Services",
      description: "White Wolf helps businesses integrate AI into products, workflows, customer experiences, and operations.",
    },
  };
}
