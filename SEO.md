# White Wolf — SEO Playbook

This document covers the **on-page / technical SEO** implemented in the codebase and the
**off-page SEO** action plan (off-page work happens outside the code — citations, backlinks, GMB).

> ⚙️ **One required step:** set your real domain in the environment so canonicals, Open Graph
> URLs, sitemap and robots all point to the right place:
> ```
> NEXT_PUBLIC_SITE_URL=https://www.whitewolfone.com
> ```
> Also update the `Sitemap:` line in `public/robots.txt` if the domain differs.

---

## ✅ On-Page / Technical SEO (implemented)

| Item | Where | Status |
|---|---|---|
| Unique `<title>` per page | `components/Header.js` + each page's `getStaticProps` | ✅ |
| Meta description per page | same | ✅ |
| Canonical URL (auto from route) | `components/Header.js` | ✅ |
| Robots meta (`index/follow`, large image preview) | `components/Header.js` | ✅ |
| `noindex` on `/landing` (duplicate of homepage sections) | `pages/landing.js` | ✅ |
| Open Graph tags (title, desc, url, image, type) | `components/Header.js` | ✅ |
| Twitter summary_large_image card | `components/Header.js` | ✅ |
| Organization + WebSite JSON-LD (site-wide) | `lib/seo.js` → `Header.js` | ✅ |
| CreativeWork + BreadcrumbList JSON-LD (case studies) | `pages/case-studies/[slug].js` | ✅ |
| Service / ItemList JSON-LD (services) | `pages/services/index.js` | ✅ |
| `robots.txt` (with sitemap reference) | `public/robots.txt` | ✅ |
| Dynamic `sitemap.xml` (all routes + case studies) | `pages/sitemap.xml.js` | ✅ |
| `lang="en"`, theme-color, favicon, apple-touch-icon | `_document.js` / `Header.js` | ✅ |
| Semantic headings & single H1 per page | page components | ✅ |

### Still recommended (quick wins)
- **Real OG image (1200×630).** Currently using `/assets/banner-slide.png`. Design a branded
  share card per key page and pass `ogImage` from that page's `getStaticProps`.
- **Image `alt` text** — audit homepage images; ensure every `<img>` has descriptive alt.
- **Image format/size** — serve WebP/AVIF and compress hero images for Core Web Vitals (LCP).
- **Local Business schema** — once you have a Google Business Profile, add `LocalBusiness` JSON-LD
  with exact NAP (Name, Address, Phone) and geo coordinates.
- **Insights → Article schema + a real blog** — publish keyword-targeted articles (see off-page).

---

## 🎯 Target Keywords (starter set)

**Primary (commercial):**
- branding agency Bangalore / India
- UI UX design agency
- web development company Bangalore
- AI integration services / AI consulting for business
- digital transformation agency

**Long-tail (content):**
- "how much does branding cost in India"
- "SaaS product design agency"
- "AI chatbot integration for business"
- "best UI/UX agency for startups"

> Map one primary keyword to each core page (Home → digital transformation agency,
> Services → the service terms, Case Studies → "[client] case study", etc.).

---

## 🌐 Off-Page SEO Action Plan

Off-page = building authority and trust signals **outside** your website. Priority order:

### 1. Google Business Profile (highest ROI for a local agency)
- Create/claim **Google Business Profile** for the Bangalore address (2nd main , sp naidu layout , r m nagar , bangalore 560016).
- Exact, consistent **NAP** (Name, Address, Phone) matching the website footer.
- Add categories (Website Designer, Marketing Agency, Software Company), photos, services, posts.
- Collect **Google reviews** from past clients — aim for 10+ with keywords in the text.

### 2. Local Citations & Directories (consistent NAP everywhere)
- Justdial, Sulekha, IndiaMART, Clutch, GoodFirms, DesignRush, The Manifest, Behance, Dribbble.
- Clutch & GoodFirms especially — agency-buyer intent + dofollow profile links + reviews.
- Keep Name/Address/Phone **identical** across all listings.

### 3. Backlinks (authority)
- **Guest posts** on design/marketing/startup blogs (YourStory, design publications).
- **Case study PR** — pitch notable client results to industry roundups.
- **Awards & directories** — submit work to Awwwards, CSS Design Awards, Behance featured.
- **Partnerships** — get listed on partners'/clients' "our partners" or footer credit links.
- **HARO / Featured / journalist requests** — provide expert quotes for backlinks.
- Avoid paid link farms / PBNs — Google penalizes these.

### 4. Content Marketing (earns links + ranks long-tail)
- Turn the **Insights** section into a real blog. Publish 2–4 articles/month targeting the
  long-tail keywords above. Add `Article` JSON-LD + author + dates.
- Repurpose **case studies** into LinkedIn carousels and short posts.
- Create one **pillar page** per service that internally links to supporting articles.

### 5. Social Signals & Brand
- Active **LinkedIn company page** (already linked) — post case studies, hire/culture, insights.
- **Behance/Dribbble** portfolio kept current (already linked) — strong design-niche referral.
- Encourage employees to share — amplifies reach and brand searches (a ranking signal).

### 6. Reviews & Reputation
- Reviews on Google, Clutch, GoodFirms, Facebook.
- Respond to every review. Review velocity + recency matters.

---

## 📋 Launch Checklist
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- [ ] Update `Sitemap:` URL in `public/robots.txt` to match the domain.
- [ ] Submit `sitemap.xml` in **Google Search Console** + **Bing Webmaster Tools**.
- [ ] Verify domain ownership in Search Console; check Coverage + Core Web Vitals.
- [ ] Create + optimize **Google Business Profile**.
- [ ] Design branded **1200×630 OG image**.
- [ ] Set up **Google Analytics 4** (or Plausible) for traffic + conversion tracking.
- [ ] Add NAP-consistent listings on the top 10 directories.
- [ ] Start the review-collection process with past clients.
