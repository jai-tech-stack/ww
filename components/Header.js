import Head from "next/head";
import { useRouter } from "next/router";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  abs,
  organizationSchema,
  websiteSchema,
} from "../lib/seo";

export default function Header({
  title,
  description,
  noindex = false,
  ogImage,
  ogImageAlt,
  ogImageWidth,
  ogImageHeight,
  ogType = "website",
  jsonLd,
}) {
  const router = useRouter();
  const path = (router.asPath || "/").split("#")[0].split("?")[0];
  const canonical = path === "/" ? SITE_URL : abs(path);

  const fullTitle = title
    ? title.includes(SITE_NAME)
      ? title
      : `${title} — ${SITE_NAME}`
    : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESCRIPTION;
  const image = abs(ogImage || DEFAULT_OG_IMAGE);
  const imageAlt = ogImageAlt || `${SITE_NAME} — ${SITE_TAGLINE}`;
  const isJpeg = /\.jpe?g(?:$|\?)/i.test(image);

  // Site-wide structured data + any per-page schema
  const schemas = [organizationSchema(), websiteSchema()];
  if (jsonLd) Array.isArray(jsonLd) ? schemas.push(...jsonLd) : schemas.push(jsonLd);

  return (
    <Head>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonical} />

      {/* Robots */}
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, follow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <meta name="theme-color" content="#0a0a0a" />
      <meta name="author" content={SITE_NAME} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content={isJpeg ? "image/jpeg" : "image/png"} />
      <meta property="og:image:width" content={ogImageWidth || (isJpeg ? "1440" : "1923")} />
      <meta property="og:image:height" content={ogImageHeight || (isJpeg ? "780" : "1081")} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Icons */}
      <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/assets/favicon.svg" />

      {/* Structured data */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}
