import Head from "next/head";
import Navbar from "./Navbar";

export default function Header({ title, description }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} — White Wolf` : "White Wolf — Digital Transformation Agency"}</title>
        <meta name="description" content={description || "White Wolf helps global businesses transform ideas into scalable digital experiences through branding, UI/UX, development, and AI-powered innovation."} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/icon.svg" type="image/svg+xml" />
      </Head>

      <Navbar />
    </>
  );
}
