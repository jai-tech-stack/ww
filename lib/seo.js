// Central SEO configuration for White Wolf
// Override the domain by setting NEXT_PUBLIC_SITE_URL in your environment.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.whitewolfone.com"
).replace(/\/$/, "");

export const SITE_NAME = "White Wolf";
export const SITE_TAGLINE = "Digital Transformation Agency";
export const DEFAULT_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const DEFAULT_DESCRIPTION =
  "White Wolf helps global businesses transform ideas into scalable digital experiences through branding, UI/UX design, web & app development, and AI-powered innovation.";
export const DEFAULT_OG_IMAGE = "/assets/banner-slide.png";
export const TWITTER_HANDLE = "@whitewolf";

export const ORG_EMAIL = "info@whitewolfone.com";
export const ORG_PHONE = "+91-98804-59502";

// Absolute URL helper
export const abs = (path = "/") =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

// Organization schema — used site-wide
export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: abs("/assets/white-wolf-logo.svg"),
  email: ORG_EMAIL,
  telephone: ORG_PHONE,
  description: DEFAULT_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "2nd Main SP Naidu Layout, Ramamurthy Nagar, Bengaluru, Karnataka 560016",
    addressLocality: "Bangalore",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/whitewolfone",
    "https://www.facebook.com/",
    "https://www.behance.net/selestin",
  ],
});

// WebSite schema (enables sitelinks search box eligibility)
export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
});

// Breadcrumb schema builder — pass [{name, path}]
export const breadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});
