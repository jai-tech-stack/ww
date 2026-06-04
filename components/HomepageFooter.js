import Link from "next/link";
import { useState } from "react";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { label: "Dribbble", href: "https://dribbble.com/", icon: "dribbble" },
  { label: "Behance", href: "https://www.behance.net/", icon: "behance" },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
];

const FOOTER_INFO = [
  { label: "License", href: "/license" },
  { label: "Changelog", href: "/changelog" },
  { label: "Style Guide", href: "/style-guide" },
];

export default function HomepageFooter() {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setEmailMessage("Thank you! Your submission has been received!");
      setEmail("");
      setTimeout(() => setEmailMessage(""), 5000);
    }
  };

  return (
    <footer className="webflow-footer">
      {/* Main Footer Content */}
      <div className="footer-main-wrapper">
        <div className="footer-inner">
          {/* Social Links Column */}
          <div className="footer-column footer-social-column">
            <div className="footer-menu-block">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-menu-link"
                >
                  <h6 className="footer-menu-item">{social.label}</h6>
                  <div className="footer-hover-icon-block">
                    <svg className="footer-menu-arrow _1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg className="footer-menu-arrow _2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="footer-column footer-nav-column">
            <div className="footer-menu-block">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-section-link"
                >
                  <h6 className="footer-menu-item hover">{link.label}</h6>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Signup Column */}
          <div className="footer-column footer-newsletter-column">
            <div className="newsletter-block">
              <p className="newsletter-description">
                Sign up for our newsletter to get latest insights and updates
              </p>

              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="newsletter-button">
                    Subscribe
                  </button>
                </div>
                {emailMessage && (
                  <p className="newsletter-success">{emailMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Info Bar */}
      <div className="footer-bottom-wrap">
        <div className="footer-bottom-left">
          <div className="footer-info-text">
            <span className="copyright-symbol">©</span> {new Date().getFullYear()} White Wolf Digital.
          </div>
        </div>

        <div className="footer-bottom-center">
          {FOOTER_INFO.map((item) => (
            <Link key={item.href} href={item.href} className="footer-info-link">
              <div className="footer-info-text hover">{item.label}</div>
            </Link>
          ))}
        </div>

        <div className="footer-bottom-right">
          <div className="footer-info-text">
            Designed by{" "}
            <a href="https://origamicreative.com/" target="_blank" rel="noopener noreferrer" className="footer-info-span">
              Origami Creative
            </a>{" "}
            | Built with{" "}
            <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="footer-info-span">
              Next.js
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Marquee */}
      <div className="footer-bottom-marquee-wrapper">
        <div className="footer-bottom-marquee">
          <div className="marquee-content">
            <div className="marquee-text-block">
              <h1 className="marquee-text">White Wolf</h1>
              <h1 className="marquee-separator">—</h1>
            </div>
            <div className="marquee-text-block">
              <h1 className="marquee-text">Digital</h1>
              <h1 className="marquee-separator">—</h1>
            </div>
            <div className="marquee-text-block">
              <h1 className="marquee-text">Agency</h1>
              <h1 className="marquee-separator">—</h1>
            </div>
            <div className="marquee-text-block">
              <h1 className="marquee-text">White Wolf</h1>
              <h1 className="marquee-separator">—</h1>
            </div>
            <div className="marquee-text-block">
              <h1 className="marquee-text">Digital</h1>
              <h1 className="marquee-separator">—</h1>
            </div>
            <div className="marquee-text-block">
              <h1 className="marquee-text">Agency</h1>
              <h1 className="marquee-separator">—</h1>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
