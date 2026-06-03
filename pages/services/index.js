import Layout from "../../components/Layout";
import Link from "next/link";

const SERVICES = [
  {
    href: "/services/branding",
    tag: "01",
    title: "Branding",
    desc: "We create memorable brands with strategic positioning, visual identity systems, and storytelling that connects globally.",
    items: ["Logo Design", "Typography & Color Systems", "Brand Guidelines", "Art Direction"],
  },
  {
    href: "/services/ui-ux-design",
    tag: "02",
    title: "UI/UX Design",
    desc: "We design intuitive digital experiences that improve engagement, usability, and business growth.",
    items: ["Visual Design & Layout", "Prototyping", "User Flow Design", "Design Systems"],
  },
  {
    href: "/services/development",
    tag: "03",
    title: "Development",
    desc: "We build scalable websites, platforms, applications, and digital ecosystems with modern technologies.",
    items: ["Custom Website Development", "Landing Pages", "API Integrations", "Product Engineering"],
  },
  {
    href: "/services/ai-integrated-services",
    tag: "04",
    title: "AI Integrated Services",
    desc: "We help businesses integrate AI into products, workflows, customer experiences, and operations.",
    items: ["AI Workflow Automation", "AI Chatbot Integration", "AI-Powered UX", "Data-Driven Intelligence"],
  },
];

export default function Services() {
  return (
    <Layout title="Services" description="White Wolf offers Branding, UI/UX Design, Development, and AI Integrated Services.">
      <section className="ww-page-hero">
        <div className="ww-page-hero-inner">
          <p className="ww-page-tag">Services Overview</p>
          <h1 className="ww-page-title">End-to-End Digital Transformation</h1>
          <p className="ww-page-subtitle">
            From brand strategy to AI integration — we deliver every capability your business needs to lead in the digital era.
          </p>
        </div>
      </section>

      <section className="ww-section">
        <div className="ww-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5px", background: "rgba(106,170,199,0.1)", border: "1px solid rgba(106,170,199,0.1)", borderRadius: 6, overflow: "hidden" }}>
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
                <div className="ww-service-card">
                  <span className="ww-service-card-num">{s.tag}</span>
                  <h3 className="ww-service-card-title">{s.title}</h3>
                  <p className="ww-service-card-desc">{s.desc}</p>
                  <ul className="ww-service-card-list">
                    {s.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <span className="ww-service-card-arrow">Explore &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
