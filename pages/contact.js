import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name:"", company:"", email:"", country:"", projectType:"", budgetRange:"", details:"" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setStatus(null);
    try {
      const res = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
      const data = await res.json();
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name:"", company:"", email:"", country:"", projectType:"", budgetRange:"", details:"" });
    } catch { setStatus("error"); }
    setLoading(false);
  };

  return (
    <>
      <section className="ww-page-hero">
        <div className="ww-page-hero-inner">
          <p className="ww-page-tag">Contact</p>
          <h1 className="ww-page-title">Let&apos;s Build Something Extraordinary</h1>
          <p className="ww-page-subtitle">Tell us about your project and we&apos;ll get back to you within 24 hours.</p>
        </div>
      </section>

      <section className="ww-section">
        <div className="ww-container">
          <div className="ww-contact-grid">
            <div className="ww-contact-left">
              <div className="ww-contact-info">
                <a href="mailto:selestin.s@gmail.com" className="ww-contact-link">selestin.s@gmail.com</a>
                <a href="tel:+919880459502" className="ww-contact-link">+91 98804 59502</a>
                <span className="ww-contact-link" style={{ cursor:"default" }}>Bangalore, India</span>
              </div>
            </div>
            <div className="ww-contact-right">
              <form className="ww-form" onSubmit={handleSubmit}>
                <div className="ww-form-row">
                  <div className="ww-form-group"><label className="ww-form-label">Name *</label><input className="ww-form-input" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required /></div>
                  <div className="ww-form-group"><label className="ww-form-label">Company</label><input className="ww-form-input" name="company" value={form.company} onChange={handleChange} placeholder="Company name" /></div>
                </div>
                <div className="ww-form-row">
                  <div className="ww-form-group"><label className="ww-form-label">Email *</label><input className="ww-form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" required /></div>
                  <div className="ww-form-group"><label className="ww-form-label">Country</label><input className="ww-form-input" name="country" value={form.country} onChange={handleChange} placeholder="India" /></div>
                </div>
                <div className="ww-form-row">
                  <div className="ww-form-group">
                    <label className="ww-form-label">Project Type</label>
                    <select className="ww-form-input ww-form-select" name="projectType" value={form.projectType} onChange={handleChange}>
                      <option value="" disabled>Select service</option>
                      <option>Branding</option><option>UI/UX Design</option><option>Development</option><option>AI Integrated Services</option><option>Full Service</option>
                    </select>
                  </div>
                  <div className="ww-form-group">
                    <label className="ww-form-label">Budget Range</label>
                    <select className="ww-form-input ww-form-select" name="budgetRange" value={form.budgetRange} onChange={handleChange}>
                      <option value="" disabled>Select budget</option>
                      <option>Under $5K</option><option>$5K – $15K</option><option>$15K – $50K</option><option>$50K+</option>
                    </select>
                  </div>
                </div>
                <div className="ww-form-group" style={{ gridColumn:"1/-1" }}>
                  <label className="ww-form-label">Project Details *</label>
                  <textarea className="ww-form-input ww-form-textarea" name="details" value={form.details} onChange={handleChange} placeholder="Describe your project, goals, and timeline..." required />
                </div>
                <div className="ww-form-footer">
                  <button type="submit" className="ww-form-btn" disabled={loading}>{loading ? "Sending..." : "Send Enquiry"}</button>
                  {status === "success" && <p className="ww-form-msg ww-form-msg--success">Message sent! We will respond within 24 hours.</p>}
                  {status === "error" && <p className="ww-form-msg ww-form-msg--error">Something went wrong. Please email us directly.</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Contact",
      description: "Get in touch with White Wolf to start your digital transformation project.",
    },
  };
}
