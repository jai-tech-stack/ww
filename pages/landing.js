import { useEffect, useState } from "react";

const TEAM = [
  {
    img: "/assets/selestin.jpeg",
    name: "Selestin Anthony",
    role: "Founder & Creative Director",
    eyebrow: "25+ Years of Creative Leadership. Building Brands That Endure.",
    bio: "Selestin helps businesses build brands people remember and trust. With 25+ years across advertising, branding, digital design, and product innovation, he turns ideas into brand experiences that stand out — and stand the test of time. His award-winning work spans brand identity, packaging, marketing, websites, and digital products, including recognition for national Girl Child Safety awareness campaigns and multiple Best Design and UI/UX awards. For every client, Selestin brings strategic thinking, bold creativity, and a sharp sense of what moves audiences — so your brand does not just look great, it drives real growth.",
  },
  {
    img: "/assets/sachin.png",
    name: "Sachin Menon",
    role: "Strategy & Growth",
    eyebrow: "Connecting Business Goals With Brands That Grow.",
    bio: "Sachin helps businesses grow by connecting sharp strategy with brands and products people love. With over a decade founding and scaling ventures across software, marketing, and consumer products, he sees the whole picture — from your business goals to the customer experience that delivers them. For clients, that means brands and digital experiences built not just to look good, but to drive engagement, conversion, and long-term loyalty.",
  },
  {
    img: "/assets/team2.jpg",
    name: "Jai Kumar",
    role: "Senior Full-Stack Developer",
    eyebrow: "Fast, Reliable Websites & Apps — Built to Grow Your Business.",
    bio: "Jai builds fast, reliable, modern websites and applications that help businesses grow — handling everything from design to launch and beyond. With 12+ years across the full stack, he works fluently with HTML5, CSS3, JavaScript, jQuery, React, Next.js, and WordPress on the front end, and Node.js, REST APIs, databases, deployment, and AWS behind it — plus custom AI chat integrations that make products smarter. For every client, Jai brings real agency delivery discipline: owning each project end to end, with SEO, performance, and ongoing support built in.",
  },
];

const PROJECT_TYPES = ["Branding", "UI/UX Design", "Development", "AI Integration", "Not sure yet"];

