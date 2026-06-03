import Layout from "../components/Layout";

const STEPS = [
  { num: "01", title: "Discover",   desc: "Deep-dive research into your business, audience, and competitive landscape." },
  { num: "02", title: "Strategize", desc: "Define the roadmap, success metrics, and creative direction." },
  { num: "03", title: "Design",     desc: "Craft visual systems, interactions, and experiences with precision." },
  { num: "04", title: "Build",      desc: "Engineer robust, scalable digital products using modern technologies." },
  { num: "05", title: "Launch",     desc: "Deploy with performance, SEO, and analytics fully configured." },
  { num: "06", title: "Scale",      desc: "Continuous optimisation, growth strategy, and ongoing partnership." },
];

export default function Process() {
  return (
    <Layout title="Process" description="How White Wolf works — from discovery to launch and scale.">
      <section className="ww-page-hero">
        <div className="ww-page-hero-inner">
          <p className="ww-page-tag">Our Process</p>
          <h1 className="ww-page-title">How We Work</h1>
          <p className="ww-page-subtitle">
            A proven six-stage process that ensures every engagement delivers measurable outcomes, on time and on brief.
          </p>
        </div>
      </section>

      <section className="ww-section">
        <div className="ww-container">
          <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(106,170,199,0.12)", borderRadius: 6, overflow: "hidden" }}>
            {STEPS.map((step, i) => (
              <div key={step.num} className="ww-process-row" style={{ borderTop: i > 0 ? "1px solid rgba(106,170,199,0.1)" : "none" }}>
                <span className="ww-process-row-num">{step.num}</span>
                <div style={{ flex: 1 }}>
                  <h4 className="ww-process-row-title">{step.title}</h4>
                  <p className="ww-process-row-desc">{step.desc}</p>
                </div>
                <div className="ww-process-row-bar"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
