import { useEffect } from 'react';

const TEAM = [
  {
    img: '/assets/team-1.jpg',
    name: 'Selestin Anthony',
    role: 'Founder & Creative Director',
    eyebrow: '25+ Years of Creative Leadership. Building Brands That Endure.',
    bio: 'With over 25 years of experience spanning advertising, branding, digital design, and product innovation, Selestin Anthony has built a distinguished career transforming ideas into impactful brand experiences. Beginning as a visualizer, he evolved into a multidisciplinary creative leader, delivering award-winning work across brand identity, packaging, marketing communications, websites, and digital products. His work has been recognized through multiple industry accolades, including awards for national Girl Child Safety and protection awareness campaigns, Best Design and UI/UX awards, and large-scale brand initiatives. Driven by a passion for design beyond boundaries, Selestin combines strategic thinking, creativity, and emerging technologies to help organizations build meaningful brands, exceptional user experiences, and future-ready digital solutions.',
  },
  {
    img: '/assets/team2.jpg',
    name: 'Jai Kumar',
    role: 'Technical Head & AI Engineer',
    eyebrow: 'Engineering Scalable Solutions. Powering Intelligent Innovation.',
    bio: 'With over 12+ years of experience in web technologies, cloud infrastructure, e-commerce, and AI-driven solutions, Jai Kumar leads the technical vision at White Wolf. He has successfully delivered and managed digital platforms for organizations across India, the UAE, and Qatar, spanning healthcare, real estate, nonprofit, and consumer sectors. His expertise covers the entire digital lifecycle — from strategy and architecture to development, cloud deployment, performance optimization, and AI integration. As the creator of Mintbrand, a SaaS-based branding workflow platform, Jai brings a unique blend of technical excellence, product thinking, and business insight. Passionate about innovation, he helps organizations build secure, scalable, and intelligent digital ecosystems that drive measurable growth and long-term value.',
  },
  {
    img: null,
    name: 'Sachin Menon',
    role: 'Strategy & Growth',
    eyebrow: null,
    bio: null,
  },
];

