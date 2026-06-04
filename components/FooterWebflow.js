import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Twitter", href: "https://x.com/" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#service" },
  { label: "Case Studies", href: "/#project" },
];

const UTILITY_LINKS = [
  { label: "License", href: "/license" },
  { label: "Changelog", href: "/changelog" },
  { label: "Style Guide", href: "/style-guide" },
];

export default function FooterWebflow() {
  return (
    <footer className="footer-section">
      <section className="section footer">
        <div className="footer-top-content">
          <div className="w-layout-blockcontainer container w-container">
            <div className="footer-main-wrapper">
              {/* Social Links Column */}
              <div className="overflow-hidden">
                <div className="footer-menu-block">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-menu-link w-inline-block"
                    >
                      <h6 className="footer-menu-iteam">{social.label}</h6>
                      <div className="footer-hover-icon-block">
                        <svg className="footer-menu-arrow _1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        <svg className="footer-menu-arrow _2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation Column */}
              <div className="overflow-hidden">
                <div className="footer-menu-block">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="footer-section-id-link w-inline-block"
                    >
                      <h6 className="footer-menu-iteam hover">{link.label}</h6>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Column */}
              <div className="overflow-hidden _3">
                <div className="sign-up-block">
                  <p className="sign-up-para">
                    Sign up for our newsletter to get latest insights and updates
                  </p>
                  <div className="footer-form-block w-form">
                    <form className="footer-form" onSubmit={(e) => {
                      e.preventDefault();
                      alert("Thank you! Your submission has been received!");
                    }}>
                      <input
                        className="footer-text-field w-input"
                        maxLength="256"
                        name="Footer-Email"
                        placeholder="Enter email address"
                        type="email"
                        required
                      />
                      <input
                        type="submit"
                        className="footer-submit-button w-button"
                        value="Subscribe"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bottom Info */}
            <div className="footer-bottom-wrap">
              <div className="overflow-hidden">
                <div className="footer-info-left-wrap">
                  <div className="footer-info-text">
                    <span className="span-text-pimary-color">©</span> {new Date().getFullYear()} White Wolf Digital.
                  </div>
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="footer-info-middle-wrap">
                  {UTILITY_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} className="utility-page-link w-inline-block">
                      <div className="footer-info-text hover">{link.label}</div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="footer-info-right-wrap">
                  <div className="footer-info-text">
                    Designed by{" "}
                    <a href="https://origamicreative.com/" target="_blank" rel="noopener noreferrer" className="footer-info-text-span">
                      Origami Creative
                    </a>{" "}
                    | Built with{" "}
                    <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="footer-info-text-span">
                      Next.js
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Marquee */}
      <div className="footer-bottom-marquee-wrapper">
        <div className="footer-bottom-marquee section">
          <div className="footer-bottom-text-wrapper">
            <div className="bottom-big-text">
              <h1 className="footer-bottom-text">White Wolf</h1>
              <h1 className="footer-bottom-text">—</h1>
            </div>
            <div className="bottom-big-text">
              <h1 className="footer-bottom-text">Digital</h1>
              <h1 className="footer-bottom-text">—</h1>
            </div>
            <div className="bottom-big-text">
              <h1 className="footer-bottom-text">Agency</h1>
              <h1 className="footer-bottom-text">—</h1>
            </div>
          </div>

          <div className="footer-bottom-text-wrapper">
            <div className="bottom-big-text">
              <h1 className="footer-bottom-text">White Wolf</h1>
              <h1 className="footer-bottom-text">—</h1>
            </div>
            <div className="bottom-big-text">
              <h1 className="footer-bottom-text">Digital</h1>
              <h1 className="footer-bottom-text">—</h1>
            </div>
            <div className="bottom-big-text">
              <h1 className="footer-bottom-text">Agency</h1>
              <h1 className="footer-bottom-text">—</h1>
            </div>
          </div>

          <div className="footer-bottom-text-wrapper">
            <div className="bottom-big-text">
              <h1 className="footer-bottom-text">White Wolf</h1>
              <h1 className="footer-bottom-text">—</h1>
            </div>
            <div className="bottom-big-text">
              <h1 className="footer-bottom-text">Digital</h1>
              <h1 className="footer-bottom-text">—</h1>
            </div>
            <div className="bottom-big-text">
              <h1 className="footer-bottom-text">Agency</h1>
              <h1 className="footer-bottom-text">—</h1>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
