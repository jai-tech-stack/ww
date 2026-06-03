import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const SERVICES = [
  { label: "Branding",               href: "/services/branding" },
  { label: "UI/UX Design",           href: "/services/ui-ux-design" },
  { label: "Development",            href: "/services/development" },
  { label: "AI Integrated Services", href: "/services/ai-integrated-services" },
];

const NAV_LINKS = [
  { label: "Home",          href: "/" },
  { label: "About",         href: "/about" },
  { label: "Services",      href: "/services", hasDropdown: true },
  { label: "Case Studies",  href: "/case-studies" },
  { label: "Process",       href: "/process" },
  { label: "Insights",      href: "/insights" },
];

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  return (
    <>
      <nav className="ww-navbar" style={{ background: scrolled ? "rgba(19,16,33,0.97)" : "rgba(19,16,33,0.92)" }}>
        <div className="ww-nav-inner">
          {/* Logo */}
          <Link href="/" className="ww-nav-logo">
            <img src="/assets/white-wolf-logo.svg" alt="White Wolf" style={{ height: 34, width: "auto" }} />
          </Link>

          {/* Desktop nav */}
          <div className="ww-nav-links">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="ww-nav-dropdown-wrap"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`ww-nav-link${isActive(link.href) ? " ww-nav-link--active" : ""}`}
                  >
                    {link.label}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: 4, transition: "transform 0.2s", transform: servicesOpen ? "rotate(180deg)" : "none" }}>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </Link>
                  {servicesOpen && (
                    <div className="ww-nav-dropdown">
                      {SERVICES.map((s) => (
                        <Link key={s.href} href={s.href} className="ww-nav-dropdown-item">
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`ww-nav-link${isActive(link.href) ? " ww-nav-link--active" : ""}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <Link href="/contact" className="ww-nav-cta">
            Contact Us
          </Link>

          {/* Hamburger */}
          <button
            className="ww-nav-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="ww-mobile-menu">
          {NAV_LINKS.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                className="ww-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
              {link.hasDropdown && (
                <div className="ww-mobile-sub">
                  {SERVICES.map((s) => (
                    <Link key={s.href} href={s.href} className="ww-mobile-sub-link" onClick={() => setMenuOpen(false)}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="ww-nav-cta" style={{ marginTop: "1.5rem", display: "inline-flex" }} onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
        </div>
      )}
    </>
  );
}