export default function About() {

  useEffect(() => {
    // Deterministic scroll-reveal (IntersectionObserver) — same fade-up feel
    // as the homepage, without depending on GSAP/Lenis load timing.
    const reveals = [];
    const add = (el, delay = 0) => { if (el) reveals.push({ el, delay }); };

    document.querySelectorAll('.ww-about-story-grid').forEach(grid => {
      add(grid.querySelector('.ww-about-label-col'), 0);
      add(grid.querySelector('.ww-about-content-col'), 130);
    });
    document.querySelectorAll('.ww-mvv-card').forEach((el, i) => add(el, i * 110));
    document.querySelectorAll('.ww-team-card').forEach((el, i) => add(el, i * 110));
    add(document.querySelector('.ww-about-culture-heading'), 0);
    add(document.querySelector('.ww-about-cta-heading'), 0);
    add(document.querySelector('.ww-about-cta-btn'), 130);

    // Set initial hidden state
    reveals.forEach(({ el }) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(32px)';
      el.style.transition =
        'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)';
      el.style.willChange = 'opacity, transform';
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const r = reveals.find((x) => x.el === entry.target);
        const delay = r ? r.delay : 0;
        window.setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    reveals.forEach(({ el }) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="ww-page-hero">
        <div className="ww-page-hero-inner">
          <p className="ww-page-tag">About Us</p>
          <h1 className="ww-page-title">Driven by Experience.<br />Built for Innovation.</h1>
          <p className="ww-page-subtitle">
            White Wolf was founded to bridge strategy, creativity, technology, and AI innovation into one powerful digital transformation partner.
            With leadership experience spanning more than two decades, we help businesses build future-ready brands and products for global markets.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="ww-about-section">
        <div className="ww-container">
          <div className="ww-about-story-grid">
            <div className="ww-about-label-col">
              <p className="ww-about-label">Our Story</p>
            </div>
            <div className="ww-about-content-col">
              <p className="ww-about-body">White Wolf emerged from a vision to create a modern digital agency that goes beyond execution.</p>
              <p className="ww-about-body">We believe the future belongs to businesses that combine exceptional design, intelligent technology, and human-centered experiences.</p>
              <p className="ww-about-body">Our team brings together expertise in branding, digital product design, engineering, and AI-driven innovation to help companies scale with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="ww-about-section ww-about-mvv">
        <div className="ww-container">
          <div className="ww-mvv-grid">
            <div className="ww-mvv-card">
              <p className="ww-mvv-label">Mission</p>
              <p className="ww-mvv-text">To create intelligent digital experiences that empower ambitious businesses to lead their industries.</p>
            </div>
            <div className="ww-mvv-card">
              <p className="ww-mvv-label">Vision</p>
              <p className="ww-mvv-text">To become a globally respected innovation agency shaping the future of digital products and AI experiences.</p>
            </div>
            <div className="ww-mvv-card ww-mvv-card--values">
              <p className="ww-mvv-label">Core Values</p>
              <div className="ww-values-grid">
                {[
                  { n: '01', v: 'Innovation' },
                  { n: '02', v: 'Clarity' },
                  { n: '03', v: 'Excellence' },
                  { n: '04', v: 'Collaboration' },
                  { n: '05', v: 'Transparency' },
                  { n: '06', v: 'Future Thinking' },
                ].map(({ n, v }) => (
                  <div className="ww-value-item" key={v}>
                    <span className="ww-value-num">{n}</span>
                    <span className="ww-value-name">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="ww-about-section">
        <div className="ww-container">
          <div className="ww-about-story-grid" style={{ marginBottom: '3rem' }}>
            <div className="ww-about-label-col">
              <p className="ww-about-label">Leadership</p>
            </div>
            <div className="ww-about-content-col">
              <p className="ww-about-body">Led by industry professionals with 20+ years of experience across branding, product design, technology, and digital transformation.</p>
              <p className="ww-about-body">White Wolf combines strategic leadership with hands-on execution to ensure every project delivers measurable impact.</p>
            </div>
          </div>

          {/* Team grid */}
          <div className="ww-team-grid">
            {TEAM.map(({ img, name, role, eyebrow, bio }) => (
              <div className="ww-team-card" key={name}>
                <div
                  className="ww-team-portrait"
                  tabIndex={bio ? 0 : undefined}
                  role={bio ? 'button' : undefined}
                  aria-label={bio ? `Read bio for ${name}` : undefined}
                >
                  {img ? (
                    <img src={img} alt={name} className="ww-team-img" />
                  ) : (
                    <div className="ww-team-placeholder"><span>+</span></div>
                  )}

                  {/* Default name bar — always visible */}
                  <div className="ww-team-default-bar">
                    <p className="ww-team-default-name">{name}</p>
                    <p className="ww-team-default-role">{role}</p>
                  </div>

                  {/* Bio overlay — slides up on hover */}
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

      {/* Culture */}
      <section className="ww-about-section ww-about-culture">
        <div className="ww-container">
          <div className="ww-about-story-grid">
            <div className="ww-about-label-col">
              <p className="ww-about-label">Culture</p>
            </div>
            <div className="ww-about-content-col">
              <h2 className="ww-about-culture-heading">Built for Creative Thinkers & Problem Solvers.</h2>
              <p className="ww-about-body">We foster a culture of curiosity, innovation, experimentation, and collaboration.</p>
              <p className="ww-about-body">Our approach combines creative exploration with strategic execution to deliver meaningful digital experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ww-about-cta">
        <div className="ww-container">
          <h2 className="ww-about-cta-heading">Let's Build Something Exceptional Together.</h2>
          <a href="/contact" className="ww-about-cta-btn">Get In Touch</a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "About — White Wolf",
      description: "Driven by Experience. Built for Innovation. White Wolf bridges strategy, creativity, technology, and AI innovation.",
    },
  };
}
