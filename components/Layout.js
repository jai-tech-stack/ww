import Head from "next/head";
import Link from "next/link";
import Navbar from "./Navbar";

const FOOTER_SERVICES = [
  { label: "Branding",               href: "/services/branding" },
  { label: "UI/UX Design",           href: "/services/ui-ux-design" },
  { label: "Development",            href: "/services/development" },
  { label: "AI Integrated Services", href: "/services/ai-integrated-services" },
];

const FOOTER_NAV = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Process",      href: "/process" },
  { label: "Insights",     href: "/insights" },
];

export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} — White Wolf` : "White Wolf — Digital Transformation Agency"}</title>
        <meta name="description" content={description || "White Wolf helps global businesses transform ideas into scalable digital experiences through branding, UI/UX, development, and AI-powered innovation."} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/icon.svg" type="image/svg+xml" />
      </Head>

      <div className="ww-page">
        <Navbar />
        <main className="ww-main">{children}</main>

        {/* Footer */}
        <footer className="ww-footer">
          <div className="ww-footer-inner">
            <div className="ww-footer-top">
              <div className="ww-footer-brand">
                <img src="/assets/white-wolf-logo.svg" alt="White Wolf" style={{ height: 32, marginBottom: "1rem" }} />
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", lineHeight: 1.7, maxWidth: 260 }}>
                  Bangalore-based digital transformation agency. Branding · UI/UX · Development · AI.
                </p>
              </div>

              <div className="ww-footer-col">
                <p className="ww-footer-col-title">Navigate</p>
                {FOOTER_NAV.map((l) => (
                  <Link key={l.href} href={l.href} className="ww-footer-link">{l.label}</Link>
                ))}
              </div>

              <div className="ww-footer-col">
                <p className="ww-footer-col-title">Services</p>
                {FOOTER_SERVICES.map((l) => (
                  <Link key={l.href} href={l.href} className="ww-footer-link">{l.label}</Link>
                ))}
              </div>

              <div className="ww-footer-col">
                <p className="ww-footer-col-title">Contact</p>
                <a href="mailto:selestin.s@gmail.com" className="ww-footer-link">selestin.s@gmail.com</a>
                <a href="tel:+919880459502" className="ww-footer-link">+91 98804 59502</a>
                <span className="ww-footer-link" style={{ cursor: "default" }}>Bangalore, India</span>
              </div>
            </div>

            <div className="ww-footer-bottom">
              <span>© {new Date().getFullYear()} White Wolf Digital Agency. All rights reserved.</span>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <a href="https://www.behance.net/selestin" target="_blank" rel="noopener noreferrer" className="ww-footer-link" style={{ fontSize: "0.8rem" }}>Behance</a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="ww-footer-link" style={{ fontSize: "0.8rem" }}>LinkedIn</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
