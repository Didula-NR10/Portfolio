// ─── EDIT THIS FILE TO CUSTOMIZE YOUR PORTFOLIO ───────────────────────────

export const COMPANY = {
  name: "Nexus Studio",
  tagline: "We craft digital experiences that matter.",
  description:
    "A tight-knit team of 8 builders, designers, and strategists turning bold ideas into polished digital products.",
  email: "hello@nexusstudio.io",
  phone: "+1 (555) 000-0000",
  address: "42 Innovation Drive, San Francisco, CA",
  founded: "2019",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    dribbble: "https://dribbble.com",
  },
};

export const TEAM = [
  { name: "Alex Rivera", role: "CEO & Lead Architect", avatar: "AR" },
  { name: "Sam Chen", role: "Full-Stack Engineer", avatar: "SC" },
  { name: "Jordan Lee", role: "UI/UX Designer", avatar: "JL" },
  { name: "Morgan Blake", role: "Mobile Developer", avatar: "MB" },
  { name: "Taylor Kim", role: "Backend Engineer", avatar: "TK" },
  { name: "Casey Patel", role: "DevOps & Cloud", avatar: "CP" },
  { name: "Riley Nguyen", role: "Project Manager", avatar: "RN" },
  { name: "Drew Santos", role: "QA & Testing Lead", avatar: "DS" },
];

export const SERVICES = [
  {
    id: "web",
    icon: "◈",
    title: "Web Applications",
    description:
      "Scalable, performant web apps built with modern frameworks. From MVPs to enterprise-grade platforms.",
    tech: ["React", "Next.js", "Vue", "Node.js"],
  },
  {
    id: "mobile",
    icon: "◉",
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile experiences for iOS and Android that users actually love.",
    tech: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    id: "pos",
    icon: "◇",
    title: "POS Systems",
    description:
      "Custom point-of-sale solutions that streamline retail and restaurant operations end-to-end.",
    tech: ["Custom Hardware", "Cloud Sync", "Offline Mode"],
  },
  {
    id: "design",
    icon: "◎",
    title: "UI/UX Design",
    description:
      "Research-driven design systems and interfaces that convert visitors into loyal customers.",
    tech: ["Figma", "Prototyping", "Design Systems"],
  },
  {
    id: "cloud",
    icon: "◌",
    title: "Cloud & DevOps",
    description:
      "Robust infrastructure, CI/CD pipelines, and cloud architecture that scales with your business.",
    tech: ["AWS", "GCP", "Docker", "Kubernetes"],
  },
  {
    id: "api",
    icon: "◈",
    title: "API & Integrations",
    description:
      "Seamless third-party integrations and custom APIs that connect your ecosystem.",
    tech: ["REST", "GraphQL", "Webhooks", "OAuth"],
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Orion POS",
    category: "POS System",
    year: "2024",
    description:
      "A complete point-of-sale overhaul for a 30-location restaurant chain. Real-time inventory, offline-first architecture, and a staff-training time cut by 60%.",
    tags: ["React Native", "Node.js", "PostgreSQL", "AWS"],
    color: "#FF6B35",
    result: "60% faster onboarding",
  },
  {
    id: 2,
    title: "VaultPay",
    category: "Web Application",
    year: "2024",
    description:
      "A fintech dashboard for a payments startup processing $2M+ monthly. End-to-end encrypted, SOC2 compliant, with real-time analytics.",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    color: "#00D4AA",
    result: "$2M+ monthly volume",
  },
  {
    id: 3,
    title: "FleetTrack",
    category: "Mobile App",
    year: "2023",
    description:
      "Cross-platform logistics app for 500+ delivery drivers. Live GPS tracking, route optimization, and automated proof-of-delivery.",
    tags: ["Flutter", "Google Maps API", "Firebase", "Python"],
    color: "#7B61FF",
    result: "500+ active drivers",
  },
  {
    id: 4,
    title: "MedSync",
    category: "Web Application",
    year: "2023",
    description:
      "HIPAA-compliant patient portal connecting 3 hospitals. Appointment scheduling, secure messaging, and EHR integration.",
    tags: ["React", "Django", "PostgreSQL", "Redis"],
    color: "#FF3D71",
    result: "3 hospitals connected",
  },
  {
    id: 5,
    title: "Cultivate",
    category: "Mobile App",
    year: "2022",
    description:
      "A habit-tracking app that reached #12 in the App Store productivity category within 2 weeks of launch.",
    tags: ["React Native", "Node.js", "MongoDB", "Expo"],
    color: "#FFD60A",
    result: "#12 App Store rank",
  },
  {
    id: 6,
    title: "ShopStream",
    category: "E-Commerce Platform",
    year: "2022",
    description:
      "Headless commerce platform for a fashion brand doing 10k+ orders/month. 99.9% uptime, sub-200ms load times.",
    tags: ["Next.js", "Shopify", "Vercel", "Algolia"],
    color: "#00B4D8",
    result: "10k+ orders/month",
  },
];

export const TECH_STACK = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Vue.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "Django", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Redis", category: "Database" },
  { name: "React Native", category: "Mobile" },
  { name: "Flutter", category: "Mobile" },
  { name: "Swift", category: "Mobile" },
  { name: "AWS", category: "Cloud" },
  { name: "GCP", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "Figma", category: "Design" },
];