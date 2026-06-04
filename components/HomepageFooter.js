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
  { label: "Process", href: "/process" },
  { label: "Case Studies", href: "/case-studies" },
];

const SERVICES_LIST = [
  { label: "Branding", href: "/services/branding" },
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "Development", href: "/services/development" },
  { label: "AI-Solutions", href: "/services/ai-integrated-services" },
];

const FOOTER_INFO = [
  { label: "License", href: "/license" },
  { label: "Changelog", href: "/changelog" },
  { label: "Style Guide", href: "/style-guide" },
];

export default function HomepageFooter() {
  return (
    <footer className="webflow-footer">
      {/* Main Footer Content */}
      <div className="footer-main-wrapper">
        <div className="footer-inner">
          {/* Logo & Heading Column */}
          <div className="footer-column footer-brand-column">
            <div className="footer-brand-section">
              <img src="/assets/white-wolf-logo.svg" alt="White Wolf" className="footer-logo" />
              <h2 className="footer-heading">White Wolf</h2>
              <p className="footer-subheading">Digital Transformation Agency</p>
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

          {/* Services List Column */}
          <div className="footer-column footer-services-column">
            <div className="services-list">
              {SERVICES_LIST.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="service-list-item"
                >
                  {service.label}
                </Link>
              ))}
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
