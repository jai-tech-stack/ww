import Link from "next/link";

const FOOTER_SERVICES = [
  { label: "Branding", href: "/services/branding" },
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "Development", href: "/services/development" },
  { label: "AI Integrated Services", href: "/services/ai-integrated-services" },
];

const FOOTER_NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
];

export default function HomepageFooter() {
  return (
    <footer className="homepage-footer">
      {/* Footer Marquee Section */}
      <div className="footer-marquee-section">
        <div className="footer-marquee-wrapper">
          <div className="footer-marquee-scroll">
            <span className="footer-marquee-text">Let's Build Something Extraordinary</span>
            <span className="footer-marquee-text">Let's Build Something Extraordinary</span>
            <span className="footer-marquee-text">Let's Build Something Extraordinary</span>
          </div>
        </div>
      </div>

      {/* Footer Main Content */}
      <div className="footer-main-content">
        <div className="footer-inner-wrap">
          {/* Brand Section */}
          <div className="footer-brand-section">
            <img src="/assets/white-wolf-logo.svg" alt="White Wolf" className="footer-logo" />
            <p className="footer-brand-description">
              Bangalore-based digital transformation agency. We help global businesses transform ideas into scalable digital experiences through branding, UI/UX, development, and AI-powered innovation.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="footer-nav-section">
            <p className="footer-section-title">Navigate</p>
            <div className="footer-links-group">
              {FOOTER_NAV.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="footer-services-section">
            <p className="footer-section-title">Services</p>
            <div className="footer-links-group">
              {FOOTER_SERVICES.map((service) => (
                <Link key={service.href} href={service.href} className="footer-link">
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="footer-contact-section">
            <p className="footer-section-title">Contact</p>
            <div className="footer-contact-info">
              <a href="mailto:selestin.s@gmail.com" className="footer-link">
                selestin.s@gmail.com
              </a>
              <a href="tel:+919880459502" className="footer-link">
                +91 98804 59502
              </a>
              <span className="footer-link footer-location">Bangalore, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom-section">
        <div className="footer-bottom-wrap">
          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} White Wolf Digital Agency. All rights reserved.</p>
          </div>
          <div className="footer-social-links">
            <a
              href="https://www.behance.net/selestin"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              Behance
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
