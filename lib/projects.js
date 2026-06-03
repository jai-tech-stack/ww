// White Wolf — Project / Case Study data
// To add a new project: copy a block, update fields, add to the array.
// 'slug' becomes the URL: /case-studies/[slug]

export const PROJECTS = [
  {
    slug: "hexa-elevators",
    title: "Hexa Elevators",
    tagline: "Elevating a legacy brand into a modern, market-ready identity.",
    category: "Branding",
    client: "Hexa Elevators",
    year: "2025",
    duration: "6 weeks",
    services: ["Brand Strategy", "Logo Design", "Visual Identity", "Brand Guidelines"],
    coverImage: "/assets/692833e97f3ced4dd7b51e98_Rectangle 3 (6).svg",
    heroImage: "/assets/6928356f4af1942fae0f7473_9a19108705c819fdca4f2bc12ae96699_image 7 (1).webp",
    color: "#6AAAC7",
    behanceUrl: "https://www.behance.net/selestin",
    overview:
      "Hexa Elevators needed a brand that matched their engineering precision and market ambitions. We developed a complete visual identity system that positioned them as a premium player in the vertical mobility sector.",
    sections: [
      {
        type: "text",
        label: "The Challenge",
        heading: "A legacy company with modern ambitions",
        body: "Hexa Elevators had strong technical credentials but lacked brand presence in an increasingly visual, customer-first market. Their identity was dated, inconsistent across touchpoints, and failed to communicate their quality and precision.",
      },
      {
        type: "image-full",
        image: "/assets/692833e97f3ced4dd7b51e98_Rectangle 3 (6).svg",
        caption: "Brand exploration and moodboard development",
      },
      {
        type: "text",
        label: "Our Approach",
        heading: "Strategy before aesthetics",
        body: "We began with a brand audit and competitive landscape analysis, identifying white space in how premium elevator brands communicate. The strategy centred on precision engineering and human trust — a brand that feels both technical and approachable.",
      },
      {
        type: "split",
        label: "The Outcome",
        heading: "A brand that commands confidence",
        body: "The new identity — anchored by a geometric logomark inspired by upward motion and structural precision — rolled out across all brand touchpoints. Client inquiries increased 60% in the first three months post-launch.",
        image: "/assets/6928342afe049a8be49dd856_image 3 (2).svg",
      },
    ],
    results: [
      { stat: "60%", label: "Increase in client enquiries" },
      { stat: "3×",  label: "Brand recognition improvement" },
      { stat: "6 wk", label: "Delivery timeline" },
    ],
    nextSlug: "mt-k-kapital",
    nextTitle: "Mt K Kapital",
  },
  {
    slug: "mt-k-kapital",
    title: "Mt K Kapital",
    tagline: "A premium financial services website built for institutional trust.",
    category: "Web Design",
    client: "Mt K Kapital",
    year: "2025",
    duration: "8 weeks",
    services: ["UI/UX Design", "Web Design", "Brand Identity", "Frontend Development"],
    coverImage: "/assets/692833ba5d21d9c4f542f236_Rectangle 3 (5).svg",
    heroImage: "/assets/69259797d4952b76da2ce401_Rectangle 3.webp",
    color: "#CBC16C",
    behanceUrl: "https://www.behance.net/selestin",
    overview:
      "Mt K Kapital required a digital presence that communicated trust, precision, and institutional-grade credibility to global investors. We designed and developed a premium website that positions them confidently in the financial services sector.",
    sections: [
      {
        type: "text",
        label: "The Brief",
        heading: "Building trust through design",
        body: "Financial services clients expect sophistication without flamboyance. The brief was clear: create a digital presence that reflects Mt K Kapital's integrity, capability, and global outlook — while remaining accessible to non-specialist audiences.",
      },
      {
        type: "image-full",
        image: "/assets/692833ba5d21d9c4f542f236_Rectangle 3 (5).svg",
        caption: "Website design system and component library",
      },
      {
        type: "split",
        label: "Design Direction",
        heading: "Precision and restraint",
        body: "We built a clean, typographically-led design system anchored in dark navy and gold — communicating premium status without cliché. Every component was engineered for clarity, with clear information hierarchy and fast load performance.",
        image: "/assets/6928342afe049a8be49dd856_image 3 (2).svg",
      },
    ],
    results: [
      { stat: "4.8s", label: "Avg. session duration" },
      { stat: "2×",   label: "Lead quality improvement" },
      { stat: "8 wk", label: "End-to-end delivery" },
    ],
    nextSlug: "choco-co",
    nextTitle: "CHOCO & CO",
  },
  {
    slug: "choco-co",
    title: "CHOCO & CO",
    tagline: "Crafting a delectable boutique chocolate brand from the ground up.",
    category: "Branding",
    client: "CHOCO & CO",
    year: "2024",
    duration: "5 weeks",
    services: ["Brand Strategy", "Logo Design", "Packaging Design", "Brand Guidelines"],
    coverImage: "/assets/6928341c6222b76a2141f4ee_Rectangle 3 (7).svg",
    heroImage: "/assets/692596d5da31c0494e4aba78_Rectangle 2 (1).webp",
    color: "#BF6EB6",
    behanceUrl: "https://www.behance.net/selestin",
    overview:
      "CHOCO & CO is a boutique chocolate brand that needed an identity as refined as their product. We created a full brand system with a focus on premium artisanal positioning and memorable visual language.",
    sections: [
      {
        type: "text",
        label: "The Vision",
        heading: "Luxury in every detail",
        body: "The founders of CHOCO & CO wanted a brand that could hold its own alongside international luxury chocolate houses. The visual identity needed to communicate craft, indulgence, and quality — without feeling mass-market.",
      },
      {
        type: "image-full",
        image: "/assets/6928341c6222b76a2141f4ee_Rectangle 3 (7).svg",
        caption: "Brand identity and packaging explorations",
      },
    ],
    results: [
      { stat: "5 wk", label: "Full brand delivery" },
      { stat: "100%", label: "Client satisfaction" },
    ],
    nextSlug: "isha-foundation",
    nextTitle: "Isha Foundation",
  },
  {
    slug: "isha-foundation",
    title: "Isha Foundation",
    tagline: "Redesigning the digital experience for one of India's most respected foundations.",
    category: "Web Design",
    client: "Isha Foundation",
    year: "2024",
    duration: "10 weeks",
    services: ["UI/UX Design", "Web Design", "Information Architecture", "Prototyping"],
    coverImage: "/assets/6928342afe049a8be49dd856_image 3 (2).svg",
    heroImage: "/assets/6928356f4af1942fae0f7473_9a19108705c819fdca4f2bc12ae96699_image 7 (1).webp",
    color: "#6AAAC7",
    behanceUrl: "https://www.behance.net/selestin",
    overview:
      "Isha Foundation serves millions of users globally. The website redesign required careful attention to information architecture, accessibility, and the spiritual yet modern tone of the organisation.",
    sections: [
      {
        type: "text",
        label: "The Challenge",
        heading: "Scale, simplicity, and spirituality",
        body: "With millions of monthly visitors and a vast content ecosystem, Isha Foundation's website needed radical simplification without losing depth. The design challenge was to create intuitive navigation through complex content while preserving the organisation's unique spiritual identity.",
      },
      {
        type: "image-full",
        image: "/assets/6928342afe049a8be49dd856_image 3 (2).svg",
        caption: "UX research, wireframes, and design system",
      },
    ],
    results: [
      { stat: "40%", label: "Reduction in bounce rate" },
      { stat: "3×",  label: "Content discoverability" },
      { stat: "10 wk", label: "Project duration" },
    ],
    nextSlug: "hexa-elevators",
    nextTitle: "Hexa Elevators",
  },
];

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null;
}

export function getAllSlugs() {
  return PROJECTS.map((p) => ({ params: { slug: p.slug } }));
}
