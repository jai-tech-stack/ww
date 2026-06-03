import Link from "next/link";
import Layout from "../../components/Layout";
import { PROJECTS } from "../../lib/projects";

export default function CaseStudies() {
  return (
    <Layout title="Case Studies" description="White Wolf portfolio — branding, UI/UX, development and AI projects.">
      <section className="ww-page-hero">
        <div className="ww-page-hero-inner">
          <p className="ww-page-tag">Case Studies</p>
          <h1 className="ww-page-title">Work That Speaks</h1>
          <p className="ww-page-subtitle">
            A curated selection of projects across branding, UI/UX, product development, and AI integration.
          </p>
        </div>
      </section>

      <section className="ww-section">
        <div className="ww-container">
          <div className="ww-cs-grid">
            {PROJECTS.map((project) => (
              <Link key={project.slug} href={`/case-studies/${project.slug}`} className="ww-cs-card">
                <div className="ww-cs-card-img-wrap">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="ww-cs-card-img"
                  />
                  <div className="ww-cs-card-overlay">
                    <span className="ww-cs-card-cta">View Case Study →</span>
                  </div>
                </div>
                <div className="ww-cs-card-info">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span
                      className="ww-cs-card-badge"
                      style={{ background: `${project.color}18`, border: `1px solid ${project.color}40`, color: project.color }}
                    >
                      {project.category}
                    </span>
                    <span className="ww-cs-card-year">{project.year}</span>
                  </div>
                  <h3 className="ww-cs-card-title">{project.title}</h3>
                  <p className="ww-cs-card-tagline">{project.tagline}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Behance CTA */}
          <div style={{ marginTop: "4rem", textAlign: "center" }}>
            <a href="https://www.behance.net/selestin" target="_blank" rel="noopener noreferrer" className="ww-nav-cta" style={{ display: "inline-flex" }}>
              View Full Portfolio on Behance →
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
