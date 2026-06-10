import { useEffect } from 'react';

export default function About() {

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('ww-reveal--visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.ww-reveal').forEach(el => obs.observe(el));
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
            <div className="ww-about-label-col ww-reveal" style={{ transitionDelay: '0ms' }}>
              <p className="ww-about-label">Our Story</p>
            </div>
            <div className="ww-about-content-col ww-reveal" style={{ transitionDelay: '140ms' }}>
              <p className="ww-about-body">
                White Wolf emerged from a vision to create a modern digital agency that goes beyond execution.
              </p>
              <p className="ww-about-body">
                We believe the future belongs to businesses that combine exceptional design, intelligent technology, and human-centered experiences.
              </p>
              <p className="ww-about-body">
                Our team brings together expertise in branding, digital product design, engineering, and AI-driven innovation to help companies scale with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="ww-about-section ww-about-mvv">
        <div className="ww-container">
          <div className="ww-mvv-grid">

            {/* Mission */}
            <div className="ww-mvv-card ww-reveal" style={{ transitionDelay: '0ms' }}>
              <p className="ww-mvv-label">Mission</p>
              <p className="ww-mvv-text">To create intelligent digital experiences that empower ambitious businesses to lead their industries.</p>
            </div>

            {/* Vision */}
            <div className="ww-mvv-card ww-reveal" style={{ transitionDelay: '100ms' }}>
              <p className="ww-mvv-label">Vision</p>
              <p className="ww-mvv-text">To become a globally respected innovation agency shaping the future of digital products and AI experiences.</p>
            </div>

            {/* Core Values — redesigned */}
            <div className="ww-mvv-card ww-mvv-card--values ww-reveal" style={{ transitionDelay: '200ms' }}>
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
            <div className="ww-about-label-col ww-reveal" style={{ transitionDelay: '0ms' }}>
              <p className="ww-about-label">Leadership</p>
            </div>
            <div className="ww-about-content-col ww-reveal" style={{ transitionDelay: '140ms' }}>
              <p className="ww-about-body">
                Led by industry professionals with 20+ years of experience across branding, product design, technology, and digital transformation.
              </p>
              <p className="ww-about-body">
                White Wolf combines strategic leadership with hands-on execution to ensure every project delivers measurable impact.
              </p>
            </div>
          </div>

          {/* Team 3-column grid */}
          <div className="ww-team-grid">
            <div className="ww-team-card ww-reveal" style={{ transitionDelay: '0ms' }}>
              <div className="ww-team-img-wrap">
                <img src="/assets/team-1.jpg" alt="Selestin Anthony" className="ww-team-img" />
              </div>
              <div className="ww-team-info">
                <p className="ww-team-name">Selestin Anthony</p>
                <p className="ww-team-role">Founder & Creative Director</p>
              </div>
            </div>
            <div className="ww-team-card ww-reveal" style={{ transitionDelay: '100ms' }}>
              <div className="ww-team-img-wrap ww-team-img--placeholder">
                <span>+</span>
              </div>
              <div className="ww-team-info">
                <p className="ww-team-name">Coming Soon</p>
                <p className="ww-team-role">Technology Lead</p>
              </div>
            </div>
            <div className="ww-team-card ww-reveal" style={{ transitionDelay: '200ms' }}>
              <div className="ww-team-img-wrap ww-team-img--placeholder">
                <span>+</span>
              </div>
              <div className="ww-team-info">
                <p className="ww-team-name">Coming Soon</p>
                <p className="ww-team-role">Strategy & Growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="ww-about-section ww-about-culture">
        <div className="ww-container">
          <div className="ww-about-story-grid">
            <div className="ww-about-label-col ww-reveal" style={{ transitionDelay: '0ms' }}>
              <p className="ww-about-label">Culture</p>
            </div>
            <div className="ww-about-content-col ww-reveal" style={{ transitionDelay: '140ms' }}>
              <h2 className="ww-about-culture-heading">Built for Creative Thinkers & Problem Solvers.</h2>
              <p className="ww-about-body">
                We foster a culture of curiosity, innovation, experimentation, and collaboration.
              </p>
              <p className="ww-about-body">
                Our approach combines creative exploration with strategic execution to deliver meaningful digital experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ww-about-cta">
        <div className="ww-container">
          <h2 className="ww-about-cta-heading ww-reveal">Let's Build Something Exceptional Together.</h2>
          <a href="/contact" className="ww-about-cta-btn ww-reveal" style={{ transitionDelay: '120ms' }}>Get In Touch</a>
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
