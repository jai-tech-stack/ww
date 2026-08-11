import { useEffect } from "react";

const SERVICES = [
  {
    num: "01",
    label: "Branding",
    headline: "Building Brands That Create Market Impact.",
    intro:
      "We help businesses define who they are, how they communicate, and how they are perceived in competitive global markets.",
    included: [
      "Brand Strategy",
      "Brand Positioning",
      "Visual Identity Design",
      "Logo Design",
      "Brand Guidelines",
      "Messaging & Voice",
      "Marketing Assets",
      "Brand Experience Systems",
    ],
    value:
      "Strong brands create trust, differentiation, and long-term business value. White Wolf builds modern brand systems designed for digital-first audiences.",
  },
  {
    num: "02",
    label: "UI/UX Design",
    headline: "Designing Digital Experiences People Love.",
    intro:
      "We create user-centered digital products that combine simplicity, usability, and business performance.",
    included: [
      "UX Research",
      "Product Strategy",
      "Wireframing",
      "UI Design",
      "Design Systems",
      "Web Design",
      "Mobile App Design",
      "SaaS Product Design",
      "Prototyping",
      "User Testing",
    ],
    value:
      "Exceptional design improves engagement, retention, and customer satisfaction. We create experiences that are visually refined and strategically optimized.",
  },
  {
    num: "03",
    label: "Development",
    headline: "Engineering Scalable Digital Products.",
    intro:
      "From websites to enterprise platforms, we build high-performance digital solutions engineered for scale and reliability.",
    included: [
      "Website Development",
      "Web Applications",
      "Mobile Applications",
      "SaaS Platforms",
      "CMS Solutions",
      "E-commerce Development",
      "API Integrations",
      "Cloud Infrastructure",
      "Performance Optimization",
    ],
    tech: ["React", "Next.js", "Node.js", "Python", "AI APIs", "Cloud Platforms"],
  },
  {
    num: "04",
    label: "AI Integrated Services",
    headline: "AI-Powered Innovation for Modern Businesses.",
    intro:
      "We help organizations leverage AI to automate processes, enhance customer experiences, and unlock new business opportunities.",
    included: [
      "AI Strategy Consulting",
      "AI Product Integration",
      "Generative AI Solutions",
      "AI Chatbots",
      "Workflow Automation",
      "Predictive Intelligence",
      "AI-Driven UX",
      "AI-Powered Analytics",
      "Custom AI Applications",
    ],
    value:
      "AI is not just technology — it is a competitive advantage. White Wolf helps businesses implement practical AI solutions with real-world business impact.",
  },
];

export default function Services() {
  useEffect(() => {
    let attempts = 0;
    const run = () => {
      const g = window.gsap;
      const ST = window.ScrollTrigger;
      if (!g || !ST) {
        if (++attempts < 40) setTimeout(run, 150);
        return;
      }
      g.registerPlugin(ST);

      document.querySelectorAll(".ww-svc-block").forEach((block) => {
        const head = block.querySelector(".ww-svc-head");
        const body = block.querySelector(".ww-svc-body");
        if (head)
          g.fromTo(
            head,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: head, start: "top 88%", once: true } }
          );
        if (body)
          g.fromTo(
            body,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.9, delay: 0.16, ease: "power3.out", scrollTrigger: { trigger: body, start: "top 88%", once: true } }
          );

        const items = block.querySelectorAll(".ww-svc-item");
        if (items.length)
          g.fromTo(
            items,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.05, scrollTrigger: { trigger: items[0], start: "top 90%", once: true } }
          );
      });

      const ctaH = document.querySelector(".ww-about-cta-heading");
      const ctaB = document.querySelector(".ww-about-cta-btn");
      if (ctaH) g.fromTo(ctaH, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: ctaH, start: "top 90%", once: true } });
      if (ctaB) g.fromTo(ctaB, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75, delay: 0.14, ease: "power3.out", scrollTrigger: { trigger: ctaB, start: "top 92%", once: true } });
    };
    run();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="ww-page-hero">
        <div className="ww-page-hero-inner">
          <p className="ww-page-tag">Our Services</p>
          <h1 className="ww-page-title">End-to-End Digital Transformation.</h1>
          <p className="ww-page-subtitle">
            From brand strategy to AI integration — we deliver every capability your business needs to lead in the digital era,
            all under one roof.
          </p>
        </div>
      </section>

      {/* Service blocks */}
      {SERVICES.map((s, idx) => (
        <section
          key={s.num}
          className={`ww-about-section ww-svc-block ${idx % 2 === 1 ? "ww-svc-block--alt" : ""}`}
        >
          <div className="ww-container">
            <div className="ww-svc-grid">

              {/* Left — number + label */}
              <div className="ww-svc-head">
                <span className="ww-svc-num">{s.num}</span>
                <p className="ww-svc-label">{s.label}</p>
              </div>

              {/* Right — headline, intro, included, value */}
              <div className="ww-svc-body">
                <h2 className="ww-svc-headline">{s.headline}</h2>
                <p className="ww-svc-intro">{s.intro}</p>

                <p className="ww-svc-included-label">What's Included</p>
                <div className="ww-svc-included">
                  {s.included.map((item, i) => (
                    <div className="ww-svc-item" key={item}>
                      <span className="ww-svc-item-dot" />
                      <span className="ww-svc-item-name">{item}</span>
                    </div>
                  ))}
                </div>

                {s.tech && (
                  <div className="ww-svc-tech-wrap">
                    <p className="ww-svc-included-label">Technologies</p>
                    <div className="ww-svc-tech-row">
                      {s.tech.map((t) => (
                        <span className="ww-svc-tech-chip" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                {s.value && (
                  <div className="ww-svc-value">
                    <span className="ww-svc-value-mark">“</span>
                    <p className="ww-svc-value-text">{s.value}</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="ww-about-cta">
        <div className="ww-container">
          <h2 className="ww-about-cta-heading">Have a Project in Mind? Let's Talk.</h2>
          <a href="/contact" className="ww-about-cta-btn">Get In Touch</a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const serviceList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "White Wolf Services",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.label,
        description: s.intro,
        provider: { "@type": "Organization", name: "White Wolf" },
        serviceType: s.label,
      },
    })),
  };

  return {
    props: {
      title: "Branding, UI/UX, Web & AI Services | White Wolf",
      description:
        "Explore White Wolf's branding, UI/UX design, web development and AI integration services—an end-to-end team for strategy, design, engineering and growth.",
      jsonLd: serviceList,
    },
  };
}
