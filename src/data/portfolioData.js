import albanImg from "../assets/project-previews/alban.png";
import pokemonImg from "../assets/project-previews/pokemon.png";
import pokemonCardImg from "../assets/project-previews/pokemon-960.jpg";
import smiskisiteImg from "../assets/project-previews/smiskisite.png";
import thesisDashboardImg from "../assets/project-previews/feu-compass-osd-dashboard.png";
import thesisMatchImg from "../assets/project-previews/feu-compass-smart-match.png";
import thesisAssetImg from "../assets/project-previews/feu-compass-asset-record.png";
import thesisGncImg from "../assets/project-previews/feu-compass-gnc-dashboard.png";
import thesisInterventionImg from "../assets/project-previews/feu-compass-intervention-hub.png";
import ciscoImg from "../assets/cisco.png";
import pmiImg from "../assets/PMI.png";

export const projects = [
  {
    id: "thesis",
    title: "FEU-COMPASS",
    systemName: "FEU-CDGRS: Centralized Operations Platform for Student Discipline and Guidance Referrals with AI-Assisted Asset Resolution",
    summary: "A student services platform connecting discipline records, guidance referrals, and AI-assisted lost-and-found matching.",
    description: "A four-member capstone project for FEU Manila's Office of Student Discipline and Guidance & Counseling. The system brings violation and incident records, confidential guidance referrals, and asset tracking into one workflow. An AI-assisted matching service suggests potential matches between lost and found items for staff to review.",
    problem: "Separate discipline records, guidance referrals, and lost-and-found workflows made student cases harder to track across offices.",
    solution: "FEU-COMPASS connects violation and incident records, confidential guidance referrals, and asset tracking in one workflow. AI-assisted suggestions help staff review possible matches between lost and found items.",
    metrics: [
      { value: "28", label: "Modules passed final functional testing" },
      { value: "4", label: "User groups tested" },
      { value: "3", label: "Functional testing rounds" },
    ],
    kind: "Student services operations platform",
    tech: ["Laravel", "Tailwind CSS", "MySQL", "Python", "FastAPI", "Microsoft Power Apps", "Microsoft Azure", "Microsoft Entra ID"],
    cardTech: ["Laravel", "Tailwind CSS", "FastAPI", "Power Apps"],
    image: thesisDashboardImg,
    imageWidth: 1920,
    imageHeight: 1080,
    imageAlt: "FEU-COMPASS Office of Student Discipline dashboard with quick actions and status charts",
    screenshots: [
      { image: thesisDashboardImg, alt: "Office of Student Discipline dashboard with actions for violations, incidents, confiscated items, and guidance referrals", caption: "Office of Student Discipline dashboard" },
      { image: thesisMatchImg, alt: "Smart Match Finder results showing ranked potential matches for a lost item", caption: "AI-assisted lost-and-found matching" },
      { image: thesisAssetImg, alt: "Lost asset record with a photo and an action to find similar items", caption: "Lost-and-found asset record" },
      { image: thesisGncImg, alt: "Guidance and Counseling portal dashboard with referrals and case statistics", caption: "Guidance and Counseling dashboard" },
      { image: thesisInterventionImg, alt: "Supportive Intervention Hub showing a referral table and filtering controls", caption: "Supportive Intervention Hub" },
    ],
    private: true,
  },
  {
    id: 4,
    title: "Smiskisite",
    summary: "A collector storefront where visitors can browse collections, search, and filter Smiski products.",
    description:
      "Originally built as a third-year CodeIgniter class final project, Smiskisite is a fan-made storefront for Smiski collectors. Refurbished with Next.js, it lets visitors browse collections and search and filter products.",
    kind: "Collector storefront",
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    status: "in-progress",
    liveUrl: "https://smiskisite.vercel.app/",
    image: smiskisiteImg,
    imageWidth: 1920,
    imageHeight: 1080,
    imageAlt: "Smiskisite collections page with search, filters, and product listings",
  },
  {
    id: 1,
    title: "Alban Memorial Foundation",
    summary: "A foundation website supporting disadvantaged Filipino families through wellness, livelihood, education, and financial aid.",
    description:
      "Developed for an E-commerce course final project, the Alban Memorial Foundation website presents the organization’s initiatives for disadvantaged Filipino families. It features programs in education, health, homelife, recreation, counseling, spiritual growth, and community support, all aimed at helping marginalized communities improve their quality of life and achieve self-sufficiency.",
    kind: "Nonprofit website",
    tech: ["Tailwind CSS", "HTML", "JavaScript"],
    status: "completed",
    liveUrl: "https://albanmemorial.onrender.com/",
    image: albanImg,
    imageWidth: 1920,
    imageHeight: 1080,
    imageAlt: "Alban Memorial Foundation homepage with a donation and volunteer call to action",
  },
  {
    id: 2,
    title: "Pokémon GO Web Store",
    summary: "A fan-made storefront with a cleaner interface for browsing Pokémon GO items, collections, and special events.",
    description:
      "A Pokémon GO inspired web store built as a final project for Web Design 2. This reimagines the official storefront with a cleaner, more modern UI. Focusing on making the user experience smoother for browsing in-game items, collections, and special events.",
    kind: "Fan-made storefront",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "completed",
    liveUrl: "https://4eyesfeutech.github.io/FINAL-PROJECT-FOR-IT0063/",
    image: pokemonImg,
    cardImage: pokemonCardImg,
    cardImageWidth: 960,
    cardImageHeight: 544,
    imageWidth: 1905,
    imageHeight: 1080,
    imageAlt: "Pokémon GO Web Store homepage with a shop call to action",
  },
];

export const certificates = [
  {
    id: 1,
    title: "Cisco Certified Support Technician (CCST) – Networking",
    issuer: "Cisco",
    year: "February 2025",
    dateTime: "2025-02",
    area: "Networking",
    image: ciscoImg,
    // TODO (Raine): Add the official credential URL if you have one.
    verificationUrl: null,
  },
  {
    id: 2,
    title: "PMI Project Management Ready™",
    issuer: "PMI",
    year: "March 2026",
    dateTime: "2026-03",
    area: "Project management",
    image: pmiImg,
    imagePadding: "p-4",
    // TODO (Raine): Add the official credential URL if you have one.
    verificationUrl: null,
  },
];

export const techGroups = [
  { name: "Frontend", tools: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind CSS", "React", "Next.js"] },
  { name: "Backend", tools: ["PHP", "Laravel", "CodeIgniter", "MySQL", "Supabase"] },
  { name: "Development & Collaboration", tools: ["Python", "C++", "Vite", "Git", "GitHub", "VS Code", "Antigravity", "Microsoft Azure"] },
  { name: "Design", tools: ["Figma", "Photoshop", "Canva"] },
];
