import { useEffect } from 'react';

const TEAM = [
  {
    img: '/assets/selestin.jpeg',
    name: 'Selestin Anthony',
    role: 'Founder & Creative Director',
    eyebrow: '25+ Years of Creative Leadership. Building Brands That Endure.',
    bio: 'Selestin helps businesses build brands people remember and trust. With 25+ years across advertising, branding, digital design, and product innovation, he turns ideas into brand experiences that stand out — and stand the test of time. His award-winning work spans brand identity, packaging, marketing, websites, and digital products, including recognition for national Girl Child Safety awareness campaigns and multiple Best Design and UI/UX awards. For every client, Selestin brings strategic thinking, bold creativity, and a sharp sense of what moves audiences — so your brand does not just look great, it drives real growth.',
  },
  {
    img: '/assets/sachin.png',
    name: 'Sachin Menon',
    role: 'Strategy & Growth',
    eyebrow: 'Connecting Business Goals With Brands That Grow.',
    bio: 'Sachin helps businesses grow by connecting sharp strategy with brands and products people love. With over a decade founding and scaling ventures across software, marketing, and consumer products, he sees the whole picture — from your business goals to the customer experience that delivers them. For clients, that means brands and digital experiences built not just to look good, but to drive engagement, conversion, and long-term loyalty.',
  },
  {
    img: '/assets/team2.jpg',
    name: 'Jai Kumar',
    role: 'Senior Full-Stack Developer',
    eyebrow: 'Fast, Reliable Websites & Apps — Built to Grow Your Business.',
    bio: 'Jai builds fast, reliable, modern websites and applications that help businesses grow — handling everything from design to launch and beyond. With 12+ years across the full stack, he works fluently with HTML5, CSS3, JavaScript, jQuery, React, Next.js, and WordPress on the front end, and Node.js, REST APIs, databases, deployment, and AWS behind it — plus custom AI chat integrations that make products smarter. For every client, Jai brings real agency delivery discipline: owning each project end to end, with SEO, performance, and ongoing support built in.',
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
</p>
  <p className="ww-page-subtitle">With leadership experience spanning more than two decades, we help businesses build future-ready brands, digital products, and intelligent experiences for global markets.</p>

  <p className="ww-page-subtitle">As a venture of TechSigma Global, White Wolf combines creativity, technology, and AI to build scalable, future-ready solutions that drive business growth.</p>
          
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
