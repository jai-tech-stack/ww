import { SITE_URL } from "../lib/seo";
import { getAllSlugs } from "../lib/projects";

// Static, indexable routes with priority + change frequency
const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/services", priority: "0.9", changefreq: "monthly" },
  { path: "/case-studies", priority: "0.8", changefreq: "weekly" },
  { path: "/insights", priority: "0.6", changefreq: "weekly" },
  { path: "/contact", priority: "0.7", changefreq: "yearly" },
];

function buildSitemap(urls) {
  const today = new Date().toISOString().split("T")[0];
  const body = urls
    .map(
      (u) => `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  // Individual case study pages
  const projectUrls = getAllSlugs().map((p) => ({
    path: `/case-studies/${p.params.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  }));

  const xml = buildSitemap([...STATIC_ROUTES, ...projectUrls]);

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
