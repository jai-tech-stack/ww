import Link from "next/link";
import { PROJECTS, getProjectBySlug, getAllSlugs } from "../../lib/projects";

export default function ProjectPage({ project }) {
  if (!project) return null;

  return (
    <Layout
      title={project.title}
      description={project.tagline}
    >
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="ww-proj-hero" style={{ "--proj-color": project.color }}>
        <div className="ww-container">
          {/* Breadcrumb */}
          <div className="ww-proj-breadcrumb">
            <Link href="/case-studies" className="ww-proj-back">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Case Studies
            </Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", fontFamily: "'Karla',sans-serif" }}>{project.title}</span>
          </div>

          {/* Title area */}
          <div className="ww-proj-hero-text">
            <div className="ww-proj-category-badge" style={{ background: `${project.color}18`, borderColor: `${project.color}40`, color: project.color }}>
              {project.category}
            </div>
            <h1 className="ww-proj-title">{project.title}</h1>
            <p className="ww-proj-tagline">{project.tagline}</p>
          </div>

          {/* Metadata bar */}
          <div className="ww-proj-meta">
            {[
              { label: "Client",   value: project.client },
              { label: "Year",     value: project.year },
              { label: "Duration", value: project.duration },
              { label: "Category", value: project.category },
            ].map((m) => (
              <div key={m.label} className="ww-proj-meta-item">
                <span className="ww-proj-meta-label">{m.label}</span>
                <span className="ww-proj-meta-value">{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image — full width */}
        <div className="ww-proj-hero-img-wrap">
          <img
            src={project.heroImage || project.coverImage}
            alt={project.title}
            className="ww-proj-hero-img"
          />
          {/* Gradient overlay at bottom */}
          <div className="ww-proj-hero-img-fade" />
        </div>
      </section>

      {/* ── Overview ──────────────────────────────────────────── */}
      <section className="ww-proj-overview">
        <div className="ww-container">
          <div className="ww-proj-overview-grid">
            <div>
              <p className="ww-page-tag">Overview</p>
              <p className="ww-proj-overview-text">{project.overview}</p>
            </div>
            <div className="ww-proj-services-col">
              <p className="ww-page-tag">Services Delivered</p>
              <ul className="ww-proj-services-list">
                {project.services.map((s) => (
                  <li key={s} className="ww-proj-service-item">
                    <span style={{ color: project.color, marginRight: 8 }}>→</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0 auto", maxWidth: 1470, padding: "0 15px" }}>
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", width: "100%" }} />
      </div>

      {/* ── Content Sections ──────────────────────────────────── */}
      {project.sections.map((section, i) => (
        <section key={i} className="ww-proj-section">
          <div className="ww-container">
            {section.type === "text" && (
              <div className="ww-proj-text-block">
                <p className="ww-page-tag">{section.label}</p>
                <h2 className="ww-proj-section-heading">{section.heading}</h2>
                <p className="ww-proj-section-body">{section.body}</p>
              </div>
            )}

            {section.type === "image-full" && (
              <div className="ww-proj-image-full">
                <img src={section.image} alt={section.caption || ""} className="ww-proj-img" />
                {section.caption && (
                  <p className="ww-proj-img-caption">{section.caption}</p>
                )}
              </div>
            )}

            {section.type === "split" && (
              <div className="ww-proj-split">
                <div className="ww-proj-split-text">
                  <p className="ww-page-tag">{section.label}</p>
                  <h2 className="ww-proj-section-heading">{section.heading}</h2>
                  <p className="ww-proj-section-body">{section.body}</p>
                </div>
                <div className="ww-proj-split-img">
                  <img src={section.image} alt={section.heading} className="ww-proj-img" />
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ── Results ───────────────────────────────────────────── */}
      {project.results && project.results.length > 0 && (
        <section className="ww-proj-results" style={{ "--proj-color": project.color }}>
          <div className="ww-container">
            <p className="ww-page-tag">Results</p>
            <div className="ww-proj-results-grid">
              {project.results.map((r) => (
                <div key={r.label} className="ww-proj-result-item">
                  <span className="ww-proj-result-stat" style={{ color: project.color }}>{r.stat}</span>
                  <span className="ww-proj-result-label">{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA strip ─────────────────────────────────────────── */}
      <section className="ww-proj-cta-strip">
        <div className="ww-container">
          <div className="ww-proj-cta-inner">
            <div>
              <p className="ww-page-tag">Start a Project</p>
              <h3 style={{ fontFamily: "'LucidaBright',Georgia,serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", margin: 0, fontWeight: 600 }}>
                Ready to build something like this?
              </h3>
            </div>
            <Link href="/contact" className="ww-nav-cta" style={{ fontSize: "1rem", padding: "12px 32px" }}>
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </section>

      {/* ── Next Project ──────────────────────────────────────── */}
      {project.nextSlug && (
        <section className="ww-proj-next">
          <Link href={`/case-studies/${project.nextSlug}`} className="ww-proj-next-link">
            <div className="ww-container">
              <div className="ww-proj-next-inner">
                <div>
                  <p className="ww-proj-next-label">Next Project</p>
                  <h4 className="ww-proj-next-title">{project.nextTitle}</h4>
                </div>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="ww-proj-next-arrow">
                  <circle cx="24" cy="24" r="23" stroke="rgba(106,170,199,0.3)" strokeWidth="1.5"/>
                  <path d="M18 24h12M25 19l5 5-5 5" stroke="#6AAAC7" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </Link>
        </section>
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: getAllSlugs(),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { notFound: true };
  return { props: { project } };
}