export default function Landing({ midHtml, endHtml, inlineStyles }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", projectType: "", details: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.details) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          projectType: form.projectType,
          details: `Phone: ${form.phone || "—"}\n\n${form.details}`,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", projectType: "", details: "" });
    } catch {
      setStatus("error");
    }
  };

  // Leadership scroll-reveal (same fade-up feel as the rest of the site)
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll(".ww-team-card"));
    cards.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition =
        "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)";
      el.dataset.delay = String(i * 110);
    });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const d = parseInt(entry.target.dataset.delay || "0", 10);
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, d);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />

      {/* ── 1. Banner: left text · right form ─────────────────── */}
      <section className="lp-hero">
        {/* Background video (free Pexels stock) with image poster fallback */}
        <video
          className="lp-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/banner-slide.png"
        >
          <source
            src="https://videos.pexels.com/video-files/8733062/8733062-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>

        <div className="lp-hero-grid">
          {/* Left — pitch */}
          <div className="lp-hero-left">
            <p className="lp-hero-eyebrow">White Wolf — Digital Growth Partner</p>
            <h1 className="lp-hero-title">
              Turn Your Idea Into a Brand the Market Can&apos;t Ignore.
            </h1>
            <p className="lp-hero-sub">
              Strategy, design, engineering, and AI — under one roof. Tell us where you want to grow,
              and we&apos;ll show you how to get there.
            </p>
            <ul className="lp-hero-points">
              <li>20+ years of branding &amp; product expertise</li>
              <li>End-to-end delivery — brand, web, app &amp; AI</li>
              <li>Trusted across India, UAE &amp; Qatar</li>
              <li>A reply within 24 hours, guaranteed</li>
            </ul>
          </div>

          {/* Right — lead form */}
          <div className="lp-hero-right">
            <div className="lp-form-card">
              <h2 className="lp-form-title">Get a Free Consultation</h2>
              <p className="lp-form-note">No obligation. Just a real conversation about your goals.</p>

              {status === "sent" ? (
                <div className="lp-form-success">
                  <div className="lp-form-success-icon">✓</div>
                  <h3>Thank you!</h3>
                  <p>We&apos;ve received your details and will be in touch within 24 hours.</p>
                </div>
              ) : (
                <form className="lp-form" onSubmit={submit}>
                  <div className="lp-field">
                    <label>Name *</label>
                    <input type="text" value={form.name} onChange={update("name")} placeholder="Your full name" required />
                  </div>
                  <div className="lp-field-row">
                    <div className="lp-field">
                      <label>Email *</label>
                      <input type="email" value={form.email} onChange={update("email")} placeholder="you@company.com" required />
                    </div>
                    <div className="lp-field">
                      <label>Phone</label>
                      <input type="tel" value={form.phone} onChange={update("phone")} placeholder="+91 ..." />
                    </div>
                  </div>
                  <div className="lp-field">
                    <label>What do you need?</label>
                    <select value={form.projectType} onChange={update("projectType")}>
                      <option value="">Select a service</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="lp-field">
                    <label>Tell us about your project *</label>
                    <textarea rows={3} value={form.details} onChange={update("details")} placeholder="A few lines about your goals..." required />
                  </div>

                  {status === "error" && (
                    <p className="lp-form-error">Please fill in your name, email and project details.</p>
                  )}

                  <button type="submit" className="lp-form-btn" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Request My Free Consultation →"}
                  </button>
                  <p className="lp-form-privacy">We respect your privacy. Your details are never shared.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2–5. Same as homepage: About · Process · Services · Work ── */}
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: midHtml }} />

      {/* ── 6. Leadership team ────────────────────────────────── */}
      <section className="ww-about-section ww-lp-leadership">
        <div className="ww-container">
          <div className="ww-about-story-grid" style={{ marginBottom: "3rem" }}>
            <div className="ww-about-label-col">
              <p className="ww-about-label">Leadership</p>
            </div>
            <div className="ww-about-content-col">
              <p className="ww-about-body">
                Led by industry professionals with 20+ years of combined experience across branding,
                product design, technology, and digital transformation.
              </p>
            </div>
          </div>

          <div className="ww-team-grid">
            {TEAM.map(({ img, name, role, eyebrow, bio }) => (
              <div className="ww-team-card" key={name}>
                <div
                  className="ww-team-portrait"
                  tabIndex={bio ? 0 : undefined}
                  role={bio ? "button" : undefined}
                  aria-label={bio ? `Read bio for ${name}` : undefined}
                >
                  {img ? (
                    <img src={img} alt={name} className="ww-team-img" />
                  ) : (
                    <div className="ww-team-placeholder"><span>+</span></div>
                  )}
                  <div className="ww-team-default-bar">
                    <p className="ww-team-default-name">{name}</p>
                    <p className="ww-team-default-role">{role}</p>
                  </div>
                  {bio && (
                    <div className="ww-team-bio-overlay">
                      <p className="ww-bio-eyebrow">{eyebrow}</p>
                      <p className="ww-bio-name">{name}</p>
                      <p className="ww-bio-role">{role}</p>
                      <div className="ww-bio-divider" />
                      <p className="ww-bio-text">{bio}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rest same as homepage: Why · Contact · CTA ────────── */}
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: endHtml }} />
    </>
  );
}

export async function getStaticProps() {
  const { bodyHtml, inlineStyles } = require("../lib/processed-html.js");

  const aboutStart = bodyHtml.indexOf('<section id="about"');
  const whyStart = bodyHtml.indexOf('<section class="section ww-why"');

  const midHtml = bodyHtml.substring(aboutStart, whyStart); // about · process · service · project
  const endHtml = bodyHtml.substring(whyStart);             // why · contact · cta

  return {
    props: {
      midHtml,
      endHtml,
      inlineStyles,
      isLanding: true,
      noindex: true, // campaign page reuses homepage sections — keep out of the index
      title: "Grow With White Wolf — Free Consultation",
      description: "Branding, UI/UX, Development & AI under one roof. Book a free consultation and grow your business.",
    },
  };
}
