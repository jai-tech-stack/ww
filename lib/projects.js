// White Wolf — Project / Case Study data
//
// To add more images to a project: drop files into /public/assets and list
// their paths in that project's `gallery` array (shown as a horizontal strip).
// Replace each `behanceUrl` with the specific Behance project URL.

export const PROJECTS = [
  {
    slug: "choco-co",
    title: "Choco & Co",
    tagline: "A boutique chocolate brand crafted with luxury, warmth, and artisan identity.",
    category: "Branding",
    client: "Choco & Co",
    year: "2025",
    duration: "4 weeks",
    budget: "On Request",
    services: ["Brand Strategy", "Logo Design", "Visual Identity", "Packaging Design"],
    coverImage: "/assets/project-choco-co.jpg",
    heroImage: "/assets/project-choco-co.jpg",
    behanceUrl: "https://www.behance.net/gallery/249878753/CHOCO-CO-Boutique-Chocolates-Branding",
    gallery: [
      "/assets/choco-1.webp",
      "/assets/choco-2.webp",
      "/assets/choco-3.webp",
      "/assets/choco-4.webp",
      "/assets/choco-5.webp",
      "/assets/choco-6.webp",
    ],
    color: "#CBC16C",
    overview:
      "Choco & Co needed a premium brand identity that communicated artisan craftsmanship and luxury. We created a refined visual system — anchored in gold and dark tones — that positions them as a boutique chocolate destination.",
    sections: [
      {
        type: "text",
        label: "The Brief",
        heading: "Luxury in every detail",
        body: "The founders wanted a brand that could stand alongside international chocolate houses. The identity needed to communicate craft, indulgence, and quality without feeling mass-market.",
      },
      {
        type: "image-full",
        image: "/assets/project-choco-co.jpg",
        caption: "Brand identity and visual system",
      },
    ],
    results: [
      { stat: "4 wk", label: "Full brand delivery" },
      { stat: "100%", label: "Client satisfaction" },
    ],
    nextSlug: "lokal-street",
    nextTitle: "Lokal Street",
  },
  {
    slug: "lokal-street",
    title: "Lokal Street",
    tagline: "Empowering artisans with a bold brand voice that celebrates handcraft.",
    category: "Print Design",
    client: "Lokal Street",
    year: "2024",
    duration: "3 weeks",
    budget: "On Request",
    services: ["Brand Identity", "Print Design", "Poster Design", "Marketing Collateral"],
    coverImage: "/assets/project-lokal-street.jpg",
    heroImage: "/assets/project-lokal-street.jpg",
    behanceUrl: "https://www.behance.net/gallery/249928471/Lokal-Street-Branding",
    gallery: [
      "/assets/lokal-1.webp",
      "/assets/lokal-2.webp",
      "/assets/lokal-3.webp",
      "/assets/lokal-4.webp",
      "/assets/lokal-5.webp",
      "/assets/lokal-6.webp",
      "/assets/lokal-7.webp",
    ],
    color: "#BF6EB6",
    overview:
      "Lokal Street is a handcrafted products marketplace empowering local artisans. We designed a vibrant, energetic brand identity and print collateral that communicates their mission of preserving art and culture.",
    sections: [
      {
        type: "text",
        label: "The Vision",
        heading: "Celebrate the hands that create",
        body: "Lokal Street needed a visual identity that felt warm, authentic, and community-driven. The brand had to appeal to conscious buyers while honoring the artisans at its core.",
      },
      {
        type: "image-full",
        image: "/assets/project-lokal-street.jpg",
        caption: "Brand poster and print collateral",
      },
    ],
    results: [
      { stat: "3 wk", label: "Delivery timeline" },
      { stat: "100%", label: "Client satisfaction" },
    ],
    nextSlug: "glorious-smile",
    nextTitle: "Glorious Smile",
  },
  {
    slug: "glorious-smile",
    title: "Glorious Smile",
    tagline: "A modern dental clinic brand that blends trust, care, and clinical precision.",
    category: "Brand Identity",
    client: "Glorious Smile Dental",
    year: "2024",
    duration: "3 weeks",
    budget: "On Request",
    services: ["Logo Design", "Brand Identity", "Visual System", "Brand Guidelines"],
    coverImage: "/assets/Project-smile.jpg",
    heroImage: "/assets/Project-smile.jpg",
    behanceUrl: "https://www.behance.net/gallery/88231253/Glorious-Smile",
    gallery: [
      "/assets/smile-1.webp",
      "/assets/smile-2.webp",
      "/assets/smile-3.webp",
      "/assets/smile-4.webp",
      "/assets/smile-5.webp",
      "/assets/smile-6.webp",
    ],
    color: "#BF6EB6",
    overview:
      "Glorious Smile Multi-Speciality Dental Clinic needed a brand identity that communicated warmth and clinical professionalism. We designed a distinctive logo and visual system that builds patient trust from first contact.",
    sections: [
      {
        type: "text",
        label: "The Challenge",
        heading: "Making dental care feel approachable",
        body: "Healthcare brands often feel cold and corporate. Glorious Smile wanted to stand apart — friendly, professional, and reassuring. The identity balances clinical credibility with a welcoming, human touch.",
      },
      {
        type: "image-full",
        image: "/assets/Project-smile.jpg",
        caption: "Logo and brand identity system",
      },
    ],
    results: [
      { stat: "3 wk", label: "Full identity delivery" },
      { stat: "100%", label: "Client satisfaction" },
    ],
    nextSlug: "agua-pool",
    nextTitle: "Agua Pool Company",
  },
  {
    slug: "agua-pool",
    title: "Agua Pool Company",
    tagline: "A premium pool company brand that flows with confidence and precision.",
    category: "Brand & Print",
    client: "Agua Pool Company",
    year: "2024",
    duration: "4 weeks",
    budget: "On Request",
    services: ["Brand Identity", "Business Card Design", "Print Collateral", "Brand Guidelines"],
    coverImage: "/assets/project-agua-pool.jpg",
    heroImage: "/assets/project-agua-pool.jpg",
    behanceUrl: "https://www.behance.net/gallery/150315013/Agua-Pool-Company-Branding-Project",
    gallery: [
      "/assets/agua-1.webp",
      "/assets/agua-2.webp",
      "/assets/agua-3.webp",
      "/assets/agua-4.webp",
      "/assets/agua-5.webp",
      "/assets/agua-6.webp",
      "/assets/agua-7.webp",
    ],
    color: "#6AAAC7",
    overview:
      "Agua Pool Company required a brand that communicated expertise, trust, and premium quality in the pool construction and maintenance sector. We created a full identity system including business cards and print collateral.",
    sections: [
      {
        type: "text",
        label: "The Approach",
        heading: "Precision meets premium",
        body: "The brand needed to appeal to high-end residential and commercial clients. We developed a clean, professional identity anchored in blues and whites — evoking water, clarity, and quality craftsmanship.",
      },
      {
        type: "image-full",
        image: "/assets/project-agua-pool.jpg",
        caption: "Business card and brand collateral",
      },
    ],
    results: [
      { stat: "4 wk", label: "Full brand delivery" },
      { stat: "100%", label: "Client satisfaction" },
    ],
    nextSlug: "hexa-elevators",
    nextTitle: "Hexa Elevators",
  },
  {
    slug: "hexa-elevators",
    title: "Hexa Elevators",
    tagline: "Elevating a legacy brand into a modern digital presence with AI integration.",
    category: "Web Design & AI",
    client: "Hexa Elevators",
    year: "2025",
    duration: "8 weeks",
    budget: "On Request",
    services: ["Brand Identity", "Web Design", "Web Development", "AI Integration"],
    coverImage: "/assets/Project-Hexa1.jpg",
    heroImage: "/assets/Project-Hexa1.jpg",
    behanceUrl: "https://www.behance.net/gallery/212327527/Hexa-Elevators",
    gallery: [
      "/assets/hexa-1.webp",
      "/assets/hexa-2.webp",
      "/assets/hexa-3.webp",
      "/assets/hexa-4.webp",
      "/assets/hexa-5.webp",
      "/assets/hexa-6.webp",
      "/assets/hexa-7.webp",
      "/assets/hexa-8.webp",
    ],
    color: "#6AAAC7",
    overview:
      "Hexa Elevators needed a complete digital transformation — a new brand identity, a modern website, and AI-powered features to streamline customer enquiries and showcase their engineering excellence.",
    sections: [
      {
        type: "text",
        label: "The Challenge",
        heading: "From legacy brand to digital leader",
        body: "Hexa Elevators had strong engineering credentials but an outdated digital presence. The brief was to build a website that matched their technical precision while integrating AI tools to improve lead generation and customer experience.",
      },
      {
        type: "image-full",
        image: "/assets/Project-Hexa1.jpg",
        caption: "Brand identity and website design",
      },
      {
        type: "text",
        label: "AI Integration",
        heading: "Smart features for a smarter business",
        body: "We integrated an AI-powered enquiry assistant and product recommendation engine, reducing response time and improving conversion rates significantly within the first month of launch.",
      },
    ],
    results: [
      { stat: "60%", label: "Increase in client enquiries" },
      { stat: "3×", label: "Brand recognition improvement" },
      { stat: "8 wk", label: "End-to-end delivery" },
    ],
    nextSlug: "choco-co",
    nextTitle: "Choco & Co",
  },
];

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null;
}

export function getAllSlugs() {
  return PROJECTS.map((p) => ({ params: { slug: p.slug } }));
}
