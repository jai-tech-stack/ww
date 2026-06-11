import Link from "next/link";
import { PROJECTS, getProjectBySlug, getAllSlugs } from "../../lib/projects";
import { abs, breadcrumbSchema, SITE_NAME } from "../../lib/seo";

export default function ProjectPage({ project }) {
  if (!project) return null;

  return (
    <>
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
            <div className="ww-proj-hero-eyebrow">
              <div className="ww-proj-hero-eyebrow-line" />
              <div className="ww-proj-category-badge" style={{ background: `${project.color}18`, borderColor: `${project.color}40`, color: project.color }}>
                {project.category}
              </div>
            </div>
            <h1 className="ww-proj-title">{project.title}</h1>
            <p className="ww-proj-tagline">{project.tagline}</p>
            {project.behanceUrl && (
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ww-proj-behance"
                style={{ borderColor: `${project.color}66`, color: project.color }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.2 6.3c.9 0 1.6.1 2.3.3.6.2 1.2.4 1.6.8.4.3.8.8 1 1.3.2.5.3 1.2.3 1.9 0 .8-.2 1.5-.6 2-.4.5-.9 1-1.6 1.3.9.3 1.6.8 2.1 1.4.5.7.7 1.5.7 2.4 0 .8-.2 1.5-.5 2-.3.6-.7 1-1.3 1.4-.5.3-1.1.6-1.8.7-.7.2-1.4.2-2.1.2H1V6.3h7.2zM7.8 11c.6 0 1-.1 1.4-.4.4-.3.5-.7.5-1.3 0-.3 0-.6-.2-.8-.1-.2-.3-.4-.5-.5-.2-.1-.4-.2-.7-.2-.3 0-.6-.1-.9-.1H4.3V11h3.5zm.2 4.9c.3 0 .6 0 .9-.1.3 0 .5-.1.7-.3.2-.1.4-.3.5-.5.1-.2.2-.5.2-.9 0-.7-.2-1.2-.6-1.5-.4-.3-.9-.4-1.6-.4H4.3v3.7H8zm10.3-9.1c.6 0 1.2.1 1.7.3.5.2 1 .5 1.3.9.4.4.7.9.9 1.4.2.6.3 1.2.3 1.9v.6h-6.1c0 .7.3 1.2.7 1.6.4.4 1 .5 1.7.5.5 0 1-.1 1.3-.4.4-.2.6-.5.7-.8h2.4c-.4 1.2-1 2-1.8 2.5-.8.5-1.7.8-2.9.8-.8 0-1.5-.1-2.1-.4-.6-.3-1.2-.6-1.6-1.1-.4-.5-.8-1-1-1.7-.2-.6-.3-1.4-.3-2.1 0-.8.1-1.5.4-2.1.2-.7.6-1.2 1-1.7.5-.5 1-.8 1.6-1.1.6-.2 1.3-.3 2.1-.3zm-.1 1.9c-.6 0-1 .2-1.4.5-.3.3-.5.8-.6 1.4h3.9c-.1-.6-.3-1-.6-1.4-.3-.3-.8-.5-1.3-.5zM15.5 5.5h4.9V7h-4.9V5.5z"/>
                </svg>
                View Full Project on Behance
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          {/* Metadata bar */}
          <div className="ww-proj-meta">
            {[
              { label: "Date",     value: project.year },
              { label: "Category", value: project.category },
              { label: "Duration", value: project.duration },
              { label: "Budget",   value: project.budget || "On Request" },
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

      {/* ── Gallery (horizontal swipe strip) ──────────────────── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="ww-proj-gallery-sec">
          <div className="ww-container">
            <div className="ww-proj-gallery-head">
              <p className="ww-page-tag">Gallery</p>
              {project.behanceUrl && (
                <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className="ww-proj-gallery-link">
                  See all shots on Behance ↗
                </a>
              )}
            </div>
          </div>
          <div className="ww-proj-gallery" role="list">
            {project.gallery.map((img, i) => (
              <div className="ww-proj-gallery-item" role="listitem" key={i}>
                <img src={img} alt={`${project.title} — image ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
          <p className="ww-proj-gallery-hint">Swipe / scroll →</p>
        </section>
      )}

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
            <div className="ww-proj-cta-actions">
              {project.behanceUrl && (
                <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className="ww-proj-cta-behance">
                  View on Behance ↗
                </a>
              )}
              <Link href="/contact" className="ww-nav-cta" style={{ fontSize: "1rem", padding: "12px 32px" }}>
                Let&apos;s Talk
              </Link>
            </div>
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
    </>
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

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.tagline,
    image: abs(project.coverImage),
    creator: { "@type": "Organization", name: SITE_NAME },
    about: project.category,
    datePublished: String(project.year),
  };
  const crumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Case Studies", path: "/case-studies" },
    { name: project.title, path: `/case-studies/${project.slug}` },
  ]);

  return {
    props: {
      project,
      title: `${project.title} — ${project.category} Case Study`,
      description: project.overview
        ? project.overview.slice(0, 155)
        : project.tagline,
      ogImage: project.coverImage,
      ogType: "article",
      jsonLd: [creativeWork, crumbs],
    },
  };
}
