import albanImg from "../assets/alban.png";
import pokemonImg from "../assets/pokemon.png";
import ciscoImg from "../assets/cisco.png";
import pmiImg from "../assets/PMI.png";

export const projects = [
  {
    id: 1,
    title: "Alban Memorial Foundation",
    description:
      "A charity website for the Alban Memorial Foundation that empowers disadvantaged Filipino families through wellness and livelihood programs. Focused on total human development, it provides educational support and financial aid to help marginalized sectors achieve self-sufficiency.",
    role: "UI/UX Design · Front-End Development",
    tech: ["PHP", "Tailwind CSS", "HTML", "CSS", "JavaScript"],
    status: "completed",
    liveUrl: "https://albanmemorial.onrender.com/",
    image: albanImg,
    color: "#e1704a",
  },
  {
    id: 2,
    title: "Pokémon GO Web Store",
    description:
      "A Pokémon GO inspired web store built as a final project. This reimagines the official storefront with a cleaner, more modern UI. Focusing on making the user experience smoother for browsing in-game items, collections, and special events.",
    role: "UI/UX Design · Full-Stack Development",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "completed",
    liveUrl: "https://4eyesfeutech.github.io/FINAL-PROJECT-FOR-IT0063/",
    image: pokemonImg,
    color: "#e1704a",
  },
  {
    id: 3,
    title: "FEU-CDGRS",
    description:
      "A unified campus management platform for Far Eastern University that streamlines student discipline and guidance referrals through automated record tracking. The project also features an AI-powered lost and found system with image recognition to improve item recovery and campus experience.",
    role: "Assistant Project Manager · UI/UX Design · QA",
    tech: ["React", "PHP", "Laravel", "Microsoft Azure", "Python", "Tailwind CSS"],
    status: "in-progress",
    color: "#e1704a",
  },
  {
    id: 4,
    title: "SmiskiVerse",
    description:
      "A fan-made digital space for Smiski collectors built to capture the charm of the brand. This project features a full series explorer and a guide to the lore behind each figure. The design uses a soft pastel aesthetic to match the mysterious yet whimsical feel of the glowing collectibles.",
    role: "UI/UX Design · Full-Stack Development",
    tech: ["React", "CSS", "JavaScript"],
    status: "in-progress",
    color: "#e1704a",
  },
  {
    id: 5,
    title: "Kuhaku Media",
    description:
      "A digital news portal that covers Japanese pop culture and local events through high quality photojournalism. Focused on deeper storytelling, it provides a fresh perspective on event coverage to bring meaningful journalism to the community.",
    role: "UI/UX Design · Full-Stack Development",
    tech: [],
    status: "in-progress",
    color: "#e1704a",
  },
];

export const certificates = [
  {
    id: 1,
    title: "Cisco Certified Support Technician (CCST) – Networking",
    issuer: "Cisco",
    year: "February 2025",
    image: ciscoImg,
  },
  {
    id: 2,
    title: "PMI Project Management Ready™",
    issuer: "PMI",
    year: "March 2026",
    image: pmiImg,
    imagePadding: "p-4",
  },
];

export const techStack = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JavaScript" },
  { name: "Python" },
  { name: "PHP" },
  { name: "Laravel" },
  { name: "Tailwind CSS" },
  { name: "MySQL" },
  { name: "React" },
  { name: "Microsoft Azure" },
];

export const designTools = [
  { name: "Figma" },
  { name: "Photoshop" },
  { name: "Canva" },
];
