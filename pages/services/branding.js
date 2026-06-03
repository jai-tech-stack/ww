import Layout from "../../components/Layout";

export default function Branding() {
  return (
    <Layout title="Branding" description="White Wolf creates memorable brands with strategic positioning, visual identity systems, and storytelling that connects globally.">
      <section className="ww-page-hero">
        <div className="ww-page-hero-inner">
          <p className="ww-page-tag">Service — Branding</p>
          <h1 className="ww-page-title">Brands That Command Attention</h1>
          <p className="ww-page-subtitle">
            We create memorable brands with strategic positioning, visual identity systems, and storytelling that connects globally.
          </p>
        </div>
      </section>
      <section className="ww-section">
        <div className="ww-container">
          <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Karla',sans-serif" }}>— Add Branding page content here —</p>
        </div>
      </section>
    </Layout>
  );
}
