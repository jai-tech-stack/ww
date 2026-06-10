export default function SiteFooter() {

  const openChat = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('ww:openchat'));
    }
  };

  return (
    <div className="footer-section">
      <section className="section footer">
        <div className="ww-footer-new">
          <div className="ww-container">
            <div className="ww-footer-new-grid">

              {/* LEFT — Address */}
              <div className="ww-footer-locations">
                <p className="ww-footer-find-label">Locate us</p>
                <div className="ww-footer-location-item">
                  <h4 className="ww-footer-city">Bangalore</h4>
                  <p className="ww-footer-addr">
                    Maruthi Seva Nagar, HBR Layout 5th Block,<br />
                    Bangalore, India
                  </p>
                  <a
                    href="https://maps.google.com/?q=Maruthi+Seva+Nagar+HBR+Layout+5th+Block+Bangalore+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ww-footer-directions"
                  >
                    Get Directions
                  </a>
                </div>
              </div>

              {/* CENTER — Navigation */}
              <div className="ww-footer-nav-col">
                <p className="ww-footer-nav-label">Menu</p>
                <nav className="ww-footer-nav">
                  <a href="/" className="ww-footer-nav-link">Home</a>
                  <a href="/about" className="ww-footer-nav-link">About</a>
                  <a href="/services" className="ww-footer-nav-link">Services</a>
                  <a href="/case-studies" className="ww-footer-nav-link">Work</a>
                  <a href="/contact" className="ww-footer-nav-link">Contact</a>
                </nav>
              </div>

              {/* RIGHT — Social + Chat/Speak */}
              <div className="ww-footer-right">

                {/* Social icons */}
                <div className="ww-footer-social-row">
                  <p className="ww-footer-follow-label">Follow:</p>
                  <div className="ww-footer-social-icons">
                    <a href="https://www.linkedin.com/company/whitewolfone" target="_blank" rel="noopener noreferrer" className="ww-footer-social-icon" aria-label="LinkedIn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect x="2" y="9" width="4" height="12"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="ww-footer-social-icon" aria-label="Facebook">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Chat / Speak cards — side by side */}
                <div className="ww-footer-contact-cards">
                  <button
                    type="button"
                    className="ww-footer-contact-card"
                    onClick={openChat}
                    aria-label="Chat to us now"
                  >
                    <div className="ww-footer-card-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                    </div>
                    <div className="ww-footer-card-bottom">
                      <span className="ww-footer-card-label">Chat to<br />Us Now</span>
                      <span className="ww-footer-card-arrow">→</span>
                    </div>
                  </button>

                  <a
                    href="tel:+919880459502"
                    className="ww-footer-contact-card"
                    aria-label="Speak to us now"
                  >
                    <div className="ww-footer-card-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div className="ww-footer-card-bottom">
                      <span className="ww-footer-card-label">Speak to<br />Us Now</span>
                      <span className="ww-footer-card-arrow">→</span>
                    </div>
                  </a>
                </div>

              </div>

            </div>

            {/* Bottom bar */}
            <div className="ww-footer-bottom-bar">
              <span className="ww-footer-copy">© 2025 White Wolf. All rights reserved.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="footer-bottom-marquee-wrapper">
        <div className="footer-bottom-marquee section" style={{overflow:"hidden"}}>
          <div className="footer-marquee-track" style={{display:"flex",width:"max-content"}}>
            {[...Array(2)].map((_, i) => (
              <div className="footer-bottom-text-wrapper" key={i} aria-hidden={i > 0 ? "true" : undefined}>
                {["White Wolf","–","White Wolf","–","White Wolf","–","White Wolf","–","White Wolf","–","White Wolf","–"].map((t,j) => (
                  <div className="bottom-big-text" key={j}><h1 className="footer-bottom-text">{t}</h1></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
